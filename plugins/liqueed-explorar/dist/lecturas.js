import fs from "node:fs"
import path from "node:path"
import YAML from "yaml"
import { jsx, jsxs } from "preact/jsx-runtime"
import { PERFIL_LABEL, MADUREZ_LABEL, PERFILES, tipoLabel, idiomaLabel, relHref, oneLine, siteBase, pageUrl } from "./modelo.js"

/**
 * "Lecturas rápidas" (/lecturas-rapidas) y "Recorridos recomendados" (/recorridos-recomendados).
 *
 * Datos: curaduria/lecturas.yaml (lo propone Faro en el digest y lo aprueba Ari). Cada ítem apunta a una
 * ficha por el nombre de su archivo; título, autor, temas y minutos salen del frontmatter de la ficha.
 * - Minutos de la fuente: `minutos` + `minutos_origen` (medido / estimado) de la ficha.
 * - Minutos de la ficha: calculados sobre lo publicado (modelo.js, minutosLectura).
 * - Avisos de build: ficha que no existe o no se publica, paquete que se pasa del tiempo que promete,
 *   más de 5 lecturas rápidas o paquetes de menos de 3 o más de 5 lecturas.
 *
 * Sin JS: todo el contenido está en el HTML y los filtros (perfil y tema) funcionan con CSS (:has).
 * Con JS (LECTURAS_JS): URL compartible (?perfil=&tema=), avance de los recorridos en localStorage,
 * "Compartir con mi equipo" (navigator.share, si no copia el link; sin JS es un mailto) y eventos GA4.
 * Lead (opción A, decidida por Ari): CTA suave "Agendá una conversación" + "Compartir con mi equipo",
 * sin caja de email (liqueed-cta no se muestra en estas dos páginas: opción hideOn).
 */

export const LECTURAS_SLUG = "lecturas-rapidas"
export const RECORRIDOS_SLUG = "recorridos-recomendados"
const DATA_FILE = "curaduria/lecturas.yaml"
const MAX_PAQUETES = 5

const cache = new WeakMap()
let warnedFor = null

/** Lee curaduria/lecturas.yaml y resuelve cada ítem contra las fichas publicadas. */
export function loadLecturas(model) {
  const fp = path.resolve(DATA_FILE)
  let mtime = 0
  try {
    mtime = fs.statSync(fp).mtimeMs
  } catch {
    return { revisado: null, paquetes: [], recorridos: [], warnings: [`${DATA_FILE} no existe`] }
  }
  const hit = cache.get(model)
  if (hit && hit.mtime === mtime) return hit.data
  const raw = YAML.parse(fs.readFileSync(fp, "utf-8")) ?? {}
  const byName = new Map(model.fichas.map((f) => [f.name, f]))
  const warnings = []
  const resolve = (items, where) =>
    (Array.isArray(items) ? items : [])
      .map((it) => {
        const name = oneLine(it?.ficha)
        const f = byName.get(name)
        if (!f) warnings.push(`${where}: la ficha "${name}" no existe o no se publica`)
        return f ? { f, porQue: oneLine(it?.por_que) } : null
      })
      .filter(Boolean)
  const totals = (items) => ({
    fuente: items.reduce((s, it) => s + (it.f.minutos ?? 0), 0),
    ficha: items.reduce((s, it) => s + (it.f.minutosFicha ?? 0), 0),
    sinMinutos: items.filter((it) => !it.f.minutos).length,
    estimado: items.some((it) => it.f.minutosOrigen === "estimado"),
  })
  const temasDe = (items) => [...new Set(items.flatMap((it) => it.f.temas))]
  const perfilesDe = (v) => (Array.isArray(v) ? v : v ? [v] : []).map((p) => oneLine(p).toLowerCase()).filter((p) => PERFILES.includes(p))

  const paquetes = (raw.lecturas_rapidas ?? []).map((p) => {
    const id = oneLine(p.id)
    const items = resolve(p.items, `lectura rápida "${id}"`)
    const t = totals(items)
    const minutos = Number(p.minutos) || null
    if (minutos && t.fuente > minutos) warnings.push(`lectura rápida "${id}": las fuentes suman ${t.fuente} min y el paquete promete ${minutos}`)
    if (items.length < 3 || items.length > 5) warnings.push(`lectura rápida "${id}": tiene ${items.length} lecturas (van de 3 a 5)`)
    return { id, titulo: oneLine(p.titulo), minutos, perfil: perfilesDe(p.perfil), descripcion: oneLine(p.descripcion), items, totales: t, temas: temasDe(items) }
  })
  if (paquetes.length > MAX_PAQUETES) warnings.push(`hay ${paquetes.length} lecturas rápidas; la página muestra las primeras ${MAX_PAQUETES}`)

  const recorridos = (raw.recorridos ?? []).map((r) => {
    const id = oneLine(r.id)
    const pasos = resolve(r.pasos, `recorrido "${id}"`)
    const extra = resolve(r.para_profundizar, `recorrido "${id}" (para profundizar)`)
    return {
      id,
      titulo: oneLine(r.titulo),
      perfil: perfilesDe(r.perfil),
      madurez: oneLine(r.madurez).toLowerCase() || null,
      descripcion: oneLine(r.descripcion),
      saleSabiendo: oneLine(r.sale_sabiendo),
      cta: oneLine(r.cta),
      pasos,
      extra,
      totales: totals(pasos),
      temas: temasDe(pasos),
    }
  })

  const data = { revisado: raw.revisado ? String(raw.revisado).slice(0, 10) : null, paquetes: paquetes.slice(0, MAX_PAQUETES), recorridos, warnings }
  cache.set(model, { mtime, data })
  const key = `${mtime}:${warnings.join("|")}`
  if (warnings.length && warnedFor !== key) {
    warnedFor = key
    for (const w of warnings) console.warn(`[liqueed-explorar] ${DATA_FILE}: ${w}`)
  }
  return data
}

