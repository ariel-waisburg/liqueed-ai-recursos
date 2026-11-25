import { jsx, jsxs } from "preact/jsx-runtime"
import { buildModel, fichaFacets, FACETAS, tipoLabel, idiomaLabel, relHref, sinTildes } from "../modelo.js"
import { jsonLdFor, safeJson } from "../jsonld.js"
import { EXPLORAR_JS } from "../cliente.js"

/**
 * LiqueedExplorar (debajo del contenido de cada página):
 * - En todas las páginas: <script type="application/ld+json"> con los datos estructurados.
 * - En /explorar: lista completa de fichas con filtros por tipo, idioma, tema y concepto.
 *   Sin JS: la lista completa está en el HTML y los <select> filtran solos con CSS (:has).
 *   Con JS (dist/cliente.js): búsqueda por texto, conteos, URL compartible y evento filter_use.
 * - En páginas de tema y de tag: link a Explorar con ese filtro ya puesto.
 * Estilos en quartz/styles/custom.scss.
 */

const DEFAULTS = {
  siteTitle: "Recursos de IA · Liqueed",
  // Mismo texto que plugins/liqueed-site (descripción del sitio para buscadores y agentes).
  summary:
    "Repositorio vivo y curado por Liqueed con fuentes validadas sobre inteligencia artificial aplicada: adopción de IA en organizaciones, producto, desarrollo con agentes, evals, gobernanza y fundamentos. Cada ficha resume una fuente externa (autor, fecha, link original) con sus ideas clave, en español.",
  explorarDesc: "Todas las fichas del repositorio, filtrables por tipo de recurso, idioma, tema y concepto.",
}

