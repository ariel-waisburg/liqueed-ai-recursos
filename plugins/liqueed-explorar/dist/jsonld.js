import { TIPO_SCHEMA, tipoLabel, pageUrl, siteBase, simplify, tagDefinitions, oneLine } from "./modelo.js"

/**
 * JSON-LD (schema.org) por página. Solo datos reales del frontmatter de las fichas y temas,
 * del vocabulario de tags (tags.md) y de la configuración del sitio.
 */

export const ORG = {
  name: "Liqueed",
  url: "https://liqueed.org",
  sameAs: ["https://www.linkedin.com/company/liqueed"],
}

const orgId = `${ORG.url}/#organization`
const websiteId = (cfg) => `${siteBase(cfg)}/#website`

function orgNode(cfg) {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: ORG.name,
    url: ORG.url,
    logo: `${siteBase(cfg)}/static/liqueed-logo.svg`,
    sameAs: ORG.sameAs,
  }
}

function websiteNode(cfg, o) {
  const base = siteBase(cfg)
  return {
    "@type": "WebSite",
    "@id": websiteId(cfg),
    url: `${base}/`,
    name: o.siteTitle,
    description: o.summary,
    inLanguage: "es",
    publisher: { "@id": orgId },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${base}/explorar?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  }
}

const clean = (obj) => {
  for (const k of Object.keys(obj)) {
    const v = obj[k]
    if (v == null || v === "" || (Array.isArray(v) && v.length === 0)) delete obj[k]
  }
  return obj
}

function fichaNodes(cfg, f, temaByKey) {
  const url = pageUrl(cfg, f.slug)
  const source = clean({
    "@type": TIPO_SCHEMA[f.tipo] ?? "CreativeWork",
    "@id": f.url,
    url: f.url,
    name: f.title,
    // El frontmatter no dice si el autor es una persona o una organización: va como texto.
    author: f.autor || null,
    inLanguage: f.idioma,
    datePublished: f.publicado,
    genre: f.tipo ? tipoLabel(f.tipo) : null,
  })
  const temas = f.temas
    .map((k) => temaByKey.get(k))
    .filter(Boolean)
    .map((t) => ({ "@type": "CollectionPage", "@id": pageUrl(cfg, t.slug), url: pageUrl(cfg, t.slug), name: t.title }))
  const page = clean({
    "@type": "WebPage",
    "@id": `${url}#ficha`,
    url,
    name: f.title,
    description: f.linea,
    inLanguage: "es",
    isPartOf: [{ "@id": websiteId(cfg) }, ...temas],
    about: { "@id": f.url },
    mainEntity: { "@id": f.url },
    isBasedOn: f.url,
    keywords: f.tags,
    dateCreated: f.guardado,
    publisher: { "@id": orgId },
  })
  return [page, source]
}

function itemList(cfg, items) {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, url: pageUrl(cfg, it.slug), name: it.name })),
  }
}

function collectionNode(cfg, slug, name, description, items) {
  const url = pageUrl(cfg, slug)
  return clean({
    "@type": "CollectionPage",
    "@id": url,
    url,
    name,
    description,
    inLanguage: "es",
    isPartOf: { "@id": websiteId(cfg) },
    publisher: { "@id": orgId },
    mainEntity: itemList(cfg, items),
  })
}

const fichaItems = (fichas) => fichas.map((f) => ({ slug: f.slug, name: f.autor ? `${f.autor}: ${f.title}` : f.title }))

/** Devuelve el objeto JSON-LD de la página, o null si no aplica. */
export function jsonLdFor(cfg, o, fileData, model) {
  const slug = String(fileData?.slug ?? "")
  if (!slug || slug === "404") return null
  const { fichas, temas, temaByKey, facetas } = model
  const graph = [orgNode(cfg), websiteNode(cfg, o)]

  if (slug === "index") {
    // Home: sitio + organización.
  } else if (slug === "explorar") {
    graph.push(collectionNode(cfg, slug, oneLine(fileData.frontmatter?.title) || "Explorar fichas", o.explorarDesc, fichaItems(fichas)))
  } else if (slug.startsWith("fuentes/") && !slug.endsWith("index")) {
    const f = fichas.find((x) => x.slug === slug)
    if (!f) return null
    graph.push(...fichaNodes(cfg, f, temaByKey))
  } else if (slug.startsWith("temas/") && !slug.endsWith("index")) {
    const t = temas.find((x) => x.slug === slug)
    if (!t) return null
    graph.push(collectionNode(cfg, slug, t.title, t.desc, fichaItems(fichas.filter((f) => f.temas.includes(t.key)))))
  } else if (slug === "temas/index") {
    graph.push(collectionNode(cfg, slug, "Temas", null, temas.map((t) => ({ slug: t.slug, name: t.title }))))
  } else if (slug === "tags/index") {
    graph.push(collectionNode(cfg, slug, "Conceptos", null, facetas.tag.map((t) => ({ slug: t.slug, name: t.label }))))
  } else if (slug.startsWith("tags/")) {
    const tag = slug.slice("tags/".length)
    const items = fichaItems(fichas.filter((f) => f.tags.includes(tag)))
    if (!items.length) return null
    graph.push(collectionNode(cfg, slug, tag, tagDefinitions().get(tag) ?? null, items))
  } else if (slug.endsWith("index")) {
    // Páginas de carpeta (fuentes/, fuentes/articulos/, …).
    const prefix = simplify(slug)
    const items = fichaItems(fichas.filter((f) => String(f.slug).startsWith(prefix)))
    if (!items.length) return null
    graph.push(collectionNode(cfg, slug, oneLine(fileData.frontmatter?.title) || prefix, null, items))
  } else {
    return null
  }
  return { "@context": "https://schema.org", "@graph": graph }
}

/** JSON seguro para incrustar dentro de <script>: escapa <, >, & y separadores de línea. */
export function safeJson(obj) {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029")
}

