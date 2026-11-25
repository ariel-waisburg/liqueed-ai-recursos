---
title: "Tests as data: ensuring AI-generated code does what we want"
autor: "Matteo Vaccari (Thoughtworks)"
tipo: articulo
plataforma: "martinfowler.com"
url: "https://martinfowler.com/articles/tests-as-data.html"
idioma: "en"
publicado: "2026-11-11"
guardado: 2026-11-25
temas:
  - desarrollo-agentico
  - agentes-y-evals
tags:
  - calidad-y-evals
  - harness-engineering
perfil:
  - tecnico
madurez: escalando
valor: aplicado
esfuerzo: 30-90min
estado: resumido
publish: false
---

# Tests as data: ensuring AI-generated code does what we want

**Matteo Vaccari (Thoughtworks)** · articulo · martinfowler.com · 2026-11-11 · [link](https://martinfowler.com/articles/tests-as-data.html)

Temas: [[Desarrollo con agentes]] · [[Agentes y evals]]

## Por qué lo guardé
Lo recomendamos para equipos que adoptan agentes de código a escala sin resignar control. Si la IA escribe el código y también los tests, se pierde la garantía de calidad. Propone que los tests de cliente, escritos como datos legibles, sean el contrato entre las personas y los agentes, y explica cómo protegerlos de cambios del agente.

## En una línea
Cuando los agentes escriben el código y también los tests, Vaccari propone pasar el contrato a datos de test legibles por personas, para que sigan asegurando el comportamiento que queremos.

## Ideas clave
- Entrevistó a 26 desarrolladores de una organización muy invertida en agentes: no confiaban en sus tests, porque aunque los revisaban al principio, el agente después refactorizaba código y tests juntos.
- Tres afirmaciones: si la IA escribe el código, las personas pasan a ser sus clientes; por eso el contrato principal son los tests de cliente, no los de desarrollador; y ese contrato hay que ponerlo en datos de test, no en código de test, para protegerlo de cambios inesperados del agente.
- La forma práctica: tests de caja negra en el lenguaje del cliente, en tablas o en archivos de escenarios fáciles de distinguir del código, más un runner (que ahora la IA puede escribir barato). Se apoya en tradiciones como Fit, specification by example y approval testing.
- Hay que proteger el harness para que el agente no lo reescriba sin querer, y validar también los tests. Esto no alcanza solo: hay que combinarlo con mutation testing, property-based tests, linters y prueba exploratoria humana.
- Cita reportes de 2026 (Faros, DX) que muestran más defectos a medida que sube el uso de agentes: el problema no es teórico.

## Relacionado
- [[Primo - Cómo evitamos que el AI slop arruine nuestros tests]]
- [[Birgitta Böckeler - Harness engineering for coding agent users]]
- [[Matt Pocock - Full Walkthrough Workflow for AI Coding]]

## Mis notas


## Texto original
Resumido a partir del artículo completo en martinfowler.com.
