# Cerebro de Ari → Recursos de IA · Liqueed

Repositorio de fuentes sobre IA, producto y organizaciones. Hablá siempre en español rioplatense.

- **`vault/`** es la bóveda de Obsidian y la **fuente de verdad**. Ari la abre en Obsidian ("Abrir carpeta como bóveda").
- **`content/`** se genera solo desde `vault/` con `scripts/publicar.py`. **No lo edites a mano**: regeneralo con el script y commitealo junto con `vault/` (igual el deploy lo vuelve a generar).
- El sitio (Quartz) se publica en https://ariel-waisburg.github.io/liqueed-ai-recursos con cada push a `main` (`.github/workflows/deploy.yml` corre `publicar.py` y después `quartz build`).
- Las reglas de formato de cada nota están en `vault/CLAUDE.md` y la plantilla en `vault/_plantillas/fuente.md`. Leelas antes de crear notas.

## Flujo: "sumá estas fuentes"

Para cada link:

1. **Duplicados**: buscá la URL (sin parámetros como `?s=` o `?a=`) con grep en `vault/fuentes/`. Si ya está, no la vuelvas a cargar y avisá.
2. **Leer**: WebFetch para artículos. X (twitter) y LinkedIn no se leen con WebFetch: usá el navegador (Claude in Chrome) si está disponible; si no, pedile a Ari que pegue el texto. YouTube: título y descripción; sin transcripción queda `resumido-parcial` o `pendiente-captura`.
3. **Crear la nota** en `vault/fuentes/<carpeta>/Autor - Título corto.md` con la plantilla. Carpetas: `articulos`, `posts` (X, LinkedIn), `videos`, `libros`, `cursos`, `herramientas`, `presentaciones`, `referentes`.
   - Frontmatter: `title`, `autor`, `tipo`, `plataforma`, `url`, `idioma`, `publicado` (YYYY-MM-DD o ""), `guardado` (fecha de hoy), `temas` (slugs de abajo), `tags` (temas + tipo + 1-3 conceptos en kebab-case, reusando los que ya existen), `estado`, `publish: false`.
   - "En una línea" + "Ideas clave" (4-6 bullets) **con tus palabras**. Nada de copiar párrafos; citas de menos de 15 palabras.
   - "Relacionado": 1-3 `[[links]]` a fuentes existentes (nombre exacto del archivo, sin `.md`).
   - `estado`: `resumido` (texto completo), `resumido-parcial` (se leyó una parte) o `pendiente-captura` (sin contenido; queda fuera del sitio).
4. **Temas**: agregá la fuente a cada `vault/temas/<Tema>.md` que corresponda (`- [[Archivo]]: en una línea`). Si aparecen 3+ fuentes de un asunto nuevo, proponé un tema antes de crearlo.
5. **Inicio**: actualizá el conteo de fuentes en `vault/Inicio.md` (y la lista de pendientes si aplica).
6. **Verificar**: `python3 scripts/publicar.py && npx quartz build` (tiene que terminar sin errores; los `[[links]]` rotos no rompen el build, así que chequealos con grep).
7. **Publicar**: commit y push a `main`. En un par de minutos se actualiza el sitio.

Al final, decile a Ari qué entró, qué quedó parcial o pendiente y por qué.

## Temas (slug → nota)

| slug | nota en `vault/temas/` |
|---|---|
| adopcion-ia | Adopción de IA en organizaciones |
| producto-e-ia | Producto en la era de la IA |
| desarrollo-agentico | Desarrollo con agentes |
| agentes-y-evals | Agentes y evals |
| pensamiento-critico | Pensamiento crítico y delegación |
| gobernanza-ia | Gobernanza de IA |
| agilidad-e-ia | Agilidad e IA |
| fundamentos-ia | Fundamentos técnicos de IA |

## Reglas

- El repo es **público**: todo lo que está en `vault/` se ve en GitHub. No guardes nada privado ni de clientes acá.
- La sección "Texto original" de cada nota **nunca** se publica en el sitio (`publicar.py` la saca), pero sí queda visible en GitHub: no pegues ahí textos completos de terceros.
- No edites "Por qué lo guardé" ni "Mis notas" sin que Ari lo pida: son suyos.
- Vista previa local: `npm ci` (una vez), después `python3 scripts/publicar.py && npx quartz build --serve` → http://localhost:8080.
