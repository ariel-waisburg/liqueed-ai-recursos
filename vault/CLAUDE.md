# Instrucciones para la IA que trabaja en esta carpeta

Esta carpeta es el repositorio personal de contenido de Ari ("cerebro"): fuentes que le interesaron sobre IA, producto y organizaciones, más sus propias notas. Respondé siempre en español rioplatense.

## Estructura

- `00-inbox/`: capturas crudas, sin procesar.
- `fuentes/{articulos,posts,videos,libros,cursos,herramientas,presentaciones,referentes}/`: una nota por fuente.
- `notas/`: ideas propias de Ari. No las edites sin que lo pida.
- `temas/`: índices por tema (MOC).
- `_plantillas/fuente.md`: formato obligatorio de cada fuente.
- `Inicio.md`: índice general y lista de pendientes.

## Sumar fuentes y "Procesá el inbox"

Seguí el skill `sumar-fuente` (`.claude/skills/sumar-fuente/SKILL.md`, en la raíz del repo). Para el inbox, cada archivo de `00-inbox/` es una fuente: usá su texto para leerla y, cuando la nota esté creada, borrá el archivo del inbox. El texto capturado **no** va completo a "Texto original": el repo es público.

## Responder preguntas

- Basate en lo que está en la carpeta y linkeá las notas que usaste con `[[...]]`.
- Distinguí lo que dice cada fuente de tu propia síntesis.
- Si una fuente está `resumido-parcial` o `pendiente-captura`, avisá que la respuesta puede estar incompleta.

## Reglas

- Todo nace con `publish: false`. Solo Ari cambia eso.
- Nunca pongas `publish: true` en `fuentes/`: es contenido de terceros.
- No borres "Por qué lo guardé" ni "Mis notas": son de Ari.
