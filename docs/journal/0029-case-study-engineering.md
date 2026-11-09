# 0029 · The Case Study, with equal weight on engineering

The author asked for the Case Study to weigh engineering as much as product and design. It goes from 11 chapters to 10: four on product and design, four on engineering, with the summary first and what was rejected, and what's next, last.

## Decisions

The author chose each of these from options.

- **The outline.**
  - Product and design: One basket ("One room" and the product half of "State you can link to"), Defaults that explain themselves ("Defaults, not forms" and "Interaction design"), Honest about culture, and Look and feel ("Visual direction" and the design half of "Accessible by construction").
  - Engineering: The tech stack, The Kitchen ("Architecture", with URL state and content validation), Testing approach, and Building with Claude.
  - "What I rejected" and "What's next" became one chapter.
- **How "Building with Claude" frames the work:** the author directs and Claude builds, through a fixed loop of skills, with examples from the journal.
- **A prominent way to the code.** An outlined "View the code on GitHub" button sits beside the title, which stays at the top while reading, so a reader scanning the page finds it at once.
- **Links to the code.** Every ADR reference links to it on GitHub, and the summary links the repo, the journal and the tickets, so a reader can check the code. Links off the site open in a new tab, with an icon after the words and "(opens in a new tab)" for screen readers.

Defaults, not asked:

- Every live dish card, diagram and screenshot is kept. None was recaptured.
- The summary splits its decisions into product and design, and engineering.
- The side panel for the basket on wide screens joins what was rejected.
- Links off the site keep a fine underline in a list item too, so they're never told apart by colour alone. "ADR 0002" never breaks across lines.

## Fact-check

An agent checked every new or changed claim against the repo, the journal and the research notes, and verified about 45. It found three wrong:

- axe, not a reflow test, caught the tile under the docked bar;
- a launch Cuisine short of a part fails the tests, not the build;
- the CI-only test failed twice, not once.

It also found overclaims: "reproduced" for a run that didn't fail; that every test is seen failing, when one passed at once; that research agents "could" cite only fetched pages, which nothing enforces; that every raw length fails the stylesheet test, when only px and rem do; that Zod parses every content file, when the drawings are SVG. Five sentences broke the voice guide's one idea per sentence. All were fixed.

## Tests

- **Playwright:**
  - the chapter tests follow the new chapters;
  - links off the site, the ADRs among them, open in a new tab, say so, and carry the icon. Seen failing first;
  - the button to the code sits beside the title on the first screen, and stays in view while reading. Seen failing first.
- The touch-target check on a phone now exempts a link in a list item that's a sentence around it, as it did a link in a paragraph (WCAG 2.5.8). A list item that's only a link is still held to the full size.
- Totals: Vitest 217 passed. Playwright 565 passed, on phone and desktop.

## VoiceOver pass

**Status: to do.** Check the chapter list, each new chapter's headings, and that a link to GitHub says it opens in a new tab.

## Waiting for the author

- The new chapters' copy.

## Also in this change

- **The README, aligned with the Case Study,** briefer and more technical, as the author asked: what MySous is, links to the live site, the Case Study and the spec, then the stack, architecture with a repo map, commands, testing, the content format, and how it's built. Its old opening, which promised cooking science and help when things go wrong (Rescue, out of scope), is gone.
