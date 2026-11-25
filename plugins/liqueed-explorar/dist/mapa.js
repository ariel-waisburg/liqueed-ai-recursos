/**
 * liqueed-explorar: JS del "Mapa de conexiones" (la Vista Gráfica global de @quartz-community/graph).
 *
 * - Todo link con [data-lq-mapa] (hero de la home, fichas, temas, página /mapa) abre el grafo global
 *   en el lugar. Sin JS (o sin grafo en la página) el link lleva a /mapa.
 * - Debajo del mini-grafo de la barra lateral agrega el botón "Ver mapa de conexiones".
 * - En /mapa el grafo se abre solo, a pantalla completa.
 * - Barra superior en el grafo abierto: título, ayuda y botón "Cerrar" (además de Esc y tocar afuera).
 *   El foco va al botón Cerrar y vuelve al link que lo abrió.
 * - GA4: evento `graph_open` (origen, page_path) en el dataLayer. Orígenes: home, ficha, tema,
 *   mini-grafo, pagina-mapa, icono (el ícono original del grafo), atajo (Ctrl/Cmd+G).
 * Funciona con el SPA de Quartz: se re-engancha en cada evento "nav".
 * El apilamiento (por encima de todo) y el bloqueo de scroll están en quartz/styles/custom.scss.
 */

export const MAPA_JS = `
(function () {
  if (window.__liqueedMapa) return;
  window.__liqueedMapa = true;
  var origen = null, volverA = null, observer = null;
  function track(name, params) {
    window.dataLayer = window.dataLayer || [];
    (function () { window.dataLayer.push(arguments); })("event", name, params);
  }
  function outer() { return document.querySelector(".global-graph-outer"); }
  function icon() { return document.querySelector(".graph .global-graph-icon"); }
  function abierto() { var o = outer(); return !!(o && o.classList.contains("active")); }
  function abrir(o) {
    var i = icon();
    if (!i || abierto()) return false;
    origen = o;
    i.click();
    return true;
  }
  function cerrar() { var i = icon(); if (i && abierto()) i.click(); }

  // Links "Ver mapa de conexiones": capturing, así ni el router SPA ni el "click afuera" del grafo lo ven.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-lq-mapa]");
    if (!a || e.defaultPrevented || e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (!icon()) return; // sin grafo en esta página: que navegue a /mapa
    e.preventDefault();
    e.stopPropagation();
    volverA = a;
    abrir(a.getAttribute("data-lq-mapa") || "boton");
  }, true);
  // Ícono original y atajo de teclado: solo para registrar el origen del evento.
  document.addEventListener("click", function (e) {
    if (e.isTrusted && e.target.closest && e.target.closest(".global-graph-icon") && !abierto()) { origen = "icono"; volverA = e.target.closest(".global-graph-icon"); }
  }, true);
  document.addEventListener("keydown", function (e) {
    if (e.key === "g" && (e.ctrlKey || e.metaKey) && !e.shiftKey && !abierto()) { origen = "atajo"; volverA = document.activeElement; }
  }, true);

  function barra(o) {
    if (o.querySelector(".lq-mapa-barra")) return;
    var bar = document.createElement("div");
    bar.className = "lq-mapa-barra";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Mapa de conexiones");
    bar.innerHTML =
      '<div class="lq-mapa-titulo"><strong>Mapa de conexiones</strong>' +
      '<span>Cada punto es una ficha, un tema o un concepto. Arrastrá, hacé zoom y tocá un punto para abrirlo.</span></div>' +
      '<button type="button" class="lq-mapa-cerrar">Cerrar <span aria-hidden="true">×</span></button>';
    // Los clicks en la barra no cuentan como "click afuera" (que cierra el grafo).
    bar.addEventListener("click", function (e) {
      e.stopPropagation();
      if (e.target.closest(".lq-mapa-cerrar")) cerrar();
    });
    o.insertBefore(bar, o.firstChild);
  }
  function alCambiar(o) {
    var act = o.classList.contains("active");
    document.documentElement.classList.toggle("lq-mapa-abierto", act);
    if (act) {
      track("graph_open", { origen: origen || "otro", page_path: location.pathname });
      origen = null;
      var c = o.querySelector(".lq-mapa-cerrar");
      if (c) setTimeout(function () { c.focus({ preventScroll: true }); }, 0);
    } else if (volverA && document.contains(volverA)) {
      volverA.focus({ preventScroll: true });
      volverA = null;
    }
  }
  function miniBoton() {
    var g = document.querySelector(".graph");
    if (!g || g.querySelector(".lq-mapa-mini")) return;
    var a = document.createElement("a");
    a.className = "lq-mapa-mini";
    a.href = rel("mapa");
    a.setAttribute("data-lq-mapa", "mini-grafo");
    a.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>Ver mapa de conexiones';
    var go = g.querySelector(".graph-outer");
    if (go && go.nextSibling) g.insertBefore(a, go.nextSibling); else g.appendChild(a);
    var gi = g.querySelector(".global-graph-icon");
    if (gi) { gi.setAttribute("aria-label", "Ampliar el mapa de conexiones"); gi.setAttribute("title", "Ampliar el mapa de conexiones"); }
  }
  // Link relativo a la raíz del sitio (el sitio vive en un subdirectorio de GitHub Pages).
  function rel(target) {
    var slug = document.body.dataset.slug || "";
    var depth = slug.split("/").length - 1;
    return (depth > 0 ? new Array(depth + 1).join("../") : "./") + target;
  }
  function init() {
    var o = outer();
    document.documentElement.classList.toggle("lq-mapa-abierto", !!(o && o.classList.contains("active")));
    if (observer) observer.disconnect();
    if (!o) return;
    barra(o);
    miniBoton();
    observer = new MutationObserver(function () { alCambiar(o); });
    observer.observe(o, { attributes: true, attributeFilter: ["class"] });
    if (document.body.dataset.slug === "mapa") {
      document.documentElement.classList.add("lq-en-mapa");
      // El plugin del grafo engancha su ícono en su propio "nav": se reintenta hasta que abra.
      var intentos = 0;
      (function intentar() {
        if (abierto() || document.body.dataset.slug !== "mapa" || ++intentos > 30) return;
        abrir("pagina-mapa");
        setTimeout(function () { if (!abierto()) intentar(); }, 150);
      })();
    } else {
      document.documentElement.classList.remove("lq-en-mapa");
    }
  }
  document.addEventListener("nav", function () { setTimeout(init, 0); });
  if (document.readyState !== "loading") init(); else document.addEventListener("DOMContentLoaded", init);
})();
`
