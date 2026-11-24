---
title: "Making CI faster and 95% cheaper"
autor: "Vincent Koc"
tipo: articulo
plataforma: "vincent.build"
url: "https://vincent.build/openclaw-ci-cost-reduction/"
idioma: "en"
publicado: ""
guardado: 2026-11-24
temas:
  - desarrollo-agentico
tags:
  - desarrollo-agentico
  - articulo
  - costos-ia
  - ai-slop
estado: resumido-parcial
publish: false
---

# Making CI faster and 95% cheaper

**Vincent Koc** · articulo · vincent.build · [link](https://vincent.build/openclaw-ci-cost-reduction/)

Temas: [[Desarrollo con agentes]]

## Por qué lo guardé
_(completar)_

## En una línea
Caso de OpenClaw, un proyecto grande desarrollado en parte por agentes: cuando los agentes llenaron el CI de tests, jobs y reintentos, el equipo recortó trabajo innecesario antes de comprar máquinas más rápidas y bajó el costo estimado de cómputo un 95%.

## Ideas clave
- El problema no fueron los tokens sino los tests y el CI: los agentes escribían código más rápido, pero también generaban más tests, más jobs y más reintentos, y los cambios hacían cola esperando los chequeos.
- Resultado, comparando una semana de septiembre con una de noviembre de 2026: las horas de runner bajaron 86,5% (de 158.546 a 21.395), los jobs 79,7% y el costo estimado de cómputo 95,5% (de unos USD 1,27 millones a USD 57 mil cada 30 días). El autor aclara que no es una comparación pareja: la carga cambió entre esas semanas y la actividad del repo también bajó (44% menos commits).
- Primero se borró o consolidó tests, antes de pensar en máquinas más rápidas. Desde el 24 de octubre, cada cambio que sumaba líneas de test tenía que compensarlo borrando otras (después se permitió un margen por cambio). Entre fines de septiembre y mediados de noviembre las líneas de test bajaron en casi 418 mil.
- La técnica central fue la selección adaptativa de tests: correr solo los tests afectados por cada cambio, con código determinístico y validado contra el pasado, y ampliar la corrida cuando no se conocen las dependencias. También se corrigió el fan-out accidental de jobs y se balancearon los shards para que el más lento no frene todo.
- Toda optimización se compara contra el tiempo de espera: un runner más barato que hace esperar más a los agentes que dependen de él no es una mejora. Propone medir el "agent cycle time", del PR abierto al mergeado, aunque reconoce que esa mejora todavía no está demostrada.

## Relacionado
- [[Uber - Running a Software Factory Efficiently]]
- [[Primo - Cómo evitamos que el AI slop arruine nuestros tests]]
- [[Calvin Grunewald - A Look Inside the Factory]]

## Mis notas


## Texto original
_(Resumido a partir de la primera parte del artículo, que es muy largo. No se leyó completo el detalle de cada técnica con sus mediciones.)_
