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

export const IDIOMA_LABEL = { es: "Español", en: "Inglés", fr: "Francés", pt: "Portugués", de: "Alemán", it: "Italiano" }

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
export const idiomaLabel = (k) => IDIOMA_LABEL[k] ?? String(k).toUpperCase()

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
    publicado: isoDate(fm.publicado),
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
    .sort((a, b) => (b.guardado ?? "").localeCompare(a.guardado ?? "") || a.title.localeCompare(b.title, "es"))
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
