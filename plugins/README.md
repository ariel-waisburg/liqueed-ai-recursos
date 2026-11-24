# Plugins locales de Liqueed

Plugins de Quartz propios del sitio. Son JavaScript plano (ESM, sin paso de build): se editan
directo en `dist/` y Quartz los enlaza solo al compilar (`source: ./plugins/<nombre>` en
`quartz.config.yaml`). Las URLs y textos se configuran en `quartz.config.yaml`, en las
`options` de cada plugin.

| Plugin | Qué hace | Dónde aparece |
|---|---|---|
| `liqueed-brand` | Logo de Liqueed (ojo; versión blanca en modo oscuro) con link a liqueed.org. | Barra lateral, arriba del título. |
| `liqueed-hero` | Hero de la home: propuesta de valor, números (fuentes, temas, última actualización, calculados en el build) y botones a los temas y a servicios de IA. | Solo en la home, arriba del contenido. |
| `liqueed-cta` | Bloque "¿Querés aplicar esto en tu organización?": servicios de IA (servicios.liqueed.org/ia), agenda y newsletter (embed oficial de Kit). | Debajo del contenido de cada página. |
| `liqueed-site` | Footer de Liqueed; `<link rel=canonical>` y `<link rel=alternate>` al RSS en cada página; pesos extra de Poppins; eventos de analytics de los CTAs; genera `llms.txt`, `llms-full.txt` e `index.xml` (RSS solo con fichas). | Footer, `<head>` y archivos en la raíz del sitio. |

## Eventos de analytics

`liqueed-site` empuja eventos al `dataLayer` (GA4/GTM). Si analytics está apagado no pasa nada.

- `cta_click` con `cta_id` (por ejemplo `servicios_ia`, `hero_servicios_ia`, `agenda`, `footer_contacto`), `link_url` y `page_path`: en cualquier link con `data-cta`.
- `generate_lead` con `method: "newsletter"`, `cta_id` y `page_path`: al enviar el form del newsletter. El embed de Kit inserta un `<form class="formkit-form">` en la página (no un iframe), así que se escucha su `submit`. Mide el intento de suscripción, no la confirmación de Kit.

El embed de Kit se reinicializa solo cuando se navega sin recargar (SPA de Quartz).

Los estilos de los cuatro plugins están en `quartz/styles/custom.scss` (fuera de las capas CSS de Quartz).

Para trackear un link nuevo, agregale `data-cta="<id>"`.