// ---------- textos ----------

export const minLabel = (n) => `${n} min`
export function fuenteLabel(f) {
  if (!f.minutos) return f.tipo === "curso" || f.tipo === "libro" || f.tipo === "referente" ? "Fuente: a tu ritmo" : null
  return `Fuente: ${minLabel(f.minutos)}${f.minutosOrigen === "estimado" ? " (estimado)" : ""}`
}
function totalesLabel(t, n, unidad) {
  const parts = [`${n} ${unidad}${n === 1 ? "" : "s"}`]
  if (t.ficha) parts.push(`Fichas: ${minLabel(t.ficha)}`)
  if (t.fuente) parts.push(`Fuentes: ${t.estimado ? "unos " : ""}${minLabel(t.fuente)}${t.sinMinutos ? " + lecturas a tu ritmo" : ""}`)
  return parts.join(" · ")
}
const perfilesLabel = (ps) => (ps.length === PERFILES.length ? "Todos los perfiles" : ps.map((p) => PERFIL_LABEL[p]).join(" · "))

// ---------- componentes ----------

const cssStr = (s) => String(s).replace(/["\\]/g, "\\$&")

function filtrosCss(temas) {
  const rules = PERFILES.map((p) => `.lq-lr:has(input[name="perfil"][value="${p}"]:checked) .lq-lr-card:not([data-perfil~="${p}"])`)
  for (const t of temas) rules.push(`.lq-lr:has(select[name="tema"] option[value="${cssStr(t.value)}"]:checked) .lq-lr-card:not([data-tema~="${cssStr(t.value)}"])`)
  return `${rules.join(",\n")}{display:none}`
}

function Filtros({ temas, tipo }) {
  return jsxs("form", {
    class: "lq-lr-filtros",
    "aria-label": tipo === "recorridos" ? "Filtrar recorridos" : "Filtrar lecturas rápidas",
    action: "",
    method: "get",
    children: [
      jsxs("fieldset", {
        class: "lq-lr-perfiles",
        children: [
          jsx("legend", { children: "Tu perfil" }),
          ...[["", "Todos"], ...PERFILES.map((p) => [p, PERFIL_LABEL[p]])].map(([v, label]) =>
            jsxs("label", {
              class: "lq-lr-chip",
              children: [jsx("input", { type: "radio", name: "perfil", value: v, checked: v === "" ? true : undefined }), jsx("span", { children: label })],
            }),
          ),
        ],
      }),
      jsxs("div", {
        class: "lq-lr-tema",
        children: [
          jsx("label", { for: `lq-lr-tema-${tipo}`, children: "Tema" }),
          jsxs("select", {
            id: `lq-lr-tema-${tipo}`,
            name: "tema",
            children: [jsx("option", { value: "", children: "Todos los temas" }), ...temas.map((t) => jsx("option", { value: t.value, children: t.label }))],
          }),
        ],
      }),
    ],
  })
}

function Item({ it, from, idx, ruta }) {
  const f = it.f
  const meta = [f.autor, f.tipo ? tipoLabel(f.tipo) : null, f.idioma ? idiomaLabel(f.idioma) : null].filter(Boolean).join(" · ")
  const fuente = fuenteLabel(f)
  return jsxs("li", {
    class: "lq-lr-item",
    "data-item": f.name,
    "data-pos": String(idx + 1),
    children: [
      ruta
        ? jsx("button", {
            type: "button",
            class: "lq-step-check",
            hidden: true,
            "aria-pressed": "false",
            "data-step": String(idx + 1),
            children: jsx("span", { class: "lq-sr", children: `Marcar el paso ${idx + 1} como leído` }),
          })
        : jsx("span", { class: "lq-step-num", "aria-hidden": "true", children: String(idx + 1) }),
      jsxs("div", {
        class: "lq-lr-item-body",
        children: [
          jsx("h3", { children: jsx("a", { class: "internal", href: relHref(from, f.slug), "data-slug": f.slug, "data-lq-link": "ficha", children: f.title }) }),
          meta ? jsx("p", { class: "lq-lr-meta", children: meta }) : null,
          it.porQue ? jsx("p", { class: "lq-lr-why", children: it.porQue }) : null,
          jsxs("p", {
            class: "lq-lr-times",
            children: [
              f.minutosFicha ? jsx("span", { class: "lq-t", children: `Ficha: ${minLabel(f.minutosFicha)}` }) : null,
              fuente ? jsx("span", { class: "lq-t", children: fuente }) : null,
              jsx("a", { class: "external", href: f.url, target: "_blank", rel: "noopener", "data-lq-link": "fuente", children: "Fuente original ↗" }),
            ],
          }),
        ],
      }),
    ],
  })
}

function shareHref(url, titulo) {
  const body = `Te comparto esta selección de lecturas sobre IA de liqueed: ${titulo}\n${url}`
  return `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(body)}`
}

function shareUrl(cfg, slug, hash) {
  return `${siteBase(cfg)}/${slug}?utm_source=recursos-ai&utm_medium=compartir&utm_campaign=${slug}${hash ? `#${hash}` : ""}`
}

function ShareButton({ cfg, slug, hash, titulo, origen, id, cls = "ghost" }) {
  const url = shareUrl(cfg, slug, hash)
  return jsx("a", {
    class: `liqueed-btn ${cls} lq-share`,
    href: shareHref(url, titulo),
    "data-lq-share": origen,
    "data-lq-id": id,
    "data-share-url": url,
    "data-share-title": titulo,
    children: "Compartir con mi equipo",
  })
}

function AgendaButton({ o, origen, id, cls = "primary" }) {
  return jsx("a", {
    class: `liqueed-btn ${cls}`,
    href: o.agendaUrl,
    target: "_blank",
    rel: "noopener",
    "data-cta": `agenda_${origen}`,
    "data-lq-agendar": origen,
    "data-lq-id": id,
    children: "Agendá una conversación",
  })
}

function CtaPagina({ o, cfg, slug, titulo }) {
  return jsxs("aside", {
    class: "liqueed-cta lq-lr-cta",
    "aria-labelledby": "lq-lr-cta-title",
    children: [
      jsx("p", { class: "liqueed-eyebrow", children: "Para tu equipo" }),
      jsxs("h2", { id: "lq-lr-cta-title", children: ["¿Querés un recorrido armado para ", jsx("span", { class: "liqueed-hl", children: "tu equipo" }), "?"] }),
      jsx("p", {
        children:
          "Lo diseñamos con ustedes: elegimos las lecturas según los roles y la etapa de adopción de tu organización, y las llevamos a ejercicios sobre sus propios casos.",
      }),
      jsxs("div", {
        class: "liqueed-cta-actions",
        children: [jsx(AgendaButton, { o, origen: "pagina", id: slug }), jsx(ShareButton, { cfg, slug, titulo, origen: "pagina", id: slug })],
      }),
      jsx("p", { class: "lq-share-status", role: "status", "aria-live": "polite" }),
    ],
  })
}

function temasOpciones(cards, model) {
  const seen = new Map()
  for (const c of cards) for (const k of c.temas) if (!seen.has(k)) seen.set(k, model.temaByKey.get(k)?.title ?? k)
  return [...seen].map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label, "es"))
}

