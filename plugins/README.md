# Plugins locales de liqueed

> **Reglas de marca**
> - La tipografía **IBM Plex Mono no se usa en ningún lado del sitio** (ni se carga). Títulos en Poppins 800, texto en Public Sans, etiquetas en Public Sans (mayúsculas con tracking, semibold: `var(--lq-label-font)`, nunca `var(--codeFont)`). Los bloques de código usan la monoespaciada del sistema.
> - **"liqueed" va siempre en minúscula** en todo texto visible y en metadatos (títulos, alt de imágenes, llms.txt, RSS, JSON-LD). Los nombres de componentes en código (`LiqueedCta`, etc.) no son texto visible.

Plugins de Quartz propios del sitio. Son JavaScript plano (ESM, sin paso de build): se editan
directo en `dist/` y Quartz los enlaza solo al compilar (`source: ./plugins/<nombre>` en
`quartz.config.yaml`). Las URLs y textos se configuran en `quartz.config.yaml`, en las
`options` de cada plugin.

| Plugin | Qué hace | Dónde aparece |
|---|---|---|
| `liqueed-brand` | Logo de liqueed (ojo; versión blanca en modo oscuro) con link a liqueed.org. | Barra lateral, arriba del título. |
| `liqueed-hero` | Hero de la home: propuesta de valor, números (fuentes, temas, última actualización, calculados en el build), "¿Por dónde empiezo?" con links a Lecturas rápidas y Recorridos recomendados, y botones a los temas, a Explorar, al mapa de conexiones y a servicios de IA. | Solo en la home, arriba del contenido. |
| `liqueed-cta` | Bloque "¿Querés aplicar esto en tu organización?": servicios de IA (servicios.liqueed.org/ia), agenda y newsletter (embed oficial de Kit). | Debajo del contenido de cada página, menos en los slugs de `hideOn` (`lecturas-rapidas` y `recorridos-recomendados`, donde va el CTA de la opción A). |
| `liqueed-explorar` | Página **Explorar fichas** (`/explorar`): lista completa de fichas con filtros por tipo de recurso, idioma, tema y concepto (tag), búsqueda por texto y URL compartible (`?tipo=&idioma=&tema=&tag=&q=`). Atajo "Combiná … en Explorar" en las páginas de tema y de tag. **Mapa de conexiones** (`/mapa` y la Vista Gráfica global): links "Ver … en el mapa de conexiones" que la abren en el lugar. **Lecturas rápidas** (`/lecturas-rapidas`) y **Recorridos recomendados** (`/recorridos-recomendados`) desde `curaduria/lecturas.yaml`. Minutos de lectura en fichas y en `/explorar`. Además, el **JSON-LD** (schema.org) de cada página. | `/explorar`, debajo del contenido de temas y tags, y `<script type="application/ld+json">` en todas las páginas. |
| `liqueed-site` | Footer de liqueed; `<link rel=canonical>` y `<link rel=alternate>` al RSS en cada página; pesos 600 y 800 de Poppins para botones y títulos; eventos de analytics de los CTAs; genera `llms.txt` (con una sección de lecturas rápidas y recorridos), `llms-full.txt`, `index.xml` (RSS solo con fichas) y `recorridos.json`. | Footer, `<head>` y archivos en la raíz del sitio. |

## Mapa de conexiones (Vista Gráfica)

- Es la Vista Gráfica global de `@quartz-community/graph`. `liqueed-explorar/dist/mapa.js` la hace visible: botón "Ver mapa de conexiones" debajo del mini-grafo, botón en el hero de la home, link "Ver esta ficha / este tema en el mapa de conexiones" en fichas y temas, y la página `/mapa` (la genera `publicar.py`; aparece en el menú lateral) que lo abre sola a pantalla completa. Sin JS, los links llevan a `/mapa`.
- Abierto: barra con título, ayuda y botón Cerrar (también Esc o tocar afuera), foco al botón y de vuelta al link. Va por encima de todo y bloquea el scroll de fondo (`quartz/styles/custom.scss`, sección "Mapa de conexiones"): el plugin le pone `z-index: 1` a su barra lateral y eso lo dejaba debajo de la barra de filtros.
- GA4: evento `graph_open` con `origen` (`home`, `ficha`, `tema`, `mini-grafo`, `pagina-mapa`, `icono`, `atajo`) y `page_path`.

## Explorar y facetas

- La página la genera `scripts/publicar.py` (`content/explorar.md`, solo título e intro); la lista y los filtros los pone `liqueed-explorar` en el build, con los datos del frontmatter de las fichas publicadas.
- Facetas: `tipo`, `idioma`, `temas` (por el `slug` de cada tema) y `tags`. Las etiquetas en español de los tipos están en `liqueed-explorar/dist/modelo.js` (`TIPO_LABEL`; si se suma un tipo nuevo, agregalo ahí y en `TIPO_SCHEMA` para el JSON-LD). Los idiomas aceptan cualquier código ISO 639-1: el nombre en español sale de `.claude/skills/sumar-fuente/idiomas.md`, la misma tabla con la que valida `publicar.py`.
- Sin JS: el HTML trae todas las fichas y los `<select>` filtran solos con CSS (`:has`). Con JS (`dist/cliente.js`) se suman la búsqueda, los conteos por opción, la URL con query string y el evento de analytics. Se reinicializa en cada navegación SPA (evento `nav`).
- Barra de filtros: los campos crecen y bajan de fila según el valor más largo de cada faceta (`flex-basis: auto`), así el valor elegido nunca queda recortado. La opción elegida se muestra sin conteo y debajo van chips con los filtros activos (se quitan con un toque). La barra no es sticky: con varias filas taparía media pantalla.
- `publicar.py` avisa ("aviso de facetas: …") si una fuente tiene un tipo, idioma, tema o tag fuera del vocabulario.
- `llms.txt` lista las facetas con sus valores, conteos y URLs; `llms-full.txt` las menciona. Comparten el modelo con `liqueed-site` (que importa `../../liqueed-explorar/dist/modelo.js`).

