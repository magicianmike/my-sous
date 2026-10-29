// PROTOTYPE (issue #4, round 2), B2: Herbarium.
// Botanical line pushed toward illustration: every Pairing is a specimen
// sheet with a large drawing and a herbarium-style label. Monochrome ink on
// paper; colour never carries meaning. No filter: Pairing Reasons are
// sections with jump links. Still: no motion beyond state changes.
window.VARIANTS.push({
  key: "herbarium",
  name: "Herbarium",
  fonts: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400..800;1,400&display=swap",
  css: `
    :root {
      --paper: #f3f0e6; --sheet: #fbf9f3; --ink: #22241e; --ink-2: #545649; --rule: #c9c4b2; --faint: #e7e2d3;
      --font: "Nunito", ui-rounded, system-ui, sans-serif;
    }
    :root[data-theme="dark"] {
      --paper: #161713; --sheet: #1e1f1a; --ink: #ebe8dd; --ink-2: #b2ae9f; --rule: #45463c; --faint: #2a2b24;
    }
    body { background: var(--paper); color: var(--ink); font: 17px/1.55 var(--font); }
    a { color: inherit; }
    :focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
    .he-top { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid var(--rule); }
    .he-logo { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 19px; }
    .he-logo svg { width: 26px; height: 26px; }
    .he-nav { display: flex; gap: 18px; }
    .he-nav a { text-decoration: none; font-weight: 700; font-size: 15px; min-height: 44px; display: flex; align-items: center; }
    .he-nav a[aria-current] { text-decoration: underline; text-underline-offset: 6px; text-decoration-thickness: 2px; }
    .he-wrap { max-width: 1280px; margin: 0 auto; padding: 0 18px 220px; display: grid; gap: 28px; }
    .he-wrap > * { min-width: 0; }

    .he-sheet { background: var(--sheet); border: 1px solid var(--rule); padding: 20px; margin-top: 18px; display: grid; gap: 16px; }
    .he-sheet-art { display: grid; place-items: center; padding: 8px 0; }
    .he-sheet-art svg { width: 200px; height: 200px; stroke-width: 1.1; }
    .he-label { border: 1px solid var(--ink); padding: 12px 14px; font-size: 14px; }
    .he-label .no { font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); display: flex; justify-content: space-between; }
    .he-label h1 { font-size: 40px; line-height: 1.05; margin: 6px 0 2px; font-weight: 800; letter-spacing: -0.01em; }
    .he-label dl { display: grid; grid-template-columns: auto 1fr; gap: 2px 12px; margin: 10px 0 0; }
    .he-label dt { font-weight: 800; color: var(--ink-2); }
    .he-label dd { margin: 0; }
    .he-notes p { margin: 0 0 12px; }
    .he-notes .tip { border-left: 2px solid var(--ink); padding-left: 12px; font-style: italic; }
    .he-notes .ctx { color: var(--ink-2); font-size: 15px; }

    .he-jump { display: flex; flex-wrap: wrap; gap: 4px 18px; margin: 4px 0 0; padding: 0; list-style: none; font-weight: 700; font-size: 15px; }
    .he-jump a { display: inline-flex; min-height: 44px; align-items: center; text-underline-offset: 4px; }
    .he-h2 { font-size: 24px; font-weight: 800; margin: 0; }
    .he-sec { margin-top: 26px; }
    .he-sec-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; border-bottom: 1px solid var(--ink); padding-bottom: 6px; margin-bottom: 14px; }
    .he-sec-head h3 { margin: 0; font-size: 20px; font-weight: 800; }
    .he-sec-head p { margin: 0; color: var(--ink-2); font-style: italic; font-size: 15px; text-align: right; }
    .he-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); }
    .he-spec { background: var(--sheet); border: 1px solid var(--rule); display: flex; flex-direction: column; }
    .he-spec-art { aspect-ratio: 4 / 3; display: grid; place-items: center; border-bottom: 1px solid var(--faint); position: relative; }
    .he-spec-art svg { width: 46%; height: auto; stroke-width: 1.3; }
    .he-spec-no { position: absolute; top: 8px; left: 10px; font-size: 12px; font-weight: 800; letter-spacing: .1em; color: var(--ink-2); }
    .he-add { position: absolute; top: 6px; right: 6px; min-width: 44px; height: 44px; padding: 0 12px; border: 1px solid var(--ink); background: var(--sheet); color: var(--ink); border-radius: 999px; font-weight: 800; font-size: 14px; cursor: pointer; }
    .he-add[aria-pressed="true"] { background: var(--ink); color: var(--sheet); }
    .he-spec-body { padding: 12px 14px 8px; display: grid; gap: 6px; flex: 1; }
    .he-spec h4 { margin: 0; font-size: 19px; font-weight: 800; }
    .he-spec h4 a { text-decoration: none; }
    .he-spec h4 a:hover { text-decoration: underline; }
    .he-spec p { margin: 0; font-size: 15px; }
    .he-spec .blend { color: var(--ink-2); font-style: italic; }
    .he-spec .more { color: var(--ink-2); }
    .he-spec-foot { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--faint); padding: 0 14px; font-size: 13px; color: var(--ink-2); }
    .he-spec-foot b { color: var(--ink); }
    .he-more { border: 0; background: none; font-weight: 700; font-size: 14px; text-decoration: underline; text-underline-offset: 3px; min-height: 44px; padding: 0; cursor: pointer; color: var(--ink); }

    .he-tray { position: fixed; left: 0; right: 0; bottom: 0; background: var(--sheet); border-top: 1px solid var(--ink); padding: 12px 18px 16px; }
    .he-tray h2 { font-size: 13px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; margin: 0 0 8px; display: flex; justify-content: space-between; }
    .he-tray ol { list-style: none; margin: 0 0 10px; padding: 0; display: flex; flex-wrap: wrap; gap: 6px 14px; }
    .he-tray li { display: flex; align-items: center; gap: 6px; font-weight: 700; }
    .he-tray li svg { width: 26px; height: 26px; }
    .he-tray li small { color: var(--ink-2); font-weight: 600; }
    .he-x { border: 0; background: none; color: var(--ink); width: 40px; height: 40px; cursor: pointer; font-size: 18px; }
    .he-cta { width: 100%; min-height: 48px; border: 0; background: var(--ink); color: var(--sheet); font-weight: 800; font-size: 16px; cursor: pointer; }
    .he-notice { margin: 0 0 8px; font-size: 14px; color: var(--ink-2); }

    @media (min-width: 900px) {
      .he-wrap { grid-template-columns: minmax(0, 1fr) 280px; column-gap: 36px; padding-bottom: 80px; }
      .he-intro { grid-column: 1; }
      .he-sheet { grid-template-columns: 260px minmax(0, 1fr); align-items: end; }
      .he-sheet-art svg { width: 240px; height: 240px; }
      .he-notes { grid-column: 1 / span 2; columns: 2; column-gap: 32px; }
      .he-notes p { break-inside: avoid; }
      .he-main { grid-column: 1; }
      .he-tray { position: sticky; top: 18px; grid-column: 2; grid-row: 1 / span 2; align-self: start; border: 1px solid var(--ink); margin-top: 18px; }
      .he-tray ol { flex-direction: column; }
      .he-tray li { justify-content: space-between; border-bottom: 1px solid var(--faint); }
    }
  `,
  render(S, st) {
    const ing = S.ingredient;
    const inCombo = (id) => st.combination.includes(id);
    let n = 0;
    const pad = (k) => String(k).padStart(2, "0");
    const spec = (p) => {
      const open = st.expanded.has(p.with.id);
      const added = inCombo(p.with.id);
      return `<li class="he-spec">
        <div class="he-spec-art"><span class="he-spec-no" aria-hidden="true">No. ${pad(++n)}</span>${botArt(p.with.id)}
          <button class="he-add" data-act="${added ? "remove" : "add"}" data-id="${p.with.id}" data-focus-key="a-${p.with.id}" aria-pressed="${added}" aria-label="${added ? "Remove " + p.with.name + " from" : "Add " + p.with.name + " to"} Combination">${added ? "Added" : "+ Add"}</button></div>
        <div class="he-spec-body">
          <h4><a href="#${p.with.id}">${p.with.name}</a></h4>
          ${p.with.blend ? `<p class="blend">A Blend that ${p.with.blend}.</p>` : ""}
          <p>${p.note}</p>
          ${open ? `<p class="more" id="more-${p.with.id}">${p.more}</p>` : ""}
        </div>
        <div class="he-spec-foot"><span>Common in <b>${p.cuisines.join(", ")}</b></span>
          <button class="he-more" data-act="expand" data-id="${p.with.id}" data-focus-key="x-${p.with.id}" aria-expanded="${open}" aria-controls="more-${p.with.id}">${open ? "Less" : "Why it works"}</button></div>
      </li>`;
    };
    return `<header class="he-top"><span class="he-logo">${botArt("lime")}MySous</span>
        <nav class="he-nav" aria-label="Main"><a href="#" aria-current="page">Explore</a><a href="#">Pantry</a></nav></header>
      <div class="he-wrap">
        <section class="he-intro" aria-labelledby="ing-name">
          <div class="he-sheet">
            <div class="he-sheet-art">${botArt(ing.id)}</div>
            <div class="he-label">
              <div class="no"><span>MySous · Ingredient</span><span>Sheet 01</span></div>
              <h1 id="ing-name">${ing.name}</h1>
              <dl><dt>Kind</dt><dd>${ing.category}</dd><dt>Common in</dt><dd>${ing.cuisines.join(", ")} cooking</dd><dt>Pairings</dt><dd>${S.pairings.length}, for ${S.reasons.length} reasons</dd></dl>
            </div>
            <div class="he-notes">
              <p>${ing.essay}</p>
              <p class="tip">${ing.tip}</p>
              <p class="ctx">${ing.context}</p>
            </div>
          </div>
        </section>
        <main class="he-main">
          <h2 class="he-h2">Pairs well with</h2>
          <ul class="he-jump" aria-label="Jump to a Pairing Reason">${S.reasons.map((r) => `<li><a href="#sec-${r.id}">${r.label}</a></li>`).join("")}</ul>
          ${S.reasons.map((r) => `<section class="he-sec" id="sec-${r.id}" aria-labelledby="h-${r.id}">
            <div class="he-sec-head"><h3 id="h-${r.id}">${r.label}</h3><p>${r.blurb}</p></div>
            <ul class="he-grid">${S.pairings.filter((p) => p.reason === r.id).map(spec).join("")}</ul>
          </section>`).join("")}
        </main>
        <aside class="he-tray" aria-label="Your Combination">
          <h2><span>Your Combination</span><span>${st.combination.length} of 4</span></h2>
          ${st.notice && st.notice.includes("up to four") ? `<p class="he-notice">${st.notice}</p>` : ""}
          <ol>${st.combination.map((id) => `<li><span style="display:flex;align-items:center;gap:6px">${botArt(id)}${S.names[id]}${st.pantry.has(id) ? " <small>· have it</small>" : ""}</span><button class="he-x" data-act="remove" data-id="${id}" aria-label="Remove ${S.names[id]}">×</button></li>`).join("")}</ol>
          <button class="he-cta">See what to make</button>
        </aside>
      </div>`;
  },
});
