---
title: "Cuándo usar un workflow y cuándo un agente"
autor: "santi (@santtiagom_)"
tipo: post
plataforma: "x.com"
url: "https://x.com/santtiagom_/status/2123926767786213432"
idioma: "es"
publicado: "2026-11-20"
guardado: 2026-11-25
temas:
  - agentes-y-evals
  - desarrollo-agentico
tags:
  - workflows-con-agentes
  - agent-engineering
perfil:
  - tecnico
  - producto
madurez: explorando
valor: framework
esfuerzo: "<10min"
estado: resumido
publish: false
---

**santi (@santtiagom_)** · post · x.com · 2026-11-20 · [link](https://x.com/santtiagom_/status/2123926767786213432)

Temas: [[Agentes y evals]] · [[Desarrollo con agentes]]

## Por qué lo guardé
Lo recomendamos como una explicación corta y clara, en español, para perfiles técnicos y de producto que arrancan: la diferencia entre un workflow y un agente está en quién decide el siguiente paso. Ya hay otras dos fichas suyas en el repositorio; esta cubre justo esa decisión de diseño.

## En una línea
Un criterio simple para elegir entre un workflow y un agente: si los pasos se pueden fijar de antemano, mejor un workflow; si el camino depende de lo que vas encontrando, entra el agente.

## Ideas clave
- En un workflow, una persona define la secuencia en el código. Se pueden usar LLMs en distintas etapas, pero el flujo de ejecución está predefinido.
- En un agente, el modelo decide qué hacer después según lo que recibe: puede elegir tools, mirar resultados y repetir hasta terminar la tarea.
- Ejemplo: procesar una factura (extraer, validar, guardar) entra bien en un workflow. Investigar por qué una factura tiene un error —consultar logs, revisar operaciones, decidir qué mirar según lo que aparezca— pide un agente.
- Si los pasos son conocidos y se parecen de un caso a otro, el workflow es más fácil de probar, controlar y depurar. La flexibilidad del agente tiene costo: más llamadas al modelo, más latencia y más chances de error.
- La clave, en sus palabras, es "darle autonomía al modelo solo cuando realmente la necesitás". Cuanto más se pueda resolver con lógica definida en código, más fácil va a ser controlar, probar y mantener el sistema.

## Relacionado
- [[Santi - Flujo para construir software con agentes]]
- [[Santi - Harness Engineering explicado desde cero]]
- [[OpenAI - A practical guide to building agents]]
