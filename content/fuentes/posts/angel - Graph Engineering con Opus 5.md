---
title: "Graph Engineering con Opus 5"
autor: "angel (@angeldot_)"
tipo: articulo-x
plataforma: "X"
url: "https://x.com/angeldot_/status/2081061068516798931"
idioma: "es"
publicado: "2026-07-25"
guardado: 2026-11-18
temas:
  - agentes-y-evals
tags:
  - agent-engineering
  - workflows-con-agentes
  - costos-ia
estado: resumido-parcial
publish: false
---

**angel (@angeldot_)** · articulo-x · X · 2026-07-25 · [link](https://x.com/angeldot_/status/2081061068516798931)

Temas: [[Agentes y evals]]

## En una línea
Un recorrido de 14 pasos para dejar de encadenar los pasos de un agente en fila y pensar el trabajo como un grafo que reparte tareas en paralelo entre varios agentes, verifica lo que sale y controla el costo.

## Ideas clave
- La mayoría de los agentes de varios pasos son una fila: cada paso espera al anterior aunque no use su resultado. La primera pregunta es qué pasos dependen de verdad de otro; si no leen esa salida, la espera es tiempo tirado.
- Cada nodo es un encargo con un contrato (una salida con forma definida), y cada arista es lo que pasa de un nodo a otro. Mover datos entre pasos lo puede hacer el código: los agentes son para el criterio, no para la "fontanería".
- Para mover una flota: abrir en paralelo lo que no depende entre sí, juntar los resultados solo cuando una etapa los necesita todos, y dejar que el modelo clasifique pero que el código decida a dónde va cada cosa.
- Para confiar en el resultado: verificar cada hallazgo antes de pasarlo, aislar los nodos para que un fallo no contamine el resto (un solo escritor por archivo) y poner un tope de rondas a todo ciclo.
- Para que no salga caro: el modelo caro solo donde hay criterio en juego, y la forma del grafo define el costo y la latencia. Cuando el trabajo cambia en cada ejecución, conviene describirle la tarea a Claude y dejar que él arme el grafo.

## Relacionado
- [[distort - Agent Engineering: las 9 capas alrededor del modelo]]
- [[Cloudflare - Code Mode]]
- [[Uber - Running a Software Factory Efficiently]]
