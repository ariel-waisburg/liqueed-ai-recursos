---
title: "Cómo evitamos que el AI slop arruine nuestros tests"
autor: "Manuel Panichelli (Primo)"
tipo: articulo
plataforma: "primo.la"
url: "https://www.primo.la/blog/como-evitamos-que-el-ai-slop-arruine-nuestros-tests"
idioma: "es"
publicado: "2026-08-21"
guardado: 2026-11-18
temas:
  - desarrollo-agentico
  - agentes-y-evals
estado: resumido
publish: false
---

# Cómo evitamos que el AI slop arruine nuestros tests

**Manuel Panichelli (Primo)** · articulo · primo.la · 2026-08-21 · [link](https://www.primo.la/blog/como-evitamos-que-el-ai-slop-arruine-nuestros-tests)

Temas: [[Desarrollo con agentes]] · [[Agentes y evals]]

## En una línea
Cómo un equipo argentino-mexicano les enseñó a sus agentes de código a escribir tests que valgan la pena.

## Ideas clave
- Por defecto los agentes escriben muchos tests de poco valor: abusan de mocks, testean detalles de implementación y repiten setup.
- Principio: testear desde el nivel más alto posible con la menor cantidad de mocks.
- Armaron unas guías (nunca mockear el storage, tests cortos, que no espejen la implementación) y una skill que le enseña al agente qué testear: elegir el tipo de test, partir inputs en clases de equivalencia, descartar lo que no vale la pena, nombrar qué cambio debería hacerlo fallar, y romper el código a propósito para comprobar que falla.
- Iteraron borrando suites, regenerándolas con agentes y revisando; usaron tests buenos existentes como 'golden standard'.
- En unos dos meses: 25% más tests de integración, 70% menos tests con mocks, cero con storage mockeado y 54% menos comentarios de review del tipo 'este test está mal'.
- Límite: los agentes copian tests viejos que no cumplen la norma.

> [!note] Nota de captura
> Es la parte 1 de una serie sobre agentic coding; las guías y la skill están en un repo público.

## Relacionado
- [[Franco Petruccelli - El CI está hecho para humanos]]
- [[Vercel - Agents are users, so your software needs evals]]
- [[Mitchell Hashimoto - My AI Adoption Journey]]
