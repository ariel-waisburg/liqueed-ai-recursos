---
title: "art-movements-ux"
autor: "heidrian-eth (GitHub)"
tipo: herramienta
plataforma: "github.com"
url: "https://github.com/heidrian-eth/heidrian-skills/tree/main/art-movements-ux"
idioma: "en"
publicado: "2026-11-23"
guardado: 2026-11-24
temas:
  - desarrollo-agentico
  - producto-e-ia
tags:
  - desarrollo-agentico
  - producto-e-ia
  - herramienta
  - agent-skills
  - ai-slop
estado: resumido-parcial
publish: false
---

**heidrian-eth (GitHub)** · herramienta · github.com · 2026-11-23 · [link](https://github.com/heidrian-eth/heidrian-skills/tree/main/art-movements-ux)

Temas: [[Desarrollo con agentes]] · [[Producto en la era de la IA]]

## En una línea
Skill para agentes de código que evita el diseño de UI "promedio" de los modelos: arma un mood board con obras de 65 artistas elegidas por los problemas de diseño del producto, lo destila en un kit de UI que se congela y construye cada pantalla solo con ese kit.

## Ideas clave
- Parte de un diagnóstico: librado a sí mismo, un modelo diseña la mediana de su entrenamiento (cards redondeadas con sombra suave, hero centrado, Inter, un azul de marca). Trae un "detector de mediana" que prohíbe esos patrones salvo que una regla del kit los justifique.
- Cuatro etapas: brief (4 a 7 problemas de diseño recurrentes, uno marcado como el central), mood board de 5 a 9 obras que ya resolvieron esos problemas, kit (tokens, componentes, Do/Don't) que se congela, y pantallas hechas solo con el kit.
- De cada artista toma el proceso, no la estética. Lee cada obra en cuatro niveles (superficie, recurso, principio, problema) y se lleva el principio y sus proporciones medidas, como porcentajes de área o saltos de valor; deja los colores y las formas.
- Evita dos fallas por igual: el pastiche (que el producto sea "el de Mondrian") y el patchwork (cada pantalla responde a un artista distinto). Con el kit aprobado no entran artistas nuevos: las ideas se anotan para la próxima versión del kit.
- Las afirmaciones sobre las obras se contrastaron con las imágenes reales (muestreo de color) y el CHANGELOG registra las correcciones. Un modo exploración sortea diez tríadas de artistas con un script con semilla, para no elegirlos a dedo.
- Cada pantalla pasa chequeos mecánicos: todo valor tiene que ser un token del kit, se mide la paleta de una captura contra los presupuestos de color del kit, y hay pruebas como que un recorte de 200px se reconozca como el producto.

## Relacionado
- [[Agent Skills - Especificación abierta]]
- [[Felipe Polo - No AI Slop Manifesto]]
- [[Uber - How Uber Evals 1 Million Agent Skill Invocations]]
