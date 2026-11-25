/**
 * liqueed-explorar: JS de la página /explorar (mejora progresiva sobre el filtro CSS).
 *
 * - Lee los filtros de la URL (?tipo=&idioma=&tema=&tag=&q=) y los aplica.
 * - Búsqueda por texto (título, autor, plataforma, "En una línea"), sin tildes.
 * - Conteos por opción según los demás filtros, contador "N de M fichas" (aria-live) y estado vacío.
 * - Actualiza la URL con history.replaceState para que se pueda compartir.
 * - Valor elegido siempre legible: la opción elegida se muestra sin el conteo (el total está en
 *   el contador) y debajo hay chips con cada filtro activo completo, que se quitan con un toque.
 * - GA4: evento `filter_use` (facet, value, results, page_path) en el dataLayer.
 * Funciona con el SPA de Quartz: se inicializa en cada evento "nav".
 */

export const EXPLORAR_JS = `
(function () {
  if (window.__liqueedExplorar) return;
  window.__liqueedExplorar = true;
  var FACETS = ["tipo", "idioma", "tema", "tag"];
  function norm(s) { return String(s || "").normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase().trim(); }
  function gtagEvent(name, params) {
    window.dataLayer = window.dataLayer || [];
    (function () { window.dataLayer.push(arguments); })("event", name, params);
  }
  function init() {
    var root = document.querySelector(".lx");
    if (!root || root.dataset.lxReady) return;
    root.dataset.lxReady = "1";
    var form = root.querySelector(".lx-form");
    var qBox = root.querySelector(".lx-q");
    var q = root.querySelector("#lx-q");
    var status = root.querySelector(".lx-status");
    var empty = root.querySelector(".lx-empty");
    var items = Array.prototype.slice.call(root.querySelectorAll(".lx-item"));
    var total = items.length;
    var selects = {};
    FACETS.forEach(function (k) { selects[k] = form.querySelector('select[name="' + k + '"]'); });
    if (qBox) qBox.hidden = false;
    root.classList.add("lx-js");

    var params = new URLSearchParams(location.search);
    FACETS.forEach(function (k) {
      var v = params.get(k), s = selects[k];
      if (s && v && s.querySelector('option[value="' + CSS.escape(v) + '"]')) s.value = v;
    });
    if (q && params.get("q")) q.value = params.get("q");

    function state() {
      var st = { q: q ? norm(q.value) : "" };
      FACETS.forEach(function (k) { st[k] = selects[k] ? selects[k].value : ""; });
      return st;
    }
    function matches(it, st, skip) {
      for (var i = 0; i < FACETS.length; i++) {
        var k = FACETS[i];
        if (k === skip || !st[k]) continue;
        if ((" " + (it.getAttribute("data-" + k) || "") + " ").indexOf(" " + st[k] + " ") === -1) return false;
      }
      if (st.q) {
        var text = it.getAttribute("data-text") || "";
        var words = st.q.split(/\\s+/);
        for (var j = 0; j < words.length; j++) if (text.indexOf(words[j]) === -1) return false;
      }
      return true;
    }
    function apply() {
      var st = state(), shown = 0;
      items.forEach(function (it) {
        var ok = matches(it, st);
        it.hidden = !ok;
        if (ok) shown++;
      });
      // Conteos de cada opción considerando los demás filtros.
      FACETS.forEach(function (k) {
        var s = selects[k];
        if (!s) return;
        Array.prototype.forEach.call(s.options, function (opt) {
          var n = 0;
          items.forEach(function (it) {
            if (!matches(it, st, k)) return;
            if (!opt.value || (" " + (it.getAttribute("data-" + k) || "") + " ").indexOf(" " + opt.value + " ") !== -1) n++;
          });
          var label = opt.value ? opt.getAttribute("data-label") : "Todos";
          // La opción elegida va sin conteo para que entre completa en el campo.
          opt.textContent = opt.value && opt.selected ? label : label + " (" + n + ")";
        });
      });
      renderChips(st);
      var active = FACETS.some(function (k) { return st[k]; }) || !!st.q;
      status.textContent = active ? "Mostrando " + shown + " de " + total + " fichas" : total + " fichas en total";
      if (empty) empty.hidden = shown !== 0;
      var p = new URLSearchParams();
      FACETS.forEach(function (k) { if (st[k]) p.set(k, st[k]); });
      if (q && q.value.trim()) p.set("q", q.value.trim());
      var qs = p.toString();
      var url = location.pathname + (qs ? "?" + qs : "") + location.hash;
      if (url !== location.pathname + location.search + location.hash) history.replaceState(history.state, "", url);
      return shown;
    }
    var actions = form.querySelector(".lx-actions");
    var chips = document.createElement("ul");
    chips.className = "lx-activos";
    chips.setAttribute("aria-label", "Filtros activos");
    if (actions) actions.insertBefore(chips, actions.firstChild);
    function renderChips(st) {
      chips.innerHTML = "";
      FACETS.forEach(function (k) {
        var s = selects[k];
        if (!s || !st[k]) return;
        var opt = s.options[s.selectedIndex];
        var lab = form.querySelector('label[for="' + s.id + '"]');
        var facetName = lab ? lab.textContent : k;
        var li = document.createElement("li");
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("data-quitar", k);
        b.setAttribute("aria-label", "Quitar filtro " + facetName + ": " + opt.getAttribute("data-label"));
        var strong = document.createElement("b");
        strong.textContent = facetName.charAt(0) + facetName.slice(1).toLowerCase() + ":";
        var x = document.createElement("span");
        x.setAttribute("aria-hidden", "true");
        x.textContent = "×";
        b.appendChild(strong);
        b.appendChild(document.createTextNode(" " + opt.getAttribute("data-label")));
        b.appendChild(x);
        li.appendChild(b);
        chips.appendChild(li);
      });
      chips.hidden = !chips.firstChild;
    }
    chips.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("button[data-quitar]");
      if (!b) return;
      var k = b.getAttribute("data-quitar");
      selects[k].value = "";
      var shown = apply();
      gtagEvent("filter_use", { facet: k, value: "(todos)", results: shown, page_path: location.pathname });
      selects[k].focus();
    });
    var timer = null;
    function onChange(e) {
      var t = e.target;
      if (!t || !t.name) return;
      var shown = apply();
      var send = function () { gtagEvent("filter_use", { facet: t.name, value: t.value || "(todos)", results: shown, page_path: location.pathname }); };
      clearTimeout(timer);
      if (t.name === "q") timer = setTimeout(send, 900); else send();
    }
    form.addEventListener("change", onChange);
    form.addEventListener("input", function (e) { if (e.target === q) onChange(e); });
    form.addEventListener("submit", function (e) { e.preventDefault(); apply(); });
    form.addEventListener("reset", function () {
      setTimeout(function () {
        apply();
        gtagEvent("filter_use", { facet: "reset", value: "(todos)", results: total, page_path: location.pathname });
      }, 0);
    });
    apply();
  }
  document.addEventListener("nav", init);
  if (document.readyState !== "loading") init(); else document.addEventListener("DOMContentLoaded", init);
})();
`

