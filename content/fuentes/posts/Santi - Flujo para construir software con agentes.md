---
title: "Un buen flujo para construir software con agentes"
autor: "santi (@santtiagom_)"
tipo: post
plataforma: "X"
url: "https://x.com/santtiagom_/status/2122862267578405158"
idioma: "es"
publicado: ""
guardado: 2026-11-18
temas:
  - desarrollo-agentico
tags:
  - workflows-con-agentes
perfil:
  - tecnico
madurez: experimentando
minutos: 2
minutos_origen: estimado
estado: resumido
publish: false
---

**santi (@santtiagom_)** · post · X · [link](https://x.com/santtiagom_/status/2122862267578405158)

Temas: [[Desarrollo con agentes]]

## En una línea
Un flujo de seis pasos para delegar trabajo de software cada vez más complejo a varios agentes.

## Ideas clave
- Spec: definir qué construir y cómo debería funcionar.
- Research: explorar el codebase, la arquitectura y las dependencias antes de tocar código.
- Plan y orquestación con un modelo grande que divide tareas y coordina agentes en paralelo; implementación con un modelo más chico, cada agente en su propio git worktree.
- Loop de verificación (tests, lint, typecheck, prueba de UI en navegador) y review del diff por otro agente; si falla, vuelve a implementación.

## Relacionado
- [[GitHub - Spec Kit]]
- [[HumanLayer - Advanced Context Engineering for Coding Agents]]
- [[Alvaro - De revisar cada cambio a coordinar seis agentes]]
