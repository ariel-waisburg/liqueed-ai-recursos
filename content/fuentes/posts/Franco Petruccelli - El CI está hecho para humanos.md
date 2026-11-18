---
title: "El CI está hecho para humanos. Esto armamos para agentes."
autor: "Franco Petruccelli (@fipetru)"
tipo: articulo-x
plataforma: "X"
url: "https://x.com/fipetru/status/2115451360128692229"
idioma: "es"
publicado: ""
guardado: 2026-11-18
temas:
  - desarrollo-agentico
estado: resumido-parcial
publish: false
---

# El CI está hecho para humanos. Esto armamos para agentes.

**Franco Petruccelli (@fipetru)** · articulo-x · X · [link](https://x.com/fipetru/status/2115451360128692229)

Temas: [[Desarrollo con agentes]]

## En una línea
Cuando hay agentes abriendo PRs todo el día, el cuello de botella deja de ser escribir código y pasa a ser confirmar que lo que hicieron funciona.

## Ideas clave
- Su equipo mergeó más de 5.400 PRs en 3 meses; al menos 4 de cada 10 tienen huella de agente y la mediana entre abrir y mergear es de alrededor de una hora.
- El CI se pensó para un dev que abre pocos PRs, lee el diff y entiende por qué falla un check. Con decenas de agentes en paralelo eso se rompe.
- El código de un agente casi siempre 'pinta bien' (compila, pasa el lint, nombres prolijos). Lo que se rompe es lo que no se ve en el diff: el flujo de punta a punta, casos borde y regresiones en otra parte.
- Cita a Laurie Voss: quienes trabajan con agentes autónomos escriben unas 8 veces más código pero lanzan solo un 30% más rápido, y se traban en la revisión.

> [!note] Nota de captura
> El autor es QA engineer. El resumen cubre la primera parte; el resto describe lo que armaron, con números.

## Relacionado
- [[David Zhang - Building software factories (with no slop)]]
- [[Primo - Cómo evitamos que el AI slop arruine nuestros tests]]
