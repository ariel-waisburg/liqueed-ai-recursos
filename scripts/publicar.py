"""Genera content/ (lo que publica Quartz) a partir de la bóveda de Obsidian en vault/.

Uso: python3 scripts/publicar.py [vault] [content] [título del sitio]

Qué hace:
- Copia notas de vault/ a content/, salteando lo privado o de trabajo
  (00-inbox/, _plantillas/, CLAUDE.md, README.md).
- Saltea fuentes pendientes que todavía no tienen resumen.
- Limpia lo que solo sirve dentro de Obsidian: el H1 (Quartz ya muestra el título),
  "Por qué lo guardé" vacío, "Mis notas" vacío, notas de captura con instrucciones
  y la sección "Texto original" completa (es contenido de terceros: nunca se publica).
- Inicio.md pasa a ser index.md, con el título del sitio y sin la lista de pendientes.
"""
import os, re, shutil, sys

VAULT = sys.argv[1] if len(sys.argv) > 1 else "vault"
OUT = sys.argv[2] if len(sys.argv) > 2 else "content"
TITLE = sys.argv[3] if len(sys.argv) > 3 else "Recursos de IA · Liqueed"

SKIP_DIRS = {"00-inbox", "_plantillas", ".obsidian", ".trash"}
SKIP_FILES = {"CLAUDE.md", "README.md"}
PRIVATE_HINTS = ("Guardá", "Pegá", "Abrilo", "No lo descargué", "Desde YouTube",
                 "El link que pasaste", "Para guardarlo bien", "Falta la transcripción",
                 "Bajalo", "pasame", "Pasame")


def clean(text):
    text = re.sub(r"^(---\n.*?\n---\n\n)# [^\n]*\n\n?", r"\1", text, count=1, flags=re.S)
    text = re.sub(r"## Por qué lo guardé\n_\(completar\)_\n\n", "", text)
    text = re.sub(r"## Mis notas\n\s*\n(?=## |\Z)", "", text)
    text = re.sub(r"## Texto original\n.*\Z", "", text, flags=re.S)
    text = re.sub(r"> \[!note\] Nota de captura\n> ([^\n]*)\n\n?",
                  lambda m: "" if any(h in m.group(1) for h in PRIVATE_HINTS) else m.group(0), text)
    return text.rstrip() + "\n"


os.makedirs(OUT, exist_ok=True)
for name in os.listdir(OUT):
    if name == ".gitkeep":
        continue
    p = os.path.join(OUT, name)
    shutil.rmtree(p) if os.path.isdir(p) else os.remove(p)

n = 0
for dp, dirs, files in os.walk(VAULT):
    rel = os.path.relpath(dp, VAULT)
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for f in files:
        if not f.endswith(".md") or (rel == "." and f in SKIP_FILES):
            continue
        t = open(os.path.join(dp, f), encoding="utf-8").read()
        pending = re.search(r"^estado: pendiente-captura", t, re.M)
        if pending and "## Ideas clave" not in t and "## En una línea" not in t:
            continue
        dst_rel = "index.md" if (rel == "." and f == "Inicio.md") else os.path.join(rel, f)
        if dst_rel == "index.md":
            t = re.sub(r"^title: .*$", f'title: "{TITLE}"', t, count=1, flags=re.M)
            t = re.sub(r"\n## Pendientes de captura\n(?:- .*\n?)*", "\n", t)
        dst = os.path.join(OUT, dst_rel)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        open(dst, "w", encoding="utf-8").write(clean(t))
        n += 1
print("notas publicadas:", n)
