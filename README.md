# Recursos de IA · liqueed

Fuentes y notas sobre IA, producto y organizaciones, organizadas por tema.

**Sitio:** https://ariel-waisburg.github.io/liqueed-ai-recursos

## Cómo se actualiza

- La fuente de verdad es `vault/`, una bóveda de Obsidian. `content/` se genera desde ahí con `python3 scripts/publicar.py`.
- Para sumar fuentes con Claude Code: abrí el repo y pedile "sumá estas fuentes: <links>". El flujo está en `CLAUDE.md`.
- Cada push a `main` publica el sitio solo, con GitHub Actions (`.github/workflows/deploy.yml`).
- Para verlo en tu compu antes de publicar: `npm ci` y después `python3 scripts/publicar.py && npx quartz build --serve` (queda en http://localhost:8080).

## Qué agrega liqueed sobre Quartz

- `plugins/` tiene cuatro plugins locales (logo, hero de la home, bloque de CTA con newsletter de Kit, y footer/metadatos). Ver `plugins/README.md`.
- La estética sigue la de AI Champion (servicios.liqueed.org/ai-champion): colores en `quartz.config.yaml` → `theme`, estilos en `quartz/styles/custom.scss`. El tema `@quartz-themes/core` está desactivado para que no pise la paleta.
- El build genera, además del sitio, `llms.txt` y `llms-full.txt` (para agentes de IA), `index.xml` (RSS solo con fichas) y `sitemap.xml`.
- Analytics (GA4) se configura en `quartz.config.yaml` → `configuration.analytics`.
- Los tags siguen un vocabulario controlado: `.claude/skills/sumar-fuente/tags.md`.

Hecho con [Quartz](https://quartz.jzhao.xyz) (licencia MIT, ver `LICENSE.txt`).
