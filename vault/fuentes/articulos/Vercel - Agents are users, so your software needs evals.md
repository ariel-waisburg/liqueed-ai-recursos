---
title: "Agents are users, so your software needs evals"
autor: "George Fahmy y Yury Selivanov (Vercel)"
tipo: articulo
plataforma: "vercel.com"
url: "https://vercel.com/blog/agent-evals"
idioma: "en"
publicado: "2026-11-16"
guardado: 2026-11-18
temas:
  - agentes-y-evals
tags:
  - calidad-y-evals
perfil:
  - tecnico
madurez: escalando
minutos: 21
minutos_origen: medido
estado: resumido
publish: false
---

# Agents are users, so your software needs evals

**George Fahmy y Yury Selivanov (Vercel)** · articulo · vercel.com · 2026-11-16 · [link](https://vercel.com/blog/agent-evals)

Temas: [[Agentes y evals]]

## Por qué lo guardé
_(completar)_

## En una línea
Si los agentes usan tu software en nombre de las personas, hay que medir qué tan bien completan tareas con él.

## Ideas clave
- Embudo de adopción por agentes: descubrimiento, selección, acceso y éxito. El artículo se centra en el éxito: que la tarea quede bien hecha, no solo sin errores.
- Como los resultados varían entre corridas, una prueba que pasa dice poco: hay que correr las mismas tareas muchas veces y puntuar, antes y después de cada cambio.
- Pirámide de testing agéntico: tests deterministas (sin LLM), evals de un turno y evals de punta a punta. Usá el nivel más barato que detecte el problema.
- Métricas: tasa de éxito; pass@k (¿puede hacerlo alguna vez?); pass^k (¿lo hace siempre?). La métrica depende de cuánto le cuesta el error al usuario.
- Diseño de tareas: instrucción, entorno inicial fijo, verificador, edge cases y al menos un pedido donde lo correcto es negarse.
- Leer las trazas, no solo los puntajes: los puntajes dicen cuánto falla, las trazas dicen por qué. Un 'pass' solo significa que el verificador quedó conforme.

> [!note] Nota de captura
> Usan Harbor, un framework open source para correr agentes en contenedores.

## Relacionado
- [[Anthropic - Building always-on agents]]
- [[Primo - Cómo evitamos que el AI slop arruine nuestros tests]]

## Mis notas


## Texto original
_(Pegá acá el texto completo, o guardalo con el Web Clipper.)_
