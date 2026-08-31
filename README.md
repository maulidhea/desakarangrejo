# Website Desa Karangrejo

Website resmi Desa Karangrejo — multi-halaman, dibangun dengan HTML, CSS, JavaScript, dan server Python (Flask).

## Struktur folder

```
desa-karangrejo/
├── index.html          # Beranda (hero, sekilas desa, statistik, preview potensi & UMKM)
├── profil.html          # Profil Kepala Desa + struktur organisasi
├── potensi.html         # Potensi desa + katalog produk UMKM
├── fasilitas.html        # Fasilitas umum + peta & batas wilayah
├── layanan.html          # Layanan surat online + sosial media + form pengaduan
├── css/
│   └── style.css        # Semua styling (1 file, dipakai semua halaman)
├── js/
│   └── script.js         # Navigasi mobile, counter animasi, form surat & pengaduan
├── static/img/           # Taruh gambar/logo lokal di sini (opsional)
├── app.py                 # Server Flask untuk menjalankan situs secara lokal
├── requirements.txt
└── README.md
```

## Cara menjalankan

### Opsi 1 — langsung buka file (tanpa Python)
Cukup buka `index.html` di browser. Semua halaman saling terhubung lewat menu navigasi.

### Opsi 2 — jalankan lewat server Python (disarankan)
```bash
cd desa-karangrejo
pip install -r requirements.txt
python app.py
```
Lalu buka `http://127.0.0.1:5000` di browser. Rute tersedia: `/`, `/profil`, `/potensi`, `/fasilitas`, `/layanan`.

## Kustomisasi cepat

- **Warna & tipografi**: ubah variabel di bagian `:root` pada `css/style.css` (mis. `--green-900`, `--gold-500`).
- **Foto**: ganti URL pada atribut `src`/`background-image` dengan foto asli desa. Simpan file lokal di `static/img/` lalu arahkan path-nya, misalnya `static/img/kepala-desa.jpg`.
- **Data statistik / teks**: cari dan ubah langsung di masing-masing file `.html` (semua teks berbahasa Indonesia, mudah ditelusuri).
- **Nomor WhatsApp & sosial media**: ubah di bagian "Sosial Media & Layanan Pengaduan" pada `layanan.html`.

## Catatan
- Gambar contoh menggunakan Unsplash (butuh koneksi internet). Ganti dengan file lokal di `static/img/` bila ingin situs berjalan offline sepenuhnya.
- Form pengaduan pada `layanan.html` saat ini hanya validasi & notifikasi di sisi client (belum tersambung ke database). Bisa dikembangkan lebih lanjut dengan menambah endpoint Flask (`app.py`) untuk menyimpan data ke database.
