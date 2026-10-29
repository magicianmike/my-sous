// PROTOTYPE (issue #4, round 2): the shared drawing set for the Botanical
// refinements. Same drawings as round 1's variant B, plus a colour per
// Ingredient (wash + stroke, light and dark) for the variants that test
// Ingredient-derived colour.
(function () {
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
  // [wash light, wash dark, stroke light, stroke dark]
  const HUE = {
    lime: ["#dcebc4", "#26361a", "#2f5714", "#c3e39a"],
    "pork-shoulder": ["#f6d9d3", "#3d2422", "#7a2f25", "#f2b8ad"],
    avocado: ["#dfe5c3", "#2d3320", "#4a5719", "#d1dd9e"],
    "chicken-thigh": ["#f6e2c2", "#3b2d18", "#7a4b10", "#f1c98a"],
    cilantro: ["#d3ebd5", "#1d3524", "#1f5a2f", "#a7dcb2"],
    ginger: ["#f1e3c9", "#362c1c", "#6e4d1a", "#e8cc95"],
    cucumber: ["#d6ead9", "#1f3426", "#275a35", "#b0dcb9"],
    radish: ["#f7d6e1", "#3c2130", "#8a2350", "#f3b3cc"],
    "chaat-masala": ["#f5ddb9", "#3a2a14", "#7d4a0c", "#efc581"],
    "dried-chile": ["#f7cfc8", "#3f1f1b", "#8e2416", "#f5ab9f"],
  };
  // pathLength="1" lets a variant draw the line on with stroke-dashoffset.
  window.botArt = (id, cls = "") =>
    `<svg class="${cls}" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${(ART[id] || "").replace(/<(path|circle) /g, '<$1 pathLength="1" ')}</svg>`;
  // Inline custom properties so a variant can style --wash / --stroke per Ingredient.
  window.botHue = (id) => {
    const h = HUE[id] || HUE.lime;
    return `--wash-l:${h[0]};--wash-d:${h[1]};--stroke-l:${h[2]};--stroke-d:${h[3]}`;
  };
})();
