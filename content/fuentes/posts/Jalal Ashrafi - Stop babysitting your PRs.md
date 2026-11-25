---
title: "Stop babysitting your PRs"
autor: "Jalal Ashrafi (@jalalash)"
tipo: articulo-x
plataforma: "x.com"
url: "https://x.com/jalalash/status/2122066461007175851"
idioma: "en"
publicado: "2026-11-15"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
tags:
  - workflows-con-agentes
  - delegacion-y-supervision
perfil:
  - tecnico
madurez: experimentando
minutos: 8
minutos_origen: estimado
estado: resumido-parcial
publish: false
---

**Jalal Ashrafi (@jalalash)** · articulo-x · x.com · 2026-11-15 · [link](https://x.com/jalalash/status/2122066461007175851)

Temas: [[Desarrollo con agentes]]

## En una línea
Cómo un ingeniero dejó de "cuidar" a mano los PRs de sus agentes con un loop simple de código determinístico, sin IA, que en pocas semanas movió 129 PRs.

## Ideas clave
- Números del loop en unas semanas: 129 PRs, 118 pedidos de arreglo a los agentes, 125 revisiones y 24 recordatorios a revisores. Siguió funcionando el día que el autor no trabajó.
- Separa dos trabajos: construir PRs (lo hacen agentes en distintos equipos, con dueños claros por área) y cuidarlos hasta el merge.
- El loop no usa modelos: cada pocos minutos toma una foto de todos los PRs abiertos, pone cada uno en un único estado y dispara la acción que corresponde.
- Todo lo que crea un agente lleva una firma que dice qué agente lo hizo, y el riesgo de cada PR lo declara el agente que lo construyó, en la descripción.
- El loop también persigue a los revisores y ordena los PRs de otros que le piden revisar, lo que le saca a la persona la parte más tediosa de esperar y recordar.

## Relacionado
- [[Calvin Grunewald - A Look Inside the Factory]]
- [[Josiah Parappally - Cómo despachar cambios con agentes como en Ramp]]
- [[Kun Chen - Los cuatro tipos de validación en CI]]
