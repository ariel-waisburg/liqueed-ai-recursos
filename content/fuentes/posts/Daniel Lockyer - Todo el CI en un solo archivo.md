---
title: "CI en un solo archivo .yml"
autor: "Daniel Lockyer (@DanielLockyer)"
tipo: post
plataforma: "x.com"
url: "https://x.com/DanielLockyer/status/2122613581984256128"
idioma: "en"
publicado: "2026-11-17"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
tags:
  - desarrollo-agentico
  - post
  - workflow
estado: resumido
publish: false
---

**Daniel Lockyer (@DanielLockyer)** · post · x.com · 2026-11-17 · [link](https://x.com/DanielLockyer/status/2122613581984256128)

Temas: [[Desarrollo con agentes]]

## En una línea
Recomendación corta: tener todo el CI en un solo archivo de workflow, porque partirlo en varios (lint, test, e2e) suele repetir el mismo trabajo una y otra vez.

## Ideas clave
- Recomienda, salvo excepciones, un solo archivo .yml para todo el CI.
- Muchas configuraciones con varios archivos (lint, test, e2e) son lentas por diseño: cada uno vuelve a hacer el mismo trabajo, como compilar el código.
- Es un cambio que parece menor, pero ataca trabajo duplicado que se paga en cada push.

## Relacionado
- [[Matt Gapp - Por qué el CI se vuelve lento al shippear rápido]]
- [[Kun Chen - Los cuatro tipos de validación en CI]]
