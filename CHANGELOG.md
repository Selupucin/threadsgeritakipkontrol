# Değişiklik Günlüğü (CHANGELOG)

Bu proje **Semantic Versioning** (SemVer) kullanır: `Major.Minor.Patch`.
- **Major:** geriye uyumsuz köklü değişiklik · **Minor:** geriye uyumlu yeni özellik · **Patch:** hata/iyileştirme.
- Beta sürümler `-beta` etiketiyle GitHub'da; kararlı sürüm Chrome Web Store'da yayınlanır.

## [0.4.3-beta] — 2026-06-19
### Düzeltildi
- "Profili Aç" ile açılan satır artık listenin **en altına** taşınıyor (açılanlar altta toplanır).

## [0.4.2-beta] — 2026-06-19
### Değişti
- Otomatik "takip bırakıldı" tespiti (gizli iframe) Threads tarafından engellendiği için **kaldırıldı** (sonsuz "kontrol ediliyor" sorunu giderildi). Artık "Profili Aç"a basınca satır yalnızca **"Açıldı"** olarak işaretlenir; tekrar taramada diff/eski liste gösterilmez.

## [0.4.1-beta] — 2026-06-19
### Eklendi
- Sahip (jrselupucin) tararken hak bölümünde özel **altın "👑 Sınırlama kaldırıldı"** rozeti (panel + popup).

## [0.4.0-beta] — 2026-06-19
### Eklendi
- **Akıllı önbellek (liste bazlı):** Takipçi sayısı değişmediyse takipçiler yeniden taranmaz; takip edilen sayısı değişmediyse o da taranmaz. Her ikisi de aynıysa son sonuç anında gösterilir — **tarama hakkı harcanmaz.**
- "Tekrar Tara" → **zorla** tam tarama (önbelleği yok sayar).
### Değişti
- Manuel "✓ Bıraktım" butonu kaldırıldı; "takip bırakıldı" tespiti tamamen **otomatik** (sekmeye dönünce).
- Kullanım hakkı yalnız **gerçek tarama** yapıldığında düşer (önbellekten gösterimde düşmez).

## [0.3.1-beta] — 2026-06-19
### İyileştirildi
- Otomatik "takip bırakıldı" tespiti güçlendirildi: sekmeye dönünce satırda **"kontrol ediliyor…"** gösterilir, bıraktıysan otomatik işaretlenir. Pencere odağında da tetiklenir. (Manuel "✓ Bıraktım" yedek olarak kalır — throttle/engel durumunda.)

## [0.3.0-beta] — 2026-06-19
### Eklendi
- Sonuç listesinde **"✓ Bıraktım"** butonu — takipten çıktığını elle işaretle (otomatik tespit + manuel garanti).
- **Akıllı sıralama:** Bakılmamış → Açıldı → Takip bırakıldı (durum değiştikçe satır otomatik taşınır).
- Sonuç ekranında **"🔄 Tekrar Tara"** butonu.

### Not
- Günlük 5 tarama hakkı **sahip (jrselupucin) için sınırsızdır** (muaf); diğer kullanıcılarda 5'ten düşer.

## [0.2.0-beta] — 2026-06-19
### Eklendi
- **Kesin takip kapısı:** Sahip profili butonu (gizli iframe) ile doğrulama — Threads'in liste limitinden (cap) bağımsız, kesin sonuç.
- **24 saatte 5 tarama hakkı** (sahip muaf) + popup ve sonuç panelinde "kalan hak" göstergesi.
- **"Takibi bıraktın" tespiti:** "Profili Aç" ile açtığın kişiyi takipten çıkıp dönünce listede otomatik **✓ Takibi bıraktın** işareti.
- Tarama animasyonu **Lottie kedi**; GitHub sürümünde başlıkta **Beta** etiketi.
- README'de **tek-tık indir** butonu + **KURULUM.html** (tarayıcıda açılan kurulum kılavuzu).

### Düzeltildi
- Ana sayfadan yanlış profile gitme (kimlik tespiti sol menü "Profil" linkinden).
- "Liste sonu" erken durma guard'ı + eşzamanlı tarama kilidi (çift tıklama).
- Tarama sırasında **X** ile kapatınca yeniden açılma → artık durdurup kapanır.
- Rate-limit'e karşı spinner-duyarlı sabırlı bekleme + şeffaf uyarı.

## [0.1.0-beta] — 2026-06-19
### Eklendi
- İlk beta: takipçi/takip karşılaştırması, **"Seni Takip Etmeyenler"** paneli.
- Sadece-okuma, veri cihazda kalır; TR/EN; civcikli + havalı tasarım.
- Threads DOM limiti (~430-450) için **şeffaf kapsam bildirimi**.
