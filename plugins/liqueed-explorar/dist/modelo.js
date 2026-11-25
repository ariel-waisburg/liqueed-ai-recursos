import fs from "node:fs"
import path from "node:path"

/**
 * Modelo de datos compartido: qué es una ficha, sus facetas y sus etiquetas en español.
 * Lo usan el componente de explorar/JSON-LD (este plugin) y los generadores de llms.txt
 * (plugins/liqueed-site). Solo usa datos del frontmatter; no inventa nada.
 */

export const TIPO_LABEL = {
  articulo: "Artículo",
  "articulo-x": "Artículo en X",
  post: "Post",
  hilo: "Hilo",
  video: "Video",
  libro: "Libro",
  guia: "Guía",
  curso: "Curso",
  herramienta: "Herramienta",
  presentacion: "Presentación",
  referente: "Referente",
  paper: "Paper",
  podcast: "Podcast",
}


/** tipo de la ficha -> tipo de schema.org de la fuente original. */
export const TIPO_SCHEMA = {
  articulo: "Article",
  "articulo-x": "Article",
  post: "SocialMediaPosting",
  hilo: "SocialMediaPosting",
  video: "VideoObject",
  libro: "Book",
  guia: "CreativeWork",
  curso: "Course",
  herramienta: "CreativeWork",
  presentacion: "PresentationDigitalDocument",
  referente: "WebSite",
  paper: "ScholarlyArticle",
  podcast: "PodcastEpisode",
}

export const FACETAS = [
  { key: "tipo", label: "Tipo de recurso" },
  { key: "idioma", label: "Idioma" },
  { key: "tema", label: "Tema" },
  { key: "tag", label: "Concepto" },
]

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)
export const tipoLabel = (k) => TIPO_LABEL[k] ?? cap(String(k).replace(/-/g, " "))
/**
 * Nombre en español de un código ISO 639-1. Sale de .claude/skills/sumar-fuente/idiomas.md
 * (la misma tabla con la que valida publicar.py); si el código no está, Intl o el código en mayúsculas.
 */
export function idiomaLabel(k) {
  const code = String(k ?? "").trim().toLowerCase()
  const hit = idiomaNames().get(code)
  if (hit) return hit
  try {
    const n = new Intl.DisplayNames(["es"], { type: "language" }).of(code)
    if (n && n !== code) return cap(n)
  } catch {}
  return code.toUpperCase()
}

let idiomasCache = null
export function idiomaNames() {
  if (idiomasCache) return idiomasCache
  idiomasCache = new Map()
  try {
    const md = fs.readFileSync(path.resolve(".claude/skills/sumar-fuente/idiomas.md"), "utf-8")
    for (const m of md.matchAll(/^\| ([a-z]{2}) \| ([^|]+) \|/gm)) idiomasCache.set(m[1], oneLine(m[2]))
  } catch {}
  return idiomasCache
}

export const oneLine = (s) => String(s ?? "").replace(/\s+/g, " ").trim()
const norm = (v) => oneLine(v).toLowerCase()
const list = (v) => (Array.isArray(v) ? v : v == null || v === "" ? [] : [v]).map(norm).filter(Boolean)

/**
 * Fecha ISO 8601 desde el frontmatter: YYYY-MM-DD, o YYYY-MM si la fuente solo da el mes.
 * Acepta Date y textos con aclaración, como "2026-10-13 (última entrada)" o "2025-09 (primera versión)".
 */
export function isoDate(v) {
  if (!v) return null
  if (v instanceof Date) return isNaN(v) ? null : v.toISOString().slice(0, 10)
  const m = String(v).trim().match(/^(\d{4}-\d{2}(?:-\d{2})?)(?!\d)/)
  return m ? m[1] : null
}

// ---------- fecha del recurso (publicado) para mostrar ----------

const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"]

/**
 * Fecha del recurso a partir de `publicado`. Devuelve null si no hay fecha real.
 * - `date`: Date para Quartz (listados y fichas). Las fechas con solo mes o año llevan un milisegundo
 *   "marca" (7 = mes, 8 = año) para que el CSS de liqueed-explorar muestre "sept 2025" o "2025"
 *   en lugar de un día inventado.
 * - `label`: texto en español ("22 mar 2026", "sept 2025", "2025").
 */
