---
title: "Effective context engineering for AI agents"
autor: "Prithvi Rajasekaran, Ethan Dixon, Carly Ryan y Jeremy Hadfield (Anthropic)"
tipo: articulo
plataforma: "anthropic.com"
url: "https://www.anthropic.com/research/effective-context-engineering-for-ai-agents"
idioma: "en"
publicado: "2025-09-29"
guardado: 2026-11-24
temas:
  - agentes-y-evals
  - desarrollo-agentico
tags:
  - context-engineering
  - agent-engineering
perfil:
  - tecnico
madurez: escalando
minutos: 14
minutos_origen: medido
estado: resumido
publish: false
---

**Prithvi Rajasekaran, Ethan Dixon, Carly Ryan y Jeremy Hadfield (Anthropic)** · articulo · anthropic.com · 2025-09-29 · [link](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents)

Temas: [[Agentes y evals]] · [[Desarrollo con agentes]]

## En una línea
Guía de Anthropic sobre "context engineering": elegir en cada paso el conjunto más chico de información útil que ve el modelo, porque el contexto es un presupuesto de atención que rinde peor cuanto más se llena.

## Ideas clave
- El context engineering es el paso siguiente al prompt engineering. No se trata solo de escribir instrucciones: se cura todo lo que entra al modelo (instrucciones, herramientas, datos externos, historial) y se hace de nuevo en cada paso.
- Cuanto más contexto, peor recuerda el modelo ("context rot"). La degradación es gradual, no un corte, y cada token gasta parte de un presupuesto de atención limitado.
- El prompt de sistema tiene que estar a la "altura" justa: ni reglas rígidas tipo si-pasa-esto-hacé-aquello, ni consignas vagas. Conviene empezar con uno mínimo en el mejor modelo y agregar instrucciones según las fallas que aparezcan.
- Herramientas pocas, claras y sin superposición; y en vez de una lista de casos borde, unos pocos ejemplos variados y representativos.
- Mejor cargar información "justo a tiempo": el agente guarda referencias (rutas, consultas, links) y busca el contenido cuando lo necesita, como hace Claude Code con grep. Muchas veces conviene un híbrido con algo cargado de entrada.
- Para tareas largas: compactar el historial cuando se llena, que el agente tome notas fuera del contexto, o repartir el trabajo en subagentes con contexto limpio que devuelven un resumen.

## Relacionado
- [[HumanLayer - Advanced Context Engineering for Coding Agents]]
- [[Anthropic - Harness design for long-running apps]]
- [[Agent Skills - Especificación abierta]]
