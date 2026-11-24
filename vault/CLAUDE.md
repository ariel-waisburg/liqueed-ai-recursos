# Instrucciones para la IA que trabaja en esta carpeta

Esta carpeta es el repositorio personal de contenido de Ari ("cerebro"): fuentes que le interesaron sobre IA, producto y organizaciones, más sus propias notas. Respondé siempre en español rioplatense.

## Estructura

- `00-inbox/`: capturas crudas, sin procesar.
- `fuentes/{articulos,posts,videos,libros,cursos,herramientas}/`: una nota por fuente.
- `notas/`: ideas propias de Ari. No las edites sin que lo pida.
- `temas/`: índices por tema (MOC).
- `_plantillas/fuente.md`: formato obligatorio de cada fuente.
- `Inicio.md`: índice general y lista de pendientes.

## "Procesá el inbox"

Para cada archivo de `00-inbox/`:

1. Identificá autor, título (campo `title`), plataforma, URL, idioma y fecha de publicación. Si algo no está, dejalo vacío: no inventes.
2. Creá la nota en `fuentes/<tipo>/` con el nombre `Autor - Título.md`, usando `_plantillas/fuente.md`.
3. Escribí "En una línea" e "Ideas clave" **con tus palabras** (5 a 7 bullets concretos: conceptos, marcos, datos, prácticas). Sin citas largas.
4. Mové el texto capturado a la sección "Texto original" de la misma nota y borrá el archivo del inbox.
5. Asigná de 1 a 3 temas existentes (ver `temas/`). Si ninguno encaja y hay 3 o más fuentes del mismo asunto, proponé un tema nuevo antes de crearlo.
6. Agregá la fuente a cada `temas/<Tema>.md` correspondiente y linkeá 1 a 3 fuentes relacionadas en "Relacionado".
7. Marcá `estado`: `resumido`, `resumido-parcial` o `pendiente-captura`, y actualizá `Inicio.md`.
8. Al final, decí qué procesaste y qué quedó pendiente.

## Responder preguntas

- Basate en lo que está en la carpeta y linkeá las notas que usaste con `[[...]]`.
- Distinguí lo que dice cada fuente de tu propia síntesis.
- Si una fuente está `resumido-parcial` o `pendiente-captura`, avisá que la respuesta puede estar incompleta.

## Reglas

- Todo nace con `publish: false`. Solo Ari cambia eso.
- Nunca pongas `publish: true` en `fuentes/`: es contenido de terceros.
- No borres "Por qué lo guardé" ni "Mis notas": son de Ari.
