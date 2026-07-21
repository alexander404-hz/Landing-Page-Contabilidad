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

  // === 2. EFECTO ACTIVE EN EL CTA DEL HERO ===
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

// === 3. ANIMACIÓN DE ENTRADA Y CONTADOR EN BENEFICIOS ===
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
  },
  { threshold: 0.15 },
); // Se activa cuando asoma el 15% de la tarjeta

statItems.forEach((item) => statsObserver.observe(item));

// === 4. ANIMACIÓN DE ENTRADA PARA BENTO ===
const seccionBento = document.querySelector(".bento-grid");

if (seccionBento) {
  const bentoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Dispara la cascada masiva de los .bento-item
          entry.target.classList.add("visible");
          // Dejamos de observar
          bentoObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  bentoObserver.observe(seccionBento);
}

// === 5. ANIMACIÓN DE ENTRADA PARA SERVICIOS ===
const filasServicios = document.querySelectorAll(".servicio-fila");

console.log(filasServicios);

if (filasServicios.length > 0) {
  const filaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Le pega la clase SOLO a la tarjeta que se está asomando
          entry.target.classList.add("visible");

          filaObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  filasServicios.forEach((fila) => filaObserver.observe(fila));
}

// === 6. ANIMACIÓN DE ENTRADA EN BANNER ===
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
  );

  bannerObserver.observe(bannerVisual);
}

// === 7. ANIMACIÓN DE ENTRADA PARA LA LINEA DE TIEMPO (PROCESO) ===
const seccionProceso = document.querySelector("#proceso");

