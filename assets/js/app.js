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

        const activeLink = document.querySelector(
          `header nav a[href="#${idSection}"]`,
        );
        if (activeLink) activeLink.classList.add("current");
      }
    });
  }, navObserverOptions);

  sections.forEach((section) => navObserver.observe(section));

  // === 2. ANIMACIÓN DE ENTRADA Y CONTADOR EN BENEFICIOS ===
  const statItems = document.querySelectorAll(".beneficios-stats .stat-item");

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // A) Activamos la animación de CSS (Fade-in + Desplazamiento)
          entry.target.classList.add("visible");

          // B) Disparamos el contador numérico
          const numeroElemento = entry.target.querySelector(".stat-numero");
          if (numeroElemento) {
            const valorObjetivo = parseInt(
              numeroElemento.getAttribute("data-target"),
            );
            let valorActual = 0;

            const incremento = Math.max(valorObjetivo / 120, 0.1);

            const actualizarContador = () => {
              valorActual += incremento;

              if (valorActual < valorObjetivo) {
                // Modificamos solo el primer nodo de texto (el '0') para no borrar el <span> del '+' o '%'
                numeroElemento.childNodes[0].textContent =
                  Math.ceil(valorActual);
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
    },
    { threshold: 0.15 },
  ); // Se activa cuando asoma el 15% de la tarjeta

  statItems.forEach((item) => statsObserver.observe(item));

  // === 3. ANIMACIÓN DE ENTRADA PARA BENTO ===
const seccionBento = document.querySelector(".bento-grid");

if (seccionBento) {
  const bentoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Dispara la cascada masiva de los .bento-item
        entry.target.classList.add("visible");
        // Dejamos de observar
        bentoObserver.unobserve(entry.target);
      }
    });
  }, {
    // Se activa cuando asoma el 15% del contenedor del bento
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  bentoObserver.observe(seccionBento);
}


  // === 4. ANIMACIÓN DE ENTRADA PARA SERVICIOS ===
const filasServicios = document.querySelectorAll(".servicio-fila");

console.log(filasServicios);


if (filasServicios.length > 0) {
  const filaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Le pega la clase SOLO a la tarjeta que se está asomando
        entry.target.classList.add("visible");
        
        // Dejamos de observarla individualmente para liberar memoria
        filaObserver.unobserve(entry.target);
      }
    });
  }, {
    // Se activa cuando asoma el 15% de esa fila en específico
    threshold: 0.15,
    // El margen inferior asegura que se active un poquito antes de golpear el borde de la pantalla
    rootMargin: "0px 0px -60px 0px"
  });

  // Le decimos al observador que vigile cada una de las 5 filas por separado
  filasServicios.forEach(fila => filaObserver.observe(fila));
}

  // === 5. ANIMACIÓN DE ENTRADA EN BANNER ===
  const bannerVisual = document.querySelector("#banner-visual");
  if (bannerVisual) {
    const bannerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            bannerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    ); // Se activa cuando asoma el 20% del banner

    bannerObserver.observe(bannerVisual);
  }

  // === 6. ANIMACIÓN DE ENTRADA PARA LA LINEA DE TIEMPO (PROCESO) ===
  const seccionProceso = document.querySelector("#proceso");

  if (seccionProceso) {
    const procesoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Le añadimos la clase que dispara el CSS transition
            entry.target.classList.add("visible");

            procesoObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    procesoObserver.observe(seccionProceso);
  }

  // === 7. EFECTO ACTIVE EN EL CTA DEL HERO ===
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
