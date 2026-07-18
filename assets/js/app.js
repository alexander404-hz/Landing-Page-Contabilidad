// ----------------------------------------------------------------------------
// Animacion de seccion
// ----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  // Activa la sección cuando está en el centro de la pantalla
  const observerOptions = {
    root: null,
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idSection = entry.target.getAttribute("id");

        // Quitamos '.current' de todos tus enlaces
        navLinks.forEach((link) => link.classList.remove("current"));

        // Se lo agregamos al enlace que coincide con la sección visible
        const activeLink = document.querySelector(
          `header nav a[href="#${idSection}"]`,
        );
        if (activeLink) activeLink.classList.add("current");
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});

// ----------------------------------------------------------------------------
// Efecto Active
// ----------------------------------------------------------------------------

const link = document.querySelector("#hero a");

link?.addEventListener("click", function (e) {
  if (this.classList.contains("is-leaving")) return; // evita doble click
  e.preventDefault();
  const href = this.href;
  this.classList.add("is-leaving");
  window.location.href = href;
});