if (seccionProceso) {
  const procesoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
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

// === 8. ANIMACIÓN DE ENTRADA PARA TESTIMONIOS ===
const seccionTestimonios = document.querySelector("#testimonios");

if (seccionTestimonios) {
  const testimoniosObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          testimoniosObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  testimoniosObserver.observe(seccionTestimonios);
}

// === 9. CARRUSEL DE TESTIMONIOS ===
const carrusel = document.querySelector(".testimonios-carrusel");

if (carrusel) {
  const track = carrusel.querySelector(".testimonios-track");
  const btnPrev = carrusel.querySelector(".testimonios-flecha--prev");
  const btnNext = carrusel.querySelector(".testimonios-flecha--next");
  const dots = Array.from(carrusel.querySelectorAll(".testimonios-dot"));

  // Slides reales, tal como están en el HTML
  const slidesReales = Array.from(
    carrusel.querySelectorAll(".testimonio-slide"),
  );
  const totalReal = slidesReales.length;

  // Carrusel infinito
  const cloneUltimo = slidesReales[totalReal - 1].cloneNode(true);
  const clonePrimero = slidesReales[0].cloneNode(true);
  cloneUltimo.setAttribute("aria-hidden", "true");
  clonePrimero.setAttribute("aria-hidden", "true");

  track.insertBefore(cloneUltimo, slidesReales[0]);
  track.appendChild(clonePrimero);

  // El track ahora contiene: [clon-último, real-0, real-1, real-2, clon-primero]
  const totalExtendido = totalReal + 2;

  // indiceActual se mueve sobre ese arreglo extendido; arrancamos en 1,
  // que corresponde al slide real 0.
  let indiceActual = 1;
  const INTERVALO_MS = 6000;
  let autoplayId = null;

  // Traduce un índice del arreglo extendido al índice real (para los puntos)
  const indiceReal = (indiceExtendido) => {
    if (indiceExtendido === 0) return totalReal - 1;
    if (indiceExtendido === totalExtendido - 1) return 0;
    return indiceExtendido - 1;
  };

  const actualizarDots = (indiceExtendido) => {
    const activo = indiceReal(indiceExtendido);
    dots.forEach((dot, i) => {
      const esActivo = i === activo;
      dot.classList.toggle("is-active", esActivo);
      dot.setAttribute("aria-selected", esActivo ? "true" : "false");
    });
  };

  const irASlide = (indice, { animar = true } = {}) => {
    indiceActual = indice;

    if (!animar) track.style.transition = "none";
    track.style.transform = `translateX(-${indiceActual * 100}%)`;
    if (!animar) {
      // Forzamos reflow para que el salto sea instantáneo y luego
      // restauramos la transición para el próximo movimiento normal
      void track.offsetHeight;
      track.style.transition = "";
    }

    actualizarDots(indiceActual);
  };

  // Al terminar la animación, si quedamos sobre uno de los clones,
  // saltamos sin transición al slide real equivalente.
  track.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;

    if (indiceActual === 0) {
      irASlide(totalReal, { animar: false });
    } else if (indiceActual === totalExtendido - 1) {
      irASlide(1, { animar: false });
    }
  });

  // Los puntos siempre representan un slide real (0, 1, 2...)
  const irASlideReal = (indiceRealDestino) => {
    irASlide(indiceRealDestino + 1);
  };

  const iniciarAutoplay = () => {
    detenerAutoplay();
    autoplayId = setInterval(() => irASlide(indiceActual + 1), INTERVALO_MS);
  };

  const detenerAutoplay = () => {
    if (autoplayId) clearInterval(autoplayId);
  };

  // Flechas
  btnNext?.addEventListener("click", () => {
    irASlide(indiceActual + 1);
    iniciarAutoplay(); // Reinicia el conteo tras interacción manual
  });

  btnPrev?.addEventListener("click", () => {
    irASlide(indiceActual - 1);
    iniciarAutoplay();
  });

  // Puntos indicadores
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      irASlideReal(i);
      iniciarAutoplay();
    });
  });

  // Pausa el autoplay al pasar el mouse o al enfocar con teclado
  carrusel.addEventListener("mouseenter", detenerAutoplay);
  carrusel.addEventListener("mouseleave", iniciarAutoplay);
  carrusel.addEventListener("focusin", detenerAutoplay);
  carrusel.addEventListener("focusout", iniciarAutoplay);

  // Arrastre con mouse y touch (unificado con Pointer Events)
  const viewport = carrusel.querySelector(".testimonios-viewport");
  const UMBRAL_ARRASTRE = 50; // px mínimos para considerar cambio de slide

  let arrastrando = false;
  let xInicial = 0;
  let deltaActual = 0;

  const anchoViewport = () => viewport.offsetWidth;

  const iniciarArrastre = (clientX) => {
    arrastrando = true;
    xInicial = clientX;
    deltaActual = 0;
    track.classList.add("is-arrastrando");
    track.style.transition = "none"; // Sigue al dedo/cursor sin animación de por medio
    detenerAutoplay();
  };

  const moverArrastre = (clientX) => {
    if (!arrastrando) return;
    deltaActual = clientX - xInicial;
    const porcentajeBase = indiceActual * 100;
    track.style.transform = `translateX(calc(-${porcentajeBase}% + ${deltaActual}px))`;
  };

  const finalizarArrastre = () => {
    if (!arrastrando) return;
    arrastrando = false;
    track.classList.remove("is-arrastrando");
    track.style.transition = ""; // Restaura la transición suave definida en CSS

    if (Math.abs(deltaActual) > UMBRAL_ARRASTRE) {
      deltaActual < 0 ? irASlide(indiceActual + 1) : irASlide(indiceActual - 1);
    } else {
      irASlide(indiceActual); // Vuelve a acomodar el slide si el arrastre fue muy corto
    }

    iniciarAutoplay();
  };

  // Mouse y touch comparten la misma lógica gracias a Pointer Events
  track.addEventListener("pointerdown", (e) => {
    // Solo botón izquierdo en mouse; siempre permitido en touch/pen
    if (e.pointerType === "mouse" && e.button !== 0) return;
    iniciarArrastre(e.clientX);
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener("pointermove", (e) => {
    moverArrastre(e.clientX);
  });

  track.addEventListener("pointerup", finalizarArrastre);
  track.addEventListener("pointercancel", finalizarArrastre);

  // Evita que el navegador intente "arrastrar" la imagen/texto como si fuera un elemento suelto
  track.addEventListener("dragstart", (e) => e.preventDefault());

  // Posición inicial sin animación (ya arranca mostrando el slide real 0)
  irASlide(1, { animar: false });
  iniciarAutoplay();
}

// === 10. ANIMACION DE ENTRADA SOBRE NOSOTROS ===

const seccionNosotros = document.querySelector("#nosotros");

if (seccionNosotros) {
  const nosotrosObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Dispara las tres animaciones simultáneamente con sus respectivos delays en CSS
          entry.target.classList.add("visible");
          nosotrosObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  nosotrosObserver.observe(seccionNosotros);
}

// === 10. ANIMACION DE ENTRADA FAQ ===
const seccionFAQ = document.querySelector("#faq");

if (seccionFAQ) {
  const faqObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          faqObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  faqObserver.observe(seccionFAQ);
}

// === 11. ACORDEÓN FAQ CON ANIMACIÓN SUAVE DE APERTURA/CIERRE ===
// Anima la altura del <details> con la Web Animations API en lugar de
// dejar que el navegador lo abra/cierre de golpe.
class FAQAcordeon {
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector("summary");
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.DURACION = 350;
    this.EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

    this.summary.addEventListener("click", (e) => this.alClickear(e));
  }

  alClickear(e) {
    e.preventDefault();
    this.el.style.overflow = "hidden";

    if (this.isClosing || !this.el.open) {
      this.abrir();
    } else if (this.isExpanding || this.el.open) {
      this.cerrar();
    }
  }

  cerrar() {
    this.isClosing = true;

    const alturaInicial = `${this.el.offsetHeight}px`;
    const alturaFinal = `${this.summary.offsetHeight}px`;

    if (this.animation) this.animation.cancel();

    this.animation = this.el.animate(
      { height: [alturaInicial, alturaFinal] },
      { duration: this.DURACION, easing: this.EASING },
    );

    this.animation.onfinish = () => this.alTerminar(false);
    this.animation.oncancel = () => (this.isClosing = false);
  }

  abrir() {
    // Fijamos la altura actual (colapsada) antes de revelar el contenido
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expandir());
  }

  expandir() {
    this.isExpanding = true;

    const alturaInicial = `${this.el.offsetHeight}px`;
    const alturaFinal = `${this.el.scrollHeight}px`;

    if (this.animation) this.animation.cancel();

    this.animation = this.el.animate(
      { height: [alturaInicial, alturaFinal] },
      { duration: this.DURACION, easing: this.EASING },
    );

    this.animation.onfinish = () => this.alTerminar(true);
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  alTerminar(abierto) {
    this.el.open = abierto;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = "";
    this.el.style.overflow = "";
  }
}

document.querySelectorAll("#faq details").forEach((el) => new FAQAcordeon(el));

// === 12. ANIMACION DE ENTRADA CONTACTO ===
const seccionContacto = document.querySelector("#contacto");

if (seccionContacto) {
  const contactoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          contactoObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  contactoObserver.observe(seccionContacto);
}

// === 13. ANIMACION DE ENTRADA FOOTER ===
const footer = document.querySelector("footer");

if (footer) {
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          footerObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px",
    },
  );

  footerObserver.observe(footer);
}
