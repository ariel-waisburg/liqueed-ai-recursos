---
title: "Desarrollo con agentes"
tipo: tema
tags: []
slug: desarrollo-agentico
publish: false
---

Cómo se trabaja con agentes de código: workflows, calidad, tests, CI, slop.

## Fuentes

- [[Addy Osmani - Critical thinking when agents do the work]]: Cómo sostener el pensamiento crítico cuando casi todo el trabajo pasa por agentes, sin dejar de usarlos.
- [[Agent Skills - Especificación abierta]]: Especificación abierta de Agent Skills: carpetas con instrucciones y scripts que un agente carga solo cuando las necesita.
- [[AI Engineering from Scratch - Learning paths]]: Sitio abierto y gratuito con lecciones prácticas de ingeniería de IA, organizadas en rutas de aprendizaje.
- [[Alvaro - De revisar cada cambio a coordinar seis agentes]]: Relato en primera persona de cómo pasó de revisar cambio por cambio en Cursor a coordinar seis agentes en paralelo.
- [[Anthropic - Claude Forward Deployed Engineer]]: Learning path de Anthropic para partners que forma Forward Deployed Engineers de Claude: plataforma, Claude Code, MCP, skills y metodología de entrega y adopción.
- [[Anthropic - Effective context engineering for AI agents]]: Guía de Anthropic para elegir en cada paso la información mínima y útil que ve un agente, porque el contexto es un presupuesto de atención.
- [[Anthropic - Harness design for long-running apps]]: Cómo Anthropic usa un planificador, un generador y un evaluador para que Claude construya apps completas en corridas de horas, y por qué simplificarlo cuando mejoran los modelos.
- [[AWS - AI-Driven Development Life Cycle]]: AI-DLC, la metodología de AWS que pone a la IA como miembro activo del equipo en tres fases (concepción, construcción y operación), con el equipo validando cada paso.
- [[Birgitta Böckeler - Harness engineering for coding agent users]]: El 'harness' es todo lo que rodea al modelo, y es donde se juega la calidad del trabajo con agentes.
- [[Birgitta Böckeler - Sitio personal]]: Referente en desarrollo de software asistido por IA, prácticas de ingeniería y liderazgo técnico.
- [[Calvin Grunewald - A Look Inside the Factory]]: Cómo funciona por dentro una fábrica de software casera que convierte objetivos aprobados por una persona en PRs mergeados, y qué se aprendió del human-in-the-loop.
- [[Daniel Lockyer - Todo el CI en un solo archivo]]: Recomendación breve: tener todo el CI en un solo archivo para no repetir el build en cada workflow.
- [[David Zhang - Building software factories (with no slop)]]: El slop no es un problema de calidad del modelo: aparece cuando la generación no tiene límite y la verificación depende de que una persona lea el código.
- [[distort - Agent Engineering: las 9 capas alrededor del modelo]]: Mapa de las nueve capas que se construyen alrededor del modelo para que un agente trabaje bien sin supervisión.
- [[Felipe Polo - No AI Slop Manifesto]]: Un manifiesto contra el 'AI slop', inspirado en el Manifiesto Ágil, surgido en el AI Engineer Code Summit 2026.
- [[Franco Petruccelli - El CI está hecho para humanos]]: Cuando hay agentes abriendo PRs todo el día, el cuello de botella deja de ser escribir código y pasa a ser confirmar que lo que hicieron funciona.
- [[Félix López - ProtoAIpos]]: Prototipos hechos con IA que parecen terminados pero no tienen lo que hace falta para producción, y cómo organizar el trabajo para convivir con ellos.
- [[Germán Del Zotto - Utilizando la IA en diferentes contextos]]: La misma persona con las mismas herramientas obtiene resultados muy distintos con IA en un proyecto personal y en una empresa grande: el debate depende del contexto.
- [[GitHub - Spec Kit]]: Toolkit open source de GitHub para trabajar con agentes de código siguiendo Spec-Driven Development.
- [[heidrian - Art Movements UX]]: Skill que reemplaza el diseño de UI genérico de los modelos por un kit de diseño derivado de obras de arte elegidas según los problemas del producto.
- [[Henrik - Slides Scrum Day Europe 2025]]: Henrik Kniberg muestra con demos cuánto cambia la IA el ciclo de producto y propone revisar los supuestos de Scrum: quedan los principios, se rediscuten las prácticas.
- [[HumanLayer - Advanced Context Engineering for Coding Agents]]: Los agentes de código rinden mejor cuando se gestiona con cuidado el contexto que reciben.
- [[HumanLayer - Skill Issue: Harness Engineering]]: Muchas fallas de los agentes de código vienen de la configuración, no del modelo.
- [[Jalal Ashrafi - Stop babysitting your PRs]]: Un loop de código determinístico, sin IA, que mueve los PRs de varios agentes: les pide arreglos, gradúa el riesgo y persigue a los revisores.
- [[Josiah Parappally - Cómo despachar cambios con agentes como en Ramp]]: La cadena que permite delegar un cambio a un agente y pasar a otra cosa: entorno, agentes en volumen, CI, revisión con evidencia, merge queue y QA en staging.
- [[Kun Chen - Los cuatro tipos de validación en CI]]: Separar cuatro tipos de validación y correr cada uno en el momento justo, porque correr todo en cada PR no escala a la velocidad de los agentes.
- [[Maggie Appleton - One Developer, Two Dozen Agents, Zero Alignment]]: Los agentes de código están pensados para una persona sola, y el problema ahora es alinearse en equipo.
- [[Mark Ajzenstadt - Prácticas de ingeniería antes que skills y subagentes]]: Lo que hace funcionar a los agentes que escriben código son prácticas de ingeniería de siempre, no más skills y subagentes.
- [[Martin Fowler - Exploring Generative AI]]: Serie viva de notas sobre cómo la IA generativa cambia el desarrollo de software.
- [[Matt Gapp - Por qué el CI se vuelve lento al shippear rápido]]: Por qué el CI se vuelve exponencialmente más lento cuando los agentes multiplican los PRs, y once pasos para acelerarlo.
- [[Mitchell Hashimoto - My AI Adoption Journey]]: Seis pasos con los que un ingeniero escéptico llegó a sacarle valor real a los agentes de código, contados sin hype.
- [[OpenAI - Harness engineering]]: Un equipo de OpenAI construyó un producto interno sin escribir código a mano.
- [[Primo - Cómo evitamos que el AI slop arruine nuestros tests]]: Cómo un equipo argentino-mexicano les enseñó a sus agentes de código a escribir tests que valgan la pena.
- [[Runroom - AI Dojo y antipatrones de Augmented Coding Patterns]]: Una práctica grupal (randori) para construir con Claude y después revisar la sesión contra antipatrones conocidos.
- [[Santi - Flujo para construir software con agentes]]: Un flujo de seis pasos para delegar trabajo de software cada vez más complejo a varios agentes.
- [[Santi - Harness Engineering explicado desde cero]]: Introducción desde cero al harness engineering: las piezas del sistema que rodea al modelo y por qué hay que medirlo y mejorarlo.
- [[Sebastian Raschka - Components of a Coding Agent]]: Qué piezas, además del modelo, hacen funcionar a un agente de código.
- [[Uber - How Uber Evals 1 Million Agent Skill Invocations]]: Cómo Uber distribuye, evalúa y mejora más de 5.000 skills de agentes en toda la empresa.
- [[Uber - Running a Software Factory Efficiently]]: Cómo Uber controla el costo de su fábrica de software con agentes sin frenar la adopción.
- [[Vincent Koc - Making OpenClaw CI faster and 95% cheaper]]: Cómo el proyecto OpenClaw bajó un 95% el costo estimado de CI cuando los agentes multiplicaron tests, jobs y reintentos.
