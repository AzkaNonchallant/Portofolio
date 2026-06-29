

Implementasi React (Vite) dari desain "fancard" retro yang kamu kirim:
background biru halftone, kartu krem dengan outline pink tebal,
nama besar bergaya outline (Bebas Neue), badge statistik, dan
panel pemutar/visualizer di bagian bawah.

## Struktur proyek

```
fancard-portfolio/
├── index.html              # entry HTML, load font Google (Bebas Neue, Baloo 2, Space Mono)
├── package.json
├── vite.config.js
├── public/
│   └── star-icon.svg       # favicon
└── src/
    ├── main.jsx             # render <App /> ke #root
    ├── App.jsx              # menyusun semua section halaman
    ├── App.css
    ├── index.css            # design tokens (warna, font, radius) + utility halftone
    └── components/
        ├── BackgroundDecor.jsx/.css   # bintang/diamond/triangle yang melayang
        ├── NavBar.jsx/.css            # baris ikon navigasi atas + label "01"
        ├── StatsBar.jsx/.css          # badge pink: like / proyek / ulasan
        ├── ProfileCard.jsx/.css       # KARTU UTAMA (hero) — inti dari desain
        ├── AboutSection.jsx/.css      # bio, skill chips, daftar proyek
        └── SiteFooter.jsx/.css        # kontak & social links
```

## Cara menjalankan

```bash
npm install
npm run dev
```

Lalu buka URL yang muncul di terminal (biasanya `http://localhost:5173`).

Build untuk production:

```bash
npm run build
```

## Cara kustomisasi

- **Foto profil** — buka `src/components/ProfileCard.css`, cari class
  `.card__photo-placeholder`. Ganti `background` gradient dengan:
  ```css
  background-image: url('/src/assets/foto-profil.jpg');
  background-size: cover;
  background-position: center;
  ```
  lalu taruh foto kamu di `src/assets/`.

- **Nama / judul besar** — edit teks `<span>HANZLYN</span>` dan
  `<span>TRISHA</span>` di `src/components/ProfileCard.jsx`.

- **Data diri** (birthday, real name, hometown, tags, years active) —
  semua teksnya ada langsung di `ProfileCard.jsx`, tinggal diganti.

- **Statistik** (badge pink) — edit array `STATS` di
  `src/components/StatsBar.jsx`.

- **Warna & font** — semua token warna/tipografi terpusat di
  `src/index.css` lewat CSS variables (`--blue`, `--pink`, `--cream`,
  `--font-display`, dll), jadi tinggal ganti di satu tempat untuk
  rebrand seluruh halaman.

- **Bio, skill, dan daftar proyek** — edit array `SKILLS` dan
  `PROJECTS` serta teks di `src/components/AboutSection.jsx`.

- **Kontak/footer** — edit array `LINKS` di `src/components/SiteFooter.jsx`.
