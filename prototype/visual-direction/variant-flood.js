// PROTOTYPE (issue #4, round 3), R3a: Ingredient flood.
// B1 Garden colour where the Ingredient owns the page: its wash fills a
// full-width header band, the drawing sits large beside the name, and the
// page drops to two columns (Pairings + tray) below the band.
(function () {
  const base = window.VARIANTS.find((v) => v.key === "garden");
  window.VARIANTS.push({
    ...base,
    key: "flood",
    name: "Ingredient flood",
    css:
      base.css +
      `
      .ga-layout { padding-top: 0; }
      .ga-hero { text-align: left; background: var(--wash); box-shadow: 0 0 0 100vmax var(--wash); clip-path: inset(0 -100vmax);
        display: grid; grid-template-columns: minmax(0, 1fr) auto; grid-template-areas: "name plate" "cat plate" "chips chips" "about about";
        column-gap: 16px; padding: 18px 0 22px; }
      .ga-hero h1 { grid-area: name; align-self: end; margin: 0; font-size: 52px; }
      .ga-cat { grid-area: cat; align-self: start; color: var(--ink); }
      .ga-chips { grid-area: chips; justify-content: flex-start; }
      .ga-chips li { background: var(--surface); }
      .ga-plate { grid-area: plate; width: 112px; height: 112px; background: var(--surface); }
      .ga-plate svg { width: 80px; height: 80px; }
      .ga-about { grid-area: about; }
      .ga-top { background: var(--bg); }
      @media (min-width: 900px) {
        .ga-layout { grid-template-columns: minmax(0, 1fr) 300px; column-gap: 40px; }
        .ga-hero { grid-column: 1 / -1; position: static; grid-template-columns: minmax(0, 1fr) 300px;
          grid-template-areas: "name plate" "cat plate" "chips plate" "about plate"; padding: 36px 0 40px; column-gap: 40px; }
        .ga-hero h1 { font-size: 96px; letter-spacing: -0.03em; }
        .ga-about { max-width: 46em; columns: 2; column-gap: 28px; margin-top: 22px; }
        .ga-about p { break-inside: avoid; }
        .ga-plate { width: 280px; height: 280px; align-self: center; justify-self: end; }
        .ga-plate svg { width: 200px; height: 200px; }
        .ga-tray { grid-column: 2; grid-row: 2; }
        main { grid-column: 1; grid-row: 2; }
      }
    `,
  });
})();
