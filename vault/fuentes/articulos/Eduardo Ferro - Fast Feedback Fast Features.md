---
title: "Fast Feedback, Fast Features: My AI Development Experiment"
autor: "Eduardo Ferro"
tipo: articulo
plataforma: "eferro.net"
url: "https://www.eferro.net/2026/01/fast-feedback-fast-features-my-ai.html"
idioma: "en"
publicado: "2026-01-18"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
tags:
  - calidad-y-evals
  - experimentacion-y-prototipado
perfil:
  - tecnico
  - producto
madurez: escalando
minutos: 13
minutos_origen: medido
estado: resumido
publish: false
---

# Fast Feedback, Fast Features: My AI Development Experiment

**Eduardo Ferro** · articulo · eferro.net · 2026-01-18 · [link](https://www.eferro.net/2026/01/fast-feedback-fast-features-my-ai.html)

Temas: [[Desarrollo con agentes]]

## Por qué lo guardé
Nos pareció muy bueno lo que escribió Edu (Eduardo Ferro) en España: un experimento medido sobre qué pasa cuando se usa la IA no para salir más rápido, sino para construir mejor.

## En una línea
Un engineering manager midió 424 commits en 11 semanas de desarrollo asistido por IA, en sistemas internos reales, y encontró que la velocidad sostenible salió de invertir en tests, documentación, simplificación y feedback rápido, no de escribir features más rápido.

## Ideas clave
- El contexto importa: no es un dev full-time, sino un manager que además actúa como PM del equipo de plataforma, programando en los huecos entre reuniones, sobre sistemas internos de producción (no de máxima criticidad). Entre noviembre de 2025 y enero de 2026 hizo 424 commits en 6 repositorios y 44 días activos, con asistencia de IA en todo el código, a un ritmo de 9,6 commits por día (casi el doble de su ritmo histórico).
- Por cada hora de funcionalidad nueva, dedicó más de cuatro a lo que llama sostenibilidad: tests (30,7%), documentación, limpieza, infraestructura, refactor, configuración y seguridad. La funcionalidad aparece en el 22,7% de los commits y la sostenibilidad en el 98,3%, porque un mismo commit suele incluir las dos cosas.
- El 40,9% de las líneas cambiadas fueron borrados (55.407 de 135.485). En algunos repos el código neto se achicó. Argumenta que cada línea tiene un costo basal de mantenimiento, y que con IA borrar features que no aportan (antes caro: entender código viejo, dependencias, tests incompletos) pasa a ser viable de forma rutinaria.
- Su tesis no es que la IA invente las buenas prácticas: tests, documentación y loops de feedback ya importaban. Lo que cambió es la economía: se volvió posible sostener esa disciplina con tiempo limitado. La disciplina sigue siendo humana; el default sigue siendo "salir más rápido" hasta que la deuda lo impide.
- Distingue velocidad de velocity: un equipo que sale muy rápido sin tests se mueve hacia un rewrite; el ratio adecuado depende del contexto (en sus repos va de 0,09:1 a 0,42:1). No presenta el 0,23:1 como receta universal, sino como lo que le funcionó en 11 semanas, en su rol y en ese tipo de sistemas.

## Relacionado
- [[Mitchell Hashimoto - My AI Adoption Journey]]
- [[Primo - Cómo evitamos que el AI slop arruine nuestros tests]]
- [[Matt Pocock - Full Walkthrough Workflow for AI Coding]]

## Mis notas


## Texto original
_(Resumido a partir del artículo completo en eferro.net, 18 de enero de 2026.)_
