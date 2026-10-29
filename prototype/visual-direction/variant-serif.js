// PROTOTYPE (issue #4, round 3), R3b: Soft serif.
// B1 Garden colour with one change, the type: headings in Fraunces at its
// softest (SOFT 100, no wonk), body stays Nunito. Tests whether a little of
// round 1's editorial warmth belongs in the botanical direction.
(function () {
  const base = window.VARIANTS.find((v) => v.key === "garden");
  window.VARIANTS.push({
    ...base,
    key: "serif",
    name: "Soft serif",
    fonts: base.fonts.replace("&display", "&family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..800,0..100,0..1&display"),
    css:
      base.css +
      `
      :root { --display: "Fraunces", Georgia, serif; }
      .ga-hero h1, .ga-h2, .ga-row h3, .ga-tray h2, .ga-logo, .ga-tip b {
        font-family: var(--display); font-variation-settings: "SOFT" 100, "WONK" 0; letter-spacing: -0.01em; }
      .ga-hero h1 { font-weight: 600; font-size: 54px; font-variation-settings: "SOFT" 100, "WONK" 0, "opsz" 144; }
      .ga-h2 { font-weight: 600; font-size: 28px; }
      .ga-row h3 { font-weight: 600; font-size: 21px; }
      .ga-tray h2 { font-weight: 600; font-size: 18px; }
      .ga-logo { font-weight: 700; font-style: italic; }
      .ga-blurb { font-family: var(--display); font-variation-settings: "SOFT" 100; }
      @media (min-width: 900px) { .ga-hero h1 { font-size: 64px; } }
    `,
  });
})();
