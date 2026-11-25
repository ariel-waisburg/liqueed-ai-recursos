# Rúbrica de curaduría

Versión 1.1, aprobada por Ari el 24/11/2026 (incluye sus decisiones sobre consultoras, vendors, idioma, voz y volumen). Una corrida automática tiene que poder aplicarla sin más contexto que este archivo, [fuentes.md](fuentes.md) y el skill `.claude/skills/sumar-fuente`.

## Para quién curamos (ICP)

Personas que trabajan en corporaciones enterprise, con distintos niveles de madurez técnica:

- **técnico**: devs, arquitectos, líderes técnicos.
- **producto**: PMs, diseño, gente de negocio con menos expertise técnica.
- **cultura y organización**: RRHH, adopción cultural, agile coaches, gestión del cambio.

El foco es lo **aplicado**, pero también entran frameworks y conceptos. No hay piso ni cupo entre aplicado y conceptual: decide la calidad.

## 1. Filtros de entrada (duros)

Si un recurso no pasa alguno, queda afuera aunque sea bueno en lo demás. Anotá el motivo del descarte en una línea.

| Filtro | Pregunta | Queda afuera si |
|---|---|---|
| Relevancia ICP | ¿Le sirve a alguno de los tres perfiles en una corporación, y trata sobre IA? | Es solo para hobbistas, académico sin bajada, o no trata sobre IA. |
| Autoría verificable | ¿Sabemos quién lo escribió y qué experiencia tiene? | Es anónimo o el autor no es rastreable. |
| Evidencia | ¿Sus afirmaciones tienen respaldo (datos, casos, método)? | Promete resultados sin mostrar cómo. |
| No vendehumo | Si vende algo, ¿enseña algo útil sin comprarlo? | Es una pieza comercial disfrazada. El contenido de vendors (Anthropic, OpenAI, Vercel, etc.) sí entra si enseña algo útil; si suena a infomercial, se penaliza (ver abajo). |
| Vigencia | ¿Sigue siendo cierto hoy? | Lo contradicen cambios posteriores de modelos o herramientas. |
| Acceso | ¿Se puede leer o ver entero? | Paywall total sin resumen suficiente. |
| Duplicado | ¿Ya está en `vault/fuentes/`? (buscar la URL sin tracking con `grep -rl`) | Ya existe: no es candidata. |
| Consultoras competidoras | ¿Es de una consultora que compite con liqueed? | Nunca por eso: **sí entra si es el mejor recurso del tema**. En el digest se marca como "consultora". |

## 2. Rúbrica con puntaje

Cada dimensión se puntúa de 1 a 5, con una frase de evidencia tomada del recurso. El puntaje total es el promedio ponderado (de 1 a 5).

| Dimensión | Peso | 1 | 3 | 5 |
|---|---|---|---|---|
| Relevancia enterprise | 20% | No aplica a una organización grande | Útil, pero genérico | Responde una pregunta real de alguien en una corporación |
| Aplicabilidad | 20% | Solo opinión | Ideas con algún ejemplo | Pasos, plantillas o un caso que se puede replicar el lunes |
| Evidencia y rigor | 20% | Afirmaciones sin respaldo | Experiencia propia razonada | Datos, método o casos verificables |
| Autoridad del autor | 10% | Sin trayectoria en el tema | Practicante reconocible | Referente con obra verificable |
| Aporte al repositorio | 10% | Repite lo que ya está | Suma un matiz | Cubre un hueco o un ángulo nuevo |
| Vigencia | 10% | Superado por cambios recientes | Vigente hoy | Durable, no depende de una versión |
| Calidad de consumo | 10% | Confuso o inaccesible | Claro | Muy claro, bien estructurado y accesible |

Cambios respecto del borrador: relevancia enterprise bajó de 25% a 20% y calidad de consumo subió de 5% a 10%. Como un cambio compensa al otro, el total sigue dando 100% y no hubo que tocar ninguna otra dimensión.

Fórmula:

