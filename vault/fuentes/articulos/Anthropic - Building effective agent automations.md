---
title: "Building effective agent automations"
autor: "Lance Martin y CJ Avilla (Anthropic)"
tipo: articulo
plataforma: "claude.dev"
url: "https://claude.dev/blog/building-effective-agent-automations/"
idioma: "en"
publicado: "2026-10-08"
guardado: 2026-11-25
temas:
  - agentes-y-evals
tags:
  - agent-engineering
  - workflows-con-agentes
perfil:
  - tecnico
madurez: escalando
valor: aplicado
esfuerzo: 10-30min
estado: resumido
publish: false
---

# Building effective agent automations

**Lance Martin y CJ Avilla (Anthropic)** · articulo · claude.dev · 2026-10-08 · [link](https://claude.dev/blog/building-effective-agent-automations/)

Temas: [[Agentes y evals]]

## Por qué lo guardé
Lo recomendamos porque muestra patrones concretos para agentes que corren solos con una agenda: un marcador por fuente en vez de "las últimas 24 horas", no confundir una lectura que falló con un día sin novedades, y confirmar el envío antes de registrarlo. Le sirve a cualquier equipo que pasa de pilotos a automatizaciones programadas. Es contenido de un vendor y la implementación de referencia usa Claude Managed Agents, pero los patrones sirven con otras herramientas.

## En una línea
Guía con implementación de referencia para automatizaciones con agentes que, en un horario, leen fuentes, detectan lo que cambió y avisan solo lo que hay que saber, evitando huecos, duplicados y silencios engañosos.

## Ideas clave
- Un error frecuente es pedirle al agente que lea "las últimas 24 horas": si corre tarde queda un hueco y si corre temprano repite ítems. Mejor un marcador (bookmark) por fuente, con la fecha del último ítem leído, para que la ventana se ajuste sola.
- Si una fuente no se puede leer, no hay que tratarlo como un día tranquilo: se deja el marcador donde está, se arma el informe con el resto y se dice explícitamente qué no se pudo leer.
- El envío solo cuenta cuando el destino lo confirma (por ejemplo, Slack responde ok). Recién ahí se actualizan el libro de lo ya informado y los marcadores. Si no está claro si se envió, no se mueve nada.
- Antes de publicar, se vuelve a chequear cada ítem en vivo: si ya se resolvió, se saca; si cambió, se corrige; si no se puede confirmar, se descarta. Un "sigue esperándote" desactualizado cuesta más confianza que diez ítems que no entraron.
- Las preferencias del usuario viven en un almacén que el agente no puede editar y se releen en cada corrida. Credenciales fuera del entorno del agente, acceso de solo lectura donde solo lee, y un tope de gasto por corrida.

## Relacionado
- [[Anthropic - Building always-on agents]]
- [[Anthropic - Harness design for long-running apps]]

## Mis notas


## Texto original
Resumido a partir del artículo completo en claude.dev.
