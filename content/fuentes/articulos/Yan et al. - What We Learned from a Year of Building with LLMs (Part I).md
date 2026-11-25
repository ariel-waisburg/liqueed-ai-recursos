---
title: "What We Learned from a Year of Building with LLMs (Part I)"
autor: "Eugene Yan, Bryan Bischof, Charles Frye, Hamel Husain, Jason Liu y Shreya Shankar"
tipo: articulo
plataforma: "oreilly.com"
url: "https://www.oreilly.com/radar/what-we-learned-from-a-year-of-building-with-llms-part-i/"
idioma: "en"
publicado: "2024-05-28"
guardado: 2026-11-24
temas:
  - agentes-y-evals
  - desarrollo-agentico
tags:
  - calidad-y-evals
  - context-engineering
  - workflows-con-agentes
estado: resumido
publish: false
---

**Eugene Yan, Bryan Bischof, Charles Frye, Hamel Husain, Jason Liu y Shreya Shankar** · articulo · oreilly.com · 2024-05-28 · [link](https://www.oreilly.com/radar/what-we-learned-from-a-year-of-building-with-llms-part-i/)

Temas: [[Agentes y evals]] · [[Desarrollo con agentes]]

## Por qué lo guardé
Lo sumamos porque condensa, con mucha claridad práctica, lo que un grupo de practicantes aprendió construyendo productos reales con LLM durante un año: no es una demo, es el oficio táctico que suele faltar cuando una empresa pasa del prototipo a algo que aguanta en producción.

## En una línea
Primera parte (táctica) de una serie de O’Reilly con prácticas concretas sobre prompting, RAG, flujos de trabajo y evaluación, escritas por seis personas que construyeron aplicaciones reales con LLM.

## Ideas clave
- El prompting sigue importando, pero no alcanza solo: conviene arrancar con técnicas básicas bien hechas (varios ejemplos representativos, cadena de pensamiento específica para la tarea, y recursos que el modelo deba priorizar) y, al mismo tiempo, ingeniería alrededor del prompt. Recomiendan prompts chicos que hagan una sola cosa bien, y cuidar los tokens de contexto.
- En RAG, la calidad de la respuesta depende sobre todo de la calidad de lo recuperado. No hay que olvidar la búsqueda por palabras clave ni las búsquedas híbridas; prefieren RAG al fine-tuning cuando lo que hace falta es conocimiento nuevo; y advierten que los modelos de contexto largo no vuelven obsoleto al RAG.
- Los flujos de varios pasos (lo que llaman flow engineering) pueden dar saltos grandes de calidad. Por ahora priorizan flujos determinísticos, recomiendan no subestimar el caché (baja costo, latencia y riesgo) y dejar el fine-tuning para cuando realmente hace falta.
- La evaluación es el diferenciador: tests con aserciones a partir de ejemplos reales de entrada y salida, "LLM-as-judge" con reservas, y una prueba sencilla (el "intern test": si una persona junior no podría hacer la tarea con el mismo contexto, el sistema tampoco). Alertan que obsesionarse con una métrica puede empeorar el producto, y que las alucinaciones siguen siendo un problema difícil.
- Esta es la parte táctica de una serie de tres. La II cubre lo operativo y la III lo estratégico; juntas están pensadas como una guía práctica, no como un paper.

## Recursos complementarios
- [Part II](https://www.oreilly.com/radar/what-we-learned-from-a-year-of-building-with-llms-part-ii/) (operativa) y [Part III](https://www.oreilly.com/radar/what-we-learned-from-a-year-of-building-with-llms-part-iii/) (estratégica).

## Relacionado
- [[Vercel - Agents are users, so your software needs evals]]
- [[Anthropic - Effective context engineering for AI agents]]
- [[HumanLayer - Advanced Context Engineering for Coding Agents]]
