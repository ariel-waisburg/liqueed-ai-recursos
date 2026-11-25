---
title: "Agent platform of 2027"
autor: "John Suh (@john_ssuh)"
tipo: post
plataforma: "x.com"
url: "https://x.com/john_ssuh/status/2124336124172935336"
idioma: "en"
publicado: "2026-11-22"
guardado: 2026-11-24
temas:
  - agentes-y-evals
  - producto-e-ia
tags:
  - fundamentos
  - agent-engineering
perfil:
  - tecnico
  - producto
madurez: explorando
minutos: 2
minutos_origen: estimado
estado: resumido
publish: false
---

**John Suh (@john_ssuh)** · post · x.com · 2026-11-22 · [link](https://x.com/john_ssuh/status/2124336124172935336)

Temas: [[Agentes y evals]] · [[Producto en la era de la IA]]

## En una línea
Visión de cómo va a ser en 2027 la plataforma de agentes que, según el autor, se convierte en el sistema operativo de toda la capa de aplicación: cómo corren los agentes, dónde trabajan, cómo los ve el usuario y cómo se arman apps encima.

## Ideas clave
- Tesis: va a haber una sola capa de aplicación, una plataforma de agentes que funciona como sistema operativo, y el resto del software va a quedar como base de datos de esa capa. La imagina como un jardín donde cada cliente planta sus "semillas" y las cuidan agentes, personas y señales del negocio. Según el autor, los ADE, las "enterprise agent platforms" y los SaaS verticales apuntan demasiado bajo.
- Ejecución: propone pasar de orquestar agentes con Temporal a un modelo de actores, con un runtime aislado por agente. Eso permite harnesses que se mejoran solos escribiendo sus propias extensiones o hooks. También pide separar la definición de un agente de sus instancias y sesiones.
- Infraestructura: N agentes trabajando sobre M computadoras (sandboxes con checkpoints o la máquina local del usuario) y un filesystem POSIX compartido en la nube, con permisos (RBAC) propios. Ese filesystem funciona en parte como GitHub y en parte como Google Drive.
- Interfaz: el usuario no debería ver la sesión del agente con sus tool calls, sino una "conversación", del mismo nivel que un canal de Slack o un hilo de mail, donde el agente publica con una tool call. Ver la sesión queda para depurar, como leer el código. Cada vez más, el usuario va a trabajar desde una bandeja de aprobaciones y preguntas.
- Eventos y workflows: los agentes tienen que poder armar al vuelo listeners de eventos por cliente (websockets, Kafka, CDC), en vez de depender de crons horarios. Los workflows de largo plazo deberían definirse en código y no con automatizaciones de arrastrar y soltar como n8n o Zapier.
- Apps: Artifacts, las apps de ChatGPT y Replit convergen en la misma idea de "app" que vive en el filesystem y cada usuario clona y modifica pidiéndoselo a su agente. Eso reemplazaría al equipo de implementación que hoy configura un SaaS vertical para cada empresa. Enumera los contenedores posibles: interfaces tipo tmux, apps dentro de mensajes, app con chat al costado, canvas infinitos, ventanas y paneles.

## Relacionado
- [[Uber - Running a Software Factory Efficiently]]
- [[distort - Agent Engineering: las 9 capas alrededor del modelo]]
- [[Anthropic - Harness design for long-running apps]]
