import { jsx, jsxs } from "preact/jsx-runtime"

/** Camino relativo a la raíz del sitio desde un slug de Quartz ("a/b/c" -> "../.."). */
export function pathToRoot(slug) {
  const parts = String(slug ?? "index").split("/").filter(Boolean)
  const depth = parts.length - 1
  return depth <= 0 ? "." : Array(depth).fill("..").join("/")
}

// Estilos en quartz/styles/custom.scss (sin capa CSS).

export const LiqueedBrand = (opts = {}) => {
  const href = opts.href ?? "https://liqueed.org"
  const C = ({ fileData, displayClass }) =>
    jsxs("a", {
      class: `liqueed-brand ${displayClass ?? ""}`,
      href,
      "data-cta": "brand_logo",
      children: [
        // Logo oficial (ojo de Liqueed) y su versión blanca para el modo oscuro.
        jsx("img", {
          class: "liqueed-logo-light",
          src: `${pathToRoot(fileData?.slug)}/static/liqueed-logo.svg`,
          alt: opts.label ?? "Liqueed",
          width: 57,
          height: 48,
        }),
        jsx("img", {
          class: "liqueed-logo-dark",
          src: `${pathToRoot(fileData?.slug)}/static/liqueed-logo-white.svg`,
          alt: "",
          "aria-hidden": "true",
          width: 57,
          height: 48,
        }),
      ],
    })
  return C
}
