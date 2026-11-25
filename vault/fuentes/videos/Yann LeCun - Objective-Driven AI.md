---
title: "Yann Lecun | Objective-Driven AI: Towards AI systems that can learn, remember, reason, and plan"
autor: "Yann LeCun"
tipo: video
plataforma: "youtube.com"
url: "https://www.youtube.com/watch?v=MiqLoAZFRSE"
miniatura: "https://i.ytimg.com/vi/MiqLoAZFRSE/hqdefault.jpg"
idioma: "en"
publicado: "2024-04-01"
guardado: 2026-11-24
temas:
  - fundamentos-ia
tags:
  - fundamentos
estado: resumido-parcial
publish: false
---

# Yann Lecun | Objective-Driven AI: Towards AI systems that can learn, remember, reason, and plan

**Yann LeCun** · video · youtube.com · 2024-04-01 · [link](https://www.youtube.com/watch?v=MiqLoAZFRSE)

Temas: [[Fundamentos técnicos de IA]]

## Por qué lo guardé
Porque LeCun es un referente de primer nivel, y coincidimos con el fondo de su tesis: el cerebro es una máquina mucho más compleja de lo que suele asumirse, y los LLM están muy lejos de competir con nuestro razonamiento. Son herramientas útiles, pero no lo que abre la puerta a una AGI. También nos resuena la idea de que, en términos de energía para procesar, el cerebro es órdenes de magnitud más eficiente que los sistemas de IA actuales.

## En una línea
Charla en Harvard (Ding Shum Lecture, 28 de marzo de 2024) en la que LeCun argumenta que escalar LLM autorregresivos no alcanza para llegar a una inteligencia de nivel humano, y propone una arquitectura "objective-driven" con modelos del mundo, memoria y planificación.

## Ideas clave
- Comparado con personas y animales, el aprendizaje automático actual es ineficiente: el aprendizaje supervisado pide demasiadas etiquetas, el de refuerzo demasiados ensayos, y un adolescente aprende a manejar en unas 20 horas; un gato ya puede planificar acciones complejas. Hoy no estamos cerca de una IA de nivel humano.
- Los LLM autorregresivos, dice, no alcanzan: no planifican de verdad, no son bien controlables y no se los puede volver de forma fiable factual o no tóxicos. A lo sumo aproximan funciones de lenguaje; les falta algo equivalente a un modelo del mundo y a una corteza prefrontal.
- Propone lo que llama AMI (Advanced Machine Intelligence): sistemas que aprendan modelos del mundo a partir de la percepción (por ejemplo, física intuitiva desde video), con memoria persistente, y que planifiquen acciones para cumplir objetivos. Esos objetivos incluyen "guardrails" para que el sistema sea gobernable y seguro.
- La pieza central es una arquitectura predictiva jerárquica en el espacio de embeddings (H-JEPA, Hierarchical Joint Embedding Predictive Architecture), entrenada con aprendizaje autosupervisado: se predice en representaciones abstractas, no en píxeles ni en tokens.
- Rechaza el término AGI: la inteligencia es multidimensional, un conjunto de habilidades más la capacidad de aprender otras rápido. Cree que las plataformas de base deberían ser open source, y que una IA "objective-driven" puede diseñarse con metas y límites, no como una especie que compite con nosotros.

## Recursos complementarios
- [Página de la charla](https://cmsa.fas.harvard.edu/event/2024_dingshum/) (Harvard CMSA) y [diapositivas oficiales](https://cmsa.fas.harvard.edu/media/lecun-20240328-harvard_reduced.pdf) (28 de marzo de 2024).
- [Working paper](https://openreview.net/forum?id=BZ5a1r-kVsf) que cita en la charla.

## Relacionado
- [[Yann LeCun - Lex Fridman Podcast 416]]
- [[François Chollet - Deep Learning with Python]]
- [[Henrik Kniberg - Generative AI in a Nutshell]]

## Mis notas


## Texto original
_(Resumido a partir de las diapositivas oficiales de la Ding Shum Lecture (Harvard CMSA, 2024-03-28) y del abstract del evento. El video se subió a YouTube el 2024-04-01; dura unos 77 minutos. No se pudo obtener la transcripción hablada, así que no cubre preguntas ni apartes que no estén en las diapositivas.)_
