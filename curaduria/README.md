# Curaduría del repositorio de IA de liqueed

Configuración de curaduría que leen las corridas automáticas de Faro (el bot que mantiene el repositorio). Está fuera de `vault/` a propósito: `scripts/publicar.py` solo copia `vault/` a `content/`, y Quartz solo publica `content/`, así que nada de esta carpeta llega al sitio.

| Archivo | Qué tiene |
|---|---|
| [rubrica.md](rubrica.md) | Filtros de entrada, rúbrica con pesos y umbrales, señales de alerta, campos de etiquetado para el ICP y reglas del digest. |
| [fuentes.md](fuentes.md) | Registro de fuentes: la lista de X "Tech" y los referentes con su feed verificado, estado y cadencia. |
| `digests/` | Un archivo por digest semanal (`AAAA-MM-DD.md`), con las candidatas y lo que decidió Ari. |

## Decisiones aprobadas por Ari (24/11/2026)

- Modelo operativo: un solo bot (Faro) con rutinas, y Ari decide en un digest semanal.
- Digest: **lunes 9:00, hora de Buenos Aires**.
- Lo que Ari aprueba en el digest **se publica directo**, sin otro paso de confirmación.
- Rúbrica aprobada con dos cambios: relevancia enterprise al 20% y calidad de consumo al 10%. Umbrales 4,0 / 3,5 sin cambios.
- La lista privada de X "Tech" es fuente. Se lee **solo en modo lectura**: nunca publicar, seguir, ni modificar listas.
- Email de Faro para newsletters: pendiente de que Ari lo active. Hasta entonces, no suscribirse a nada.
- Consultoras competidoras: entran si son el mejor recurso del tema.
- Vendors (Anthropic, OpenAI, Vercel, etc.): entran si enseñan algo útil; el tono de infomercial se penaliza.
- Sin piso de aplicado vs. conceptual.
- Ante dos recursos equivalentes, se prioriza el que está en español.
- Voz de las fichas: "nosotros" (liqueed). Una ficha se puede publicar sin "Por qué lo guardé".
- Volumen: calidad antes que cantidad. Mínimo 3 por semana; pueden ser 10 a 15 si lo valen.
- Posts sueltos de X: pendiente. Por ahora, solo lo que linkea a algo más profundo, más hasta 3 hilos "posibles".

## Reglas de marca que aplican a todo lo que se escribe

- "liqueed" siempre en minúscula.
- El sitio no usa la tipografía IBM Plex Mono.
- Las fichas muestran la fecha del recurso (`publicado`), nunca la de carga.