## Lecturas rápidas y recorridos recomendados

- Datos: `curaduria/lecturas.yaml` (reglas en `curaduria/rubrica.md`, sección 4). Cada ítem apunta a una ficha por el nombre del archivo, sin `.md`. Las páginas las genera `publicar.py` (solo título e intro) y el contenido lo pone `liqueed-explorar/dist/lecturas.js`.
- Minutos: los de la fuente salen de `minutos` y `minutos_origen` del frontmatter ("(estimado)" cuando corresponde); los de la ficha se calculan sobre lo publicado (palabras / 200, mínimo 1, `modelo.js` `minutosLectura`).
- El build avisa (`[liqueed-explorar] curaduria/lecturas.yaml: …`) si una ficha no existe o no se publica, si un paquete se pasa de su tiempo, si hay más de 5 lecturas rápidas o un paquete fuera de 3 a 5 lecturas.
- Sin JS: todo está en el HTML y los filtros de perfil y tema (dos `<select>` con el mismo estilo) funcionan con CSS (`:has`). Con JS (`dist/lecturas-cliente.js`): URL compartible `?perfil=&tema=`, estado vacío, avance de cada recorrido en `localStorage` (`lq-recorrido:<id>`) y "Compartir con mi equipo" (`navigator.share`; si no hay, copia el link; sin JS es un `mailto:`). El link compartido lleva `utm_source=recursos-ai&utm_medium=compartir`.
- Lead (opción A): cierre liviano "Para equipos" con "Agendá una conversación" + "Compartir con mi equipo", sin caja de email; cada paquete y recorrido tiene un link "Compartir con mi equipo".
- Estilo minimalista (pedido de Ari, 25/11/2026): sin tarjetas con borde, separadores finos, radios suaves. Textos cortos y verificables (reglas en `curaduria/rubrica.md`).

## JSON-LD (schema.org)

Va en un `<script type="application/ld+json">` dentro del cuerpo (los componentes ven todas las páginas; el `<head>` no). Siempre incluye `Organization` (liqueed, https://liqueed.org) y `WebSite` (con `SearchAction` a `/explorar?q=`).

- **Ficha**: `WebPage` (resumen de liqueed: `description` = "En una línea", `keywords` = tags, `dateCreated` = `guardado`, `isPartOf` = sitio y temas, `about`/`mainEntity`/`isBasedOn` = la fuente, `publisher` = liqueed) + la fuente original con su tipo (`Article`, `SocialMediaPosting`, `VideoObject`, `Course`, …), `url`, `name`, `author` (texto: el frontmatter no dice si es persona u organización), `inLanguage` = `idioma` (cualquier código ISO 639-1) y `datePublished` = `publicado` cuando hay fecha. En videos y cursos, además: `thumbnailUrl` (video) o `image` (curso) desde `miniatura`, `uploadDate` (video) desde `publicado` y `provider` (curso, como `Organization`) desde `proveedor`.
- **Tema, tag, carpeta y /explorar**: `CollectionPage` con un `ItemList` de sus fichas. La descripción de cada tag sale de `tags.md`.
- **Home**: `WebSite` + `Organization`.

## Eventos de analytics

`liqueed-site` empuja eventos al `dataLayer` (GA4/GTM). Si analytics está apagado no pasa nada.

- `cta_click` con `cta_id` (por ejemplo `servicios_ia`, `hero_servicios_ia`, `agenda`, `footer_contacto`), `link_url` y `page_path`: en cualquier link con `data-cta`.
- `generate_lead` con `method: "newsletter"`, `cta_id` y `page_path`: al enviar el form del newsletter. El embed de Kit inserta un `<form class="formkit-form">` en la página (no un iframe), así que se escucha su `submit`. Mide el intento de suscripción, no la confirmación de Kit.

- `filter_use` con `facet` (`tipo`, `idioma`, `tema`, `tag`, `q` o `reset`), `value`, `results` (fichas que quedan) y `page_path`: al cambiar un filtro en `/explorar` (la búsqueda por texto, 0,9 s después de dejar de escribir).

En `/lecturas-rapidas` y `/recorridos-recomendados` (`liqueed-explorar/dist/lecturas-cliente.js`), todos con `page_path`:

- `profile_select` con `perfil` (o `(todos)`) y `page_type` (`lecturas` o `recorridos`); `topic_filter` con `tema` y `page_type`.
- `pack_open` con `pack_id`: primer clic en una lectura de ese paquete en la visita. `pack_item_click` con `pack_id`, `item` (nombre de la ficha), `position` y `link_type` (`ficha` o `fuente`): cada clic.
- `route_step` con `route_id`, `step`, `item` y `action` (`open` o `open_extra` al abrir un paso o un "para profundizar", con `link_type`; `done` o `undone` al marcarlo como leído). `route_complete` con `route_id` y `steps` al marcar el último.
- `cta_agendar_click` con `origen` (`pagina`), `id` y `link_url` (además del `cta_click` general, con `cta_id` `agenda_pagina`).
- `share_team_click` con `origen` (`pagina`, `paquete` o `recorrido`), `id` y `method` (`native`, `clipboard` o `email`).

El embed de Kit se reinicializa solo cuando se navega sin recargar (SPA de Quartz).

Los estilos de los cinco plugins están en `quartz/styles/custom.scss` (fuera de las capas CSS de Quartz).

Para trackear un link nuevo, agregale `data-cta="<id>"`.
