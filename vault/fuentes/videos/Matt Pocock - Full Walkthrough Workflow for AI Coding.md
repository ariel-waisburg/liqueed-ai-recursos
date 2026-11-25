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
estado: resumido
publish: false
---

# Full Walkthrough: Workflow for AI Coding — Matt Pocock

**Matt Pocock** · video · youtube.com · 2026-04-24 · [link](https://www.youtube.com/watch?v=-QFHIoCo-Ko)

Temas: [[Desarrollo con agentes]] · [[Fundamentos técnicos de IA]]

## Por qué lo guardé
Porque explica muy bien por qué un agente de código empieza a fallar cuando la sesión se alarga, y qué hacer al respecto. La tesis de Pocock nos parece clave: al pensar la IA como un paradigma nuevo nos olvidamos de que los fundamentos de la ingeniería de software, que funcionan muy bien con personas, también funcionan muy bien con la IA. Y porque, además del contenido, es un ejemplo de facilitación para quienes formamos equipos: cómo abre, cómo toma la temperatura de la sala y cómo organiza las preguntas.

## En una línea
Workshop de Matt Pocock en AI Engineer Europe 2026 que muestra un flujo completo para programar con agentes (de una idea ambigua a un PRD, issues en vertical slices e implementación con TDD), sobre la base de que los fundamentos de la ingeniería de software siguen valiendo con la IA.

## Ideas clave
- Dos restricciones de los LLMs organizan todo el flujo: tienen una "zona inteligente" y una "zona tonta" (para Pocock, el límite práctico ronda los 100k tokens de sesión, sin importar el tamaño de la ventana) y se olvidan de todo en cada sesión nueva. De ahí salen sus reglas: tareas chicas, contador de tokens siempre a la vista y limpiar el contexto antes que compactarlo.
- Alinear primero con personas: con su skill "Grill Me", el agente entrevista a quien pide el cambio hasta resolver las ambigüedades, y recién después se resume el destino acordado en un PRD. Discute contra la idea de "specs-to-code" (editar la especificación y esperar que el código salga bien sin mirarlo). Planificar es una tarea human-in-the-loop; implementar puede ser AFK (sin una persona en el teclado).
- Del PRD a issues que el agente puede tomar solo: vertical slices o "tracer bullets" (idea de The Pragmatic Programmer), con dependencias explícitas, armadas como un tablero Kanban que permite trabajar en paralelo.
- La implementación se automatiza con TDD (red-green-refactor), loops de feedback y corridas autónomas en sandbox (Docker), pero la responsabilidad por la calidad sigue siendo humana: QA y code review.
- El código que heredan los agentes importa: propone "deep modules" (John Ousterhout, A Philosophy of Software Design), con interfaces chicas y mucha funcionalidad adentro, y tests de comportamiento. Y advierte sobre el "doc rot": un PRD viejo que ya no coincide con el código confunde a los agentes, por eso no lo deja en el repo.

## Relacionado
- [[HumanLayer - Advanced Context Engineering for Coding Agents]]
- [[Anthropic - Effective context engineering for AI agents]]
- [[GitHub - Spec Kit]]

## Mis notas
Notas de la parte teórica (primeros 11').

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

**Recursos pedagógicos y de facilitación (para formadores)**
- Abre con un link a los ejercicios en los que se va a trabajar.
- Para tomar la temperatura de la sala hace tres preguntas a mano alzada: ¿quiénes programaron alguna vez con IA?, ¿quiénes programan todos los días con IA?, ¿quiénes se frustraron programando con IA?
- Las preguntas del público van por Slido: se envían de forma asincrónica y se votan, para que suban las mejores. Lo justifica en que las rondas de preguntas tradicionales no son democráticas: participan sobre todo los que más hablan.
- Después de esa parte teórica corta pasa a los ejercicios: él los hace en vivo y la sala los sigue en sus máquinas (o solo mira).

## Texto original
_(Resumido a partir de la transcripción pública completa del video y de la página oficial de la charla en ai.engineer. Las notas de Ari cubren los primeros 11 minutos.)_
