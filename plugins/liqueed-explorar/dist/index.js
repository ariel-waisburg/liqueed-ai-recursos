import { fechaRecurso } from "./modelo.js"

/**
 * Transformer de liqueed-explorar: la fecha que muestra el sitio es la del recurso (`publicado`),
 * no la de carga en el repo (`guardado`) ni la del último commit.
 * Corre después de @quartz-community/created-modified-date (order 15 > 10): deja `created` y
 * `modified` (sitemap), pone `published` = publicado y usa ese tipo de fecha para mostrar.
 * Sin `publicado` real, `published` queda vacío: Quartz no muestra fecha y lo ordena al final.
 */
export default function LiqueedExplorarPlugin() {
  return {
    name: "LiqueedFechaRecurso",
    markdownPlugins() {
      return [
        () => (_tree, file) => {
          const data = file.data
          if (!data) return
          const slug = String(data.slug ?? "")
          const fr = slug.startsWith("fuentes/") ? fechaRecurso(data.frontmatter?.publicado) : null
          data.dates = { ...(data.dates ?? {}), published: fr ? fr.date : undefined }
          data.defaultDateType = "published"
        },
      ]
    },
  }
}