function Vacio() {
  return jsx("p", { class: "lq-lr-empty", hidden: true, children: "No hay nada para esa combinación todavía. Probá con otro tema o con todos los perfiles." })
}

export function LecturasRapidas({ model, slug, cfg, o }) {
  const data = loadLecturas(model)
  const temas = temasOpciones(data.paquetes, model)
  return jsxs("section", {
    class: "lq-lr",
    "data-lq-page": "lecturas",
    children: [
      jsx("style", { dangerouslySetInnerHTML: { __html: filtrosCss(temas) } }),
      jsx(Filtros, { temas, tipo: "lecturas" }),
      jsx(Vacio, {}),
      jsx("div", {
        class: "lq-lr-grid",
        children: data.paquetes.map((p) =>
          jsxs("article", {
            class: "lq-lr-card lq-pack",
            id: p.id,
            "data-pack": p.id,
            "data-perfil": p.perfil.join(" "),
            "data-tema": p.temas.join(" "),
            "aria-labelledby": `${p.id}-t`,
            children: [
              jsx("p", { class: "lq-lr-eyebrow", children: [p.minutos ? `${p.minutos} minutos` : null, perfilesLabel(p.perfil)].filter(Boolean).join(" · ") }),
              jsx("h2", { id: `${p.id}-t`, children: p.titulo }),
              p.descripcion ? jsx("p", { class: "lq-lr-desc", children: p.descripcion }) : null,
              jsx("p", { class: "lq-lr-totals", children: totalesLabel(p.totales, p.items.length, "lectura") }),
              jsx("ol", { class: "lq-lr-items", children: p.items.map((it, i) => jsx(Item, { it, from: slug, idx: i })) }),
              jsx("div", { class: "lq-lr-card-actions", children: jsx(ShareButton, { cfg, slug, hash: p.id, titulo: p.titulo, origen: "paquete", id: p.id, cls: "ghost small" }) }),
            ],
          }),
        ),
      }),
      jsxs("p", {
        class: "lq-lr-nota",
        children: [
          "¿Querés ir más a fondo? Mirá los ",
          jsx("a", { class: "internal", href: relHref(slug, RECORRIDOS_SLUG), "data-slug": RECORRIDOS_SLUG, children: "recorridos recomendados" }),
          " por perfil. Los minutos de la fuente son medidos o estimados (lo indicamos); los de la ficha, de nuestro resumen.",
          data.revisado ? ` Selección revisada el ${fechaCorta(data.revisado)}.` : "",
        ],
      }),
      jsx(CtaPagina, { o, cfg, slug, titulo: "Lecturas rápidas sobre IA aplicada (liqueed)" }),
    ],
  })
}

