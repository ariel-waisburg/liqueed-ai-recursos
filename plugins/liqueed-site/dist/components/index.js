import { jsx, jsxs } from "preact/jsx-runtime"

function pathToRoot(slug) {
  const parts = String(slug ?? "index").split("/").filter(Boolean)
  const depth = parts.length - 1
  return depth <= 0 ? "." : Array(depth).fill("..").join("/")
}

// Estilos en quartz/styles/custom.scss (sin capa CSS).

export const LiqueedFooter = (opts = {}) => {
  const links = opts.links ?? {
    "liqueed": "https://liqueed.org",
    "Servicios de IA": "https://servicios.liqueed.org/ia",
    "AI Champion": "https://servicios.liqueed.org/ai-champion",
    "Contacto": "https://liqueed.org/contacto",
    "LinkedIn": "https://www.linkedin.com/company/liqueed",
  }
  const C = ({ fileData, displayClass }) => {
    const root = pathToRoot(fileData?.slug)
    const year = new Date().getFullYear()
    const id = (label) => "footer_" + label.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")
    return jsxs("footer", {
      class: `liqueed-footer ${displayClass ?? ""}`,
      children: [
        jsxs("div", {
          class: "liqueed-footer-brand",
          children: [
            jsxs("a", {
              href: "https://liqueed.org",
              "data-cta": "footer_logo",
              children: [
                jsx("img", { class: "liqueed-logo-light", src: `${root}/static/liqueed-logo.svg`, alt: "liqueed", width: 57, height: 48 }),
                jsx("img", { class: "liqueed-logo-dark", src: `${root}/static/liqueed-logo-white.svg`, alt: "", "aria-hidden": "true", width: 57, height: 48 }),
              ],
            }),
            jsx("p", { children: "Recursos de IA curados por liqueed: fuentes validadas sobre IA aplicada en organizaciones, producto y desarrollo." }),
          ],
        }),
        jsx("ul", {
          children: Object.entries(links).map(([label, href]) =>
            jsx("li", { children: jsx("a", { href, "data-cta": id(label), children: label }) }),
          ),
        }),
        jsxs("p", {
          class: "liqueed-footer-agents",
          children: [
            jsx("span", { class: "liqueed-mono", children: "Para agentes" }),
            " ",
            jsx("a", { href: `${root}/llms.txt`, children: "llms.txt" }), " · ",
            jsx("a", { href: `${root}/llms-full.txt`, children: "llms-full.txt" }), " · ",
            jsx("a", { href: `${root}/index.xml`, children: "RSS" }), " · ",
            jsx("a", { href: `${root}/sitemap.xml`, children: "sitemap" }),
          ],
        }),
        jsxs("p", {
          class: "liqueed-footer-credit",
          children: [
            `© ${year} liqueed · Sitio hecho con `,
            jsx("a", { href: "https://quartz.jzhao.xyz/", children: "Quartz" }),
            " (licencia MIT)",
          ],
        }),
      ],
    })
  }
  return C
}
