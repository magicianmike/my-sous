// PROTOTYPE (issue #4), variant C: Modern utility.
// Confident grotesque, high contrast, colour-blocked Pairing Reason groups.
// Structure: a dense board. All four Pairing Reasons are visible at once as
// solid colour columns (bands on phone); the primary affordance is a Cuisine
// filter plus one-tap add. The Ingredient's prose is demoted to a notes strip.
window.VARIANTS.push({
  key: "utility",
  name: "Modern utility",
  fonts: "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400&display=swap",
  css: `
    :root {
      --bg: #ffffff; --ink: #0b0b0b; --ink-2: #4a4a4a; --line: #0b0b0b; --soft: #f1f1ee;
      --inv-bg: #0b0b0b; --inv-ink: #ffffff; --inv-ink-2: #c4c4c4;
      --block-ink: #0b0b0b; --block-ink-2: #2b2b2b;
      --contrast: #ffd23f; --aromatic: #7ed6b0; --texture: #ff9466; --tradition: #a8bcff;
      --font: "Schibsted Grotesk", "Helvetica Neue", Arial, sans-serif;
    }
    :root[data-theme="dark"] {
      --bg: #0b0b0b; --ink: #f7f7f5; --ink-2: #b8b8b8; --line: #f7f7f5; --soft: #1c1c1c;
      --inv-bg: #f7f7f5; --inv-ink: #0b0b0b; --inv-ink-2: #4a4a4a;
      --contrast: #f2c230; --aromatic: #5fc79b; --texture: #f5824f; --tradition: #93abff;
    }
    body { background: var(--bg); color: var(--ink); font: 16px/1.45 var(--font); }
    a { color: inherit; }
    :focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; box-shadow: 0 0 0 6px var(--bg); }
    .ut-top { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 3px solid var(--line); }
    .ut-logo { font-weight: 900; font-size: 18px; letter-spacing: -0.03em; text-transform: uppercase; }
    .ut-nav { display: flex; }
    .ut-nav a { text-decoration: none; font-weight: 800; font-size: 14px; text-transform: uppercase; padding: 0 14px; min-height: 44px; display: flex; align-items: center; border: 2px solid var(--line); margin-left: -2px; }
    .ut-nav a[aria-current] { background: var(--ink); color: var(--bg); }
    .ut-shell { padding-bottom: 120px; }
    .ut-head { padding: 16px; border-bottom: 3px solid var(--line); display: grid; gap: 12px; }
    .ut-head h1 { font-size: clamp(64px, 17vw, 132px); line-height: .82; font-weight: 900; letter-spacing: -0.05em; margin: 0; text-transform: uppercase; }
    .ut-stats { display: flex; flex-wrap: wrap; gap: 0; margin: 0; padding: 0; list-style: none; }
    .ut-stats li { border: 2px solid var(--line); margin: 0 -2px -2px 0; padding: 6px 10px; font-weight: 700; font-size: 14px; font-variant-numeric: tabular-nums; }
    .ut-stats b { font-weight: 900; }
    .ut-notes { display: grid; gap: 12px; font-size: 15px; }
    .ut-notes p { margin: 0; }
    .ut-notes .lbl { display: block; font-size: 12px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-2); }
    .ut-bar { display: flex; gap: 0; align-items: stretch; padding: 12px 16px; border-bottom: 3px solid var(--line); flex-wrap: wrap; }
    .ut-bar span { font-weight: 900; font-size: 13px; text-transform: uppercase; align-self: center; margin-right: 12px; }
    .ut-bar button { border: 2px solid var(--line); background: var(--bg); min-height: 44px; padding: 0 14px; font-weight: 800; font-size: 14px; cursor: pointer; margin-right: -2px; }
    .ut-bar button[aria-pressed="true"] { background: var(--ink); color: var(--bg); }
    .ut-board { display: grid; }
    .ut-col { color: var(--block-ink); border-bottom: 3px solid var(--line); }
    .ut-col header { display: flex; justify-content: space-between; align-items: baseline; padding: 14px 16px 10px; border-bottom: 2px solid var(--block-ink); }
    .ut-col h2 { margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase; line-height: 1; }
    .ut-col header p { margin: 0; font-size: 13px; font-weight: 700; color: var(--block-ink-2); text-align: right; max-width: 18ch; }
    .ut-col ul { list-style: none; margin: 0; padding: 0; }
    .ut-item { display: grid; grid-template-columns: 1fr 44px; gap: 2px 12px; padding: 12px 16px; border-bottom: 1px solid var(--block-ink); }
    .ut-item:last-child { border-bottom: 0; }
    .ut-item h3 { margin: 0; font-size: 19px; font-weight: 800; letter-spacing: -0.01em; }
    .ut-item h3 a { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; }
    .ut-item p { margin: 0; grid-column: 1; font-size: 15px; }
    .ut-item .code { font-size: 12px; font-weight: 900; letter-spacing: .06em; color: var(--block-ink-2); margin-top: 4px; }
    .ut-item .more { margin-top: 6px; font-size: 14px; color: var(--block-ink-2); }
    .ut-add { grid-column: 2; grid-row: 1 / span 2; width: 44px; height: 44px; border: 2px solid var(--block-ink); background: transparent; color: var(--block-ink); font-size: 26px; font-weight: 900; line-height: 1; cursor: pointer; }
    .ut-add[aria-pressed="true"] { background: var(--block-ink); color: #fff; font-size: 18px; }
    .ut-exp { grid-column: 1; justify-self: start; border: 0; background: none; color: var(--block-ink); font-weight: 800; font-size: 13px; text-transform: uppercase; text-decoration: underline; min-height: 36px; padding: 0; cursor: pointer; }
    .ut-col :focus-visible { outline-color: var(--block-ink); box-shadow: none; }
    .ut-empty { padding: 14px 16px; font-weight: 700; font-size: 14px; }

    .ut-tray { position: fixed; left: 0; right: 0; bottom: 0; background: var(--inv-bg); color: var(--inv-ink); padding: 10px 16px 14px; display: grid; gap: 8px; }
    .ut-tray h2 { margin: 0; font-size: 13px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; display: flex; justify-content: space-between; }
    .ut-tray ol { list-style: none; margin: 0; padding: 0; display: flex; gap: 6px; flex-wrap: wrap; }
    .ut-tray li { display: flex; align-items: center; border: 2px solid var(--inv-ink); font-weight: 800; font-size: 15px; padding-left: 10px; }
    .ut-tray li small { font-weight: 700; color: var(--inv-ink-2); margin-left: 6px; font-size: 12px; text-transform: uppercase; }
    .ut-x { border: 0; background: none; color: var(--inv-ink); width: 40px; height: 40px; font-size: 20px; cursor: pointer; }
    .ut-cta { min-height: 48px; border: 0; background: var(--contrast); color: #0b0b0b; font-weight: 900; font-size: 16px; text-transform: uppercase; letter-spacing: .02em; cursor: pointer; }
    .ut-tray :focus-visible { outline-color: var(--inv-ink); box-shadow: none; }
    .ut-notice { margin: 0; font-size: 14px; color: var(--inv-ink-2); }

    @media (min-width: 900px) {
      .ut-shell { display: grid; grid-template-columns: minmax(0, 1fr) 300px; padding-bottom: 0; }
      .ut-head { grid-template-columns: auto minmax(0, 1fr); align-items: end; column-gap: 32px; }
      .ut-head h1 { grid-row: span 2; }
      .ut-notes { grid-template-columns: 1fr 1fr; max-width: 820px; }
      .ut-board { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .ut-col { border-bottom: 0; border-right: 3px solid var(--line); min-height: 520px; }
      .ut-col:last-child { border-right: 0; }
      .ut-col header { flex-direction: column; gap: 6px; min-height: 92px; }
      .ut-col header p { text-align: left; }
      .ut-col h2 { font-size: 22px; }
      .ut-tray { position: sticky; top: 0; align-self: start; height: 100vh; grid-row: 1 / span 3; grid-column: 2; align-content: start; padding: 20px; gap: 14px; }
      .ut-tray ol { flex-direction: column; }
      .ut-tray li { justify-content: space-between; }
      .ut-main { grid-column: 1; }
    }
  `,
  render(S, st) {
    const ing = S.ingredient;
    const inCombo = (id) => st.combination.includes(id);
    const cuisineCode = (c) => c.slice(0, 3).toUpperCase();
    const cuisines = ["all", ...ing.cuisines];
    const filter = cuisines.includes(st.filter) ? st.filter : "all";
    const visible = S.pairings.filter((p) => filter === "all" || p.cuisines.includes(filter));
    const col = (r) => {
      const ps = visible.filter((p) => p.reason === r.id);
      return `<section class="ut-col" style="background: var(--${r.id})" aria-labelledby="col-${r.id}">
        <header><h2 id="col-${r.id}">${r.label}</h2><p>${r.blurb}</p></header>
        ${ps.length ? `<ul>${ps.map((p) => {
          const open = st.expanded.has(p.with.id);
          const added = inCombo(p.with.id);
          return `<li class="ut-item">
            <h3><a href="#${p.with.id}">${p.with.name}</a></h3>
            <button class="ut-add" data-act="${added ? "remove" : "add"}" data-id="${p.with.id}" data-focus-key="a-${p.with.id}" aria-pressed="${added}" aria-label="${added ? "Remove " + p.with.name + " from" : "Add " + p.with.name + " to"} Combination">${added ? "✓" : "+"}</button>
            <p>${p.note}</p>
            ${p.with.blend ? `<p class="more">Blend: ${p.with.blend}.</p>` : ""}
            ${open ? `<p class="more" id="more-${p.with.id}">${p.more}</p>` : ""}
            <p class="code" title="Common in ${p.cuisines.join(", ")}">${p.cuisines.map(cuisineCode).join(" · ")}</p>
            <button class="ut-exp" data-act="expand" data-id="${p.with.id}" data-focus-key="x-${p.with.id}" aria-expanded="${open}" aria-controls="more-${p.with.id}">${open ? "Less" : "More"}</button>
          </li>`;
        }).join("")}</ul>` : `<p class="ut-empty">Nothing ${r.label.toLowerCase()} here in ${filter} cooking.</p>`}
      </section>`;
    };
    return `<header class="ut-top"><span class="ut-logo">MySous</span><nav class="ut-nav" aria-label="Main"><a href="#" aria-current="page">Explore</a><a href="#">Pantry</a></nav></header>
      <div class="ut-shell">
        <div class="ut-main">
          <section class="ut-head" aria-labelledby="ing-name">
            <h1 id="ing-name">${ing.name}</h1>
            <ul class="ut-stats"><li>${ing.category}</li><li><b>${S.pairings.length}</b> Pairings</li><li><b>${S.reasons.length}</b> reasons</li><li>Common in <b>${ing.cuisines.join(" + ")}</b></li></ul>
            <div class="ut-notes">
              <p><span class="lbl">About</span>${ing.essay}</p>
              <p><span class="lbl">Tip</span>${ing.tip} <span class="lbl" style="margin-top:10px">Context</span>${ing.context}</p>
            </div>
          </section>
          <div class="ut-bar" role="group" aria-label="Filter by Cuisine"><span>Cuisine</span>
            ${cuisines.map((c) => `<button data-act="filter" data-id="${c}" data-focus-key="f-${c}" aria-pressed="${filter === c}">${c === "all" ? "All" : c}</button>`).join("")}
          </div>
          <main class="ut-board">${S.reasons.map(col).join("")}</main>
        </div>
        <aside class="ut-tray" aria-label="Your Combination">
          <h2><span>Combination</span><span>${st.combination.length}/4</span></h2>
          ${st.notice && st.notice.includes("up to four") ? `<p class="ut-notice">${st.notice}</p>` : ""}
          <ol>${st.combination.map((id) => `<li><span>${S.names[id]}${st.pantry.has(id) ? "<small>Have</small>" : ""}</span><button class="ut-x" data-act="remove" data-id="${id}" aria-label="Remove ${S.names[id]}">×</button></li>`).join("")}</ol>
          <button class="ut-cta">See what to make →</button>
        </aside>
      </div>`;
  },
});
