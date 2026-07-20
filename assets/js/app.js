// ----------------------------------------------------------------------------
// Inicialización unificada de la Landing Page
// ----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  
  // === 1. ANIMACIÓN DE SECCIÓN EN EL NAV ===
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  const navObserverOptions = {
    root: null,
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idSection = entry.target.getAttribute("id");

        navLinks.forEach((link) => link.classList.remove("current"));

        const activeLink = document.querySelector(`header nav a[href="#${idSection}"]`);
        if (activeLink) activeLink.classList.add("current");
      }
    });
  }, navObserverOptions);

  sections.forEach((section) => navObserver.observe(section));


  // === 2. ANIMACIÓN DE ENTRADA Y CONTADOR EN BENEFICIOS ===
  const statItems = document.querySelectorAll(".beneficios-stats .stat-item");

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // A) Activamos la animación de CSS (Fade-in + Desplazamiento)
        entry.target.classList.add("visible");
        
        // B) Disparamos el contador numérico
        const numeroElemento = entry.target.querySelector('.stat-numero');
        if (numeroElemento) {
          const valorObjetivo = parseInt(numeroElemento.getAttribute('data-target'));
          let valorActual = 0;
          
          // Dividimos el total entre 40 para que la animación dure aproximadamente 40 cuadros (~0.6s)
          // Usamos Math.max(..., 1) para asegurar que números pequeños como "15" no sumen 0
          const incremento = Math.max(valorObjetivo / 120, 0.1); 
          
          const actualizarContador = () => {
            valorActual += incremento;
            
            if (valorActual < valorObjetivo) {
              // Modificamos solo el primer nodo de texto (el '0') para no borrar el <span> del '+' o '%'
              numeroElemento.childNodes[0].textContent = Math.ceil(valorActual);
              requestAnimationFrame(actualizarContador);
            } else {
              numeroElemento.childNodes[0].textContent = valorObjetivo;
            }
          };
          
          actualizarContador();
        }

        // Dejamos de observar este elemento para que el contador solo corra una vez
        statsObserver.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.15 }); // Se activa cuando asoma el 15% de la tarjeta

  statItems.forEach((item) => statsObserver.observe(item));


  // === 3. EFECTO ACTIVE EN EL CTA DEL HERO ===
  const link = document.querySelector("#hero a");

  link?.addEventListener("click", function (e) {
    if (this.classList.contains("is-leaving")) return; 
    e.preventDefault();

    const href = this.href;
    this.classList.add("is-leaving");

    setTimeout(() => {
      window.open(href, "_blank", "noopener,noreferrer");
    }, 300);

    setTimeout(() => {
      this.classList.remove("is-leaving");
    }, 300);
  });

});