export function fechaRecurso(v) {
  const raw = v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? "").trim()
  let m = raw.match(/^(\d{4})-(\d{2})-(\d{2})(?!\d)/)
  if (m) {
    const [y, mo, d] = [+m[1], +m[2], +m[3]]
    return { iso: m[0], precision: "dia", date: new Date(Date.UTC(y, mo - 1, d, 12)), label: `${String(d).padStart(2, "0")} ${MESES_CORTOS[mo - 1]} ${y}` }
  }
  m = raw.match(/^(\d{4})-(\d{2})(?![\d-])/)
  if (m) {
    const [y, mo] = [+m[1], +m[2]]
    return { iso: m[0], precision: "mes", date: new Date(Date.UTC(y, mo - 1, 15, 12, 0, 0, 7)), label: `${MESES_CORTOS[mo - 1]} ${y}` }
  }
  m = raw.match(/^(\d{4})(?![\d-])/)
  if (m) {
    const y = +m[1]
    return { iso: m[0], precision: "anio", date: new Date(Date.UTC(y, 6, 1, 12, 0, 0, 8)), label: String(y) }
  }
  return null
}

/** CSS que reescribe en pantalla las fechas de solo mes/año que Quartz formatea con día. */
export function fechasParcialesCss(fichas) {
  const seen = new Map()
  for (const f of fichas) {
    const fr = fechaRecurso(f.publicadoRaw ?? f.publicado)
    if (fr && fr.precision !== "dia") seen.set(fr.date.toISOString(), fr.label)
  }
  return [...seen]
    .map(([iso, label]) => `time[datetime="${iso}"]{font-size:0}time[datetime="${iso}"]::after{content:"${label}";font-size:var(--lq-date-size, 1rem)}`)
    .join("")
}

