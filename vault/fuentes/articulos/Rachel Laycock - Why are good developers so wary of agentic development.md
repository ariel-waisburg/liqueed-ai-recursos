---
title: "Why are good developers so wary of agentic development?"
autor: "Rachel Laycock (Thoughtworks)"
tipo: articulo
plataforma: "martinfowler.com"
url: "https://martinfowler.com/rachels-ramblings/good-devs-wary.html"
idioma: "en"
publicado: "2026-10-29"
guardado: 2026-11-25
temas:
  - desarrollo-agentico
  - adopcion-ia
tags:
  - cultura-y-cambio
  - liderazgo
  - calidad-y-evals
perfil:
  - tecnico
  - cultura-organizacion
madurez: experimentando
valor: concepto
esfuerzo: 10-30min
minutos: 10
minutos_origen: medido
estado: resumido
publish: false
---

# Why are good developers so wary of agentic development?

**Rachel Laycock (Thoughtworks)** · articulo · martinfowler.com · 2026-10-29 · [link](https://martinfowler.com/rachels-ramblings/good-devs-wary.html)

Temas: [[Desarrollo con agentes]] · [[Adopción de IA en organizaciones]]

## Por qué lo guardé
Lo recomendamos a quienes lideran la adopción: ayuda a entender la cautela de los mejores desarrolladores en lugar de descalificarla. Para ellos, que algo esté construido no significa que funcione en producción.

## En una línea
La CTO de Thoughtworks explica por qué los buenos developers frenan con los agentes: no es que extrañen escribir código o teman por el trabajo, es que "built isn't the same as working in production".

## Ideas clave
- La cautela no es a usar un asistente, es a soltar el volante y dejar que los agentes ejecuten todo, porque todavía no hay confianza en que los guardrails alcancen.
- En un experimento interno de una semana, nadie escribió código: todo lo construyeron agentes. El equipo pasó cerca de dos tercios del tiempo en el pizarrón (dominio, límites, planes) y un tercio en el harness (tests, contratos, arquitectura, pipeline) para tener más confianza en la siguiente corrida.
- La aplicación corría, pero el build estaba en rojo con frecuencia. Un rojo constante deja de significar "pará y arreglálo", y un verde tampoco tranquiliza. Laycock cita a DORA 2025: más adopción de IA se asocia a más throughput y a menos estabilidad.
- Quedan preguntas abiertas: qué rol tiene TDD si el agente escribe también los tests, qué tamaño de lote aguanta el CI, cuánta diseño hace falta antes de soltar un agente.
- La analogía: no es un principiante en la pista escuela; es alguien que mira un terreno sin marcar y pregunta por la ruta. A los líderes les pide tiempo y permiso para experimentar, sin medir el éxito por cuánto código produjeron los agentes. A los developers, traer su juicio a esos experimentos y estar dispuestos a revisar supuestos.

## Relacionado
- [[Primo - Cómo evitamos que el AI slop arruine nuestros tests]]
- [[Mark Ajzenstadt - Prácticas de ingeniería antes que skills y subagentes]]
- [[Matt Pocock - Full Walkthrough Workflow for AI Coding]]

## Mis notas


## Texto original
Resumido a partir del artículo completo en martinfowler.com.
