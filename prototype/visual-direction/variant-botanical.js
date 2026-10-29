// PROTOTYPE (issue #4), variant B: Botanical line.
// Systematic single-line Ingredient illustrations, rounded humanist sans.
// Structure: a specimen sheet. The hero is the drawing; Pairings are filtered
// one Pairing Reason at a time with a segmented control (the primary
// affordance), and each Pairing is a row led by its own drawing.
(function () {
  // One stroke weight, one 48-unit grid, round caps: the "system".
  const ART = {
    lime: '<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="13.5"/><path d="M24 11v26M11 24h26M14.5 14.5l19 19M33.5 14.5l-19 19"/><circle cx="24" cy="24" r="2"/>',
    "pork-shoulder": '<path d="M7 30c0-10 9-17 19-17 9 0 15 6 15 13 0 8-8 12-18 12-10 0-16-2-16-8z"/><path d="M11 30c7 3 19 3 27-2"/><circle cx="31" cy="23" r="3"/>',
    avocado: '<path d="M24 6c-6 0-9 8-11 16-2 9 2 20 11 20s13-11 11-20C33 14 30 6 24 6z"/><circle cx="24" cy="29" r="6"/>',
    "chicken-thigh": '<path d="M17 33c-6-7-3-19 7-22 10-2 17 5 15 13-2 7-10 10-17 10"/><path d="M17 33l-6 6"/><path d="M9 37c-2 1-2 4 0 5s4 1 4-1"/>',
    cilantro: '<path d="M24 44V20M24 30l-8-6M24 26l8-5"/><path d="M24 20c-5-1-8-6-5-11 3 2 5 6 5 11 0-5 2-9 5-11 3 5 0 10-5 11z"/><path d="M16 24c-4 0-7-3-6-6 3 0 6 3 6 6zM32 21c4-1 7-4 6-7-3 0-6 3-6 7z"/>',
    ginger: '<path d="M6 31c2-6 8-6 12-4 1-6 7-8 10-4 3-5 10-4 11 1 4 1 4 7 0 9-6 3-26 4-33-2z"/><path d="M18 27v4M28 23v5M38 26l-2 4"/>',
    cucumber: '<path d="M8 33c-2-4 2-8 8-10l17-8c6-2 10 2 9 6-1 4-4 6-9 8l-17 8c-4 1-7 0-8-4z"/><path d="M15 29h.01M22 25h.01M29 22h.01M36 19h.01"/>',
    radish: '<circle cx="24" cy="30" r="9"/><path d="M24 39v6"/><path d="M24 21c-2-6-8-9-12-8 1 5 6 8 12 8 2-6 8-9 12-8-1 5-6 8-12 8z"/>',
    "chaat-masala": '<path d="M7 27h34c0 9-7 15-17 15S7 36 7 27z"/><path d="M12 27c2-6 7-9 12-9s10 3 12 9"/><path d="M20 22h.01M27 21h.01M24 18h.01"/>',
    "dried-chile": '<path d="M9 39c11-2 23-12 27-26 1-3 4-4 5-1 0 14-14 28-31 29z"/><path d="M39 12c0-3 2-5 4-6"/>',
  };
  const art = (id, cls) => `<svg class="${cls}" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${ART[id] || ""}</svg>`;

  window.VARIANTS.push({
    key: "botanical",
    name: "Botanical line (round 1)",
    fonts: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400..800;1,400&display=swap",
    css: `
      :root {
        --bg: #f6f7f1; --surface: #ffffff; --sunk: #eceee4; --ink: #1d2a21; --ink-2: #4b5b4f; --line: #cdd5c9;
        --leaf: #2d6a39; --leaf-ink: #ffffff; --leaf-wash: #e2eedf; --art: #24402c;
        --font: "Nunito", ui-rounded, system-ui, sans-serif; --r: 18px;
      }
      :root[data-theme="dark"] {
        --bg: #121814; --surface: #1b231e; --sunk: #232d27; --ink: #e5ede6; --ink-2: #a6b6aa; --line: #34423a;
        --leaf: #8ccf9b; --leaf-ink: #10241a; --leaf-wash: #233a2a; --art: #b9dcc0;
      }
      body { background: var(--bg); color: var(--ink); font: 17px/1.55 var(--font); }
      a { color: inherit; }
      :focus-visible { outline: 3px solid var(--leaf); outline-offset: 2px; border-radius: 10px; }
      .bo-top { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; }
      .bo-logo { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 19px; }
      .bo-logo svg { width: 28px; height: 28px; color: var(--leaf); }
      .bo-nav { display: flex; gap: 4px; background: var(--sunk); border-radius: 999px; padding: 4px; }
      .bo-nav a { text-decoration: none; padding: 8px 16px; border-radius: 999px; font-weight: 700; font-size: 15px; min-height: 40px; display: flex; align-items: center; }
      .bo-nav a[aria-current] { background: var(--surface); box-shadow: 0 1px 3px rgba(0,0,0,.12); }
      .bo-layout { display: grid; gap: 20px; padding: 0 18px 200px; max-width: 1280px; margin: 0 auto; }
      .bo-layout > * { min-width: 0; }
      .bo-hero { text-align: center; padding: 8px 0 0; }
      .bo-plate { width: 168px; height: 168px; margin: 0 auto; border-radius: 50%; background: var(--leaf-wash); display: grid; place-items: center; color: var(--art); }
      .bo-plate svg { width: 120px; height: 120px; }
      .bo-hero h1 { font-size: 44px; line-height: 1.05; margin: 14px 0 4px; font-weight: 800; letter-spacing: -0.01em; }
      .bo-cat { color: var(--ink-2); font-weight: 600; margin: 0; }
      .bo-chips { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin: 12px 0 0; padding: 0; list-style: none; }
      .bo-chips li { border: 1.5px solid var(--line); border-radius: 999px; padding: 4px 12px; font-size: 14px; font-weight: 700; }
      .bo-about { text-align: left; background: var(--surface); border-radius: var(--r); padding: 18px 20px; margin-top: 18px; }
      .bo-about p { margin: 0 0 12px; }
      .bo-tip { display: flex; gap: 12px; background: var(--leaf-wash); border-radius: 14px; padding: 12px 14px; margin: 0 !important; }
      .bo-tip b { white-space: nowrap; color: var(--ink); }
      .bo-about .bo-ctx { color: var(--ink-2); font-size: 15px; }
      .bo-h2 { font-size: 24px; font-weight: 800; margin: 8px 0 12px; }
      .bo-seg { display: flex; gap: 6px; overflow-x: auto; padding: 4px; background: var(--sunk); border-radius: 999px; scrollbar-width: none; }
      .bo-seg button { flex: none; border: 0; background: none; border-radius: 999px; padding: 0 16px; min-height: 44px; font-weight: 700; font-size: 15px; cursor: pointer; color: var(--ink); }
      .bo-seg button[aria-pressed="true"] { background: var(--leaf); color: var(--leaf-ink); }
      .bo-blurb { color: var(--ink-2); margin: 12px 4px 4px; font-style: italic; }
      .bo-group { font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); margin: 20px 4px 8px; }
      .bo-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
      .bo-row { display: grid; grid-template-columns: 64px 1fr auto; gap: 4px 14px; align-items: start; background: var(--surface); border-radius: var(--r); padding: 14px; }
      .bo-thumb { width: 64px; height: 64px; border-radius: 50%; background: var(--sunk); display: grid; place-items: center; color: var(--art); grid-row: span 2; }
      .bo-thumb svg { width: 44px; height: 44px; }
      .bo-row h3 { margin: 2px 0 0; font-size: 19px; font-weight: 800; }
      .bo-row h3 a { text-decoration: none; }
      .bo-row h3 a:hover { text-decoration: underline; }
      .bo-row .note { margin: 0; grid-column: 2 / span 2; }
      .bo-row .more { margin: 8px 0 0; grid-column: 2 / span 2; color: var(--ink-2); font-size: 15px; }
      .bo-meta { grid-column: 2 / span 2; display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; margin-top: 6px; font-size: 14px; color: var(--ink-2); }
      .bo-meta .tag { font-weight: 700; }
      .bo-more { border: 0; background: none; color: var(--ink); font-weight: 700; font-size: 14px; text-decoration: underline; text-underline-offset: 3px; min-height: 44px; padding: 0 4px; cursor: pointer; }
      .bo-add { width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--leaf); background: none; color: var(--leaf); font-size: 24px; line-height: 1; cursor: pointer; font-weight: 700; }
      .bo-add[aria-pressed="true"] { background: var(--leaf); color: var(--leaf-ink); font-size: 18px; }
      .bo-blendnote { grid-column: 2 / span 2; font-size: 14px; color: var(--ink-2); margin: 0; }

      .bo-tray { position: fixed; left: 10px; right: 10px; bottom: 10px; background: var(--surface); border-radius: 24px; padding: 14px 16px; box-shadow: 0 10px 40px -8px rgba(0,0,0,.35); border: 1px solid var(--line); }
      .bo-tray h2 { font-size: 16px; font-weight: 800; margin: 0 0 10px; display: flex; justify-content: space-between; }
      .bo-tray h2 span { color: var(--ink-2); font-weight: 700; }
      .bo-tray ul { list-style: none; padding: 0; margin: 0 0 12px; display: flex; gap: 8px; flex-wrap: wrap; }
      .bo-tray li { display: flex; align-items: center; gap: 6px; background: var(--sunk); border-radius: 999px; padding: 2px 2px 2px 6px; font-weight: 700; font-size: 15px; }
      .bo-tray li span { display: flex; align-items: center; gap: 6px; }
      .bo-tray li svg { width: 26px; height: 26px; color: var(--art); }
      .bo-tray li small { font-weight: 600; color: var(--ink-2); font-size: 13px; }
      .bo-x { border: 0; background: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 18px; color: var(--ink-2); }
      .bo-cta { width: 100%; min-height: 48px; border: 0; border-radius: 999px; background: var(--leaf); color: var(--leaf-ink); font-weight: 800; font-size: 16px; cursor: pointer; }
      .bo-notice { font-size: 14px; color: var(--ink-2); margin: 0 0 10px; }

      @media (min-width: 900px) {
        .bo-layout { grid-template-columns: 320px minmax(0, 1fr) 280px; gap: 32px; padding-bottom: 80px; align-items: start; }
        .bo-hero { position: sticky; top: 16px; }
        .bo-plate { width: 220px; height: 220px; }
        .bo-plate svg { width: 156px; height: 156px; }
        .bo-tray { position: sticky; top: 16px; left: auto; right: auto; bottom: auto; box-shadow: none; }
        .bo-tray ul { flex-direction: column; }
        .bo-tray li { justify-content: space-between; border-radius: 14px; padding: 6px 4px 6px 10px; }
        .bo-tray li span { display: flex; align-items: center; gap: 8px; }
      }
    `,
    render(S, st) {
      const ing = S.ingredient;
      const inCombo = (id) => st.combination.includes(id);
      const filters = [{ id: "all", label: "All" }, ...S.reasons];
      const row = (p) => {
        const open = st.expanded.has(p.with.id);
        const added = inCombo(p.with.id);
        return `<li class="bo-row">
          <div class="bo-thumb">${art(p.with.id, "")}</div>
          <h3><a href="#${p.with.id}">${p.with.name}</a></h3>
          <button class="bo-add" data-act="${added ? "remove" : "add"}" data-id="${p.with.id}" data-focus-key="a-${p.with.id}" aria-pressed="${added}" aria-label="${added ? "Remove " + p.with.name + " from" : "Add " + p.with.name + " to"} Combination">${added ? "✓" : "+"}</button>
          ${p.with.blend ? `<p class="bo-blendnote">A Blend that ${p.with.blend}.</p>` : ""}
          <p class="note">${p.note}</p>
          ${open ? `<p class="more" id="more-${p.with.id}">${p.more}</p>` : ""}
          <div class="bo-meta"><span>Common in <span class="tag">${p.cuisines.join(", ")}</span></span>
            <button class="bo-more" data-act="expand" data-id="${p.with.id}" data-focus-key="x-${p.with.id}" aria-expanded="${open}" aria-controls="more-${p.with.id}">${open ? "Show less" : "Why it works"}</button></div>
        </li>`;
      };
      const reasons = st.filter === "all" ? S.reasons : S.reasons.filter((r) => r.id === st.filter);
      const list = reasons
        .map((r) => `${st.filter === "all" ? `<h3 class="bo-group">${r.label}</h3>` : `<p class="bo-blurb">${r.blurb}</p>`}
          <ul class="bo-list">${S.pairings.filter((p) => p.reason === r.id).map(row).join("")}</ul>`)
        .join("");
      return `<header class="bo-top"><span class="bo-logo">${art("lime", "")}MySous</span>
          <nav class="bo-nav" aria-label="Main"><a href="#" aria-current="page">Explore</a><a href="#">Pantry</a></nav></header>
        <div class="bo-layout">
          <section class="bo-hero" aria-labelledby="ing-name">
            <div class="bo-plate">${art("lime", "")}</div>
            <h1 id="ing-name">${ing.name}</h1>
            <p class="bo-cat">${ing.category}</p>
            <ul class="bo-chips" aria-label="Common in">${ing.cuisines.map((c) => `<li>${c}</li>`).join("")}</ul>
            <div class="bo-about">
              <p>${ing.essay}</p>
              <p class="bo-tip"><b>Tip</b><span>${ing.tip}</span></p>
              <p class="bo-ctx" style="margin-top:12px">${ing.context}</p>
            </div>
          </section>
          <main>
            <h2 class="bo-h2">Pairs well with</h2>
            <div class="bo-seg" role="group" aria-label="Filter by Pairing Reason">
              ${filters.map((f) => `<button data-act="filter" data-id="${f.id}" data-focus-key="f-${f.id}" aria-pressed="${st.filter === f.id}">${f.label}</button>`).join("")}
            </div>
            ${list}
          </main>
          <aside class="bo-tray" aria-label="Your Combination">
            <h2>Your Combination <span>${st.combination.length} of 4</span></h2>
            ${st.notice && st.notice.includes("up to four") ? `<p class="bo-notice">${st.notice}</p>` : ""}
            <ul>${st.combination.map((id) => `<li><span>${art(id, "")}${S.names[id]}${st.pantry.has(id) ? " <small>· have it</small>" : ""}</span><button class="bo-x" data-act="remove" data-id="${id}" aria-label="Remove ${S.names[id]}">×</button></li>`).join("")}</ul>
            <button class="bo-cta">See what to make</button>
          </aside>
        </div>`;
    },
  });
})();
