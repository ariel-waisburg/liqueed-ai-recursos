---
title: "Harness design for long-running application development"
autor: "Prithvi Rajasekaran (Anthropic)"
tipo: articulo
plataforma: "anthropic.com"
url: "https://www.anthropic.com/research/harness-design-long-running-apps"
idioma: "en"
publicado: "2026-03-24"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
  - agentes-y-evals
tags:
  - harness-engineering
  - agent-engineering
estado: resumido
publish: false
---

# Harness design for long-running application development

**Prithvi Rajasekaran (Anthropic)** · articulo · anthropic.com · 2026-03-24 · [link](https://www.anthropic.com/research/harness-design-long-running-apps)

Temas: [[Desarrollo con agentes]] · [[Agentes y evals]]

## Por qué lo guardé
_(completar)_

## En una línea
Cómo Anthropic armó un "harness" de tres agentes (planificador, generador y evaluador) para que Claude construya aplicaciones completas en corridas autónomas de varias horas, y por qué hay que simplificarlo a medida que mejoran los modelos.

## Ideas clave
- Cada pieza del harness representa un supuesto sobre algo que el modelo no puede hacer solo. Por eso, con cada modelo nuevo conviene revisar el harness y sacar lo que ya no hace falta.
- Dos problemas de las tareas largas: el modelo pierde coherencia a medida que se llena el contexto (y a veces apura el cierre), y se evalúa mal a sí mismo, elogiando trabajo mediocre. Es más fácil tener un evaluador separado y escéptico que volver autocrítico al generador.
- La arquitectura: un planificador convierte un pedido de pocas líneas en una especificación de producto; un generador construye por sprints con git; y antes de cada sprint generador y evaluador acuerdan un "contrato" con criterios verificables de terminado. El evaluador prueba la app como un usuario y los agentes se comunican por archivos.
- Para volver evaluable algo como el diseño, definieron criterios (calidad de diseño, originalidad, oficio, funcionalidad) con ejemplos calibrados, y les dieron más peso a los dos primeros para alejarse del "AI slop".
- El costo de la calidad: Opus solo hizo un juego en 20 minutos por 9 dólares, pero la función central no andaba. Con el harness completo tardó 6 horas y costó 200 dólares, y el juego funcionaba.
- Con modelos más nuevos sacaron los sprints y dejaron el evaluador como una sola pasada al final. Así armaron un editor de audio en menos de 4 horas, y la revisión igual encontró funciones incompletas.

## Relacionado
- [[OpenAI - Harness engineering]]
- [[Birgitta Böckeler - Harness engineering for coding agent users]]
- [[Anthropic - Effective context engineering for AI agents]]

## Mis notas


## Texto original
_(Resumido a partir del artículo completo.)_
