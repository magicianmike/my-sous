// PROTOTYPE (issue #4, round 2), B1: Garden colour.
// Round 1's Botanical line, with colour drawn from each Ingredient: every
// drawing sits on its own Ingredient's wash and stroke. Motion: the hero
// line draws itself on first paint, rows settle in, and an added Ingredient
// grows into the tray. All motion is off under prefers-reduced-motion.
window.VARIANTS.push({
  key: "garden",
  name: "Garden colour",
  fonts: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400..800;1,400&display=swap",
  css: `
    :root {
      --bg: #f8f7f2; --surface: #ffffff; --sunk: #efeee6; --ink: #1f2620; --ink-2: #4d574f; --line: #d6d8cd;
      --act: #1f2620; --act-ink: #ffffff;
      --font: "Nunito", ui-rounded, system-ui, sans-serif; --r: 20px;
      --ease-out: cubic-bezier(.2, .7, .2, 1);
    }
    :root[data-theme="dark"] {
      --bg: #121412; --surface: #1b1e1b; --sunk: #252925; --ink: #ebefe9; --ink-2: #aab3ab; --line: #343a35;
      --act: #ebefe9; --act-ink: #121412;
    }
    .ga-hue { --wash: var(--wash-l); --stroke: var(--stroke-l); }
    :root[data-theme="dark"] .ga-hue { --wash: var(--wash-d); --stroke: var(--stroke-d); }
    body { background: var(--bg); color: var(--ink); font: 17px/1.55 var(--font); }
    a { color: inherit; }
    :focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; border-radius: 10px; }
    .ga-top { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; }
    .ga-logo { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 19px; }
    .ga-logo .ga-hue { width: 32px; height: 32px; border-radius: 50%; background: var(--wash); color: var(--stroke); display: grid; place-items: center; }
    .ga-logo svg { width: 24px; height: 24px; }
    .ga-nav { display: flex; gap: 4px; background: var(--sunk); border-radius: 999px; padding: 4px; }
    .ga-nav a { text-decoration: none; padding: 8px 16px; border-radius: 999px; font-weight: 700; font-size: 15px; min-height: 40px; display: flex; align-items: center; }
    .ga-nav a[aria-current] { background: var(--surface); box-shadow: 0 1px 3px rgba(0,0,0,.12); }
    .ga-layout { display: grid; gap: 20px; padding: 0 18px 210px; max-width: 1280px; margin: 0 auto; }
    .ga-layout > * { min-width: 0; }
    .ga-hero { text-align: center; padding-top: 8px; }
    .ga-plate { width: 180px; height: 180px; margin: 0 auto; border-radius: 50%; background: var(--wash); color: var(--stroke); display: grid; place-items: center; }
    .ga-plate svg { width: 128px; height: 128px; stroke-width: 1.5; }
    .ga-hero h1 { font-size: 46px; line-height: 1.05; margin: 14px 0 4px; font-weight: 800; letter-spacing: -0.01em; }
    .ga-cat { color: var(--ink-2); font-weight: 600; margin: 0; }
    .ga-chips { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin: 12px 0 0; padding: 0; list-style: none; }
    .ga-chips li { background: var(--wash); border-radius: 999px; padding: 4px 12px; font-size: 14px; font-weight: 700; }
    .ga-about { text-align: left; background: var(--surface); border-radius: var(--r); padding: 18px 20px; margin-top: 18px; }
    .ga-about p { margin: 0 0 12px; }
    .ga-tip { display: flex; gap: 12px; background: var(--wash); border-radius: 14px; padding: 12px 14px; }
    .ga-ctx { color: var(--ink-2); font-size: 15px; margin-bottom: 0 !important; }
    .ga-h2 { font-size: 24px; font-weight: 800; margin: 8px 0 12px; }
    .ga-seg { display: flex; gap: 6px; overflow-x: auto; padding: 4px; background: var(--sunk); border-radius: 999px; scrollbar-width: none; }
    .ga-seg button { flex: none; border: 0; background: none; border-radius: 999px; padding: 0 16px; min-height: 44px; font-weight: 700; font-size: 15px; cursor: pointer; color: var(--ink); transition: background-color .2s var(--ease-out), color .2s var(--ease-out); }
    .ga-seg button[aria-pressed="true"] { background: var(--act); color: var(--act-ink); }
    .ga-blurb { color: var(--ink-2); margin: 12px 4px 4px; font-style: italic; }
    .ga-group { font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); margin: 20px 4px 8px; }
    .ga-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
    .ga-row { display: grid; grid-template-columns: 68px 1fr auto; gap: 4px 14px; align-items: start; background: var(--surface); border-radius: var(--r); padding: 14px; }
    .ga-thumb { width: 68px; height: 68px; border-radius: 50%; background: var(--wash); color: var(--stroke); display: grid; place-items: center; grid-row: span 2; }
    .ga-thumb svg { width: 46px; height: 46px; }
    .ga-row h3 { margin: 2px 0 0; font-size: 19px; font-weight: 800; }
    .ga-row h3 a { text-decoration: none; }
    .ga-row h3 a:hover { text-decoration: underline; }
    .ga-row .note, .ga-row .more, .ga-meta, .ga-blendnote { grid-column: 2 / span 2; margin: 0; }
    .ga-row .more { margin-top: 8px; color: var(--ink-2); font-size: 15px; }
    .ga-blendnote { font-size: 14px; color: var(--ink-2); }
    .ga-meta { display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; margin-top: 6px; font-size: 14px; color: var(--ink-2); }
    .ga-meta b { color: var(--ink); }
    .ga-more { border: 0; background: none; color: var(--ink); font-weight: 700; font-size: 14px; text-decoration: underline; text-underline-offset: 3px; min-height: 44px; padding: 0 4px; cursor: pointer; }
    .ga-add { width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--ink); background: none; color: var(--ink); font-size: 24px; line-height: 1; cursor: pointer; font-weight: 700; transition: transform .15s var(--ease-out); }
    .ga-add:active { transform: scale(.92); }
    .ga-add[aria-pressed="true"] { background: var(--ink); color: var(--bg); font-size: 18px; }

    .ga-tray { position: fixed; left: 10px; right: 10px; bottom: 10px; background: var(--surface); border-radius: 24px; padding: 14px 16px; box-shadow: 0 10px 40px -8px rgba(0,0,0,.35); border: 1px solid var(--line); }
    .ga-tray h2 { font-size: 16px; font-weight: 800; margin: 0 0 10px; display: flex; justify-content: space-between; }
    .ga-tray h2 span { color: var(--ink-2); font-weight: 700; }
    .ga-tray ul { list-style: none; padding: 0; margin: 0 0 12px; display: flex; gap: 8px; flex-wrap: wrap; }
    .ga-tray li { display: flex; align-items: center; justify-content: space-between; gap: 6px; background: var(--wash); border-radius: 999px; padding: 2px 2px 2px 6px; font-weight: 700; font-size: 15px; }
    .ga-tray li > span { display: flex; align-items: center; gap: 6px; }
    .ga-tray li svg { width: 28px; height: 28px; color: var(--stroke); }
    .ga-tray li small { font-weight: 600; color: var(--ink-2); font-size: 13px; }
    .ga-x { border: 0; background: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 18px; color: var(--ink); }
    .ga-cta { width: 100%; min-height: 48px; border: 0; border-radius: 999px; background: var(--act); color: var(--act-ink); font-weight: 800; font-size: 16px; cursor: pointer; }
    .ga-notice { font-size: 14px; color: var(--ink-2); margin: 0 0 10px; }

    /* Motion: calm and organic. Only on first paint, or for the thing that changed. */
    @keyframes ga-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
    @keyframes ga-settle { from { opacity: 0; transform: translateY(10px); } }
    @keyframes ga-grow { from { transform: scale(.6); opacity: 0; } 60% { transform: scale(1.06); } }
    @media (prefers-reduced-motion: no-preference) {
      .ga-first .ga-plate svg > * { stroke-dasharray: 1; animation: ga-draw 1.4s var(--ease-out) both; }
      .ga-first .ga-plate svg > :nth-child(2) { animation-delay: .15s; }
      .ga-first .ga-plate svg > :nth-child(3) { animation-delay: .35s; }
      .ga-first .ga-row { animation: ga-settle .5s var(--ease-out) both; animation-delay: calc(var(--i) * 45ms + .2s); }
      .ga-tray li.ga-new { animation: ga-grow .4s var(--ease-out); }
    }

    @media (min-width: 900px) {
      .ga-layout { grid-template-columns: 320px minmax(0, 1fr) 280px; gap: 32px; padding-bottom: 80px; align-items: start; }
      .ga-hero { position: sticky; top: 16px; }
      .ga-plate { width: 228px; height: 228px; }
      .ga-plate svg { width: 164px; height: 164px; }
      .ga-tray { position: sticky; top: 16px; left: auto; right: auto; bottom: auto; box-shadow: none; }
      .ga-tray ul { flex-direction: column; }
      .ga-tray li { border-radius: 14px; padding: 6px 4px 6px 10px; }
    }
  `,
  render(S, st) {
    const ing = S.ingredient;
    const inCombo = (id) => st.combination.includes(id);
    const filters = [{ id: "all", label: "All" }, ...S.reasons];
    let i = 0;
    const row = (p) => {
      const open = st.expanded.has(p.with.id);
      const added = inCombo(p.with.id);
      return `<li class="ga-row ga-hue" style="${botHue(p.with.id)};--i:${i++}">
        <div class="ga-thumb">${botArt(p.with.id)}</div>
        <h3><a href="#${p.with.id}">${p.with.name}</a></h3>
        <button class="ga-add" data-act="${added ? "remove" : "add"}" data-id="${p.with.id}" data-focus-key="a-${p.with.id}" aria-pressed="${added}" aria-label="${added ? "Remove " + p.with.name + " from" : "Add " + p.with.name + " to"} Combination">${added ? "✓" : "+"}</button>
        ${p.with.blend ? `<p class="ga-blendnote">A Blend that ${p.with.blend}.</p>` : ""}
        <p class="note">${p.note}</p>
        ${open ? `<p class="more" id="more-${p.with.id}">${p.more}</p>` : ""}
        <div class="ga-meta"><span>Common in <b>${p.cuisines.join(", ")}</b></span>
          <button class="ga-more" data-act="expand" data-id="${p.with.id}" data-focus-key="x-${p.with.id}" aria-expanded="${open}" aria-controls="more-${p.with.id}">${open ? "Show less" : "Why it works"}</button></div>
      </li>`;
    };
    const reasons = st.filter === "all" ? S.reasons : S.reasons.filter((r) => r.id === st.filter);
    const list = reasons
      .map((r) => `${st.filter === "all" ? `<h3 class="ga-group">${r.label}</h3>` : `<p class="ga-blurb">${r.blurb}</p>`}
        <ul class="ga-list">${S.pairings.filter((p) => p.reason === r.id).map(row).join("")}</ul>`)
      .join("");
    return `<div class="${st.renders === 0 ? "ga-first" : ""}">
      <header class="ga-top"><span class="ga-logo"><span class="ga-hue" style="${botHue("lime")}">${botArt("lime")}</span>MySous</span>
        <nav class="ga-nav" aria-label="Main"><a href="#" aria-current="page">Explore</a><a href="#">Pantry</a></nav></header>
      <div class="ga-layout">
        <section class="ga-hero ga-hue" style="${botHue(ing.id)}" aria-labelledby="ing-name">
          <div class="ga-plate">${botArt(ing.id)}</div>
          <h1 id="ing-name">${ing.name}</h1>
          <p class="ga-cat">${ing.category}</p>
          <ul class="ga-chips" aria-label="Common in">${ing.cuisines.map((c) => `<li>${c}</li>`).join("")}</ul>
          <div class="ga-about">
            <p>${ing.essay}</p>
            <p class="ga-tip"><b>Tip</b><span>${ing.tip}</span></p>
            <p class="ga-ctx">${ing.context}</p>
          </div>
        </section>
        <main>
          <h2 class="ga-h2">Pairs well with</h2>
          <div class="ga-seg" role="group" aria-label="Filter by Pairing Reason">
            ${filters.map((f) => `<button data-act="filter" data-id="${f.id}" data-focus-key="f-${f.id}" aria-pressed="${st.filter === f.id}">${f.label}</button>`).join("")}
          </div>
          ${list}
        </main>
        <aside class="ga-tray" aria-label="Your Combination">
          <h2>Your Combination <span>${st.combination.length} of 4</span></h2>
          ${st.notice && st.notice.includes("up to four") ? `<p class="ga-notice">${st.notice}</p>` : ""}
          <ul>${st.combination.map((id) => `<li class="ga-hue ${id === st.lastAdded ? "ga-new" : ""}" style="${botHue(id)}"><span>${botArt(id)}${S.names[id]}${st.pantry.has(id) ? " <small>· have it</small>" : ""}</span><button class="ga-x" data-act="remove" data-id="${id}" aria-label="Remove ${S.names[id]}">×</button></li>`).join("")}</ul>
          <button class="ga-cta">See what to make</button>
        </aside>
      </div>
    </div>`;
  },
});
