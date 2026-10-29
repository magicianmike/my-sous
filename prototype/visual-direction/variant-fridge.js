// PROTOTYPE (issue #4, round 3), R3c: Fridge first.
// B1 Garden colour reworked for a phone held in one hand at the fridge:
// a compact header, the essay behind "About lime", a sticky Pairing Reason
// filter, tighter rows, and a slim tray that opens when you want to edit it.
// On a 390px phone the first Pairings sit on the first screen.
(function () {
  const base = window.VARIANTS.find((v) => v.key === "garden");
  window.VARIANTS.push({
    key: "fridge",
    name: "Fridge first",
    fonts: base.fonts,
    css:
      base.css +
      `
      .fr-layout { max-width: 1180px; margin: 0 auto; padding: 0 16px 120px; display: grid; gap: 24px; }
      .fr-layout > * { min-width: 0; }
      .fr-head { display: grid; grid-template-columns: 60px 1fr auto; gap: 0 12px; align-items: center; }
      .fr-head .ga-plate { width: 60px; height: 60px; grid-row: span 2; }
      .fr-head .ga-plate svg { width: 42px; height: 42px; }
      .fr-head h1 { margin: 0; font-size: 34px; line-height: 1.05; font-weight: 800; }
      .fr-head p { margin: 0; color: var(--ink-2); font-weight: 600; font-size: 15px; }
      .fr-about-btn { grid-row: span 2; border: 1.5px solid var(--line); background: var(--surface); color: var(--ink); border-radius: 999px; min-height: 44px; padding: 0 14px; font-weight: 700; font-size: 14px; cursor: pointer; }
      .fr-head .ga-about { grid-column: 1 / -1; margin-top: 12px; }
      .fr-sticky { position: sticky; top: 0; z-index: 2; background: var(--bg); padding: 10px 0 8px; margin: 6px 0 0; }
      .fr-sticky .ga-seg button { min-height: 40px; padding: 0 14px; }
      .fr-list { list-style: none; margin: 0; padding: 0; }
      .fr-row { display: grid; grid-template-columns: 48px 1fr 44px; gap: 0 12px; align-items: start; padding: 12px 0; border-bottom: 1px solid var(--line); }
      .fr-row .ga-thumb { width: 48px; height: 48px; grid-row: span 3; }
      .fr-row .ga-thumb svg { width: 34px; height: 34px; }
      .fr-row h3 { margin: 0; font-size: 18px; font-weight: 800; line-height: 1.3; }
      .fr-row h3 a { text-decoration: none; }
      .fr-row p { margin: 0; grid-column: 2; font-size: 15px; line-height: 1.45; }
      .fr-row .more { margin-top: 6px; color: var(--ink-2); }
      .fr-row .ga-add { grid-column: 3; grid-row: 1 / span 2; }
      .fr-meta { grid-column: 2 / span 2; display: flex; flex-wrap: wrap; align-items: center; gap: 0 12px; font-size: 13px; color: var(--ink-2); }
      .fr-meta .ga-more { font-size: 13px; min-height: 36px; }
      .fr-group { font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); margin: 16px 0 0; }

      .fr-tray { position: fixed; left: 8px; right: 8px; bottom: 8px; background: var(--surface); border: 1px solid var(--line); border-radius: 20px; padding: 8px 8px 8px 12px; box-shadow: 0 10px 30px -8px rgba(0,0,0,.35); }
      .fr-tray-bar { display: flex; align-items: center; gap: 10px; }
      .fr-stack { display: flex; }
      .fr-stack span { width: 34px; height: 34px; border-radius: 50%; background: var(--wash); color: var(--stroke); display: grid; place-items: center; border: 2px solid var(--surface); margin-left: -10px; }
      .fr-stack span:first-child { margin-left: 0; }
      .fr-stack svg { width: 24px; height: 24px; }
      .fr-edit { border: 0; background: none; color: var(--ink); font-weight: 800; font-size: 15px; min-height: 44px; padding: 0 4px; cursor: pointer; text-align: left; }
      .fr-edit small { display: block; font-weight: 600; color: var(--ink-2); font-size: 12px; }
      .fr-tray .ga-cta { width: auto; margin-left: auto; padding: 0 18px; white-space: nowrap; }
      .fr-tray ul { list-style: none; margin: 8px 0 4px; padding: 0; display: grid; gap: 6px; }
      .fr-tray li { display: flex; align-items: center; justify-content: space-between; background: var(--wash); border-radius: 12px; padding: 2px 2px 2px 8px; font-weight: 700; }
      .fr-tray li > span { display: flex; align-items: center; gap: 8px; }
      .fr-tray li svg { width: 26px; height: 26px; color: var(--stroke); }
      .fr-tray li small { color: var(--ink-2); font-weight: 600; font-size: 13px; }
      @media (min-width: 900px) {
        .fr-layout { grid-template-columns: minmax(0, 1fr) 300px; gap: 40px; padding-bottom: 60px; }
        .fr-head { grid-template-columns: 88px 1fr auto; }
        .fr-head .ga-plate { width: 88px; height: 88px; }
        .fr-head .ga-plate svg { width: 62px; height: 62px; }
        .fr-head h1 { font-size: 48px; }
        .fr-tray { position: sticky; top: 16px; left: auto; right: auto; bottom: auto; align-self: start; box-shadow: none; padding: 14px; }
        .fr-tray-bar { flex-wrap: wrap; }
        .fr-tray .ga-cta { width: 100%; margin: 6px 0 0; order: 3; }
      }
    `,
    render(S, st) {
      const ing = S.ingredient;
      const inCombo = (id) => st.combination.includes(id);
      const filters = [{ id: "all", label: "All" }, ...S.reasons];
      const aboutOpen = st.expanded.has("about");
      // The full tray list is always shown on desktop; on a phone it opens on request.
      const trayOpen = st.expanded.has("tray") || matchMedia("(min-width: 900px)").matches;
      const row = (p) => {
        const open = st.expanded.has(p.with.id);
        const added = inCombo(p.with.id);
        return `<li class="fr-row ga-hue" style="${botHue(p.with.id)}">
          <div class="ga-thumb">${botArt(p.with.id)}</div>
          <h3><a href="#${p.with.id}">${p.with.name}</a></h3>
          <button class="ga-add" data-act="${added ? "remove" : "add"}" data-id="${p.with.id}" data-focus-key="a-${p.with.id}" aria-pressed="${added}" aria-label="${added ? "Remove " + p.with.name + " from" : "Add " + p.with.name + " to"} Combination">${added ? "✓" : "+"}</button>
          <p>${p.with.blend ? `A Blend that ${p.with.blend}. ` : ""}${p.note}</p>
          ${open ? `<p class="more" id="more-${p.with.id}">${p.more}</p>` : ""}
          <div class="fr-meta"><span>Common in ${p.cuisines.join(", ")}</span>
            <button class="ga-more" data-act="expand" data-id="${p.with.id}" data-focus-key="x-${p.with.id}" aria-expanded="${open}" aria-controls="more-${p.with.id}">${open ? "Less" : "Why it works"}</button></div>
        </li>`;
      };
      const reasons = st.filter === "all" ? S.reasons : S.reasons.filter((r) => r.id === st.filter);
      return `<div class="${st.renders === 0 ? "ga-first" : ""}">
        <header class="ga-top"><span class="ga-logo"><span class="ga-hue" style="${botHue("lime")}">${botArt("lime")}</span>MySous</span>
          <nav class="ga-nav" aria-label="Main"><a href="#" aria-current="page">Explore</a><a href="#">Pantry</a></nav></header>
        <div class="fr-layout">
          <main>
            <section class="fr-head ga-hue" style="${botHue(ing.id)}" aria-labelledby="ing-name">
              <div class="ga-plate">${botArt(ing.id)}</div>
              <h1 id="ing-name">${ing.name}</h1>
              <button class="fr-about-btn" data-act="expand" data-id="about" data-focus-key="about" aria-expanded="${aboutOpen}" aria-controls="about">${aboutOpen ? "Close" : "About lime"}</button>
              <p>${ing.category} · ${ing.cuisines.join(", ")}</p>
              ${aboutOpen ? `<div class="ga-about" id="about"><p>${ing.essay}</p><p class="ga-tip"><b>Tip</b><span>${ing.tip}</span></p><p class="ga-ctx">${ing.context}</p></div>` : ""}
            </section>
            <div class="fr-sticky">
              <div class="ga-seg" role="group" aria-label="Filter Pairings by Pairing Reason">
                ${filters.map((f) => `<button data-act="filter" data-id="${f.id}" data-focus-key="f-${f.id}" aria-pressed="${st.filter === f.id}">${f.label}</button>`).join("")}
              </div>
            </div>
            ${reasons.map((r) => `${st.filter === "all" ? `<h2 class="fr-group">${r.label}</h2>` : ""}<ul class="fr-list">${S.pairings.filter((p) => p.reason === r.id).map(row).join("")}</ul>`).join("")}
          </main>
          <aside class="fr-tray" aria-label="Your Combination">
            <div class="fr-tray-bar">
              <div class="fr-stack" aria-hidden="true">${st.combination.map((id) => `<span class="ga-hue" style="${botHue(id)}">${botArt(id)}</span>`).join("")}</div>
              <button class="fr-edit" data-act="expand" data-id="tray" data-focus-key="tray" aria-expanded="${trayOpen}" aria-label="Your Combination, ${st.combination.length} of 4. ${trayOpen ? "Hide" : "Show"} the list">${st.combination.length} of 4<small>${trayOpen ? "" : st.combination.map((id) => S.names[id]).join(", ")}</small></button>
              <button class="ga-cta">See what to make</button>
            </div>
            ${st.notice && st.notice.includes("up to four") ? `<p class="ga-notice">${st.notice}</p>` : ""}
            ${trayOpen ? `<ul>${st.combination.map((id) => `<li class="ga-hue ${id === st.lastAdded ? "ga-new" : ""}" style="${botHue(id)}"><span>${botArt(id)}${S.names[id]}${st.pantry.has(id) ? " <small>· have it</small>" : ""}</span><button class="ga-x" data-act="remove" data-id="${id}" aria-label="Remove ${S.names[id]}">×</button></li>`).join("")}</ul>` : ""}
          </aside>
        </div>
      </div>`;
    },
  });
})();