export function sinTildes(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

export function siteBase(cfg) {
  return `https://${String(cfg?.baseUrl ?? "example.com").replace(/\/+$/, "")}`
}

/** "fuentes/index" -> "fuentes/", "index" -> "" (igual que simplifySlug de Quartz). */
export function simplify(slug) {
  const s = String(slug)
  if (s === "index") return ""
  return s.endsWith("/index") ? s.slice(0, -"index".length) : s
}

export function pageUrl(cfg, slug) {
  const simple = simplify(slug)
  return simple ? `${siteBase(cfg)}/${encodeURI(simple)}` : `${siteBase(cfg)}/`
}

/** Camino relativo a la raíz desde un slug ("a/b/c" -> "../.."). */
export function relRoot(slug) {
  const depth = String(slug ?? "index").split("/").filter(Boolean).length - 1
  return depth <= 0 ? "." : Array(depth).fill("..").join("/")
}

/** Link relativo desde la página `fromSlug` a la página `toSlug`. */
export function relHref(fromSlug, toSlug) {
  return `${relRoot(fromSlug)}/${encodeURI(simplify(toSlug))}`
}

// ---------- lectura del markdown (para "En una línea") ----------

const rawCache = new Map()
function readRaw(filePath) {
  if (!filePath) return ""
  const fp = path.resolve(String(filePath))
  try {
    const mtime = fs.statSync(fp).mtimeMs
    const hit = rawCache.get(fp)
    if (hit && hit.mtime === mtime) return hit.text
    const text = fs.readFileSync(fp, "utf-8")
    rawCache.set(fp, { mtime, text })
    return text
  } catch {
    return ""
  }
}

export function section(md, title) {
  const re = new RegExp(`^## ${title}\\n([\\s\\S]*?)(?=\\n## |$)`, "m")
  const m = String(md).match(re)
  return m ? m[1].trim() : ""
}

// ---------- vocabulario de tags (.claude/skills/sumar-fuente/tags.md) ----------

let tagDefsCache = null
export function tagDefinitions() {
  if (tagDefsCache) return tagDefsCache
  tagDefsCache = new Map()
  try {
    const md = fs.readFileSync(path.resolve(".claude/skills/sumar-fuente/tags.md"), "utf-8")
    for (const m of md.matchAll(/^\| ([a-z0-9-]+) \| ([^|]+) \|/gm)) tagDefsCache.set(m[1], oneLine(m[2]))
  } catch {}
  return tagDefsCache
}

// ---------- fichas y temas desde allFiles (fileData de Quartz) ----------

const isFicha = (f) => {
  const s = String(f?.slug ?? "")
  return s.startsWith("fuentes/") && !s.endsWith("index") && !!f.frontmatter?.url
}
const isTema = (f) => {
  const s = String(f?.slug ?? "")
  return s.startsWith("temas/") && !s.endsWith("index")
}

export function temaFromFile(f) {
  const fm = f.frontmatter ?? {}
  const raw = readRaw(f.filePath)
  const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, "")
  const desc = oneLine(body.replace(/^# .*$/m, "").split(/\n## /)[0])
  return { slug: f.slug, key: norm(fm.slug ?? path.basename(String(f.slug))), title: oneLine(fm.title ?? f.slug), desc }
}

export function fichaFromFile(f) {
  const fm = f.frontmatter ?? {}
  const raw = readRaw(f.filePath)
  return {
    slug: f.slug,
    title: oneLine(fm.title ?? f.slug),
    autor: oneLine(fm.autor),
    tipo: norm(fm.tipo) || null,
    idioma: norm(fm.idioma) || null,
    plataforma: oneLine(fm.plataforma) || null,
    url: oneLine(fm.url),
    miniatura: /^https?:\/\//.test(oneLine(fm.miniatura)) ? oneLine(fm.miniatura) : null,
    proveedor: oneLine(fm.proveedor) || null,
    publicado: isoDate(fm.publicado),
    publicadoRaw: fm.publicado ?? null,
    fecha: fechaRecurso(fm.publicado),
    guardado: isoDate(fm.guardado),
    temas: list(fm.temas),
    tags: list(fm.tags),
    linea: oneLine(section(raw, "En una línea")),
  }
}

/** Fichas, temas y facetas (valores con conteo) del sitio, memorizado por array de allFiles. */
const modelCache = new WeakMap()
export function buildModel(allFiles) {
  const files = allFiles ?? []
  if (modelCache.has(files)) return modelCache.get(files)
  const temas = files.filter(isTema).map(temaFromFile)
  const temaByKey = new Map(temas.map((t) => [t.key, t]))
  const fichas = files
    .filter(isFicha)
    .map(fichaFromFile)
    // Fecha del recurso (publicado) descendente; las fichas sin fecha, al final y por título.
    .sort((a, b) => (b.fecha?.date.getTime() ?? -Infinity) - (a.fecha?.date.getTime() ?? -Infinity) || a.title.localeCompare(b.title, "es"))
  const model = { fichas, temas, temaByKey, facetas: facetValues(fichas, temaByKey) }
  modelCache.set(files, model)
  return model
}

export function facetValues(fichas, temaByKey) {
  const count = (getter) => {
    const m = new Map()
    for (const f of fichas) for (const v of getter(f)) if (v) m.set(v, (m.get(v) ?? 0) + 1)
    return m
  }
  const byCount = (a, b) => b.count - a.count || a.label.localeCompare(b.label, "es")
  const tipo = [...count((f) => [f.tipo])].map(([value, n]) => ({ value, label: tipoLabel(value), count: n })).sort(byCount)
  const idioma = [...count((f) => [f.idioma])].map(([value, n]) => ({ value, label: idiomaLabel(value), count: n })).sort(byCount)
  const tema = [...count((f) => f.temas)]
    .map(([value, n]) => ({ value, label: temaByKey.get(value)?.title ?? value, slug: temaByKey.get(value)?.slug, count: n }))
    .sort(byCount)
  const tag = [...count((f) => f.tags)].map(([value, n]) => ({ value, label: value, slug: `tags/${value}`, count: n })).sort(byCount)
  return { tipo, idioma, tema, tag }
}

/** Valores de una ficha para cada faceta. */
export function fichaFacets(f) {
  return { tipo: f.tipo ? [f.tipo] : [], idioma: f.idioma ? [f.idioma] : [], tema: f.temas, tag: f.tags }
}
