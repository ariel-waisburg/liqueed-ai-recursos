"""Genera content/ (lo que publica Quartz) a partir de la bóveda de Obsidian en vault/.

Uso: python3 scripts/publicar.py [vault] [content] [título del sitio]

Qué hace:
- Copia notas de vault/ a content/, salteando lo privado o de trabajo
  (00-inbox/, _plantillas/, CLAUDE.md, README.md).
- Saltea TODAS las fuentes con `estado: pendiente-captura`: no se publican hasta tener resumen.
- Saca de las listas los links a notas que no se publican y convierte en texto plano
  cualquier otro [[link]] a ellas, para que el sitio no tenga links rotos.
- Limpia lo que solo sirve dentro de Obsidian o es interno del proceso:
  el H1 (Quartz ya muestra el título), "Por qué lo guardé" vacío, "Mis notas" vacío,
  la sección "Texto original" completa (contenido de terceros: nunca se publica),
  "Ideas propias" si solo tiene el texto de la plantilla,
  las marcas de estado como `_(resumido-parcial)_` y las notas de captura.
  En las fuentes `resumido-parcial`, la nota de captura que describe el alcance del resumen
  se publica como "Sobre este resumen" (es transparencia útil para quien lee); las que son
  instrucciones de trabajo ("Pasame…", "Bajalo…") se sacan siempre.
- Inicio.md pasa a ser index.md, con el título del sitio, sin la lista de pendientes y con
  los conteos (total de fuentes y fuentes por tema) calculados sobre lo que se publica.
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
STATUS_MARK = re.compile(r"\s*_?\((?:resumido|resumido-parcial|pendiente-captura)\)_?")
CAPTURE_NOTE = re.compile(r"> \[!note\] Nota de captura\n((?:>[^\n]*\n?)*)\n?")
WIKILINK = re.compile(r"\[\[([^\]|#]+)(#[^\]|]*)?(\|[^\]]*)?\]\]")


def frontmatter_field(text, key):
    m = re.search(rf"^{key}:\s*(.*)$", text, re.M)
    return m.group(1).strip().strip('"') if m else None


def drop_links_to(text, skipped):
    """Saca ítems de lista que apuntan a notas no publicadas; el resto de los links, a texto."""
    def is_skipped(target):
        return target.strip() in skipped

    out = []
    for line in text.split("\n"):
        m = re.match(r"\s*- \[\[([^\]|#]+)", line)
        if m and is_skipped(m.group(1)):
            continue
        out.append(line)
    text = "\n".join(out)

    def plain(m):
        if not is_skipped(m.group(1)):
            return m.group(0)
        alias = m.group(3)
        return alias[1:] if alias else m.group(1)

    return WIKILINK.sub(plain, text)


def clean(text, partial=False):
    text = re.sub(r"^(---\n.*?\n---\n\n)# [^\n]*\n\n?", r"\1", text, count=1, flags=re.S)
    text = re.sub(r"## Por qué lo guardé\n_\(completar\)_\n\n", "", text)
    text = re.sub(r"## Mis notas\n\s*\n(?=## |\Z)", "", text)
    text = re.sub(r"## Texto original\n.*\Z", "", text, flags=re.S)
    text = re.sub(r"## Ideas propias\n\s*_\(Tus notas[^\n]*\)_\s*(?=\n## |\Z)", "", text)

    def capture(m):
        body = m.group(1)
        if partial and not any(h in body for h in PRIVATE_HINTS):
            return "> [!info] Sobre este resumen\n" + body + ("\n" if body.endswith("\n") else "\n\n")
        return ""

    text = CAPTURE_NOTE.sub(capture, text)
    text = STATUS_MARK.sub("", text)
    return text.rstrip() + "\n"


def count_sources(text):
    m = re.search(r"## Fuentes\n(.*?)(?=\n## |\Z)", text, re.S)
    return len(re.findall(r"^- \[\[", m.group(1), re.M)) if m else 0


os.makedirs(OUT, exist_ok=True)
for name in os.listdir(OUT):
    if name == ".gitkeep":
        continue
    p = os.path.join(OUT, name)
    shutil.rmtree(p) if os.path.isdir(p) else os.remove(p)

# 1. Qué se publica
notes = []  # (rel_dir, filename, text)
skipped = set()
for dp, dirs, files in os.walk(VAULT):
    rel = os.path.relpath(dp, VAULT)
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for f in files:
        if not f.endswith(".md") or (rel == "." and f in SKIP_FILES):
            continue
        t = open(os.path.join(dp, f), encoding="utf-8").read()
        if frontmatter_field(t, "estado") == "pendiente-captura":
            skipped.add(f[:-3])
            continue
        notes.append((rel, f, t))

# 2. Escribir todo menos el índice
published_sources = 0
tema_counts = {}
index_note = None
for rel, f, t in notes:
    if rel == "." and f == "Inicio.md":
        index_note = t
        continue
    t = drop_links_to(t, skipped)
    t = clean(t, partial=frontmatter_field(t, "estado") == "resumido-parcial")
    if rel.split(os.sep)[0] == "fuentes":
        published_sources += 1
    if rel.split(os.sep)[0] == "temas":
        tema_counts[f[:-3]] = count_sources(t)
    dst = os.path.join(OUT, rel, f)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    open(dst, "w", encoding="utf-8").write(t)

# 3. Índice con conteos reales
if index_note is not None:
    t = re.sub(r"^title: .*$", f'title: "{TITLE}"', index_note, count=1, flags=re.M)
    t = re.sub(r"\n## Pendientes de captura\n(?:- .*\n?)*", "\n", t)
    t = re.sub(r"^\d+ fuentes", f"{published_sources} fuentes", t, count=1, flags=re.M)
    # "- [[Tema]] (N): desc" -> "- [[Tema]] *N fuentes*" + desc en la línea siguiente (la home lo muestra como tarjeta)
    def tema_line(m):
        n = tema_counts.get(m.group(2), 0)
        return f"{m.group(1)} *{n} fuente{'s' if n != 1 else ''}*\n  {m.group(3)}"
    t = re.sub(r"^(- \[\[([^\]]+)\]\]) \(\d+\): (.*)$", tema_line, t, flags=re.M)
    t = drop_links_to(t, skipped)
    open(os.path.join(OUT, "index.md"), "w", encoding="utf-8").write(clean(t))

print(f"notas publicadas: {len(notes)} ({published_sources} fuentes) · "
      f"pendientes sin publicar: {len(skipped)}")
