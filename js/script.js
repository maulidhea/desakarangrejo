// =========================================================
// Desa Karangrejo — Shared front-end behaviour
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  /* Mobile nav toggle */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.setAttribute(
        "aria-expanded",
        links.classList.contains("open") ? "true" : "false"
      );
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  /* Highlight the current page in the nav */
  const current = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.dataset.page === current) a.classList.add("active");
  });

  /* Sticky header shadow on scroll */
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow =
        window.scrollY > 8 ? "0 6px 18px -10px rgba(0,0,0,.35)" : "none";
    });
  }

  /* Animated stat counters (Home page) */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const duration = 1100;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = target * eased;
        el.textContent =
          (target % 1 === 0 ? Math.round(value) : value.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => obs.observe(c));
  }

  /* Simple surat request modal / feedback (Layanan page) */
  document.querySelectorAll("[data-surat-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.suratBtn;
      const box = document.getElementById("surat-feedback");
      if (box) {
        box.textContent = `Permohonan "${name}" telah dicatat. Silakan lengkapi data di kantor desa atau melalui WhatsApp untuk verifikasi.`;
        box.classList.add("show");
        box.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  /* Basic aduan (report) form validation */
  const aduanForm = document.getElementById("aduan-form");
  if (aduanForm) {
    aduanForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("aduan-status");
      const nameVal = aduanForm.querySelector("[name=nama]").value.trim();
      const isiVal = aduanForm.querySelector("[name=isi]").value.trim();
      if (!nameVal || !isiVal) {
        msg.textContent = "Mohon lengkapi nama dan isi pengaduan.";
        msg.style.color = "#c0392b";
        return;
      }
      msg.textContent = "Terima kasih, pengaduan Anda telah terkirim ke Kantor Desa.";
      msg.style.color = "#256042";
      aduanForm.reset();
    });
  }
});
