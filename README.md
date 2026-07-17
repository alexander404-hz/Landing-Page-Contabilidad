# Despacho Contable Florez Hernández — Landing Page

Landing page corporativa construida con **HTML5** y **CSS3** para un despacho contable con 23 años de experiencia en El Salvador. El sitio está diseñado para captar clientes potenciales, comunicar los servicios ofrecidos y facilitar el contacto directo vía WhatsApp, correo y formulario.

🔗 **Sitio en producción:** [despachoflorez.com.sv](https://despachoflorez.com.sv)

[![Vista previa](assets/img/readme.png)](https://despachoflorez.com.sv)

## ✨ Características

- **Hero section** con propuesta de valor, llamado a la acción y enlace directo a WhatsApp con mensaje predefinido.
- **Sección de beneficios** con estadísticas destacadas (años de experiencia, clientes, sectores atendidos, cero multas) y un _bento grid_ de tarjetas con íconos SVG.
- **Catálogo de servicios contables** organizado en 5 bloques: cumplimiento fiscal, contabilidad mensual, informes y análisis, gestión legal contable, y constitución/trámites.
- **Sección de proceso de trabajo** explicando en pasos numerados cómo se gestiona la relación con el cliente.
- **Testimonios** de clientes.
- **Sección "Nosotros"** con credenciales profesionales: registro CVPCPA, fe pública para dictámenes fiscales y acreditación internacional FIBA.
- **Preguntas frecuentes (FAQ)** en formato acordeón (`<details>`/`<summary>`) sobre IVA, obligaciones fiscales, auditorías y regularización.
- **Formulario de contacto** funcional integrado con [Formspree](https://formspree.io/), con validación nativa HTML5 (`pattern`, `required`, `autocomplete`).
- **Botón flotante de WhatsApp** siempre visible para contacto inmediato.
- **Datos estructurados (Schema.org / JSON-LD)** tipo `AccountingService` para mejorar el posicionamiento SEO y la presentación en resultados de búsqueda de Google.
- **Metadatos SEO y redes sociales**: Open Graph y Twitter Cards configurados para una correcta previsualización al compartir el enlace.
- **Accesibilidad**: uso extensivo de `aria-label`, `aria-labelledby`, `role="img"` en elementos decorativos y estructura semántica (`section`, `address`, `figure`, `time`).
- **Dominio personalizado** configurado mediante archivo `CNAME` para GitHub Pages.

## 📁 Estructura del proyecto

```
Landing-Page-Contabilidad/
├── assets/
│   ├── css/
│   │   └── styles.css        # Estilos del sitio
│   ├── icons/                # Favicons e íconos (svg, png, apple-touch-icon)
│   └── img/                  # Logo, imágenes de fondo y preview para Open Graph
├── CNAME                     # Dominio personalizado (despachoflorez.com.sv)
├── favicon.ico                # Favicon principal
├── index.html                 # Página principal (landing completa)
└── site.webmanifest           # Manifiesto web (PWA / íconos)
```

## 🧩 Secciones de la página

| Sección           | Contenido                                                            |
| ----------------- | -------------------------------------------------------------------- |
| **Hero**          | Propuesta de valor principal y CTA a WhatsApp                        |
| **Beneficios**    | Estadísticas de la firma y bento grid de diferenciadores             |
| **Servicios**     | 5 categorías de servicios contables detallados                       |
| **Banner visual** | Frase destacada de la marca                                          |
| **Proceso**       | 4 pasos de cómo trabaja el despacho                                  |
| **Testimonios**   | Opinión de clientes                                                  |
| **Nosotros**      | Historia de la firma y credenciales (CVPCPA, FIBA)                   |
| **FAQ**           | 7 preguntas frecuentes sobre contabilidad e impuestos en El Salvador |
| **Contacto**      | Datos de contacto (correo, WhatsApp) y formulario funcional          |

## 🚀 Uso

Este proyecto no requiere instalación ni dependencias. Solo necesitas un navegador web.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/alexander404-hz/Landing-Page-Contabilidad.git
   ```
2. Entra a la carpeta del proyecto:
   ```bash
   cd Landing-Page-Contabilidad
   ```
3. Abre `index.html` directamente en tu navegador, o sirve el proyecto con un servidor local (por ejemplo, la extensión _Live Server_ de VS Code).

> **Nota:** el formulario de contacto envía los datos a un endpoint de Formspree ya configurado para este proyecto. Si reutilizas el código, deberás reemplazarlo por tu propio endpoint.

## 🛠️ Tecnologías utilizadas

- HTML5 (estructura semántica, `<details>`, datos estructurados JSON-LD)
- CSS3
- [Formspree](https://formspree.io/) — manejo del formulario de contacto sin backend propio
- GitHub Pages con dominio personalizado (`CNAME`)

## 👤 Desarrollado por

**Alexander Hernández**
Portafolio: [alexander404-hz.github.io/Portafolio](https://alexander404-hz.github.io/Portafolio/)

## 📄 Licencia

© 2026 Despacho Contable Florez Hernández. Todos los derechos reservados.
