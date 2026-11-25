/**
 * JS de /lecturas-rapidas y /recorridos-recomendados (mejora progresiva: sin JS todo se ve y filtra con CSS).
 *
 * - Filtros perfil y tema (dos <select> iguales): aplica ?perfil=&tema= de la URL, la actualiza con replaceState y muestra el estado vacío.
 * - Recorridos: botón "leído" por paso, barra de avance y "Empezar de nuevo"; se guarda en localStorage
 *   ("lq-recorrido:<id>"), solo en este navegador.
 * - "Compartir con mi equipo": navigator.share si existe; si no, copia el link; si falla, sigue el mailto.
 * - Eventos GA4 (dataLayer, mismo tag G-1EWL68QK9C):
 *   profile_select {perfil, page_type} · topic_filter {tema, page_type}
 *   pack_open {pack_id} (primer clic en una lectura del paquete en la visita) ·
 *   pack_item_click {pack_id, item, position, link_type: ficha|fuente}
 *   route_step {route_id, step, item, action: open|done|undone, link_type} · route_complete {route_id, steps}
 *   cta_agendar_click {origen: pagina, id} (además del cta_click general de los a[data-cta])
 *   share_team_click {origen: pagina|paquete|recorrido, id, method: native|clipboard|email}
 *   Todos llevan page_path.
 * Funciona con el SPA de Quartz: los listeners de clic van una sola vez en document; el estado, en cada "nav".
 */