```
total = (0,20·relevancia + 0,20·aplicabilidad + 0,20·evidencia
       + 0,10·autoridad + 0,10·aporte + 0,10·vigencia + 0,10·consumo)
```

### Umbrales

| Total | Qué pasa |
|---|---|
| 4,0 o más | **Recomendada**: va arriba en el digest. |
| De 3,5 a 3,9 | **Candidata**: va al digest y decide Ari. |
| Menos de 3,5 | **Descartada**: queda en el log con el motivo. Ari puede rescatarla. |
| Relevancia o evidencia en 1 | **Fuera**, aunque el total dé alto. |

### Penalización por tono de infomercial

Se aplica sobre el total, después de la fórmula, a cualquier recurso (sobre todo de vendors y consultoras):

| Tono | Penalización |
|---|---|
| Menciona su producto, pero lo que enseña sirve igual sin comprarlo | 0 |
| El producto ocupa buena parte del recurso o lo que enseña depende de comprarlo | −0,5 |
| Es mayormente promoción con algo de contenido | −1,0 |
| Es pura pieza comercial | Fuera (filtro "No vendehumo") |

Anotá la penalización y su motivo en una línea en el digest.

### Desempate por idioma

Si dos recursos son equivalentes (mismo tema, puntajes similares), se prioriza el que está **en español**.

## 3. Señales de alerta

No descartan solas, pero bajan el puntaje y obligan a revisar dos veces:

- Números redondos sin fuente ("10x de productividad").
- Hilos armados para engagement ("el 99% no sabe esto") o listas de 50 herramientas.
- Benchmarks del propio vendor sin metodología.
- Capturas de pantalla sin link a la fuente original.
- Texto que parece generado por IA sin revisión (AI slop).
- "Los agentes van a reemplazar a todo X" sin matices.
- Tema que cambia rápido con fecha vieja (más de 12 meses en herramientas o modelos).
- Links de afiliados o CTA comercial en cada párrafo.
- Tono de infomercial: el producto del autor como única solución (aplicar la penalización de arriba).

## 4. Etiquetado para el ICP

Además de `tipo`, `temas` y `tags` (ver el skill `sumar-fuente` y `tags.md`), cada candidata lleva:

| Campo | Valores | Para qué |
|---|---|---|
| `perfil` | `tecnico`, `producto`, `cultura-organizacion` (uno o más) | Puertas de entrada por perfil y filtros en `/explorar`. |
| `madurez` | `explorando`, `experimentando`, `escalando` | Que cada quien vea lo que puede usar en su etapa. |
| `valor` | `aplicado`, `caso`, `framework`, `concepto`, `herramienta` | Medir y sostener el foco en lo aplicado. |
| `esfuerzo` | `<10min`, `10-30min`, `30-90min`, `>90min` | Elegir según el tiempo disponible. |
| `minutos` | Número entero: minutos que lleva la fuente original | "Fuente: N min" en Lecturas rápidas, Recorridos, `/explorar` y cada ficha. Vacío en libros, cursos y referentes ("a tu ritmo"). |
| `minutos_origen` | `medido` o `estimado` | `medido`: palabras de la fuente / 200, o duración real del video o podcast. `estimado`: no se pudo medir (paywall, PDF enorme, post de X) y se estimó por tipo; el sitio lo muestra como "(estimado)". |

Definiciones de madurez:

- **explorando**: la organización todavía está entendiendo qué es y para qué sirve.
- **experimentando**: hay pilotos o equipos usando IA, sin escala ni gobernanza formal.
- **escalando**: la IA ya está en procesos productivos y el desafío es operarla, medirla y gobernarla.

Desde el 25/11/2026 `perfil`, `madurez`, `minutos` y `minutos_origen` están en el frontmatter de todas las fichas publicadas (van antes de `estado:`); `valor` y `esfuerzo` siguen siendo del digest. Los minutos de la ficha (nuestro resumen) no se cargan: los calcula el build. `publicar.py` avisa si algún valor está fuera del vocabulario. Los perfiles y madureces que se asignaron en lote están en [revision-perfil-madurez.md](revision-perfil-madurez.md) para que Ari los revise.

