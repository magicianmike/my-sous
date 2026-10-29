// PROTOTYPE (issue #4), variant A: Editorial cookbook.
// Serif display face, warm paper ground, colour drawn from the Ingredient.
// Structure: a long-read article. Pairings are numbered chapters of prose,
// with cuisines as marginalia on desktop. The Combination is an index card.
window.VARIANTS.push({
  key: "editorial",
  name: "Editorial cookbook",
  fonts: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap",
  css: `
    :root {
      --paper: #f5efe2; --paper-2: #ece3d0; --ink: #2b2219; --ink-2: #5b4d3d; --rule: #cbbd9f;
      --lime: #3f5c10; --lime-wash: #e1e7c6; --lime-dot: #5a8514;
      --display: "Fraunces", Georgia, serif; --text: "Source Serif 4", Georgia, serif;
    }
    :root[data-theme="dark"] {
      --paper: #1b1913; --paper-2: #26231a; --ink: #eee5d2; --ink-2: #bcae95; --rule: #4a4334;
      --lime: #bcd873; --lime-wash: #2e3419; --lime-dot: #9cc243;
    }
    body { background: var(--paper); color: var(--ink); font: 18px/1.6 var(--text); }
    a { color: inherit; }
    .ed-mast { display: flex; justify-content: space-between; align-items: baseline; padding: 18px 20px 14px; border-bottom: 1px solid var(--rule); max-width: 1200px; margin: 0 auto; }
    .ed-logo { font: italic 600 22px/1 var(--display); letter-spacing: -0.01em; }
    .ed-nav { display: flex; gap: 20px; font: 600 13px/1 var(--text); letter-spacing: .12em; text-transform: uppercase; }
    .ed-nav a { text-decoration: none; padding: 10px 0; }
    .ed-nav a[aria-current] { border-bottom: 2px solid var(--lime); }
    .ed-wrap { max-width: 1200px; margin: 0 auto; padding: 0 20px 240px; }
    .ed-kicker { margin: 40px 0 0; font: 600 13px/1.4 var(--text); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
    .ed-title { font: 400 clamp(76px, 18vw, 168px)/0.9 var(--display); font-variation-settings: "opsz" 144; letter-spacing: -0.04em; margin: 8px 0 24px; }
    .ed-title i { font-style: normal; color: var(--lime-dot); }
    .ed-essay { font-size: 21px; line-height: 1.55; max-width: 34em; }
    .ed-essay::first-letter { float: left; font: 500 84px/0.8 var(--display); margin: 8px 10px 0 0; color: var(--lime); }
    .ed-tip { border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); margin: 28px 0; padding: 18px 0; font: italic 400 24px/1.35 var(--display); max-width: 30em; }
    .ed-tip b { display: block; font: 600 12px/1 var(--text); font-style: normal; letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); margin-bottom: 10px; }
    .ed-context { color: var(--ink-2); max-width: 34em; }
    .ed-h2 { font: 400 40px/1.1 var(--display); letter-spacing: -0.02em; margin: 64px 0 8px; }
    .ed-chapter { margin-top: 40px; }
    .ed-chapter-head { display: flex; gap: 14px; align-items: baseline; border-bottom: 2px solid var(--ink); padding-bottom: 8px; }
    .ed-num { font: italic 400 28px/1 var(--display); color: var(--lime); }
    .ed-chapter-head h3 { font: 600 26px/1.1 var(--display); margin: 0; }
    .ed-chapter-head p { margin: 0 0 0 auto; font-style: italic; color: var(--ink-2); font-size: 16px; text-align: right; }
    .ed-pair { display: grid; grid-template-columns: 1fr; gap: 4px 32px; padding: 20px 0; border-bottom: 1px solid var(--rule); }
    .ed-pair h4 { font: 500 30px/1.1 var(--display); margin: 0; letter-spacing: -0.01em; }
    .ed-pair h4 a { text-decoration: none; background-image: linear-gradient(var(--lime), var(--lime)); background-size: 100% 2px; background-repeat: no-repeat; background-position: 0 100%; }
    .ed-pair .note { margin: 6px 0 0; max-width: 34em; }
    .ed-pair .more { margin: 10px 0 0; max-width: 34em; color: var(--ink-2); font-size: 17px; }
    .ed-blend { font-style: italic; color: var(--ink-2); font-size: 16px; margin: 2px 0 0; }
    .ed-margin { font: italic 400 15px/1.4 var(--text); color: var(--ink-2); }
    .ed-margin b { font: 600 11px/1 var(--text); font-style: normal; letter-spacing: .14em; text-transform: uppercase; display: block; margin-bottom: 4px; }
    .ed-actions { display: flex; gap: 20px; margin-top: 10px; flex-wrap: wrap; }
    .ed-link { background: none; border: 0; padding: 10px 0; min-height: 44px; cursor: pointer; font: 600 14px/1 var(--text); letter-spacing: .08em; text-transform: uppercase; color: var(--lime); text-decoration: underline; text-underline-offset: 4px; }
    .ed-link[aria-pressed="true"] { color: var(--ink-2); text-decoration: none; }
    :focus-visible { outline: 3px solid var(--lime); outline-offset: 3px; border-radius: 2px; }

    /* Combination: index card. Bottom sheet on phone, margin card on desktop. */
    .ed-card { position: fixed; left: 0; right: 0; bottom: 0; background: var(--paper-2); border-top: 2px solid var(--ink); padding: 14px 20px 18px; }
    .ed-card h2 { font: italic 500 20px/1 var(--display); margin: 0 0 10px; display: flex; justify-content: space-between; }
    .ed-card h2 span { font: 600 12px/1 var(--text); font-style: normal; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); }
    .ed-card ol { list-style: none; margin: 0 0 12px; padding: 0; display: flex; flex-wrap: wrap; gap: 4px 18px; }
    .ed-card li { display: flex; align-items: center; gap: 6px; font-size: 17px; }
    .ed-card li small { font-style: italic; color: var(--ink-2); font-size: 14px; }
    .ed-x { background: none; border: 0; min-width: 44px; min-height: 44px; cursor: pointer; font-size: 18px; color: var(--ink-2); margin-left: -10px; }
    .ed-cta { display: block; width: 100%; min-height: 48px; border: 0; background: var(--ink); color: var(--paper); font: italic 500 19px/1 var(--display); cursor: pointer; }
    .ed-notice { font-style: italic; font-size: 15px; color: var(--ink-2); margin: 0 0 10px; }

    @media (min-width: 900px) {
      .ed-wrap { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 64px; }
      .ed-pair { grid-template-columns: minmax(0, 1fr) 180px; }
      .ed-margin { grid-column: 2; grid-row: 1 / span 4; padding-top: 10px; border-left: 1px solid var(--rule); padding-left: 16px; }
      .ed-card { position: sticky; top: 24px; align-self: start; margin-top: 48px; border: 1px solid var(--rule); border-top: 6px solid var(--lime-dot); box-shadow: 0 1px 0 var(--rule), 0 12px 30px -18px rgba(0,0,0,.4); }
      .ed-card ol { flex-direction: column; border-top: 1px solid var(--rule); }
      .ed-card li { border-bottom: 1px dotted var(--rule); justify-content: space-between; }
      .ed-x { margin: 0; }
    }
  `,
  render(S, st) {
    const ing = S.ingredient;
    const roman = ["I", "II", "III", "IV"];
    const inCombo = (id) => st.combination.includes(id);
    const chapters = S.reasons
      .map((r, i) => {
        const ps = S.pairings.filter((p) => p.reason === r.id);
        return `<section class="ed-chapter" aria-labelledby="ch-${r.id}">
          <div class="ed-chapter-head"><span class="ed-num" aria-hidden="true">${roman[i]}.</span><h3 id="ch-${r.id}">${r.label}</h3><p>${r.blurb}</p></div>
          ${ps.map((p) => {
            const open = st.expanded.has(p.with.id);
            return `<article class="ed-pair">
              <h4><a href="#${p.with.id}">${p.with.name}</a></h4>
              ${p.with.blend ? `<p class="ed-blend">A Blend that ${p.with.blend}.</p>` : ""}
              <p class="note">${p.note}</p>
              ${open ? `<p class="more" id="more-${p.with.id}">${p.more}</p>` : ""}
              <div class="ed-actions">
                <button class="ed-link" data-act="expand" data-id="${p.with.id}" data-focus-key="x-${p.with.id}" aria-expanded="${open}" aria-controls="more-${p.with.id}">${open ? "Less" : "Read more"}</button>
                <button class="ed-link" data-act="${inCombo(p.with.id) ? "remove" : "add"}" data-id="${p.with.id}" data-focus-key="a-${p.with.id}" aria-pressed="${inCombo(p.with.id)}">${inCombo(p.with.id) ? "In your Combination" : "Add to Combination"}</button>
              </div>
              <p class="ed-margin"><b>Common in</b>${p.cuisines.join(" and ")} cooking</p>
            </article>`;
          }).join("")}
        </section>`;
      })
      .join("");
    const card = `<aside class="ed-card" aria-label="Your Combination">
      <h2>Your Combination <span>${st.combination.length} of 4</span></h2>
      ${st.notice && st.notice.includes("up to four") ? `<p class="ed-notice">${st.notice}</p>` : ""}
      <ol>${st.combination.map((id) => `<li>${S.names[id]} ${st.pantry.has(id) ? "<small>in your Pantry</small>" : ""}<button class="ed-x" data-act="remove" data-id="${id}" aria-label="Remove ${S.names[id]}">×</button></li>`).join("")}</ol>
      <button class="ed-cta">See what to make</button>
    </aside>`;
    return `<header class="ed-mast"><span class="ed-logo">MySous</span><nav class="ed-nav" aria-label="Main"><a href="#" aria-current="page">Explore</a><a href="#">Pantry</a></nav></header>
      <div class="ed-wrap">
        <main>
          <p class="ed-kicker">${ing.category} · Common in ${ing.cuisines.join(" and ")} cooking</p>
          <h1 class="ed-title">${ing.name}<i aria-hidden="true">.</i></h1>
          <p class="ed-essay">${ing.essay}</p>
          <p class="ed-tip"><b>A tip</b>${ing.tip}</p>
          <p class="ed-context">${ing.context}</p>
          <h2 class="ed-h2">What goes with lime, and why</h2>
          ${chapters}
        </main>
        ${card}
      </div>`;
  },
});
