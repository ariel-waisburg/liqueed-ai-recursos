---
name: sumar-fuente
description: Proceso para sumar una o más fuentes (links, PDFs, videos, posts) a la bóveda de Recursos de IA de Liqueed. Usalo cada vez que Ari pase links para agregar, pida completar fuentes pendientes o diga "sumá estas fuentes".
---

# Sumar fuentes

Proceso único para cargar fuentes en `vault/`. Respondé siempre en español rioplatense. Seguí los pasos en orden, para cada link. Llevá una lista de lo que vas creando para el informe final (paso 11).

## 0. Preparar

- `git pull` para partir de la última versión.
- Fecha de hoy en formato `YYYY-MM-DD`: va en `guardado`.

## 1. Duplicados

Sacá de la URL los parámetros de tracking (`?s=`, `?t=`, `utm_*`) y buscala con `grep -rl` en `vault/fuentes/`.

| Si ya existe y está... | Qué hacer |
|---|---|
| `resumido` | No la toques. Avisá que ya estaba. |
| `resumido-parcial` o `pendiente-captura` | Intentá leerla de nuevo (paso 2) y **completá esa misma nota**. No cambies el nombre del archivo ni `guardado`. |

## 2. Leer la fuente

| Fuente | Cómo leerla | Si no se puede |
|---|---|---|
| Artículo web | WebFetch (o el agente `web-fetch`). | Si hay paywall o se corta, `resumido-parcial` con lo que se leyó. |
| X y LinkedIn | No se leen con WebFetch. Usá Claude in Chrome (`list_connected_browsers`); Ari tiene que tener la sesión iniciada. | Pedile a Ari que pegue el texto. Mientras tanto, `pendiente-captura`. |
| YouTube | Título, descripción y transcripción si está disponible. | Sin transcripción: `resumido-parcial` (con descripción) o `pendiente-captura`. |
| PDF u otro archivo | **Pedí OK antes de bajarlo** (nombre, origen, tamaño). Bajalo al scratchpad, nunca al repo. Extraé el texto con `pdftotext`. | `pendiente-captura`. |

Si una nota queda en `pendiente-captura`, poné una nota de captura que empiece con "Pasame" o "Bajalo" (`> [!note] Nota de captura`): `publicar.py` la saca del sitio.

## 3. Tipo y carpeta

| `tipo` | Carpeta en `vault/fuentes/` |
|---|---|
| `articulo` | `articulos` |
| `post`, `articulo-x`, `hilo` | `posts` |
| `video` | `videos` |
| `libro`, `guia` | `libros` |
| `curso` | `cursos` |
| `herramienta` | `herramientas` |
| `presentacion` | `presentaciones` |
| `referente` | `referentes` |

**Tipo nuevo:** si no encaja en ninguno (por ejemplo un podcast o un paper), creá la carpeta, agregá la fila a esta tabla y a la lista de `vault/CLAUDE.md`, y avisá en el informe.

## 4. Crear la nota

Archivo: `vault/fuentes/<carpeta>/Autor - Título corto.md`, con `vault/_plantillas/fuente.md`.

- **Frontmatter:** `title` (título original), `autor`, `tipo`, `plataforma`, `url` (sin tracking), `idioma` (`es`/`en`), `publicado` (`YYYY-MM-DD` o `""`; no inventes fechas), `guardado` (hoy), `temas` (paso 5), `tags` (paso 6), `estado`, `publish: false`.
- **Encabezado:** `**Autor** · tipo · plataforma · fecha · [link](url)` y `Temas: [[Tema]] · [[Tema]]`.
- **En una línea:** una oración, con tus palabras, que diga de qué trata y por qué importa.
- **Ideas clave:** de 4 a 6 bullets concretos (conceptos, marcos, datos, prácticas), con tus palabras. Citas de menos de 15 palabras. Si un dato no lo pudiste verificar en el texto, no lo pongas.
- **Por qué lo guardé** y **Mis notas:** son de Ari. Dejalos como en la plantilla y nunca los edites sin que lo pida.
- **Texto original:** el repo es público, así que **nunca** pegues ahí el texto completo de un tercero. Dejá una línea que diga de dónde salió el resumen y qué parte no se pudo leer.
- **`estado`:** `resumido` (se leyó todo), `resumido-parcial` (se leyó una parte; aclarar cuál) o `pendiente-captura` (sin contenido; queda fuera del sitio).

## 5. Temas

Asigná de 1 a 3 temas:

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

En cada tema, agregá la fuente en **orden alfabético** dentro de `## Fuentes`:
`- [[Archivo sin .md]]: en una línea _(estado)_`. El `_(estado)_` va solo si no es `resumido`. Si estás completando una nota que ya estaba, actualizá su línea existente en vez de duplicarla.

**Tema nuevo:** si la fuente no encaja en ninguno, creá `vault/temas/<Nombre>.md` copiando la estructura de un tema existente (frontmatter con `title`, `tipo: tema`, `tags: []`, `slug`, `publish: false`; H1; descripción de una línea; `## Fuentes`; `## Ideas propias`). Después agregá la fila a esta tabla, a la del `CLAUDE.md` de la raíz y a `vault/Inicio.md`, y avisá en el informe para que Ari lo confirme o lo fusione.

## 6. Tags

`tags` = **de 1 a 3 conceptos** del vocabulario controlado de [tags.md](tags.md). No pongas los temas ni el tipo en `tags` (ya están en `temas` y `tipo`). No inventes conceptos: si ninguno encaja, usá el más cercano y proponé el nuevo en el informe.

## 7. Relacionado

De 1 a 3 `[[links]]` a fuentes que ya existen, con el nombre exacto del archivo sin `.md`. Comprobá que existan:
`find vault/fuentes -name "<nombre>.md"`.

## 8. Inicio

En `vault/Inicio.md`:

- **Total de fuentes** y fecha `actualizado` (hoy). El total es `find vault/fuentes -name "*.md" | wc -l`.
- **Conteo de cada tema** que tocaste: la cantidad de líneas `- [[` en `## Fuentes` de ese tema.
- **Pendientes de captura:** sumá las que quedaron `pendiente-captura` y sacá las que completaste.

## 9. Verificar

```bash
python3 scripts/publicar.py && npx quartz build
```

Tiene que terminar sin errores. Los `[[links]]` rotos no rompen el build: comprobá los de las notas que tocaste (paso 7) y que cada tema tocado no tenga la misma fuente dos veces.

## 10. Publicar

**Pedile OK a Ari antes de commitear y pushear**: el repo es público y cada push a `main` actualiza el sitio.

- Agregá solo lo que corresponde: `git add vault content` (y `.claude` si cambiaste el skill o los tags). **Nunca** `git add .`.
- Commit con un mensaje que diga qué fuentes entraron, después `git push`.

## 11. Informe final

Decile a Ari, en pocas líneas:

- Qué entró nuevo y qué se completó.
- Qué quedó `resumido-parcial` o `pendiente-captura`, y qué hace falta para completarlo.
- Qué links ya estaban.
- Qué se creó: tipos o temas nuevos, y qué conceptos nuevos proponés para `tags.md`.
