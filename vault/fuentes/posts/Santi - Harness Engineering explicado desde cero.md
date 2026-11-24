---
title: "Harness Engineering: explicado desde cero"
autor: "santi (@santtiagom_)"
tipo: articulo-x
plataforma: "X"
url: "https://x.com/santtiagom_/status/2098782814837543075"
idioma: "es"
publicado: ""
guardado: 2026-11-24
temas:
  - desarrollo-agentico
  - agentes-y-evals
tags:
  - harness-engineering
  - context-engineering
estado: resumido-parcial
publish: false
---

# Harness Engineering: explicado desde cero

**santi (@santtiagom_)** · articulo-x · X · [link](https://x.com/santtiagom_/status/2098782814837543075)

Temas: [[Desarrollo con agentes]] · [[Agentes y evals]]

## Por qué lo guardé
_(completar)_

## En una línea
Introducción en castellano y desde cero al "harness engineering": todo el sistema que rodea al modelo y que hace que el mismo modelo dé resultados muy distintos según cómo se lo arme.

## Ideas clave
- Para mejorar un agente ya no alcanza con cambiar de modelo o de prompt. Los ejemplos que da (OpenAI, LangChain y Anthropic) mejoraron mucho invirtiendo en el sistema alrededor del modelo, sin cambiar el modelo.
- Separa qué hace el modelo (razonar y decidir) de qué hace el harness, y arma las piezas una por una: herramientas para actuar, un loop para encadenar pasos, memoria, manejo del contexto y un entorno de trabajo aislado.
- Suma lo que hace falta para confiar en el resultado: un objetivo claro con verificación (escrita por vos o generada por el propio harness, con un generador y un evaluador), y permisos y límites que vivan en el sistema y no solo en el prompt.
- Cierra con observabilidad para ver qué pasó, evals para medir si mejoró, y las piezas que aparecen después: skills, MCP, subagentes y memoria de largo plazo.
- El nombre viene de "arnés" (aprovechar una fuerza sin que se te escape) y del viejo "test harness" que rodea al código para probarlo. La parte de "engineering" es la que se suele saltear: no se arma una vez, se mide, se corrige y se vuelve a medir.

## Relacionado
- [[Anthropic - Harness design for long-running apps]]
- [[OpenAI - Harness engineering]]
- [[Santi - Flujo para construir software con agentes]]

## Mis notas


## Texto original
_(Resumido a partir de la estructura del artículo (secciones y las 9 piezas del harness), la introducción y la definición final. No se leyó cada párrafo completo. X no mostró la fecha.)_
