---
title: "How Uber Evals 1 Million Agent Skill Invocations a Month"
autor: "Andrew Mager, Jason Varbedian y Uday Kiran Medisetty (Uber)"
tipo: articulo
plataforma: "uber.com"
url: "https://www.uber.com/us/en/blog/optimizing-ubers-agent-skills/"
idioma: "en"
publicado: "2026-11-23"
guardado: 2026-11-24
temas:
  - agentes-y-evals
  - desarrollo-agentico
  - adopcion-ia
tags:
  - agent-engineering
  - costos-ia
estado: resumido
publish: false
---

**Andrew Mager, Jason Varbedian y Uday Kiran Medisetty (Uber)** · articulo · uber.com · 2026-11-23 · [link](https://www.uber.com/us/en/blog/optimizing-ubers-agent-skills/)

Temas: [[Agentes y evals]] · [[Desarrollo con agentes]] · [[Adopción de IA en organizaciones]]

## En una línea
Cómo Uber gestiona más de 5.000 skills de agentes en toda la empresa: dónde viven, cómo se distribuyen a cualquier agente, cómo se evalúan y cómo los propios agentes reportan lo que no funciona.

## Ideas clave
- Una skill empaqueta un flujo de trabajo (un runbook, un proceso de un equipo) en el formato abierto Agent Skills. Todas viven en un único repositorio git, que ya da dueño, revisión e historial, y una herramienta propia (aifx) las instala igual en Claude Code, Codex, OpenCode o sus agentes internos.
- Las ordenan en tres niveles con exigencia creciente: de dominio (cualquier equipo publica con una aprobación), core (mantenidas y testeadas) y always-on (unas 100 activas para todos desde el primer día).
- Cada skill nace de una especificación (objetivo, resultados, herramientas permitidas, modelos a los que apunta), y de ahí se generan el SKILL.md y sus casos de prueba. Un linter exige pasos numerados, verificación en cada paso y una sección de recuperación de errores.
- Los evals combinan unos pocos casos dorados, mayoría de prompts reales calificados por trayectoria (si el agente usó las herramientas correctas en el orden correcto) y casos del autor. Un eval que pasa 70-90% de las veces puede ser más útil que uno que pasa siempre.
- Prueban sacar skills o partes de skills con un juez ciego. En la mayoría de los casos la skill mejora el resultado y baja el costo; para bajarlo más, pasan a código lo determinístico ("code mode") y delegan en subagentes con modelos más baratos.
- Una skill siempre activa permite que el agente reporte "papercuts" cuando algo no anda (un flag que falla, un error silencioso). En tres meses se reportaron miles y se arreglaron cientos.

## Relacionado
- [[Uber - Running a Software Factory Efficiently]]
- [[Agent Skills - Especificación abierta]]
- [[Vercel - Agents are users, so your software needs evals]]
