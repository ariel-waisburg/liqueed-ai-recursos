---
title: "Agent Skills"
autor: "Agent Skills (formato abierto creado por Anthropic)"
tipo: herramienta
plataforma: "agentskills.io"
url: "https://agentskills.io/home"
idioma: "en"
publicado: ""
guardado: 2026-11-24
temas:
  - desarrollo-agentico
  - agentes-y-evals
tags:
  - desarrollo-agentico
  - agentes-y-evals
  - herramienta
  - agent-skills
  - context-engineering
estado: resumido-parcial
publish: false
---

# Agent Skills

**Agent Skills (formato abierto creado por Anthropic)** · herramienta · agentskills.io · [link](https://agentskills.io/home)

Temas: [[Desarrollo con agentes]] · [[Agentes y evals]]

## Por qué lo guardé
_(completar)_

## En una línea
Sitio de la especificación abierta Agent Skills: un formato basado en carpetas para empaquetar instrucciones, scripts y referencias que un agente carga solo cuando las necesita.

## Ideas clave
- Una skill es una carpeta con un archivo SKILL.md obligatorio (frontmatter YAML más instrucciones en Markdown) y, si hace falta, subcarpetas de scripts, referencias y recursos.
- El frontmatter exige `name` (en minúsculas, igual al nombre de la carpeta) y `description` (qué hace y cuándo usarla). Son opcionales la licencia, la compatibilidad, metadatos y las herramientas permitidas.
- Funciona por divulgación progresiva: al arrancar el agente lee solo el nombre y la descripción de cada skill (unos 100 tokens), carga el cuerpo cuando la tarea coincide y abre los archivos extra solo si los necesita. Por eso se pueden tener miles de skills sin llenar el contexto.
- Lo creó Anthropic y lo liberó como estándar abierto. La idea es escribir la skill una vez y usarla en cualquier agente compatible, versionada como cualquier carpeta.
- Recomienda que el cuerpo tenga menos de 500 líneas y ofrece una herramienta para validar las skills.

## Relacionado
- [[Uber - How Uber Evals 1 Million Agent Skill Invocations]]
- [[HumanLayer - Skill Issue: Harness Engineering]]
- [[HumanLayer - Advanced Context Engineering for Coding Agents]]

## Mis notas


## Texto original
_(Resumido a partir de la portada y la especificación. No se leyeron la guía de inicio rápido ni la lista de agentes compatibles.)_
