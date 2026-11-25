import { jsx, jsxs } from "preact/jsx-runtime"

/**
 * Hero de la home (solo se renderiza en slug "index"). Server-side: los números salen de
 * allFiles en el build. Estilos en quartz/styles/custom.scss.
 */
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

function toDate(v) {
  if (!v) return null
  const d = v instanceof Date ? v : new Date(String(v))
  return isNaN(d.getTime()) ? null : d
}

export const LiqueedHero = (opts = {}) => {
  const o = {
    eyebrow: "Recursos de IA · liqueed",
    titleStart: "IA aplicada, ",
    titleHighlight: "curada",
    titleEnd: " para tu organización",
    lead:
      "Artículos, cursos, papers y herramientas que leímos, validamos y resumimos en liqueed. Cada fuente tiene un resumen en español, por qué importa y a qué tema pertenece, para que tu equipo pase de la curiosidad a la práctica sin perderse en el ruido.",
    exploreLabel: "Explorar los temas",
    exploreHref: "#temas",
    filterLabel: "Filtrar todas las fichas",
    filterHref: "./explorar",
    serviciosUrl: "https://servicios.liqueed.org/ia",
    serviciosLabel: "Conocé nuestros servicios de IA",
    ...opts,
  }
  const C = ({ fileData, allFiles, displayClass }) => {
    if (fileData?.slug !== "index") return null
    const files = allFiles ?? []
    const fuentes = files.filter((f) => {
      const s = String(f.slug ?? "")
      return s.startsWith("fuentes/") && !s.endsWith("index") && f.frontmatter?.url
    })
    const temas = files.filter((f) => {
      const s = String(f.slug ?? "")
      return s.startsWith("temas/") && !s.endsWith("index")
    })
    const last = fuentes.map((f) => toDate(f.frontmatter?.guardado)).filter(Boolean).sort((a, b) => b - a)[0]
    const lastLabel = last ? `${MESES[last.getUTCMonth()]} ${last.getUTCFullYear()}` : null
    const stat = (num, label) =>
      jsxs("div", { class: "liqueed-hero-stat", children: [jsx("strong", { children: num }), jsx("span", { children: label })] })

    return jsx("section", {
      class: `liqueed-hero ${displayClass ?? ""}`,
      "aria-labelledby": "liqueed-hero-title",
      children: jsxs("div", {
        class: "liqueed-hero-inner",
        children: [
          // "liqueed" va siempre en minúscula, también dentro de etiquetas en mayúsculas (.liqueed-marca).
          jsx("p", {
            class: "liqueed-eyebrow",
            children: String(o.eyebrow)
              .split(/(liqueed)/)
              .map((part) => (part === "liqueed" ? jsx("span", { class: "liqueed-marca", children: part }) : part)),
          }),
          jsxs("h1", {
            id: "liqueed-hero-title",
            children: [o.titleStart, jsx("span", { class: "liqueed-hl", children: o.titleHighlight }), o.titleEnd],
          }),
          jsx("p", { class: "liqueed-hero-lead", children: o.lead }),
          jsxs("div", {
            class: "liqueed-hero-stats",
            children: [
              stat(String(fuentes.length), "fuentes curadas"),
              stat(String(temas.length), "temas"),
              lastLabel ? stat(lastLabel, "última actualización") : null,
            ],
          }),
          jsxs("div", {
            class: "liqueed-hero-actions",
            children: [
              jsx("a", { class: "liqueed-btn primary", href: o.exploreHref, children: o.exploreLabel }),
              jsx("a", { class: "liqueed-btn ghost", href: o.filterHref, children: o.filterLabel }),
              jsx("a", {
                class: "liqueed-btn ghost",
                href: o.serviciosUrl,
                "data-cta": "hero_servicios_ia",
                target: "_blank",
                rel: "noopener",
                children: o.serviciosLabel,
              }),
            ],
          }),
        ],
      }),
    })
  }
  return C
}
