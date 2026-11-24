import { jsx, jsxs } from "preact/jsx-runtime"

/**
 * Bloque de CTA de Liqueed. Los estilos viven en quartz/styles/custom.scss (sin capa CSS,
 * así el tema de Quartz no los pisa).
 *
 * Newsletter: embed oficial de Kit (form 7bc27ec38d). El script de Kit reemplaza el
 * <script data-uid> por el form, en el mismo lugar. En la navegación SPA de Quartz los
 * <script> nuevos no se ejecutan, así que plugins/liqueed-site lo vuelve a inicializar.
 */
export const LiqueedCta = (opts = {}) => {
  const o = {
    eyebrow: "Trabajemos juntos",
    titleStart: "¿Querés aplicar esto en tu ",
    titleHighlight: "organización",
    titleEnd: "?",
    text:
      "En Liqueed acompañamos a las organizaciones a convertir el potencial de la inteligencia artificial en experiencias, soluciones y capacidades concretas. Si algo de lo que leíste acá te resuena, conversemos.",
    serviciosUrl: "https://servicios.liqueed.org/ia",
    serviciosLabel: "Conocé nuestros servicios de IA",
    agendaUrl: "https://calendar.app.google/CAiHee2GU6LagupaA",
    agendaLabel: "Agendá una conversación",
    kitUid: "7bc27ec38d",
    kitSrc: "https://liqueed.kit.com/7bc27ec38d/index.js",
    newsletterTitle: "Sumate al newsletter de Liqueed",
    newsletterText: "Novedades, recursos y aprendizajes sobre organizaciones e IA aplicada.",
    ...opts,
  }
  const link = (id, href, label, cls) =>
    jsx("a", { class: `liqueed-btn ${cls}`, href, "data-cta": id, target: "_blank", rel: "noopener", children: label })

  const C = ({ displayClass }) =>
    jsxs("aside", {
      class: `liqueed-cta ${displayClass ?? ""}`,
      "aria-labelledby": "liqueed-cta-title",
      children: [
        jsxs("div", {
          class: "liqueed-cta-main",
          children: [
            jsx("p", { class: "liqueed-eyebrow", children: o.eyebrow }),
            jsxs("h2", {
              id: "liqueed-cta-title",
              children: [o.titleStart, jsx("span", { class: "liqueed-hl", children: o.titleHighlight }), o.titleEnd],
            }),
            jsx("p", { class: "liqueed-cta-text", children: o.text }),
            jsxs("div", {
              class: "liqueed-cta-actions",
              children: [
                link("servicios_ia", o.serviciosUrl, o.serviciosLabel, "primary"),
                link("agenda", o.agendaUrl, o.agendaLabel, "ghost"),
              ],
            }),
          ],
        }),
        o.kitUid
          ? jsxs("div", {
              class: "liqueed-newsletter",
              "data-kit-uid": o.kitUid,
              "data-kit-src": o.kitSrc,
              children: [
                jsx("p", { class: "liqueed-newsletter-title", children: o.newsletterTitle }),
                jsx("p", { class: "liqueed-newsletter-text", children: o.newsletterText }),
                jsx("script", { async: true, "data-uid": o.kitUid, src: o.kitSrc }),
              ],
            })
          : null,
      ],
    })
  return C
}
