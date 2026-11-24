---
title: "Running a Software Factory Efficiently at Uber Scale"
autor: "Uday Kiran Medisetty (Uber)"
tipo: articulo
plataforma: "uber.com"
url: "https://www.uber.com/us/en/blog/efficient-software-factory/"
idioma: "en"
publicado: "2026-08-27"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
  - agentes-y-evals
tags:
  - desarrollo-agentico
  - agentes-y-evals
  - articulo
  - costos-ia
  - context-engineering
estado: resumido
publish: false
---

**Uday Kiran Medisetty (Uber)** · articulo · uber.com · 2026-08-27 · [link](https://www.uber.com/us/en/blog/efficient-software-factory/)

Temas: [[Desarrollo con agentes]] · [[Agentes y evals]]

## En una línea
Cómo Uber trata el costo de su "fábrica de software" con agentes como un problema de ingeniería: lo descompone en factores medibles y recorta desperdicio sin frenar la adopción.

## Ideas clave
- Uber llama "fábrica de software" a su ciclo de desarrollo con agentes. Más del 70% de los PRs ya vienen de agentes, y cada vez más sesiones las arrancan agentes gestionados: revisión de código, CI que se arregla solo, triage de alertas y mantenimiento, con personas que revisan o escalan.
- Descompone el gasto como un producto: usuarios × sesiones por usuario × turnos por sesión × pedidos por turno × tokens por pedido × precio por token. Los factores de adopción se dejan crecer; donde se optimiza es en lo que el agente hace por su cuenta.
- Entre febrero y agosto de 2026, los usuarios activos de agentes se multiplicaron por 7 mientras el gasto se estabilizó. Con el mismo modelo, el costo por sesión bajó 52% desde el pico.
- Las palancas principales fueron cargar menos herramientas en el contexto y darle mejor contexto al agente. Los esquemas MCP completos costaban 50-70 mil tokens por sesión: pasaron a exponer herramientas como comandos y búsqueda bajo demanda, con un "code mode" que junta varias llamadas en un script.
- Un agente sin contexto "falla lento, no barato". Un grafo de contexto interno, alimentado por más de 30 sistemas, hizo que una consulta tardara 38 segundos y saliera bien, contra más de 20 minutos y mal sin él.
- Cada agente gestionado tiene su propio benchmark con trabajo real, y se elige el modelo con mejor relación costo-calidad. Los subagentes usan un modelo más barato y el principal planifica y revisa. Además hay contador de costo en vivo y alertas por gasto.

## Relacionado
- [[Uber - How Uber Evals 1 Million Agent Skill Invocations]]
- [[Cloudflare - Code Mode]]
- [[David Zhang - Building software factories (with no slop)]]
