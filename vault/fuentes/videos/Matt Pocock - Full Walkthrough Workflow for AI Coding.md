---
title: "Full Walkthrough: Workflow for AI Coding — Matt Pocock"
autor: "Matt Pocock"
tipo: video
plataforma: "youtube.com"
url: "https://www.youtube.com/watch?v=-QFHIoCo-Ko"
miniatura: "https://i.ytimg.com/vi/-QFHIoCo-Ko/hqdefault.jpg"
idioma: "en"
publicado: "2026-04-24"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
  - fundamentos-ia
tags:
  - workflows-con-agentes
  - context-engineering
  - formacion
perfil:
  - tecnico
madurez: explorando
minutos: 97
minutos_origen: medido
estado: resumido
publish: false
---

# Full Walkthrough: Workflow for AI Coding — Matt Pocock

**Matt Pocock** · video · youtube.com · 2026-04-24 · [link](https://www.youtube.com/watch?v=-QFHIoCo-Ko)

Temas: [[Desarrollo con agentes]] · [[Fundamentos técnicos de IA]]

## Por qué lo guardé
Porque explica muy bien por qué un agente de código empieza a fallar cuando la sesión se alarga, y qué hacer al respecto. La tesis de Pocock nos parece clave: al pensar la IA como un paradigma nuevo nos olvidamos de que los fundamentos de la ingeniería de software, que funcionan muy bien con personas, también funcionan muy bien con la IA. Y porque, además del contenido, es un ejemplo de facilitación para quienes formamos equipos (cómo abre, cómo toma la temperatura de la sala y cómo organiza las preguntas) y trae un recorrido práctico con ejercicios que se puede reutilizar.

## En una línea
Workshop de Matt Pocock en AI Engineer Europe 2026 que muestra un flujo completo para programar con agentes (de una idea ambigua a un PRD, issues en vertical slices e implementación con TDD), sobre la base de que los fundamentos de la ingeniería de software siguen valiendo con la IA.

## Ideas clave
- Dos restricciones de los LLMs organizan todo el flujo: tienen una "zona inteligente" y una "zona tonta" (para Pocock, el límite práctico ronda los 100k tokens de sesión, sin importar el tamaño de la ventana) y se olvidan de todo en cada sesión nueva. De ahí salen sus reglas: tareas chicas, contador de tokens siempre a la vista y limpiar el contexto antes que compactarlo.
- Alinear primero con personas: con su skill "Grill Me", el agente entrevista a quien pide el cambio hasta llegar a un entendimiento compartido (el "design concept" de Frederick Brooks), y recién después se resume el destino acordado en un PRD. Discute contra la idea de "specs-to-code" (editar la especificación y esperar que el código salga bien sin mirarlo). Planificar es una tarea human-in-the-loop; implementar puede ser AFK (sin una persona en el teclado).
- Del PRD a issues que el agente puede tomar solo: vertical slices o "tracer bullets" (idea de The Pragmatic Programmer), con dependencias explícitas, armadas como un tablero Kanban que permite trabajar en paralelo.
- La implementación se automatiza con TDD (red-green-refactor), loops de feedback y corridas autónomas en sandbox (Docker), pero la responsabilidad por la calidad sigue siendo humana: QA y code review.
- El código que heredan los agentes importa: propone "deep modules" (John Ousterhout, A Philosophy of Software Design), con interfaces chicas y mucha funcionalidad adentro, y tests de comportamiento. Y advierte sobre el "doc rot": un PRD viejo que ya no coincide con el código confunde a los agentes, por eso no lo deja en el repo.

## Recursos complementarios
- [AI Engineer Workshop 2026](https://www.aihero.dev/ai-engineer-workshop-2026~dwnll) (AI Hero, Matt Pocock): la página del workshop con las lecciones y los ejercicios prácticos que se hacen en el video.

## Relacionado
- [[HumanLayer - Advanced Context Engineering for Coding Agents]]
- [[Anthropic - Effective context engineering for AI agents]]
- [[GitHub - Spec Kit]]

## Mis notas
Notas hasta el minuto 32: la parte teórica (primeros 11') y el comienzo de la práctica.

**Ideas centrales sobre LLMs**
- La tesis: al pensar en el nuevo paradigma de la IA nos olvidamos de que los conceptos elementales de la ingeniería de software, que funcionan muy bien con las personas, también funcionan muy bien con la IA.
- Los LLMs tienen dos restricciones raras:
  1. **Operan en dos zonas: la inteligente y la tonta** (Pocock toma la idea de Dex Horthy, de HumanLayer). Cada token que agregás es como sumar un equipo a una liga de fútbol: la cantidad de partidos crece de forma cuadrática, porque la atención relaciona cada token con todos los demás, por su posición y por su significado. Según Pocock, a partir de unos 100k tokens de sesión (es su marcador, uses una ventana de 200k o de 1 millón) se entra en la zona tonta y el modelo empieza a tomar malas decisiones. Recomienda tener siempre a la vista cuántos tokens lleva la sesión.
  2. **Se olvidan todo el tiempo**: como el protagonista de *Memento*, vuelven siempre a su estado base.

**Cómo trabajar**
- Mantener las tareas cortas (el consejo clásico de *Refactoring* y *The Pragmatic Programmer*: no morder más de lo que se puede masticar). Para una tarea grande, un plan multifase en el que cada fase se hace en la zona inteligente. Pocock cuenta que trabajó así hasta diciembre pasado, y que un plan multifase es, en el fondo, un loop.
- **Ralph Wiggum**: especificar el objetivo final, el output (por ejemplo en un PRD), y a partir de ahí pedirle a la IA, una y otra vez, un cambio chico que acerque a ese objetivo. Según Pocock funciona bastante bien, pero él prefiere un poco más de estructura.
- **Anatomía de una sesión**: system prompt (está siempre en el contexto, así que conviene que sea chico; vio gente con 250k tokens ahí, que arranca directamente en la zona tonta), fase de exploración del código, implementación y testing (correr los feedback loops). Cuando limpiás el contexto, volvés al system prompt.
- **Compacting**: comprimir la conversación para que ocupe menos tokens; es como escribir una historia, un registro de lo que pasó en la sesión. Ojo con el matiz: Pocock no lo recomienda. Dice que a los devs les encanta compactar pero que él lo odia: prefiere limpiar el contexto y volver siempre al mismo punto de partida.

**La práctica (min. 11–32)**
- El ejercicio: desarrollar una feature en Cadence, una plataforma de gestión de cursos que Pocock armó para su curso. Parte de un mensaje de una clienta (un brief en Slack): los estudiantes se anotan, hacen algunas lecciones y abandonan, y ella quiere sumar gamificación. El recorrido va de la idea al PRD y del PRD a la implementación. La propuesta es aprender del proceso para usarlo en el trabajo propio.
- **Paso 1: la skill `grill-me`.** Es muy chiquita y previene el desalineamiento: sirve para estar "en la misma" que el agente. Le pide al modelo que te entreviste sin piedad sobre cada aspecto del plan, de a una pregunta y con su respuesta recomendada, hasta llegar a un entendimiento compartido. Pocock arranca así casi todo su trabajo con IA, con el contexto limpio: solo la skill y el pedido.
  - El problema que resuelve: la IA (sobre todo en plan mode) quiere largar un plan enseguida, y por ahí no es lo que necesito ni lo que quiero. Pocock lo explica con el "design concept" de Frederick Brooks (*The Design of Design*): la idea compartida entre todos los que diseñan algo juntos. Lo que necesitaba con el agente no era un plan sino estar en la misma sintonía.
  - Funciona bien para tomar inputs (por ejemplo, la transcripción de una reunión con un experto del dominio) y refinarlos una y otra vez. La conversación queda como un activo: el registro del diseño que se fue armando. Puede durar mucho: le hizo 40, 80 y hasta 100 preguntas, una hora charlando con la IA.
  - Hay muchas maneras de hacerlo (le preguntaron por Spec Kit, OpenSpec o Taskmaster), pero su consejo es apropiarse del proceso de planificación, del *stack*: controlarlo. Mientras no haya un ganador claro y todo cambie tan rápido, si no sos dueño del stack y no ves qué hace, cuando algo falla no sabés cómo arreglarlo.
  - Planificar tiene que ser una tarea *human-in-the-loop*: no se puede "loopear" como la implementación, que sí puede correr sin una persona en el teclado (AFK). Y en equipos grandes propone hacer el grilling como un pair o mob programming con IA: con la persona experta del dominio para las preguntas de negocio, con otro dev para las de implementación.
- **Paso 2: el "documento de destino".** La skill `write-a-prd` resume toda la conversación de la planificación en un PRD: el problema, la solución, las historias de usuario y las decisiones de implementación y de testing. Para Pocock los tokens de una buena sesión de grilling son oro (en el ejemplo, unos 25k), y el PRD es la forma de conservarlos. La forma del documento no importa tanto: puede ser la plantilla que use tu empresa.
- **Dos documentos**: uno registra el destino (cómo se ve todo, con sus historias de usuario y la definición de terminado, la *definition of done*) y otro el recorrido (cómo se divide el trabajo, el *split*).
- **Subagentes**: un agente llama a otro LLM con una ventana de contexto limpia, y ese LLM le devuelve un resumen. Es una delegación: en la demo, el subagente que exploró el código gastó 93,7k tokens, pero la sesión principal casi no creció.

**Recursos pedagógicos y de facilitación (para formadores)**
- Abre con un link a los ejercicios en los que se va a trabajar ([AI Engineer Workshop 2026](https://www.aihero.dev/ai-engineer-workshop-2026~dwnll)).
- Para tomar la temperatura de la sala hace tres preguntas a mano alzada: ¿quiénes programaron alguna vez con IA?, ¿quiénes programan todos los días con IA?, ¿quiénes se frustraron programando con IA?
- Las preguntas del público van por Slido: se envían de forma asincrónica y se votan, para que suban las mejores. Lo justifica en que las rondas de preguntas tradicionales no son democráticas: participan sobre todo los que más hablan.
- Después de esa parte teórica corta pasa a los ejercicios: él los hace en vivo y la sala los sigue en sus máquinas (o solo mira). Mientras el agente trabaja, aprovecha para responder las preguntas más votadas en Slido y hace votaciones a mano alzada sobre las decisiones de diseño (por ejemplo, si los puntos tienen que ser retroactivos).

## Texto original
_(Resumido a partir de la transcripción pública completa del video y de la página oficial de la charla en ai.engineer. Las notas de Ari cubren hasta el minuto 32.)_
