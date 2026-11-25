---
title: "Building always-on agents"
autor: "William Hu (Anthropic)"
tipo: articulo
plataforma: "claude.com"
url: "https://claude.com/resources/articles/building-always-on-agents"
idioma: "en"
publicado: "2026-11-13"
guardado: 2026-11-18
temas:
  - agentes-y-evals
tags:
  - agent-engineering
perfil:
  - tecnico
madurez: escalando
minutos: 11
minutos_origen: medido
estado: resumido
publish: false
---

**William Hu (Anthropic)** · articulo · claude.com · 2026-11-13 · [link](https://claude.com/resources/articles/building-always-on-agents)

Temas: [[Agentes y evals]]

## En una línea
Arquitectura de agentes con estado que trabajan solos en segundo plano: cuándo se despiertan, qué recuerdan y cómo le avisan al usuario.

## Ideas clave
- El agente está casi siempre dormido: se despierta para una 'run' que procesa un evento, guarda lo que pasó y vuelve a dormir. Lo 'siempre activo' es ese ciclo repetido.
- Cinco piezas: bandeja de eventos (inbox) durable, timers (seguimientos que se pone el agente y tareas programadas por el usuario), memoria, permisos y bandeja de salida (outbox).
- Memoria: solo lo que no se puede buscar en otro lado; para lo demás, un puntero. Incluye instrucciones, notas del usuario, historial de mensajes y progreso de tareas, más un repaso offline ('dreaming') que poda y detecta patrones.
- Permisos: es lo más riesgoso. Credenciales fuera del entorno del agente, clasificadores para acciones riesgosas y revisión humana solo para lo más grave.
- Salida: arrancar callado y ganarse la atención del usuario con el tiempo, calibrando el volumen con evals.

## Relacionado
- [[Vercel - Agents are users, so your software needs evals]]
- [[Louis Valli - Cómo entregar un agente a un cliente]]
