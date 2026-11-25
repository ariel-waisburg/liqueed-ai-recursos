import fs from "node:fs/promises"
import path from "node:path"
import { jsx, jsxs, Fragment } from "preact/jsx-runtime"
// Facetas y etiquetas compartidas con /explorar (mismo modelo, mismos conteos).
import { facetValues, isoDate, FACETAS } from "../../liqueed-explorar/dist/modelo.js"

/**
 * liqueed-site: emisor + recursos globales del sitio.
 *
 * - <head>: rel=canonical y rel=alternate (RSS) en cada página.
 * - Estilos de marca y eventos de analytics de los CTAs (dataLayer, GA4/GTM).
 * - Archivos para agentes y feeds: llms.txt, llms-full.txt e index.xml (RSS solo con fichas).
 *   El RSS propio reemplaza al de Quartz (configuration.contentIndex.enableRSS: false).
 */

const DEFAULTS = {
  siteTitle: "Recursos de IA · liqueed",
  summary:
    "Repositorio vivo y curado por liqueed con fuentes validadas sobre inteligencia artificial aplicada: adopción de IA en organizaciones, producto, desarrollo con agentes, evals, gobernanza y fundamentos. Cada ficha resume una fuente externa (autor, fecha, link original) con sus ideas clave, en español.",
  about:
    "liqueed (https://liqueed.org) es una consultora que acompaña a organizaciones a evolucionar su forma de trabajar. Sus servicios de transformación con IA (https://servicios.liqueed.org/ia) ayudan a activar equipos, implementar pilotos, desarrollar capacidades y gobernar iniciativas con impacto real.",
  temaOrder: [],
  rssLimit: 0,
  links: [
    ["Transformación con IA: servicios de liqueed", "https://servicios.liqueed.org/ia", "Acompañamos a las organizaciones a convertir el potencial de la IA en experiencias, soluciones y capacidades concretas: activar y experimentar, implementar pilotos, formar equipos y escalar con una adopción responsable."],
    ["AI Champion", "https://servicios.liqueed.org/ai-champion", "Programa presencial de dos días para impulsar la adopción de IA en tu organización, con práctica, framework propio y un roadmap de 90 días."],
    ["Contacto", "https://liqueed.org/contacto", "Para conversar sobre un desafío concreto."],
  ],
}

// ---------- utilidades ----------

const xml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

/** Camino relativo a la raíz desde un slug ("a/b/c" -> "../.."). */
function relRoot(slug) {
  const depth = String(slug ?? "index").split("/").filter(Boolean).length - 1
  return depth <= 0 ? "." : Array(depth).fill("..").join("/")
}

function siteBase(cfg) {
  return `https://${String(cfg.baseUrl ?? "example.com").replace(/\/+$/, "")}`
}

/** "fuentes/index" -> "fuentes/", "index" -> "" (igual que simplifySlug de Quartz). */
function simplify(slug) {
  const s = String(slug)
  if (s === "index") return ""
  return s.endsWith("/index") ? s.slice(0, -"index".length) : s
}

function pageUrl(cfg, slug) {
  const simple = simplify(slug)
  return simple ? `${siteBase(cfg)}/${encodeURI(simple)}` : `${siteBase(cfg)}/`
}

function splitFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?/)
  return m ? md.slice(m[0].length) : md
}

function section(md, title) {
  const re = new RegExp(`^## ${title}\\n([\\s\\S]*?)(?=\\n## |$)`, "m")
  const m = md.match(re)
  return m ? m[1].trim() : ""
}

function oneLine(s) {
  return String(s ?? "").replace(/\s+/g, " ").trim()
}

function toDate(v) {
  // Acepta Date y textos con aclaración, como "2026-10-13 (última entrada)".
  const iso = isoDate(v)
  if (!iso || iso.length !== 10) return null
  const d = new Date(iso)
  return isNaN(d) ? null : d
}

async function write(ctx, rel, content) {
  const out = path.join(ctx.argv.output, rel)
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, content)
  return out
}

// ---------- modelo de datos ----------