export function Recorridos({ model, slug, cfg, o }) {
  const data = loadLecturas(model)
  const temas = temasOpciones(data.recorridos, model)
  return jsxs("section", {
    class: "lq-lr",
    "data-lq-page": "recorridos",
    children: [
      jsx("style", { dangerouslySetInnerHTML: { __html: filtrosCss(temas) } }),
      jsx(Filtros, { temas, tipo: "recorridos" }),
      jsx(Vacio, {}),
      ...data.recorridos.map((r) =>
        jsxs("article", {
          class: "lq-lr-card lq-route",
          id: r.id,
          "data-route": r.id,
          "data-steps": String(r.pasos.length),
          "data-perfil": r.perfil.join(" "),
          "data-tema": r.temas.join(" "),
          "aria-labelledby": `${r.id}-t`,
          children: [
            jsx("p", {
              class: "lq-lr-eyebrow",
              children: ["Recorrido recomendado", perfilesLabel(r.perfil), r.madurez ? MADUREZ_LABEL[r.madurez] ?? r.madurez : null].filter(Boolean).join(" · "),
            }),
            jsx("h2", { id: `${r.id}-t`, children: r.titulo }),
            r.descripcion ? jsx("p", { class: "lq-lr-desc", children: r.descripcion }) : null,
            jsx("p", { class: "lq-lr-totals", children: totalesLabel(r.totales, r.pasos.length, "paso") }),
            r.saleSabiendo ? jsxs("p", { class: "lq-lr-outcome", children: [jsx("strong", { children: "Al terminar vas a saber: " }), r.saleSabiendo] }) : null,
            jsxs("div", {
              class: "lq-route-progress",
              hidden: true,
              children: [
                jsx("div", { class: "lq-route-bar", "aria-hidden": "true", children: jsx("span", {}) }),
                jsx("p", { class: "lq-route-count", role: "status", "aria-live": "polite", children: `0 de ${r.pasos.length} leídos` }),
                jsx("button", { type: "button", class: "lq-route-reset", hidden: true, children: "Empezar de nuevo" }),
              ],
            }),
            jsx("ol", { class: "lq-lr-items", children: r.pasos.map((it, i) => jsx(Item, { it, from: slug, idx: i, ruta: true })) }),
            r.extra.length
              ? jsxs("div", {
                  class: "lq-route-extra",
                  children: [
                    jsx("h3", { children: "Para profundizar" }),
                    jsx("ul", { class: "lq-lr-items", children: r.extra.map((it, i) => jsx(Item, { it, from: slug, idx: i })) }),
                  ],
                })
              : null,
            jsxs("div", {
              class: "lq-route-cta",
              children: [
                r.cta ? jsx("p", { children: r.cta }) : null,
                jsxs("div", {
                  class: "liqueed-cta-actions",
                  children: [
                    jsx(AgendaButton, { o, origen: "recorrido", id: r.id, cls: "primary small" }),
                    jsx(ShareButton, { cfg, slug, hash: r.id, titulo: r.titulo, origen: "recorrido", id: r.id, cls: "ghost small" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ),
      jsxs("p", {
        class: "lq-lr-nota",
        children: [
          "¿Poco tiempo? Empezá por las ",
          jsx("a", { class: "internal", href: relHref(slug, LECTURAS_SLUG), "data-slug": LECTURAS_SLUG, children: "lecturas rápidas" }),
          ". El avance de cada recorrido se guarda solo en este navegador.",
          data.revisado ? ` Recorridos revisados el ${fechaCorta(data.revisado)}.` : "",
        ],
      }),
      jsx(CtaPagina, { o, cfg, slug, titulo: "Recorridos recomendados sobre IA aplicada (liqueed)" }),
    ],
  })
}

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
function fechaCorta(iso) {
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  return m ? `${+m[3]} de ${MESES[+m[2] - 1]} de ${m[1]}` : iso
}

/** Datos para llms.txt y recorridos.json (plugins/liqueed-site). */
export function lecturasParaAgentes(model, cfg) {
  const data = loadLecturas(model)
  const base = siteBase(cfg)
  const item = (it) => ({
    titulo: it.f.title,
    autor: it.f.autor || null,
    ficha: pageUrl(cfg, it.f.slug),
    fuente: it.f.url,
    minutos_ficha: it.f.minutosFicha,
    minutos_fuente: it.f.minutos,
    minutos_fuente_origen: it.f.minutosOrigen,
    por_que: it.porQue || null,
  })
  return {
    revisado: data.revisado,
    lecturas_rapidas: data.paquetes.map((p) => ({
      id: p.id,
      url: `${base}/${LECTURAS_SLUG}#${p.id}`,
      titulo: p.titulo,
      minutos: p.minutos,
      perfil: p.perfil,
      descripcion: p.descripcion,
      lecturas: p.items.map(item),
    })),
    recorridos: data.recorridos.map((r) => ({
      id: r.id,
      url: `${base}/${RECORRIDOS_SLUG}#${r.id}`,
      titulo: r.titulo,
      perfil: r.perfil,
      madurez: r.madurez,
      descripcion: r.descripcion,
      al_terminar: r.saleSabiendo || null,
      pasos: r.pasos.map(item),
      para_profundizar: r.extra.map(item),
    })),
  }
}
