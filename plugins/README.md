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
| `liqueed-explorar` | Página **Explorar fichas** (`/explorar`): lista completa de fichas con filtros por tipo de recurso, idioma, tema y concepto (tag), búsqueda por texto y URL compartible (`?tipo=&idioma=&tema=&tag=&q=`). Atajo "Combiná … en Explorar" en las páginas de tema y de tag. Además, el **JSON-LD** (schema.org) de cada página. | `/explorar`, debajo del contenido de temas y tags, y `<script type="application/ld+json">` en todas las páginas. |
| `liqueed-site` | Footer de Liqueed; `<link rel=canonical>` y `<link rel=alternate>` al RSS en cada página; pesos extra de Poppins; eventos de analytics de los CTAs; genera `llms.txt`, `llms-full.txt` e `index.xml` (RSS solo con fichas). | Footer, `<head>` y archivos en la raíz del sitio. |

## Explorar y facetas

- La página la genera `scripts/publicar.py` (`content/explorar.md`, solo título e intro); la lista y los filtros los pone `liqueed-explorar` en el build, con los datos del frontmatter de las fichas publicadas.
- Facetas: `tipo`, `idioma`, `temas` (por el `slug` de cada tema) y `tags`. Las etiquetas en español de tipos e idiomas están en `liqueed-explorar/dist/modelo.js` (`TIPO_LABEL`, `IDIOMA_LABEL`); si se suma un tipo nuevo, agregalo ahí (y en `TIPO_SCHEMA` para el JSON-LD).
- Sin JS: el HTML trae todas las fichas y los `<select>` filtran solos con CSS (`:has`). Con JS (`dist/cliente.js`) se suman la búsqueda, los conteos por opción, la URL con query string y el evento de analytics. Se reinicializa en cada navegación SPA (evento `nav`).
- `publicar.py` avisa ("aviso de facetas: …") si una fuente tiene un tipo, idioma, tema o tag fuera del vocabulario.
- `llms.txt` lista las facetas con sus valores, conteos y URLs; `llms-full.txt` las menciona. Comparten el modelo con `liqueed-site` (que importa `../../liqueed-explorar/dist/modelo.js`).

## JSON-LD (schema.org)

Va en un `<script type="application/ld+json">` dentro del cuerpo (los componentes ven todas las páginas; el `<head>` no). Siempre incluye `Organization` (Liqueed, https://liqueed.org) y `WebSite` (con `SearchAction` a `/explorar?q=`).

- **Ficha**: `WebPage` (resumen de Liqueed: `description` = "En una línea", `keywords` = tags, `dateCreated` = `guardado`, `isPartOf` = sitio y temas, `about`/`mainEntity`/`isBasedOn` = la fuente, `publisher` = Liqueed) + la fuente original con su tipo (`Article`, `SocialMediaPosting`, `VideoObject`, `Course`, …), `url`, `name`, `author` (texto: el frontmatter no dice si es persona u organización), `inLanguage` = `idioma` y `datePublished` = `publicado` cuando hay fecha.
- **Tema, tag, carpeta y /explorar**: `CollectionPage` con un `ItemList` de sus fichas. La descripción de cada tag sale de `tags.md`.
- **Home**: `WebSite` + `Organization`.

## Eventos de analytics

`liqueed-site` empuja eventos al `dataLayer` (GA4/GTM). Si analytics está apagado no pasa nada.

- `cta_click` con `cta_id` (por ejemplo `servicios_ia`, `hero_servicios_ia`, `agenda`, `footer_contacto`), `link_url` y `page_path`: en cualquier link con `data-cta`.
- `generate_lead` con `method: "newsletter"`, `cta_id` y `page_path`: al enviar el form del newsletter. El embed de Kit inserta un `<form class="formkit-form">` en la página (no un iframe), así que se escucha su `submit`. Mide el intento de suscripción, no la confirmación de Kit.

- `filter_use` con `facet` (`tipo`, `idioma`, `tema`, `tag`, `q` o `reset`), `value`, `results` (fichas que quedan) y `page_path`: al cambiar un filtro en `/explorar` (la búsqueda por texto, 0,9 s después de dejar de escribir).

El embed de Kit se reinicializa solo cuando se navega sin recargar (SPA de Quartz).

Los estilos de los cinco plugins están en `quartz/styles/custom.scss` (fuera de las capas CSS de Quartz).

Para trackear un link nuevo, agregale `data-cta="<id>"`.
