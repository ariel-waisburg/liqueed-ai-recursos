---
title: "CI becomes exponentially slower as you increase PR velocity. Here's how to speed it up."
autor: "Matt Gapp (@mattgapp)"
tipo: articulo-x
plataforma: "x.com"
url: "https://x.com/mattgapp/status/2122457922601198074"
idioma: "en"
publicado: "2026-11-16"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
tags:
  - workflows-con-agentes
  - costos-ia
estado: resumido-parcial
publish: false
---

# CI becomes exponentially slower as you increase PR velocity. Here's how to speed it up.

**Matt Gapp (@mattgapp)** · articulo-x · x.com · 2026-11-16 · [link](https://x.com/mattgapp/status/2122457922601198074)

Temas: [[Desarrollo con agentes]]

## Por qué lo guardé
_(completar)_

## En una línea
Guía, armada a partir de cientos de posts y blogs de equipos que midieron sus cambios, sobre por qué el CI se vuelve exponencialmente más lento cuando los agentes multiplican los PRs y qué hacer, en orden, para acelerarlo.

## Ideas clave
- El tiempo de CI es el producto de tres números: pushes, corridas por push y minutos por corrida. Shippear más rápido sube los tres a la vez.
- Algunas cosas crecen más rápido que eso: exigir que cada rama esté al día con main hace que cada merge vuelva vieja a todas las demás, así que las corridas de "ponerse al día" crecen con el cuadrado de la tasa de merges. También pesan las colas de máquinas cerca del límite, los tests flaky, una corrida roja que frena a todos los de atrás, los caches que se invalidan y agentes que pushean mucho más seguido.
- Once pasos en orden: medir primero, hacer menos trabajo por push, cortar las corridas de "ponerse al día" (con una merge queue que prueba cada PR sobre main una sola vez), arreglar los caches, recortar el setup, usar todos los núcleos antes de partir en shards, cambiar a herramientas más rápidas midiendo el job completo, comprar máquinas al final, tratar cada test flaky como un bug con dueño y recién después revisar el camino al merge.
- A los agentes hay que sacarles el hábito de actualizar la rama: un equipo quitó ese comando de los que pueden correr sin pedir permiso.
- Si un agente optimiza el CI, hay que darle un solo número para mover, un piso (por ejemplo, no bajar la cantidad de tests, para que no "acelere" borrándolos), medir en el CI real y no en la laptop, y ponerle un tope de gasto.

## Relacionado
- [[Vincent Koc - Making OpenClaw CI faster and 95% cheaper]]
- [[Kun Chen - Los cuatro tipos de validación en CI]]
- [[Daniel Lockyer - Todo el CI en un solo archivo]]

## Mis notas


## Texto original
_(Artículo de X. Resumido a partir de su estructura completa y de algunas secciones leídas enteras. El resto de las secciones y el checklist final no se leyeron completos.)_
