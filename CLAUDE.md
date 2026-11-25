# Cerebro de Ari → Recursos de IA · liqueed

Repositorio de fuentes sobre IA, producto y organizaciones. Hablá siempre en español rioplatense.

- **`vault/`** es la bóveda de Obsidian y la **fuente de verdad**. Ari la abre en Obsidian ("Abrir carpeta como bóveda").
- **`content/`** se genera solo desde `vault/` con `scripts/publicar.py`. **No lo edites a mano**: regeneralo con el script y commitealo junto con `vault/` (igual el deploy lo vuelve a generar).
- El sitio (Quartz) se publica en https://recursos-ai.liqueed.org con cada push a `main` (`.github/workflows/deploy.yml` corre `publicar.py` y después `quartz build`).

## Sumar fuentes

Cada vez que Ari pase links para agregar, pida completar pendientes o procesar el inbox, seguí el skill **`sumar-fuente`** (`.claude/skills/sumar-fuente/SKILL.md`). Es la única fuente de verdad del proceso: tipos y carpetas, temas, tags válidos (`tags.md`), formato de cada nota, verificación y publicación. Si cambia una regla, cambiala ahí, no acá.

## Reglas

- **Marca:** "liqueed" siempre en minúscula en todo texto visible y metadatos. La tipografía **IBM Plex Mono no se usa nunca** en el sitio (ni se carga): títulos en Poppins, texto y etiquetas en Public Sans, código en la monoespaciada del sistema.
- **Fechas en el sitio:** se muestra `publicado` (fecha del recurso); `guardado` (fecha de carga) no se muestra en listados ni fichas.
- El repo es **público**: todo lo que está en `vault/` se ve en GitHub. No guardes nada privado ni de clientes acá.
- La sección "Texto original" de cada nota **nunca** se publica en el sitio (`publicar.py` la saca), pero sí queda visible en GitHub: no pegues ahí textos completos de terceros.
- No edites "Por qué lo guardé" ni "Mis notas" sin que Ari lo pida: son suyos.
- Vista previa local: `npm ci` (una vez), después `python3 scripts/publicar.py && npx quartz build --serve` → http://localhost:8080.