const cssStr = (s) => String(s).replace(/["\\]/g, "\\$&")

/** Reglas CSS que filtran sin JS: si el <select> de una faceta tiene un valor elegido, se ocultan las fichas que no lo tienen. */
function filterCss(facetas) {
  const rules = []
  for (const { key } of FACETAS) {
    for (const v of facetas[key]) {
      const val = cssStr(v.value)
      rules.push(
        `.lx:has(select[name="${key}"] option[value="${val}"]:checked) .lx-item:not([data-${key}~="${val}"])`,
      )
    }
  }
  return rules.length ? `${rules.join(",\n")}{display:none}` : ""
}

function FacetSelect({ facet, values, total }) {
  const id = `lx-${facet.key}`
  return jsxs("div", {
    class: "lx-field",
    children: [
      jsx("label", { for: id, children: facet.label }),
      jsxs("select", {
        id,
        name: facet.key,
        "data-facet": facet.key,
        children: [
          jsx("option", { value: "", children: `Todos (${total})` }),
          ...values.map((v) => jsx("option", { value: v.value, "data-label": v.label, children: `${v.label} (${v.count})` })),
        ],
      }),
    ],
  })
}

function FichaItem({ f, from, temaByKey }) {
  const facets = fichaFacets(f)
  const meta = [f.autor, f.tipo ? tipoLabel(f.tipo) : null, f.idioma ? idiomaLabel(f.idioma) : null, f.publicado].filter(Boolean)
  return jsx("li", {
    class: "lx-item",
    "data-tipo": facets.tipo.join(" "),
    "data-idioma": facets.idioma.join(" "),
    "data-tema": facets.tema.join(" "),
    "data-tag": facets.tag.join(" "),
    "data-text": sinTildes([f.title, f.autor, f.plataforma, f.linea].filter(Boolean).join(" ")),
    children: jsxs("article", {
      children: [
        jsx("h3", { children: jsx("a", { class: "internal", href: relHref(from, f.slug), "data-slug": f.slug, children: f.title }) }),
        jsx("p", { class: "lx-meta", children: meta.join(" · ") }),
        f.linea ? jsx("p", { class: "lx-linea", children: f.linea }) : null,
        jsxs("ul", {
          class: "lx-chips",
          "aria-label": "Temas y conceptos",
          children: [
            ...f.temas
              .map((k) => temaByKey.get(k))
              .filter(Boolean)
              .map((t) => jsx("li", { children: jsx("a", { class: "internal lx-tema", href: relHref(from, t.slug), "data-slug": t.slug, children: t.title }) })),
            ...f.tags.map((t) =>
              jsx("li", { children: jsx("a", { class: "internal tag-link", href: relHref(from, `tags/${t}`), "data-slug": `tags/${t}`, children: t }) }),
            ),
          ],
        }),
        jsx("p", {
          class: "lx-source",
          children: jsx("a", { class: "external", href: f.url, target: "_blank", rel: "noopener", children: "Fuente original ↗" }),
        }),
      ],
    }),
  })
}

function Explorar({ model, slug }) {
  const { fichas, facetas, temaByKey } = model
  const total = fichas.length
  return jsxs("section", {
    class: "lx",
    "aria-labelledby": "lx-title",
    "data-total": String(total),
    children: [
      jsx("style", { dangerouslySetInnerHTML: { __html: filterCss(facetas) } }),
      jsx("h2", { id: "lx-title", class: "lx-sr", children: "Filtros" }),
      jsxs("form", {
        class: "lx-form",
        role: "search",
        "aria-label": "Filtrar fichas",
        action: "",
        method: "get",
        children: [
          jsxs("div", {
            class: "lx-field lx-q",
            hidden: true,
            children: [
              jsx("label", { for: "lx-q", children: "Buscar" }),
              jsx("input", { id: "lx-q", name: "q", type: "search", placeholder: "Título, autor o idea", autocomplete: "off" }),
            ],
          }),
          ...FACETAS.map((facet) => jsx(FacetSelect, { facet, values: facetas[facet.key], total })),
          jsx("div", {
            class: "lx-actions",
            children: jsx("button", { type: "reset", class: "lx-reset", children: "Limpiar filtros" }),
          }),
        ],
      }),
      jsx("p", { class: "lx-status", role: "status", "aria-live": "polite", children: `${total} fichas en total` }),
      jsx("p", { class: "lx-empty", hidden: true, children: "No hay fichas con esa combinación. Probá sacar algún filtro." }),
      jsx("ol", {
        class: "lx-list",
        "aria-label": "Fichas",
        children: fichas.map((f) => jsx(FichaItem, { f, from: slug, temaByKey })),
      }),
    ],
  })
}

/** En páginas de tema o de tag: atajo a Explorar con ese filtro puesto. */
function ExplorarLink({ slug, model }) {
  let param = null
  let label = null
  if (slug.startsWith("temas/") && !slug.endsWith("index")) {
    const t = model.temas.find((x) => x.slug === slug)
    if (t && model.facetas.tema.some((v) => v.value === t.key)) [param, label] = [`tema=${encodeURIComponent(t.key)}`, t.title]
  } else if (slug.startsWith("tags/") && slug !== "tags/index") {
    const tag = slug.slice(5)
    if (model.facetas.tag.some((v) => v.value === tag)) [param, label] = [`tag=${encodeURIComponent(tag)}`, tag]
  }
  if (!param) return null
  return jsx("p", {
    class: "lx-shortcut",
    children: jsxs("a", {
      class: "internal",
      href: `${relHref(slug, "explorar")}?${param}`,
      "data-slug": "explorar",
      children: [`Combiná “${label}” con otros filtros en Explorar`, " →"],
    }),
  })
}

export const LiqueedExplorar = (opts = {}) => {
  const o = { ...DEFAULTS, ...opts }
  const C = ({ fileData, allFiles, cfg, displayClass }) => {
    const slug = String(fileData?.slug ?? "")
    if (!slug || slug === "404") return null
    const model = buildModel(allFiles)
    const ld = jsonLdFor(cfg, o, fileData, model)
    return jsxs("div", {
      class: `liqueed-explorar ${displayClass ?? ""}`,
      children: [
        ld ? jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: safeJson(ld) } }) : null,
        slug === "explorar" ? jsx(Explorar, { model, slug }) : jsx(ExplorarLink, { slug, model }),
      ],
    })
  }
  C.afterDOMLoaded = EXPLORAR_JS
  return C
}
