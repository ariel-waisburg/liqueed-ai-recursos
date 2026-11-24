---
title: "Code Mode: the better way to use MCP"
autor: "Kenton Varda y Sunil Pai (Cloudflare)"
tipo: articulo
plataforma: "blog.cloudflare.com"
url: "https://blog.cloudflare.com/code-mode/"
idioma: "en"
publicado: "2025-09-26"
guardado: 2026-11-24
temas:
  - agentes-y-evals
tags:
  - agentes-y-evals
  - articulo
  - agent-engineering
  - context-engineering
estado: resumido
publish: false
---

**Kenton Varda y Sunil Pai (Cloudflare)** · articulo · blog.cloudflare.com · 2025-09-26 · [link](https://blog.cloudflare.com/code-mode/)

Temas: [[Agentes y evals]]

## En una línea
En vez de que el agente llame herramientas MCP una por una, Cloudflare propone convertirlas en una API de TypeScript y dejar que el modelo escriba código que la usa, ejecutado en un sandbox.

## Ideas clave
- Code Mode toma el esquema de un servidor MCP y lo convierte en una API tipada de TypeScript con su documentación. El agente recibe una sola herramienta, "ejecutar código", en lugar de una por cada operación.
- El argumento: los modelos vieron muchísimo código real, pero pocos ejemplos de llamadas a herramientas, que aprendieron con datos sintéticos. Por eso escriben mejor código que llamadas, sobre todo cuando las herramientas son muchas o complejas.
- La ganancia principal está en encadenar llamadas: los resultados intermedios quedan dentro del código y no pasan por el contexto del modelo, que solo lee el resultado final. Eso ahorra tokens y tiempo.
- El código corre en un aislamiento de V8 que se crea y se descarta en milisegundos, sin acceso a internet. Solo puede llamar a los servidores MCP a través del agente, que agrega las credenciales, así que las claves nunca llegan al código generado.
- Limitaciones que reconoce: hoy toda la API se carga en el contexto de entrada, el sandbox de producción estaba en beta cerrada y no publica números de mejora. Además, lo escribe el proveedor que vende la plataforma.

## Relacionado
- [[Uber - Running a Software Factory Efficiently]]
- [[distort - Agent Engineering: las 9 capas alrededor del modelo]]
- [[Sebastian Raschka - Components of a Coding Agent]]
