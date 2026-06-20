# Değişiklik Günlüğü (CHANGELOG)

Bu proje **Semantic Versioning** (SemVer) kullanır: `Major.Minor.Patch`.
- **Major:** geriye uyumsuz köklü değişiklik · **Minor:** geriye uyumlu yeni özellik · **Patch:** hata/iyileştirme.
- Beta sürümler `-beta` etiketiyle GitHub'da; kararlı sürüm Chrome Web Store'da yayınlanır.

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
