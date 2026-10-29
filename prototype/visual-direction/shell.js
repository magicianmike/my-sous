// PROTOTYPE (issue #4): mounts one variant, holds in-memory state, draws the
// floating switcher bar and runs the contrast audit. No persistence.
(function () {
  const params = new URLSearchParams(location.search);
  const variants = window.VARIANTS;
  const S = window.SAMPLE;

  if (!variants.length) {
    document.body.textContent = "No variants on this branch.";
    return;
  }

  let current = variants.find((v) => v.key === params.get("variant")) || variants[0];

  // ---- theme: ?theme=light|dark, else follow the system ----
  const mq = matchMedia("(prefers-color-scheme: dark)");
  function applyTheme() {
    const forced = params.get("theme");
    document.documentElement.dataset.theme = forced === "light" || forced === "dark" ? forced : mq.matches ? "dark" : "light";
  }
  mq.addEventListener("change", applyTheme);
  applyTheme();

  // ---- state (in memory only) ----
  const state = {
    combination: [...S.combination],
    pantry: new Set(S.pantry),
    expanded: new Set(),
    filter: "all",
    notice: "",
  };

  const live = document.getElementById("live");
  function announce(msg) {
    state.notice = msg;
    live.textContent = msg;
  }

  const actions = {
    add(id) {
      if (state.combination.includes(id)) return;
      if (state.combination.length >= 4) {
        announce("Your Combination holds up to four Ingredients, so Suggestions stay focused. Remove one to add " + S.names[id] + ".");
        return;
      }
      state.combination.push(id);
      announce(S.names[id] + " added to Combination, " + state.combination.length + " of 4");
    },
    remove(id) {
      state.combination = state.combination.filter((x) => x !== id);
      announce(S.names[id] + " removed from Combination, " + state.combination.length + " of 4");
    },
    expand(id) {
      state.expanded.has(id) ? state.expanded.delete(id) : state.expanded.add(id);
    },
    filter(id) {
      state.filter = id;
    },
  };

  // ---- mount ----
  const app = document.getElementById("app");
  let styleEl, fontEl;
  function mount() {
    styleEl && styleEl.remove();
    fontEl && fontEl.remove();
    if (current.fonts) {
      fontEl = document.createElement("link");
      fontEl.rel = "stylesheet";
      fontEl.href = current.fonts;
      document.head.appendChild(fontEl);
    }
    styleEl = document.createElement("style");
    styleEl.textContent = BASE_CSS + current.css;
    document.head.appendChild(styleEl);
    document.title = "Lime · " + current.name + " · MySous prototype";
    render();
  }
  function render() {
    const focusKey = document.activeElement && document.activeElement.dataset && document.activeElement.dataset.focusKey;
    app.innerHTML = current.render(S, state);
    if (focusKey) {
      const el = app.querySelector('[data-focus-key="' + CSS.escape(focusKey) + '"]');
      el && el.focus();
    }
    state.notice = "";
  }

  // Variants use data-act="add|remove|expand|filter" + data-id for interaction.
  app.addEventListener("click", (e) => {
    const t = e.target.closest("[data-act]");
    if (!t) return;
    e.preventDefault();
    actions[t.dataset.act](t.dataset.id);
    render();
  });

  // ---- floating switcher bar ----
  const showChrome = params.get("chrome") !== "0";
  function go(delta) {
    const i = variants.indexOf(current);
    current = variants[(i + delta + variants.length) % variants.length];
    params.set("variant", current.key);
    history.replaceState(null, "", "?" + params.toString());
    mount();
    drawBar();
  }
  function cycleTheme() {
    const order = [null, "light", "dark"];
    const next = order[(order.indexOf(params.get("theme")) + 1) % order.length];
    next ? params.set("theme", next) : params.delete("theme");
    history.replaceState(null, "", "?" + params.toString());
    applyTheme();
    drawBar();
  }
  let bar;
  function drawBar() {
    if (!showChrome) return;
    if (!bar) {
      bar = document.createElement("div");
      bar.setAttribute("data-proto-chrome", "");
      bar.className = "proto-bar";
      document.body.appendChild(bar);
      bar.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        if (b.dataset.go) go(+b.dataset.go);
        if (b.dataset.theme) cycleTheme();
      });
    }
    const i = variants.indexOf(current);
    const t = params.get("theme") || "system";
    bar.innerHTML =
      '<button data-go="-1" aria-label="Previous variant">←</button>' +
      '<span class="proto-label">' + String.fromCharCode(65 + i) + " · " + current.name + "</span>" +
      '<button data-go="1" aria-label="Next variant">→</button>' +
      '<button data-theme="1" aria-label="Theme: ' + t + '">' + (t === "system" ? "◐ system" : t === "light" ? "☀ light" : "☾ dark") + "</button>" +
      '<a href="index.html">compare all</a>';
  }
  document.addEventListener("keydown", (e) => {
    if (!showChrome) return;
    const a = document.activeElement;
    if (a && (a.matches("input, textarea, select, [contenteditable], [contenteditable] *"))) return;
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });

  const BASE_CSS = `
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; }
    button { font: inherit; color: inherit; }
    .proto-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    .proto-bar { position: fixed; left: 50%; bottom: 14px; transform: translateX(-50%); z-index: 9999;
      display: flex; align-items: center; gap: 4px; padding: 6px; border-radius: 999px;
      background: #111; color: #fff; font: 600 13px/1 ui-monospace, Menlo, monospace;
      box-shadow: 0 6px 24px rgba(0,0,0,.35), 0 0 0 2px #ff2bd6; white-space: nowrap; }
    .proto-bar button, .proto-bar a { all: unset; cursor: pointer; padding: 8px 10px; border-radius: 999px; color: #fff; }
    .proto-bar button:hover, .proto-bar a:hover { background: #333; }
    .proto-bar :focus-visible { outline: 2px solid #ff2bd6; }
    .proto-label { padding: 0 6px; }
    @media (max-width: 720px) { .proto-bar { top: 10px; bottom: auto; font-size: 11px; } }
  `;

  mount();
  drawBar();

  // ---- contrast audit (WCAG 2.2 AA, 1.4.3) ----
  // Walks every element with its own visible text, resolves the effective
  // background by compositing ancestors, and checks the ratio.
  function parse(c) {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  function over(top, under) {
    const a = top.a + under.a * (1 - top.a);
    if (!a) return { r: 0, g: 0, b: 0, a: 0 };
    const mix = (k) => (top[k] * top.a + under[k] * under.a * (1 - top.a)) / a;
    return { r: mix("r"), g: mix("g"), b: mix("b"), a };
  }
  function lum(c) {
    const f = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  }
  function ratio(a, b) {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  }
  function effectiveBg(el) {
    const layers = [];
    let gradient = false;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== "none") gradient = true;
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) {
        layers.push(c);
        if (c.a >= 1) break;
      }
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) bg = over(layers[i], bg);
    return { bg, gradient };
  }
  function audit() {
    const results = [];
    const seen = new Set();
    for (const el of app.querySelectorAll("*")) {
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!own) continue;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (!r.width || !r.height || cs.visibility === "hidden" || el.closest(".proto-sr")) continue;
      const fg0 = parse(cs.color);
      const { bg, gradient } = effectiveBg(el);
      const fg = over(fg0, bg);
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && +cs.fontWeight >= 700);
      const need = large ? 3 : 4.5;
      const value = ratio(fg, bg);
      const key = cs.color + "|" + JSON.stringify(bg) + "|" + need;
      const text = el.textContent.trim().slice(0, 40);
      results.push({ text, value: Math.round(value * 100) / 100, need, pass: value >= need, gradient, key });
      seen.add(key);
    }
    const failures = results.filter((x) => !x.pass);
    const report = {
      variant: current.key,
      theme: document.documentElement.dataset.theme,
      width: innerWidth,
      checked: results.length,
      pairs: seen.size,
      min: results.length ? Math.min(...results.map((x) => x.value)) : null,
      failures,
      gradients: results.filter((x) => x.gradient).length,
    };
    window.__AUDIT = report;
    if (parent !== window) parent.postMessage({ type: "proto-audit", report, frame: params.get("frame") }, "*");
    return report;
  }
  window.__runAudit = audit;
  if (params.get("audit") === "1") {
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(audit, 300));
  }
})();
