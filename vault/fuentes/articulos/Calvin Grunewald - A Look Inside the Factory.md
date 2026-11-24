---
title: "A Look Inside the Factory"
autor: "Calvin Grunewald"
tipo: articulo
plataforma: "The Building Machine (Substack)"
url: "https://thebuildingmachine.com/p/a-look-inside-the-factory"
idioma: "en"
publicado: "2026-11-19"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
  - agentes-y-evals
tags:
  - desarrollo-agentico
  - agentes-y-evals
  - articulo
  - harness-engineering
  - human-in-the-loop
  - workflow
estado: resumido
publish: false
---

# A Look Inside the Factory

**Calvin Grunewald** · articulo · The Building Machine (Substack) · 2026-11-19 · [link](https://thebuildingmachine.com/p/a-look-inside-the-factory)

Temas: [[Desarrollo con agentes]] · [[Agentes y evals]]

## Por qué lo guardé
_(completar)_

## En una línea
Un ingeniero cuenta cómo armó su propio harness y lo convirtió en una "fábrica de software" que transforma objetivos aprobados por una persona en PRs mergeados: arquitectura, números de casi tres meses en uso y las lecciones sobre cuándo tiene que intervenir un humano.

## Ideas clave
- Parte de una hipótesis: un harness se copia fácil, así que no es una ventaja duradera. Para probarlo, en junio de 2026 armó uno propio con un agente: Codex convirtió una lista de funciones de Claude Code en unas 188 tareas con criterios de aceptación, y el harness se construyó en unos dos días (146 commits).
- Arquitectura: un "overseer" convierte el objetivo aprobado en un grafo de tareas con dependencias; cada "worker" escribe código en su propio worktree; un daemon local corre lint, tests, chequeos de políticas y una revisión adversarial con varios agentes antes de abrir el PR, y después lo sigue entre fallas de CI, comentarios y conflictos.
- La unidad de trabajo es la tarea, no el plan ni el prompt: es más fácil de revisar, verificar y auditar, y entra mejor en la ventana de contexto. Cada tarea lleva criterios de aceptación y dependencias. La política de orquestación vive en archivos de configuración y el mecanismo en código, así se pueden correr evals cambiando solo la configuración.
- Números: 1.940 PRs mergeados desde el 21 de agosto, con un pico de 251 en una semana. En una eval con 19 casos, la configuración actual arregló todos los hallazgos de severidad alta y media sin regresiones, a unos USD 2,98 por hallazgo alto. Un modelo más barato costaba USD 0,85, pero en un caso borró algo que no debía.
- Human-in-the-loop: corriendo 24/7, los workers mandaron 151 pedidos de decisión en unas 21 horas, y hubo tareas pausadas semanas sin motivo. Tardó seis iteraciones en ajustarlo. Quedaron solo seis tipos de decisión para la persona: credenciales, gasto, infraestructura en vivo (incluidos los merges), acciones irreversibles, decisiones de producto y lo que la tarea marque como que necesita aprobación. El resto lo decide el overseer y lo registra.
- El cuello de botella terminó siendo el cómputo, no el modelo: una laptop aguantaba unos cuatro workers y cuatro trabajos del daemon a la vez, y también aparecieron límites de la API de GitHub y timeouts de CI. Ahora lo está llevando a la nube, y deja abiertas preguntas sobre quién es el autor de un PR y qué hacen los ingenieros cuando una máquina convierte tareas en PRs.

## Relacionado
- [[Uber - Running a Software Factory Efficiently]]
- [[David Zhang - Building software factories (with no slop)]]
- [[Anthropic - Harness design for long-running apps]]

## Mis notas


## Texto original
_(Resumido a partir del texto completo del artículo.)_