async function collect(ctx, content) {
  const cfg = ctx.cfg.configuration
  const notes = []
  for (const [, file] of content) {
    const d = file.data ?? {}
    if (!d.slug || d.unlisted === true) continue
    let raw = ""
    try {
      const fp = d.filePath ? path.resolve(String(d.filePath)) : null
      raw = fp ? await fs.readFile(fp, "utf-8") : String(file.value ?? "")
    } catch {
      raw = String(file.value ?? "")
    }
    const name = d.relativePath ? path.basename(String(d.relativePath), ".md") : d.slug
    notes.push({ slug: d.slug, name, fm: d.frontmatter ?? {}, body: splitFrontmatter(raw), url: pageUrl(cfg, d.slug) })
  }
  const byName = new Map(notes.map((n) => [n.name, n]))

  const fichas = notes
    .filter((n) => String(n.slug).startsWith("fuentes/") && !String(n.slug).endsWith("index") && n.fm.url)
    .map((n) => ({
      ...n,
      title: oneLine(n.fm.title || n.name),
      autor: oneLine(n.fm.autor),
      linea: oneLine(section(n.body, "En una línea")),
      temas: Array.isArray(n.fm.temas) ? n.fm.temas : [],
      tags: Array.isArray(n.fm.tags) ? n.fm.tags : [],
      guardado: toDate(n.fm.guardado),
      publicado: toDate(n.fm.publicado),
    }))

  const temas = notes
    .filter((n) => String(n.slug).startsWith("temas/") && !String(n.slug).endsWith("index"))
    .map((n) => ({
      ...n,
      key: n.fm.slug ?? n.name,
      title: oneLine(n.fm.title || n.name),
      desc: oneLine(n.body.replace(/^# .*$/m, "").split(/\n## /)[0]),
    }))

  const lc = (v) => String(v ?? "").trim().toLowerCase()
  const temaByKey = new Map(temas.map((t) => [lc(t.key), { title: t.title, slug: t.slug }]))
  const facetas = facetValues(
    fichas.map((f) => ({ tipo: lc(f.fm.tipo), idioma: lc(f.fm.idioma), temas: f.temas.map(lc), tags: f.tags.map(lc) })),
    temaByKey,
  )

  return { notes, byName, fichas, temas, facetas }
}

/** Sección de llms.txt con las facetas de /explorar y su URL con query string. */
function facetasSection(cfg, data) {
  const base = siteBase(cfg)
  const out = [
    "## Explorar por facetas",
    "",
    `Todas las fichas en una sola página, filtrables por faceta: ${base}/explorar. ` +
      "Los filtros van en la query string y se combinan (por ejemplo " +
      `${base}/explorar?tipo=articulo&tema=adopcion-ia&tag=ai-champions); ` +
      "`q` busca texto en título, autor y resumen. El HTML de /explorar trae la lista completa y cada ítem tiene " +
      "atributos data-tipo, data-idioma, data-tema y data-tag. Cada página tiene datos estructurados schema.org en JSON-LD.",
    "",
  ]
  for (const { key, label } of FACETAS) {
    const vals = data.facetas[key]
    if (!vals?.length) continue
    out.push(`### ${label} (\`${key}\`)`, "")
    for (const v of vals) {
      const page = v.slug ? ` · página: ${pageUrl(cfg, v.slug)}` : ""
      out.push(`- ${v.label === v.value ? `\`${v.value}\`` : `${v.label} (\`${v.value}\`)`}: ${v.count} ficha${v.count === 1 ? "" : "s"} · ${base}/explorar?${key}=${encodeURIComponent(v.value)}${page}`)
    }
    out.push("")
  }
  return out
}

/** [[Nota]] / [[Nota|alias]] -> link markdown absoluto al sitio (o texto si no existe). */
function resolveWikilinks(md, byName) {
  return md.replace(/\[\[([^\]|#]+)(#[^\]|]*)?(\|([^\]]*))?\]\]/g, (_, target, _h, _a, alias) => {
    const n = byName.get(target.trim())
    const label = alias ?? target.trim()
    return n ? `[${label}](${n.url})` : label
  })
}

function fichaLabel(f) {
  return f.autor ? `${f.autor}: ${f.title}` : f.title
}

function orderedTemas(temas, order) {
  const pos = (t) => {
    const i = order.indexOf(t.title)
    return i === -1 ? 999 : i
  }
  return [...temas].sort((a, b) => pos(a) - pos(b) || a.title.localeCompare(b.title, "es"))
}

// ---------- generadores ----------

function buildLlmsTxt(cfg, o, data) {
  const base = siteBase(cfg)
  const lines = [`# ${o.siteTitle}`, "", `> ${o.summary}`, "", o.about, ""]
  lines.push(
    `Cada ficha enlaza a la fuente original. Total: ${data.fichas.length} fichas. ` +
      `Versión completa en un solo archivo: ${base}/llms-full.txt · RSS: ${base}/index.xml · Sitemap: ${base}/sitemap.xml`,
    "",
  )
  for (const t of orderedTemas(data.temas, o.temaOrder)) {
    const fs_ = data.fichas
      .filter((f) => f.temas.includes(t.key))
      .sort((a, b) => fichaLabel(a).localeCompare(fichaLabel(b), "es"))
    if (!fs_.length) continue
    lines.push(`## ${t.title}`, "")
    if (t.desc) lines.push(`${t.desc} Página del tema: ${t.url}`, "")
    for (const f of fs_) lines.push(`- [${fichaLabel(f)}](${f.url}): ${f.linea || "(sin resumen)"}`)
    lines.push("")
  }
  lines.push(...facetasSection(cfg, data))
  lines.push("## Sobre liqueed", "")
  for (const [label, href, desc] of o.links) lines.push(`- [${label}](${href}): ${desc}`)
  lines.push("")
  return lines.join("\n")
}

function buildLlmsFull(cfg, o, data) {
  const temaTitle = new Map(data.temas.map((t) => [t.key, t.title]))
  const out = [`# ${o.siteTitle} (texto completo)`, "", `> ${o.summary}`, "", o.about, ""]
  out.push(
    `Índice: ${siteBase(cfg)}/llms.txt · Filtros por tipo, idioma, tema y concepto: ${siteBase(cfg)}/explorar ` +
      "(query string ?tipo=&idioma=&tema=&tag=; los valores están listados en llms.txt).",
    "",
  )
  const sorted = [...data.fichas].sort((a, b) => fichaLabel(a).localeCompare(fichaLabel(b), "es"))
  for (const f of sorted) {
    const meta = [
      `- Autor: ${f.autor || "s/d"}`,
      `- Tipo: ${f.fm.tipo ?? "s/d"} · Plataforma: ${f.fm.plataforma ?? "s/d"} · Idioma original: ${f.fm.idioma ?? "s/d"}`,
      `- Publicado: ${isoDate(f.fm.publicado) ?? "s/d"} · Curado: ${f.guardado ? f.guardado.toISOString().slice(0, 10) : "s/d"}`,
      `- Fuente original: ${f.fm.url}`,
      `- Ficha: ${f.url}`,
      `- Temas: ${f.temas.map((k) => (temaTitle.has(k) ? `${temaTitle.get(k)} (${k})` : k)).join(", ") || "s/d"}`,
      f.tags.length ? `- Conceptos: ${f.tags.join(", ")}` : null,
    ].filter(Boolean)
    // Saca la línea de encabezado (autor · tipo · …) y la de Temas: ya están en los metadatos.
    const body = resolveWikilinks(
      f.body
        .replace(/^\*\*[^\n]*\[link\]\([^)]*\)\s*\n/m, "")
        .replace(/^Temas: .*\n/m, "")
        .trim(),
      data.byName,
    ).replace(/^## /gm, "### ")
    out.push("---", "", `## ${fichaLabel(f)}`, "", ...meta, "", body, "")
  }
  return out.join("\n")
}

function buildRss(cfg, o, data) {
  const base = siteBase(cfg)
  let items = [...data.fichas].sort(
    (a, b) =>
      (b.guardado?.getTime() ?? 0) - (a.guardado?.getTime() ?? 0) ||
      fichaLabel(a).localeCompare(fichaLabel(b), "es"),
  )
  if (o.rssLimit > 0) items = items.slice(0, o.rssLimit)
  const entries = items
    .map((f) => {
      const desc = `${f.linea}${f.linea ? " " : ""}Fuente original: ${f.fm.url}`
      const date = f.guardado ?? f.publicado
      return `  <item>
    <title>${xml(fichaLabel(f))}</title>
    <link>${xml(f.url)}</link>
    <guid isPermaLink="true">${xml(f.url)}</guid>
    <description>${xml(desc)}</description>
${f.tags.map((t) => `    <category>${xml(t)}</category>`).join("\n")}
${date ? `    <pubDate>${date.toUTCString()}</pubDate>` : ""}
  </item>`
    })
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${xml(o.siteTitle)}</title>
  <link>${xml(base)}/</link>
  <atom:link href="${xml(base)}/index.xml" rel="self" type="application/rss+xml" />
  <description>${xml(o.summary)}</description>
  <language>es</language>
${entries}
</channel>
</rss>
`
}

// ---------- recursos de página ----------

const TRACKING_JS = `
(function () {
  if (window.__liqueedCtaTracking) return;
  window.__liqueedCtaTracking = true;
  window.dataLayer = window.dataLayer || [];
  function track() { window.dataLayer.push(arguments); }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[data-cta]") : null;
    if (!a) return;
    track("event", "cta_click", { cta_id: a.getAttribute("data-cta"), link_url: a.href, page_path: location.pathname });
  }, true);
  // Newsletter: el embed de Kit inserta un <form class="formkit-form"> en la página (no es un iframe),
  // así que el submit se escucha acá. Se mide el intento de suscripción, no la confirmación de Kit.
  document.addEventListener("submit", function (e) {
    var f = e.target && e.target.closest ? e.target.closest("form[data-cta-form], form.formkit-form, form[data-sv-form]") : null;
    if (!f) return;
    track("event", "generate_lead", { method: "newsletter", cta_id: f.getAttribute("data-cta-form") || "newsletter_kit", page_path: location.pathname });
  }, true);
  // Embed de Kit en navegación SPA: Quartz no ejecuta los <script> del contenido nuevo, así que si
  // el marcador <script data-uid> sigue sin reemplazar se vuelve a cargar el script de Kit.
  document.addEventListener("nav", function () {
    setTimeout(function () {
      document.querySelectorAll(".liqueed-newsletter[data-kit-uid]").forEach(function (box) {
        var uid = box.getAttribute("data-kit-uid");
        if (box.querySelector("form") || !box.querySelector('script[data-uid="' + uid + '"]')) return;
        var s = document.createElement("script");
        s.async = true;
        s.src = box.getAttribute("data-kit-src");
        document.body.appendChild(s);
      });
    }, 2500);
  });
})();
`

// El explorador de Quartz, en la primera carga, hace scrollIntoView() del ítem activo del panel
// izquierdo, y eso también baja la página entera (~400px) en fichas y temas. Si ya hay una posición
// guardada del panel, el explorador la usa en lugar de scrollIntoView(): se la damos en 0.
const NO_EXPLORER_JUMP_JS = `try { if (!sessionStorage.getItem("explorerScrollTop")) sessionStorage.setItem("explorerScrollTop", "0") } catch (e) {}`

// Peso extra de Public Sans para títulos (800); Quartz ya carga 400, 600 y 700.
// Regla de marca: Poppins no se usa en el sitio (ver quartz.config.yaml).
const EXTRA_FONTS = "https://fonts.googleapis.com/css2?family=Public+Sans:wght@800&display=swap"

export default function LiqueedSite(userOpts = {}) {
  const o = { ...DEFAULTS, ...userOpts }
  return {
    name: "LiqueedSite",
    externalResources(ctx) {
      const cfg = ctx.cfg.configuration
      const rssUrl = `${siteBase(cfg)}/index.xml`
      return {
        js: [
          { loadTime: "beforeDOMReady", contentType: "inline", script: NO_EXPLORER_JUMP_JS },
          { loadTime: "afterDOMReady", contentType: "inline", script: TRACKING_JS },
        ],
        additionalHead: [
          (fileData) =>
            jsxs(Fragment, {
              children: [
                fileData?.slug && fileData.slug !== "404"
                  ? jsx("link", { rel: "canonical", href: pageUrl(cfg, fileData.slug) })
                  : null,
                jsx("link", { rel: "alternate", type: "application/rss+xml", title: o.siteTitle, href: rssUrl }),
                jsx("link", { rel: "stylesheet", href: EXTRA_FONTS }),
                // Favicon de liqueed. Quartz ya pone static/icon.png (logo oscuro, para pestañas claras);
                // este va después y lo reemplaza por la versión blanca cuando el navegador está en modo oscuro.
                jsx("link", {
                  rel: "icon",
                  type: "image/png",
                  media: "(prefers-color-scheme: dark)",
                  href: `${relRoot(fileData?.slug)}/static/icon-dark.png`,
                }),
                jsx("link", { rel: "apple-touch-icon", href: `${relRoot(fileData?.slug)}/static/icon.png` }),
              ],
            }),
        ],
      }
    },
    async emit(ctx, content) {
      const cfg = ctx.cfg.configuration
      const data = await collect(ctx, content)
      return [
        await write(ctx, "llms.txt", buildLlmsTxt(cfg, o, data)),
        await write(ctx, "llms-full.txt", buildLlmsFull(cfg, o, data)),
        await write(ctx, "index.xml", buildRss(cfg, o, data)),
      ]
    },
  }
}
