---
title: "I left Ramp and spent eight months rebuilding the setup I couldn’t live without."
autor: "Josiah Parappally (@josiah_arcanist)"
tipo: articulo-x
plataforma: "x.com"
url: "https://x.com/josiah_arcanist/status/2121321789192081583"
idioma: "en"
publicado: "2026-11-13"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
tags:
  - workflows-con-agentes
  - harness-engineering
perfil:
  - tecnico
madurez: escalando
minutos: 8
minutos_origen: estimado
estado: resumido-parcial
publish: false
---

**Josiah Parappally (@josiah_arcanist)** · articulo-x · x.com · 2026-11-13 · [link](https://x.com/josiah_arcanist/status/2121321789192081583)

Temas: [[Desarrollo con agentes]]

## En una línea
Un ex ingeniero de Ramp describe la cadena que le permite delegar un cambio a un agente y pasar a la tarea siguiente, en vez de pasarse el día respondiéndole: entorno, agentes en volumen, CI, revisión, merge queue y QA después del merge.

## Ideas clave
- Parte de un dato que atribuye a Anthropic: los agentes pasan cerca del 80% de una sesión interactiva esperando a una persona.
- El agente tiene que poder levantar la aplicación y verificar su trabajo solo, con un único comando que arranque todo lo necesario.
- Para correr agentes en volumen usa modelos más baratos para tareas específicas y otros agentes que revisan su trabajo. El CI tiene que acompañar: muchos PRs no sirven si los clientes esperan horas para recibir los cambios.
- A quien revisa le pide evidencia de que cada bug reportado es real, para no perder tiempo con hallazgos especulativos o menores. La merge queue prueba juntos los cambios que por separado andan bien.
- Después del merge, un agente de QA prueba en staging las integraciones que no se pueden probar en el sandbox, y si algo falla vuelve al agente que escribió el código. La persona se queda con decidir qué construir y si resuelve el problema del cliente.
- El post termina presentando el producto del autor (Arcanist), que simula los flujos afectados por un cambio con datos de prueba.

## Relacionado
- [[Jalal Ashrafi - Stop babysitting your PRs]]
- [[Calvin Grunewald - A Look Inside the Factory]]
- [[Matt Gapp - Por qué el CI se vuelve lento al shippear rápido]]
