"""
Desa Karangrejo — Local dev server
-----------------------------------
Menjalankan situs statis (HTML/CSS/JS) multi-halaman menggunakan Flask.

Cara pakai:
    pip install flask
    python app.py
Lalu buka: http://127.0.0.1:5000
"""

from pathlib import Path
from flask import Flask, send_from_directory, abort

BASE_DIR = Path(__file__).parent.resolve()

app = Flask(__name__, static_folder=None)

# Halaman-halaman yang tersedia (nama route -> file HTML)
PAGES = {
    "": "pages/index.html",
    "index": "pages/index.html",
    "profil": "pages/profil.html",
    "potensi": "pages/potensi.html",
    "fasilitas": "pages/fasilitas.html",
    "layanan": "pages/layanan.html",
}


@app.route("/")
@app.route("/<page>")
def render_page(page: str = ""):
    """Serve HTML pages from the pages/ folder, e.g. /profil -> pages/profil.html."""
    normalized = page.rstrip("/").lower()
    filename = PAGES.get(normalized)
    if filename is None:
        # Allow direct requests like /profil.html as a fallback
        candidate = BASE_DIR / "pages" / page
        if page.endswith(".html") and candidate.exists():
            return send_from_directory(BASE_DIR / "pages", page)
        abort(404)
    return send_from_directory(BASE_DIR, filename)


@app.route("/pages/<path:filename>")
def pages_files(filename):
    return send_from_directory(BASE_DIR / "pages", filename)


@app.route("/css/<path:filename>")
def css_files(filename):
    return send_from_directory(BASE_DIR / "css", filename)


@app.route("/js/<path:filename>")
def js_files(filename):
    return send_from_directory(BASE_DIR / "js", filename)


@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory(BASE_DIR / "static", filename)


@app.errorhandler(404)
def not_found(_error):
    return (
        "<h1>404</h1><p>Halaman tidak ditemukan. "
        "<a href='/'>Kembali ke Beranda</a></p>",
        404,
    )


if __name__ == "__main__":
    print("Desa Karangrejo berjalan di http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
