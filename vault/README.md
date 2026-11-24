---
title: "Cómo funciona este cerebro"
publish: false
---

# Cómo funciona este cerebro

Una carpeta de archivos de texto (markdown). Se abre con Obsidian, la lee cualquier IA y no depende de ninguna empresa.

## Carpetas

| Carpeta | Qué va |
|---|---|
| `00-inbox/` | Lo que guardás al pasar, sin procesar. El Web Clipper guarda acá. |
| `fuentes/` | Una nota por fuente (artículo, post, video, libro, curso, herramienta), con resumen y metadatos. Contenido de otros: **no se publica**. |
| `notas/` | Lo que pensás y escribís vos a partir de las fuentes. Es lo único que se publica. |
| `temas/` | Un índice por tema que linkea fuentes y notas. |
| `_plantillas/` | Plantillas para fuentes y notas. |
| `Inicio.md` | Página de entrada: temas y pendientes. |
| `CLAUDE.md` | Instrucciones para que una IA procese el inbox y responda preguntas con el mismo criterio. |

## Flujo

1. **Guardar** (un gesto): Obsidian Web Clipper desde el navegador o el celular → cae en `00-inbox/`.
2. **Procesar** (una vez por semana, 10 minutos): abrís Claude con esta carpeta y le decís *"procesá el inbox"*. Mueve cada captura a `fuentes/`, le agrega metadatos y resumen, y actualiza los temas.
3. **Usar**: preguntale a Claude sobre la carpeta ("¿qué tengo sobre evals?", "armame un módulo sobre AI champions con estas fuentes").
4. **Pensar**: lo tuyo va en `notas/`, linkeado a las fuentes con `[[...]]`.

## Configurar el Web Clipper

1. Instalá *Obsidian Web Clipper* (extensión oficial y gratuita para Chrome, Firefox y Safari).
2. En la plantilla por defecto: carpeta `00-inbox`, y agregá las propiedades `url`, `autor`, `guardado`, `tipo` y `publish: false`.
3. Para tweets y artículos de X funciona igual. Para videos de YouTube, pegá la transcripción en la nota.

## Estados de una fuente

- `resumido`: resumen hecho sobre el texto completo.
- `resumido-parcial`: resumen sobre una parte (artículo largo, paywall). Conviene capturar el texto completo.
- `pendiente-captura`: falta el contenido (PDF, imagen, transcripción, post con login).

## Publicar

Cada push a `main` del repo publica el sitio. Se publican `temas/`, `notas/`, `Inicio` y las fuentes con resumen; nunca la sección "Texto original", el inbox ni las plantillas. Ver `CLAUDE.md` en la raíz del repo.
