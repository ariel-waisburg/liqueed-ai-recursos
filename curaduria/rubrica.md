# Rúbrica de curaduría

Versión 1, aprobada por Ari el 24/11/2026. Una corrida automática tiene que poder aplicarla sin más contexto que este archivo, [fuentes.md](fuentes.md) y el skill `.claude/skills/sumar-fuente`.

## Para quién curamos (ICP)

Personas que trabajan en corporaciones enterprise, con distintos niveles de madurez técnica:

- **técnico**: devs, arquitectos, líderes técnicos.
- **producto**: PMs, diseño, gente de negocio con menos expertise técnica.
- **cultura y organización**: RRHH, adopción cultural, agile coaches, gestión del cambio.

El foco es lo **aplicado** (piso propuesto: 2 de cada 3 recursos nuevos son aplicados o casos), pero también entran frameworks y conceptos.

## 1. Filtros de entrada (duros)

Si un recurso no pasa alguno, queda afuera aunque sea bueno en lo demás. Anotá el motivo del descarte en una línea.

| Filtro | Pregunta | Queda afuera si |
|---|---|---|
| Relevancia ICP | ¿Le sirve a alguno de los tres perfiles en una corporación, y trata sobre IA? | Es solo para hobbistas, académico sin bajada, o no trata sobre IA. |
| Autoría verificable | ¿Sabemos quién lo escribió y qué experiencia tiene? | Es anónimo o el autor no es rastreable. |
| Evidencia | ¿Sus afirmaciones tienen respaldo (datos, casos, método)? | Promete resultados sin mostrar cómo. |
| No vendehumo | Si vende algo, ¿enseña algo útil sin comprarlo? | Es una pieza comercial disfrazada. |
| Vigencia | ¿Sigue siendo cierto hoy? | Lo contradicen cambios posteriores de modelos o herramientas. |
| Acceso | ¿Se puede leer o ver entero? | Paywall total sin resumen suficiente. |
| Duplicado | ¿Ya está en `vault/fuentes/`? (buscar la URL sin tracking con `grep -rl`) | Ya existe: no es candidata. |
| Independencia | ¿Es de una consultora que compite con liqueed? | Regla pendiente de definir por Ari: por ahora entra al digest marcada como "consultora". |

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

## 4. Etiquetado para el ICP

Además de `tipo`, `temas` y `tags` (ver el skill `sumar-fuente` y `tags.md`), cada candidata lleva:

| Campo | Valores | Para qué |
|---|---|---|
| `perfil` | `tecnico`, `producto`, `cultura-organizacion` (uno o más) | Puertas de entrada por perfil y filtros en `/explorar`. |
| `madurez` | `explorando`, `experimentando`, `escalando` | Que cada quien vea lo que puede usar en su etapa. |
| `valor` | `aplicado`, `caso`, `framework`, `concepto`, `herramienta` | Medir y sostener el foco en lo aplicado. |
| `esfuerzo` | `<10min`, `10-30min`, `30-90min`, `>90min` | Elegir según el tiempo disponible. |

Definiciones de madurez:

- **explorando**: la organización todavía está entendiendo qué es y para qué sirve.
- **experimentando**: hay pilotos o equipos usando IA, sin escala ni gobernanza formal.
- **escalando**: la IA ya está en procesos productivos y el desafío es operarla, medirla y gobernarla.

Estos campos todavía no existen en el frontmatter de las fichas ni en `/explorar`. Por ahora se usan en el digest; sumarlos al sitio es un paso posterior.

## 5. Digest semanal

- **Cuándo:** lunes 9:00, hora de Buenos Aires.
- **Qué:** de 5 a 8 candidatas (hasta 10 en la primera corrida), ordenadas por puntaje y numeradas, para que Ari apruebe por número.
- **Cada candidata lleva:** título, autor o fuente, URL verificada, fecha de publicación del recurso, tipo, idioma, perfil, madurez, valor, esfuerzo, puntaje total y por dimensión, y de 1 a 2 frases en español sobre por qué le sirve a alguien de una corporación.
- **Mix:** alrededor de 2 de cada 3 aplicados o casos.
- **Decisión de Ari:** por cada número responde entra, no entra o más tarde, y puede sumar una nota (por texto o audio). Su nota va a `Por qué lo guardé` o `Mis notas`, ordenada pero sin desvirtuarla.
- **Publicación:** lo que Ari aprueba se publica directo (ficha con el skill `sumar-fuente`, PR y merge), sin otro paso de confirmación.
- **Registro:** cada digest se guarda en `curaduria/digests/AAAA-MM-DD.md`, con las decisiones de Ari. Si Ari rechaza puntajes altos o rescata bajos, se recalibra la rúbrica.

## Preguntas abiertas (pendientes de Ari)

- Consultoras que compiten con liqueed: ¿entran si son el mejor recurso del tema?
- Contenido de vendors (Anthropic, OpenAI, Google): ¿cuenta como fuente válida si enseña algo útil?
- ¿Priorizamos el español cuando hay dos recursos equivalentes?
- Posts sueltos de X: ¿entran como ficha o solo si linkean a algo más profundo?
- ¿Contenido de gestión del cambio que no menciona la IA (por ejemplo, Agility at Scale) entra por su valor para la adopción?
