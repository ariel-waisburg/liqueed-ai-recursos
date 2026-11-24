---
title: "Los cuatro tipos de validación en CI"
autor: "Kun Chen (@kunchenguid)"
tipo: post
plataforma: "x.com"
url: "https://x.com/kunchenguid/status/2122391325081579618"
idioma: "en"
publicado: "2026-11-16"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
tags:
  - workflows-con-agentes
  - calidad-y-evals
estado: resumido
publish: false
---

**Kun Chen (@kunchenguid)** · post · x.com · 2026-11-16 · [link](https://x.com/kunchenguid/status/2122391325081579618)

Temas: [[Desarrollo con agentes]]

## En una línea
Para que el CI aguante el ritmo de los agentes, hay que separar cuatro tipos de validación y correr cada uno en su momento, en vez de correr todo en cada PR.

## Ideas clave
- Hay cuatro preguntas distintas: si el código sigue las reglas, si el cambio funciona, si todo main funciona y si el producto está listo para salir. Muchos equipos corren las cuatro en cada PR, y eso deja de escalar cuando cada persona mergea decenas de PRs por día con agentes.
- Comprar más minutos o un CI más rápido es una batalla perdida.
- En cada PR, solo las dos primeras: reglas (compilar y lint, que también pueden ir en hooks de pre-commit) y los tests relacionados con el cambio. Propone darle un presupuesto fijo, por ejemplo 5 minutos, y pedirle a un agente que lo optimice cuando se pase.
- La suite completa va en la merge queue o en un pipeline después del push. Main puede romperse de vez en cuando y está bien: se arregla hacia adelante, y los agentes lo hacen rápido. Solo se publican releases desde commits que pasaron la suite completa.
- La salida a producción se maneja con feature gates y rollouts graduales (por ejemplo al 5% de los usuarios), avanzando solo cuando la telemetría da bien.

## Relacionado
- [[Matt Gapp - Por qué el CI se vuelve lento al shippear rápido]]
- [[Vincent Koc - Making OpenClaw CI faster and 95% cheaper]]
- [[Jalal Ashrafi - Stop babysitting your PRs]]