export const LECTURAS_JS = `
(function () {
  if (window.__liqueedLecturas) return;
  window.__liqueedLecturas = true;
  function ev(name, params) {
    params = params || {};
    params.page_path = location.pathname;
    window.dataLayer = window.dataLayer || [];
    (function () { window.dataLayer.push(arguments); })("event", name, params);
  }
  function pageType(root) { return root ? root.getAttribute("data-lq-page") : null; }
  var KEY = "lq-recorrido:";
  function load(id) { try { return JSON.parse(localStorage.getItem(KEY + id) || "[]"); } catch (e) { return []; } }
  function save(id, arr) { try { localStorage.setItem(KEY + id, JSON.stringify(arr)); } catch (e) {} }
  var opened = {};

  function applyFilters(root, push) {
    var form = root.querySelector(".lq-lr-filtros");
    if (!form) return;
    var perfil = (form.querySelector('select[name="perfil"]') || {}).value || "";
    var tema = (form.querySelector('select[name="tema"]') || {}).value || "";
    var shown = 0;
    root.querySelectorAll(".lq-lr-card").forEach(function (c) {
      var ok = (!perfil || (" " + c.getAttribute("data-perfil") + " ").indexOf(" " + perfil + " ") !== -1) &&
        (!tema || (" " + c.getAttribute("data-tema") + " ").indexOf(" " + tema + " ") !== -1);
      c.hidden = !ok;
      if (ok) shown++;
    });
    var empty = root.querySelector(".lq-lr-empty");
    if (empty) empty.hidden = shown !== 0;
    if (push) {
      var p = new URLSearchParams(location.search);
      perfil ? p.set("perfil", perfil) : p.delete("perfil");
      tema ? p.set("tema", tema) : p.delete("tema");
      var qs = p.toString();
      history.replaceState(history.state, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
    }
    return shown;
  }

  function paintRoute(card) {
    var id = card.getAttribute("data-route");
    var done = load(id);
    var steps = card.querySelectorAll(".lq-step-check");
    var total = steps.length, n = 0;
    steps.forEach(function (b) {
      var s = b.getAttribute("data-step");
      var on = done.indexOf(s) !== -1;
      if (on) n++;
      b.hidden = false;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.closest(".lq-lr-item").classList.toggle("lq-done", on);
      b.querySelector(".lq-sr").textContent = (on ? "Desmarcar el paso " : "Marcar el paso ") + s + (on ? " (leído)" : " como leído");
    });
    var prog = card.querySelector(".lq-route-progress");
    if (prog) {
      prog.hidden = false;
      prog.querySelector(".lq-route-bar span").style.width = (total ? Math.round(100 * n / total) : 0) + "%";
      prog.querySelector(".lq-route-count").textContent = n === total && total ? n + " de " + total + " leídos · completo" : n + " de " + total + " leídos";
      var reset = prog.querySelector(".lq-route-reset");
      if (reset) reset.hidden = n === 0;
    }
    return { n: n, total: total };
  }

  function init() {
    var root = document.querySelector(".lq-lr");
    if (!root || root.dataset.lqReady) return;
    root.dataset.lqReady = "1";
    root.classList.add("lq-js");
    var form = root.querySelector(".lq-lr-filtros");
    if (form) {
      var params = new URLSearchParams(location.search);
      var p = params.get("perfil"), t = params.get("tema");
      [["perfil", p], ["tema", t]].forEach(function (kv) {
        var s = form.querySelector('select[name="' + kv[0] + '"]');
        if (s && kv[1] && s.querySelector('option[value="' + CSS.escape(kv[1]) + '"]')) s.value = kv[1];
      });
      applyFilters(root, false);
      form.addEventListener("change", function (e) {
        applyFilters(root, true);
        if (e.target.name === "perfil") ev("profile_select", { perfil: e.target.value || "(todos)", page_type: pageType(root) });
        if (e.target.name === "tema") ev("topic_filter", { tema: e.target.value || "(todos)", page_type: pageType(root) });
      });
      form.addEventListener("submit", function (e) { e.preventDefault(); });
    }
    root.querySelectorAll(".lq-route").forEach(paintRoute);
  }

  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target : null;
    if (!el) return;
    // Marcar paso leído
    var chk = el.closest(".lq-step-check");
    if (chk) {
      var card = chk.closest(".lq-route"), id = card.getAttribute("data-route"), s = chk.getAttribute("data-step");
      var done = load(id), i = done.indexOf(s), item = chk.closest(".lq-lr-item").getAttribute("data-item");
      if (i === -1) done.push(s); else done.splice(i, 1);
      save(id, done);
      var st = paintRoute(card);
      ev("route_step", { route_id: id, step: Number(s), item: item, action: i === -1 ? "done" : "undone" });
      if (i === -1 && st.n === st.total) ev("route_complete", { route_id: id, steps: st.total });
      return;
    }
    var reset = el.closest(".lq-route-reset");
    if (reset) {
      var rc = reset.closest(".lq-route");
      save(rc.getAttribute("data-route"), []);
      paintRoute(rc);
      return;
    }
    // Agendar
    var ag = el.closest("a[data-lq-agendar]");
    if (ag) { ev("cta_agendar_click", { origen: ag.getAttribute("data-lq-agendar"), id: ag.getAttribute("data-lq-id"), link_url: ag.href }); return; }
    // Compartir con mi equipo
    var sh = el.closest("a[data-lq-share]");
    if (sh) {
      var url = sh.getAttribute("data-share-url"), title = sh.getAttribute("data-share-title");
      var base = { origen: sh.getAttribute("data-lq-share"), id: sh.getAttribute("data-lq-id") };
      var status = document.querySelector(".lq-share-status");
      if (navigator.share) {
        e.preventDefault();
        base.method = "native"; ev("share_team_click", base);
        navigator.share({ title: title, text: title + ", en Recursos de IA de liqueed", url: url }).catch(function () {});
      } else if (navigator.clipboard && window.isSecureContext) {
        e.preventDefault();
        navigator.clipboard.writeText(url).then(function () {
          base.method = "clipboard"; ev("share_team_click", base);
          var old = sh.textContent; sh.textContent = "Link copiado"; setTimeout(function () { sh.textContent = old; }, 2200);
          if (status) status.textContent = "Link copiado.";
        }, function () { base.method = "email"; ev("share_team_click", base); location.href = sh.href; });
      } else { base.method = "email"; ev("share_team_click", base); }
      return;
    }
    // Clics en lecturas (ficha o fuente original)
    var a = el.closest("a[data-lq-link]");
    if (!a) return;
    var li = a.closest(".lq-lr-item"), pack = a.closest(".lq-pack"), route = a.closest(".lq-route");
    var linkType = a.getAttribute("data-lq-link"), itemName = li ? li.getAttribute("data-item") : null, pos = li ? Number(li.getAttribute("data-pos")) : null;
    if (pack) {
      var pid = pack.getAttribute("data-pack");
      if (!opened[pid]) { opened[pid] = true; ev("pack_open", { pack_id: pid }); }
      ev("pack_item_click", { pack_id: pid, item: itemName, position: pos, link_type: linkType });
    } else if (route) {
      var extra = !!a.closest(".lq-route-extra");
      ev("route_step", { route_id: route.getAttribute("data-route"), step: extra ? 0 : pos, item: itemName, action: extra ? "open_extra" : "open", link_type: linkType });
    }
  }, true);

  document.addEventListener("nav", function () { opened = {}; init(); });
  if (document.readyState !== "loading") init(); else document.addEventListener("DOMContentLoaded", init);
})();
`
