# Recursos de IA · Liqueed

Fuentes y notas sobre IA, producto y organizaciones, organizadas por tema.

**Sitio:** https://ariel-waisburg.github.io/liqueed-ai-recursos

## Cómo se actualiza

- La fuente de verdad es `vault/`, una bóveda de Obsidian. `content/` se genera desde ahí con `python3 scripts/publicar.py`.
- Para sumar fuentes con Claude Code: abrí el repo y pedile "sumá estas fuentes: <links>". El flujo está en `CLAUDE.md`.
- Cada push a `main` publica el sitio solo, con GitHub Actions (`.github/workflows/deploy.yml`).
- Para verlo en tu compu antes de publicar: `npm ci` y después `python3 scripts/publicar.py && npx quartz build --serve` (queda en http://localhost:8080).

Hecho con [Quartz](https://quartz.jzhao.xyz) (licencia MIT, ver `LICENSE.txt`).
