// ====== ELEMENTOS ======
const btnIngresar = document.getElementById("btnIngresar");
const portada = document.getElementById("portada");
const contenido = document.getElementById("contenido");

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== INGRESAR ======
if (btnIngresar) {
  btnIngresar.addEventListener("click", () => {
    portada.style.transition = "opacity 0.8s ease";
    portada.style.opacity = 0;

    setTimeout(() => {
      portada.style.display = "none";
      contenido.style.display = "block";
      window.scrollTo(0, 0);
      setupReveal();
      setupScrollSpy();
    }, 800);
  });
}

// ====== MENU MOBILE ======
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// ====== SUB-TABS TERAPIAS ======
const subTabButtons = document.querySelectorAll(".sub-tab-btn");
const subTabContents = document.querySelectorAll(".sub-tab-content");

subTabButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const subtab = button.dataset.subtab;

    subTabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    subTabContents.forEach(content => {
      content.classList.toggle("active", content.id === subtab);
    });

    setupReveal();
  });
});

// ====== REVEAL ======
let revealObserver;

function setupReveal() {
  const secciones = document.querySelectorAll(".seccion");
  if (!secciones.length) return;

  if (revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.14 });

  secciones.forEach(sec => revealObserver.observe(sec));
}

// ====== SCROLLSPY NAV ======
function setupScrollSpy(){
  const links = document.querySelectorAll(".nav__link");
const ids = ["inicio","quien-soy","terapias","fitness","nutricion","planes-fitra","agenda","contacto"];
  const sections = ids.map(id => document.getElementById(id)).filter(Boolean);

  if (!links.length || !sections.length) return;

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id;

      links.forEach(l => l.classList.toggle("active", l.dataset.section === id));
    });
  }, { threshold: 0.45 });

  sections.forEach(s => spy.observe(s));
}

// ====== FORM AGENDA ======
const formAgenda = document.getElementById("formAgenda");
const btnLimpiar = document.getElementById("btnLimpiar");

// ✅ PONÉ TU NÚMERO REAL (si querés WhatsApp automático)
const WHATSAPP_NUMBER = "54911XXXXXXXX"; // ej: 5491127887082

function waLink(text) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
}

if (btnLimpiar) {
  btnLimpiar.addEventListener("click", () => {
    formAgenda?.reset();
  });
}

if (formAgenda) {
  formAgenda.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value?.trim() || "";
    const contacto = document.getElementById("contactoInput")?.value?.trim() || "";
    const area = document.getElementById("area")?.value || "";
    const modalidad = document.getElementById("modalidad")?.value || "";
    const mensaje = document.getElementById("mensaje")?.value?.trim() || "";

    const txt =
      `Hola! Soy ${nombre}.\n` +
      `Contacto: ${contacto}\n` +
      `Área: ${area}\n` +
      `Modalidad: ${modalidad}\n\n` +
      `Mensaje:\n${mensaje}`;

    window.open(waLink(txt), "_blank");
  });
}

// ====== FITNESS TABS (FIX) ======
const fitTabButtons = document.querySelectorAll(".fit-tab-btn");
const fitTabContents = document.querySelectorAll(".fit-tab-content");

fitTabButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // ✅ evita comportamientos raros
    const id = btn.dataset.fit;
    if (!id) return;

    fitTabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    fitTabContents.forEach(c => c.classList.toggle("active", c.id === id));

    setupReveal();
  });
});
// ====== NUTRICIÓN TABS ======
const nutriTabButtons = document.querySelectorAll(".nutri-tab-btn");
const nutriTabContents = document.querySelectorAll(".nutri-tab-content");

nutriTabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.nutri;

    nutriTabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    nutriTabContents.forEach(c => c.classList.toggle("active", c.id === id));

    // recalculamos reveal por cambio de altura
    setupReveal();
  });
});
