---
title: "Long-horizon agents and durable execution"
autor: "Kiran Prakash (Thoughtworks)"
tipo: articulo
plataforma: "martinfowler.com"
url: "https://martinfowler.com/articles/durable-execution-agents.html"
idioma: "en"
publicado: "2026-11-10"
guardado: 2026-11-25
temas:
  - agentes-y-evals
tags:
  - agent-engineering
perfil:
  - tecnico
madurez: escalando
valor: aplicado
esfuerzo: 30-90min
estado: resumido
publish: false
---

**Kiran Prakash (Thoughtworks)** · articulo · martinfowler.com · 2026-11-10 · [link](https://martinfowler.com/articles/durable-execution-agents.html)

Temas: [[Agentes y evals]]

## Por qué lo guardé
Lo recomendamos para arquitectos que llevan agentes a procesos de negocio reales. Los agentes que trabajan durante días o semanas, interactuando con personas y sistemas externos, se caen en el camino. El artículo explica la "durable execution", un patrón para que se recuperen sin repetir pasos ni perder estado.

## En una línea
Cómo hacer que un agente de horizonte largo —el que espera días a una persona o a un sistema— se recupere de una falla sin repetir lo que ya hizo ni perder el hilo.

## Ideas clave
- Un agente de horizonte largo no es el que "no se interrumpe": es el que persigue un resultado a lo largo de muchos turnos, con esperas de días o semanas (onboarding de clientes, un trato trabado entre ventas, legal y compras, un recorrido clínico de turnos y papeles).
- En ese tiempo fallan procesos, la red y el mundo real. La ejecución durable registra el resultado de cada paso que toca el exterior; si hay una falla, el programa vuelve a correr, saltea lo ya hecho y reconstruye el estado a partir de ese registro.
- Esperar a personas o sistemas no debería consumir cómputo: el flujo se duerme y se despierta con un evento. Las llamadas que fallan se reintentan al menos una vez, con cuidado de no duplicar efectos.
- Durable no es lo mismo que correcto: el agente puede no ver un resultado, el mundo puede cambiar mientras espera, y el código puede cambiar debajo de una tarea que sigue corriendo.
- Hay que separar lo que el agente guarda como memoria de lo que el modelo ve en cada turno, y ser explícitos en el texto que lo guía. El artículo sitúa el patrón en runtimes como Temporal, Cloudflare, Restate, Inngest y DBOS.

## Relacionado
- [[Anthropic - Building always-on agents]]
- [[Anthropic - Harness design for long-running apps]]
