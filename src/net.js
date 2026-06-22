/*
 * TGTK · net.js — MAIN world köprüsü.
 * Threads'in followers/following GraphQL isteklerini yakalar ve cursor ile sayfalayıp
 * TÜM listeyi çeker (DOM cap'i yok). İçerik scriptiyle window.postMessage üzerinden konuşur.
 */
(() => {
  'use strict';
  if (window.__TGTK_NET) return;
  window.__TGTK_NET = true;

  const CAP = { followers: null, following: null };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const friendlyOf = (b) => { const m = /fb_api_req_friendly_name=([^&]+)/.exec(b || ''); return m ? decodeURIComponent(m[1]) : ''; };
  const hdrObj = (h) => {
    const o = {};
    try {
      if (!h) return o;
      if (h.forEach && !Array.isArray(h)) { h.forEach((v, k) => (o[k.toLowerCase()] = v)); return o; }
      if (Array.isArray(h)) { h.forEach(([k, v]) => (o[k.toLowerCase()] = v)); return o; }
      Object.keys(h).forEach((k) => (o[k.toLowerCase()] = h[k]));
    } catch (e) {}
    return o;
  };
  const remember = (fn, rec) => {
    if (fn === 'BarcelonaFriendshipsFollowingTabQuery') CAP.following = rec;
    else if (fn === 'BarcelonaFriendshipsFollowersTabQuery') CAP.followers = rec;
  };

  // ---- XHR yakala ----
  const OX = window.XMLHttpRequest;
  if (OX) {
    const open = OX.prototype.open, send = OX.prototype.send, setH = OX.prototype.setRequestHeader;
    OX.prototype.open = function (m, u) { this.__t = { m, u, headers: {} }; return open.apply(this, arguments); };
    OX.prototype.setRequestHeader = function (k, v) { try { if (this.__t) this.__t.headers[k.toLowerCase()] = v; } catch (e) {} return setH.apply(this, arguments); };
    OX.prototype.send = function (b) {
      try {
        if (this.__t && /graphql\/query/i.test(this.__t.u) && typeof b === 'string') {
          remember(friendlyOf(b), { url: this.__t.u, headers: this.__t.headers, body: b });
        }
      } catch (e) {}
      return send.apply(this, arguments);
    };
  }
  // ---- fetch yakala (yedek) ----
  const of = window.fetch;
  window.fetch = async function (...a) {
    const res = await of.apply(this, a);
    try {
      const req = a[0], opt = a[1] || {};
      const url = (req && req.url) ? req.url : String(req);
      const b = typeof opt.body === 'string' ? opt.body : '';
      if (/graphql\/query/i.test(url) && b) remember(friendlyOf(b), { url, headers: hdrObj(opt.headers), body: b });
    } catch (e) {}
    return res;
  };

  const setVars = (body, mut) => body.split('&').map((kv) => {
    const i = kv.indexOf('='); const k = kv.slice(0, i);
    if (k !== 'variables') return kv;
    const v = JSON.parse(decodeURIComponent(kv.slice(i + 1))); mut(v);
    return k + '=' + encodeURIComponent(JSON.stringify(v));
  }).join('&');
  const safeHeaders = (h) => { const o = {}; Object.keys(h || {}).forEach((k) => { if (k === 'content-type' || k.startsWith('x-')) o[k] = h[k]; }); if (!o['content-type']) o['content-type'] = 'application/x-www-form-urlencoded'; return o; };

  async function fetchAll(which, reqId, total) {
    const tpl = CAP[which];
    if (!tpl) throw new Error('no-template:' + which);
    const users = new Map(); let after = null, has = true, page = 0;
    while (has && page < 400) {
      page++;
      const body = setVars(tpl.body, (v) => { v.first = 50; if (after) v.after = after; else delete v.after; });
      const r = await fetch(tpl.url, { method: 'POST', headers: safeHeaders(tpl.headers), body, credentials: 'include' });
      const j = await r.json();
      const conn = j && j.data && j.data.user && j.data.user[which];
      if (!conn || !conn.edges) throw new Error('bad-response:' + which);
      conn.edges.forEach((e) => { const n = e.node; if (n && n.username) users.set(n.username.toLowerCase(), { username: n.username, displayName: n.full_name || '' }); });
      has = conn.page_info && conn.page_info.has_next_page;
      after = conn.page_info && conn.page_info.end_cursor;
      window.postMessage({ tgtk: 'progress', reqId, which, count: users.size, total }, '*');
      await sleep(550); // nazik
    }
    return [...users.values()];
  }

  window.addEventListener('message', (ev) => {
    const d = ev.data;
    if (!d || ev.source !== window || d.tgtk !== 'fetchAll') return;
    (async () => {
      try {
        const followers = await fetchAll('followers', d.reqId, d.totals && d.totals.followers);
        const following = await fetchAll('following', d.reqId, d.totals && d.totals.following);
        window.postMessage({ tgtk: 'result', reqId: d.reqId, followers, following }, '*');
      } catch (e) {
        window.postMessage({ tgtk: 'error', reqId: d.reqId, error: String((e && e.message) || e) }, '*');
      }
    })();
  });
})();
