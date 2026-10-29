// PROTOTYPE (issue #4, round 2), B3: Quiet line.
// Botanical line pulled back: does illustration earn its place in the rows?
// Here it doesn't appear there. Drawings stay only as the Ingredient's mark
// in the header and in the tray. Rows are text, keyed by a colour per Pairing
// Reason. Figtree tests a less rounded humanist sans. Motion is springy, and
// only on adding to the Combination.
window.VARIANTS.push({
  key: "quiet",
  name: "Quiet line",
  fonts: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400..800;1,400&display=swap",
  css: `
    :root {
      --bg: #fbfbf8; --surface: #ffffff; --sunk: #f0f0ea; --ink: #1c1f1c; --ink-2: #51574f; --line: #dcdfd6;
      --leaf: #2d6a39; --leaf-ink: #ffffff; --leaf-wash: #e3eee0;
      --contrast: #9a3412; --aromatic: #166534; --texture: #1e4fb0; --tradition: #7b2bc4;
      --font: "Figtree", system-ui, sans-serif;
      --spring: cubic-bezier(.34, 1.56, .64, 1);
    }
    :root[data-theme="dark"] {
      --bg: #111311; --surface: #191c19; --sunk: #222622; --ink: #eceee9; --ink-2: #a9b0a7; --line: #313631;
      --leaf: #8ccf9b; --leaf-ink: #10241a; --leaf-wash: #1f3326;
      --contrast: #fdba74; --aromatic: #86efac; --texture: #93c5fd; --tradition: #d8b4fe;
    }
    body { background: var(--bg); color: var(--ink); font: 17px/1.55 var(--font); }
    a { color: inherit; }
    :focus-visible { outline: 3px solid var(--leaf); outline-offset: 2px; border-radius: 8px; }
    .qu-top { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; max-width: 1180px; margin: 0 auto; }
    .qu-logo { font-weight: 800; font-size: 19px; letter-spacing: -0.01em; }
    .qu-nav { display: flex; gap: 6px; }
    .qu-nav a { text-decoration: none; padding: 0 14px; border-radius: 10px; font-weight: 600; font-size: 15px; min-height: 44px; display: flex; align-items: center; }
    .qu-nav a[aria-current] { background: var(--sunk); }
    .qu-wrap { max-width: 1180px; margin: 0 auto; padding: 8px 18px 210px; display: grid; gap: 28px; }
    .qu-wrap > * { min-width: 0; }
    .qu-head { display: grid; grid-template-columns: auto 1fr; gap: 4px 16px; align-items: center; }
    .qu-mark { width: 76px; height: 76px; border-radius: 50%; background: var(--leaf-wash); color: var(--leaf); display: grid; place-items: center; grid-row: span 2; }
    .qu-mark svg { width: 54px; height: 54px; }
    .qu-head h1 { margin: 0; font-size: 44px; line-height: 1; font-weight: 800; letter-spacing: -0.02em; }
    .qu-head p { margin: 0; color: var(--ink-2); font-weight: 600; }
    .qu-lede { font-size: 20px; line-height: 1.5; margin: 16px 0 0; max-width: 36em; }
    .qu-aside { display: grid; gap: 10px; margin-top: 14px; max-width: 36em; }
    .qu-aside p { margin: 0; }
    .qu-aside .tip { background: var(--leaf-wash); border-radius: 12px; padding: 10px 14px; }
    .qu-aside .ctx { color: var(--ink-2); font-size: 15px; }
    .qu-h2 { font-size: 22px; font-weight: 800; margin: 30px 0 10px; }
    .qu-seg { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; padding: 2px; }
    .qu-seg button { flex: none; border: 1.5px solid var(--line); background: var(--surface); border-radius: 10px; padding: 0 14px; min-height: 44px; font-weight: 700; font-size: 15px; cursor: pointer; color: var(--ink); display: flex; align-items: center; gap: 8px; }
    .qu-seg button i { width: 10px; height: 10px; border-radius: 50%; background: var(--c, var(--ink)); }
    .qu-seg button[aria-pressed="true"] { border-color: var(--ink); background: var(--ink); color: var(--bg); }
    .qu-list { list-style: none; margin: 16px 0 0; padding: 0; border-top: 1px solid var(--line); }
    .qu-row { display: grid; grid-template-columns: 1fr auto; gap: 2px 16px; padding: 14px 0 14px 16px; border-bottom: 1px solid var(--line); position: relative; }
    .qu-row::before { content: ""; position: absolute; left: 0; top: 14px; bottom: 14px; width: 4px; border-radius: 4px; background: var(--c); }
    .qu-tag { font-size: 13px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: var(--c); margin: 0; }
    .qu-row h3 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
    .qu-row h3 a { text-decoration: none; }
    .qu-row h3 a:hover { text-decoration: underline; }
    .qu-row p { margin: 0; grid-column: 1; }
    .qu-row .blend, .qu-row .more { color: var(--ink-2); font-size: 15px; }
    .qu-row .more { margin-top: 6px; }
    .qu-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 14px; font-size: 14px; color: var(--ink-2); grid-column: 1; }
    .qu-more { border: 0; background: none; color: var(--ink); font-weight: 700; font-size: 14px; text-decoration: underline; text-underline-offset: 3px; min-height: 44px; padding: 0; cursor: pointer; }
    .qu-add { grid-column: 2; grid-row: 1 / span 3; align-self: center; min-height: 44px; min-width: 84px; padding: 0 14px; border-radius: 999px; border: 1.5px solid var(--ink); background: var(--surface); color: var(--ink); font-weight: 700; font-size: 15px; cursor: pointer; }
    .qu-add[aria-pressed="true"] { background: var(--leaf); border-color: var(--leaf); color: var(--leaf-ink); }

    .qu-tray { position: fixed; left: 10px; right: 10px; bottom: 10px; background: var(--surface); border: 1px solid var(--line); border-radius: 18px; padding: 14px 16px; box-shadow: 0 10px 40px -10px rgba(0,0,0,.35); }
    .qu-tray h2 { font-size: 16px; font-weight: 800; margin: 0 0 10px; display: flex; justify-content: space-between; }
    .qu-tray h2 span { color: var(--ink-2); font-weight: 700; }
    .qu-tray ul { list-style: none; padding: 0; margin: 0 0 12px; display: flex; gap: 8px; flex-wrap: wrap; }
    .qu-tray li { display: flex; align-items: center; justify-content: space-between; gap: 6px; border: 1.5px solid var(--line); border-radius: 12px; padding: 2px 2px 2px 8px; font-weight: 700; font-size: 15px; }
    .qu-tray li > span { display: flex; align-items: center; gap: 6px; }
    .qu-tray li svg { width: 26px; height: 26px; color: var(--leaf); }
    .qu-tray li small { color: var(--ink-2); font-weight: 600; font-size: 13px; }
    .qu-x { border: 0; background: none; width: 36px; height: 36px; cursor: pointer; font-size: 18px; color: var(--ink); }
    .qu-cta { width: 100%; min-height: 48px; border: 0; border-radius: 12px; background: var(--ink); color: var(--bg); font-weight: 800; font-size: 16px; cursor: pointer; }
    .qu-notice { font-size: 14px; color: var(--ink-2); margin: 0 0 10px; }

    @keyframes qu-pop { from { transform: scale(.5); opacity: 0; } }
    @keyframes qu-press { 40% { transform: scale(1.12); } }
    @media (prefers-reduced-motion: no-preference) {
      .qu-tray li.qu-new { animation: qu-pop .45s var(--spring); }
      .qu-add.qu-new { animation: qu-press .4s var(--spring); }
      .qu-seg button, .qu-add { transition: background-color .15s, color .15s; }
    }

    @media (min-width: 900px) {
      .qu-wrap { grid-template-columns: minmax(0, 1fr) 300px; gap: 56px; padding-bottom: 80px; }
      .qu-head { grid-template-columns: auto 1fr; }
      .qu-mark { width: 96px; height: 96px; }
      .qu-mark svg { width: 68px; height: 68px; }
      .qu-head h1 { font-size: 60px; }
      .qu-tray { position: sticky; top: 16px; left: auto; right: auto; bottom: auto; align-self: start; box-shadow: none; }
      .qu-tray ul { flex-direction: column; }
    }
  `,
  render(S, st) {
    const ing = S.ingredient;
    const inCombo = (id) => st.combination.includes(id);
    const label = Object.fromEntries(S.reasons.map((r) => [r.id, r.label]));
    const filters = [{ id: "all", label: "All" }, ...S.reasons];
    const shown = S.pairings.filter((p) => st.filter === "all" || p.reason === st.filter);
    const row = (p) => {
      const open = st.expanded.has(p.with.id);
      const added = inCombo(p.with.id);
      return `<li class="qu-row" style="--c: var(--${p.reason})">
        <p class="qu-tag">${label[p.reason]}</p>
        <button class="qu-add ${p.with.id === st.lastAdded ? "qu-new" : ""}" data-act="${added ? "remove" : "add"}" data-id="${p.with.id}" data-focus-key="a-${p.with.id}" aria-pressed="${added}" aria-label="${added ? "Remove " + p.with.name + " from" : "Add " + p.with.name + " to"} Combination">${added ? "Added ✓" : "Add"}</button>
        <h3><a href="#${p.with.id}">${p.with.name}</a></h3>
        ${p.with.blend ? `<p class="blend">A Blend that ${p.with.blend}.</p>` : ""}
        <p>${p.note}</p>
        ${open ? `<p class="more" id="more-${p.with.id}">${p.more}</p>` : ""}
        <div class="qu-meta"><span>Common in ${p.cuisines.join(", ")}</span>
          <button class="qu-more" data-act="expand" data-id="${p.with.id}" data-focus-key="x-${p.with.id}" aria-expanded="${open}" aria-controls="more-${p.with.id}">${open ? "Show less" : "Why it works"}</button></div>
      </li>`;
    };
    return `<header class="qu-top"><span class="qu-logo">MySous</span>
        <nav class="qu-nav" aria-label="Main"><a href="#" aria-current="page">Explore</a><a href="#">Pantry</a></nav></header>
      <div class="qu-wrap">
        <main>
          <div class="qu-head">
            <div class="qu-mark">${botArt(ing.id)}</div>
            <h1>${ing.name}</h1>
            <p>${ing.category} · common in ${ing.cuisines.join(" and ")} cooking</p>
          </div>
          <p class="qu-lede">${ing.essay}</p>
          <div class="qu-aside"><p class="tip"><b>Tip:</b> ${ing.tip}</p><p class="ctx">${ing.context}</p></div>
          <h2 class="qu-h2">Pairs well with</h2>
          <div class="qu-seg" role="group" aria-label="Filter by Pairing Reason">
            ${filters.map((f) => `<button data-act="filter" data-id="${f.id}" data-focus-key="f-${f.id}" aria-pressed="${st.filter === f.id}" style="--c: var(--${f.id})">${f.id === "all" ? "" : "<i></i>"}${f.label}</button>`).join("")}
          </div>
          <ul class="qu-list">${shown.map(row).join("")}</ul>
        </main>
        <aside class="qu-tray" aria-label="Your Combination">
          <h2>Your Combination <span>${st.combination.length} of 4</span></h2>
          ${st.notice && st.notice.includes("up to four") ? `<p class="qu-notice">${st.notice}</p>` : ""}
          <ul>${st.combination.map((id) => `<li class="${id === st.lastAdded ? "qu-new" : ""}"><span>${botArt(id)}${S.names[id]}${st.pantry.has(id) ? " <small>· have it</small>" : ""}</span><button class="qu-x" data-act="remove" data-id="${id}" aria-label="Remove ${S.names[id]}">×</button></li>`).join("")}</ul>
          <button class="qu-cta">See what to make</button>
        </aside>
      </div>`;
  },
});