### Lecturas rápidas y recorridos recomendados

Las páginas `/lecturas-rapidas` y `/recorridos-recomendados` salen de [lecturas.yaml](lecturas.yaml). Armado híbrido (aprobado por Ari el 25/11/2026): Faro propone, Ari aprueba por número y recién ahí se edita el archivo.

- **Lecturas rápidas:** de 3 a 5 paquetes en la página (máximo 5 opciones), cada uno de 3 a 5 fichas. La suma de minutos de las fuentes no puede pasar el tiempo que promete el paquete (el build avisa).
- **Recorridos recomendados:** uno por perfil (`producto`, `tecnico`, `cultura-organizacion`) y uno de gobernanza, de 4 a 5 pasos en orden. "Para profundizar" es opcional (hasta 2 fichas largas). La madurez queda en el archivo, no se muestra.
- **Textos:** cortos, sobrios y verificables (pedido de Ari, 25/11/2026). Títulos sin minutos ni slogans; descripción de una línea con lo que cubre; `por_que` de una línea con un hecho del recurso. Nada que suponga la etapa de la organización de quien lee ni prometa resultados.
- **Qué conviene proponer:** una ficha nueva que mejora un paquete o un paso (más corta, en español, más aplicada o más reciente), pasos con link roto o desactualizados, paquetes que se pasan del tiempo y huecos de perfil o de tema (hoy, gobernanza tiene prioridad).
- Cada propuesta dice qué cambia (alta, baja o reemplazo), en qué paquete o recorrido y por qué, con los minutos de la ficha nueva.

## 5. Digest semanal

- **Cuándo:** lunes 9:00, hora de Buenos Aires.
- **Qué:** todas las candidatas que superan 3,5, ordenadas por puntaje y numeradas, para que Ari apruebe por número. Calidad antes que cantidad: sin número fijo, con un mínimo de 3 por semana, pero pueden ser 10 a 15 si lo valen. Si no hay 3 que superen el umbral, se dice así, no se baja la vara.
- **Cada candidata lleva:** título, autor o fuente, URL verificada, fecha de publicación del recurso, tipo, idioma, perfil, madurez, valor, esfuerzo, minutos (medido o estimado), puntaje total y por dimensión, y de 1 a 2 frases en español sobre por qué le sirve a alguien de una corporación.
- **Posts de X:** por ahora se toma de X solo lo que linkea a algo más profundo (y se evalúa el recurso linkeado). Aparte, al final del digest, se listan hasta 3 hilos buenos sin link como "posibles" (regla pendiente de Ari).
- **Decisión de Ari:** por cada número responde entra, no entra o más tarde, y puede sumar una nota (por texto o audio). Su nota va a `Por qué lo guardé` o `Mis notas`, ordenada pero sin desvirtuarla.
- **Publicación:** lo que Ari aprueba se publica directo (ficha con el skill `sumar-fuente`, PR y merge), sin otro paso de confirmación.
- **Voz de las fichas:** "nosotros" (liqueed), no la primera persona de Ari.
- **"Por qué lo guardé":** es opcional. Una ficha se puede publicar sin esa sección si Ari no suma nota.
- **Lecturas rápidas y recorridos:** al final del digest, cambios numerados a `curaduria/lecturas.yaml` (ver sección 4). Lo que Ari aprueba se aplica en el mismo PR de las fichas.
- **Registro:** cada digest se guarda en `curaduria/digests/AAAA-MM-DD.md`, con las decisiones de Ari. Si Ari rechaza puntajes altos o rescata bajos, se recalibra la rúbrica.

## Preguntas abiertas (pendientes de Ari)

- Posts sueltos de X: ¿entran como ficha o solo si linkean a algo más profundo? Mientras tanto, regla de arriba.
- ¿Contenido de gestión del cambio que no menciona la IA (por ejemplo, Agility at Scale) entra por su valor para la adopción?
