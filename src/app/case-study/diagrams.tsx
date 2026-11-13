import { useId } from "react";

/** One drawing of a diagram, at a width in viewBox units. */
type Layout = { width: number; height: number; children: React.ReactNode };

/**
 * A diagram: an image named by its title and described in words, so it works without being seen.
 * It's drawn twice, wide and stacked; the column's width picks one (`.diagram` in globals.css), and
 * the other is display: none, so a screen reader meets only one. Shapes draw in the theme's ink,
 * lines and surfaces, so dark mode needs nothing of its own.
 */
function Diagram({ title, description, wide, stacked }: {
  title: string;
  description: string;
  wide: Layout;
  stacked: Layout;
}) {
  return (
    <figure className="diagram">
      <Drawing className="diagram-wide" title={title} description={description} layout={wide} />
      <Drawing className="diagram-stacked" title={title} description={description} layout={stacked} />
      <figcaption>{title}</figcaption>
    </figure>
  );
}

function Drawing({ className, title, description, layout: { width, height, children } }: {
  className: string;
  title: string;
  description: string;
  layout: Layout;
}) {
  const id = useId();
  return (
    <svg
      role="img"
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{description}</desc>
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 10 5 0 10z" className="diagram-arrowhead" />
        </marker>
      </defs>
      <g style={{ "--arrow": `url(#${id}-arrow)` } as React.CSSProperties}>{children}</g>
    </svg>
  );
}

/** A labelled box, with its lines of text centred in it: a label, then notes. */
function Box({ x, y, width, height, lines, emphasis = false }: {
  x: number;
  y: number;
  width: number;
  height: number;
  lines: string[];
  /** The step the diagram is about, drawn heavier. */
  emphasis?: boolean;
}) {
  const lineHeight = 20;
  const top = y + height / 2 - ((lines.length - 1) * lineHeight) / 2;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="10" className={emphasis ? "diagram-box emphasis" : "diagram-box"} />
      {lines.map((line, i) => (
        <text key={i} x={x + width / 2} y={top + i * lineHeight} className={i === 0 ? "diagram-label" : "diagram-note"}>
          {line}
        </text>
      ))}
    </g>
  );
}

function Arrow({ d }: { d: string }) {
  return <path d={d} className="diagram-arrow" />;
}

/** A note set apart from the boxes, one text line per entry. */
function Note({ x, y, lines, align = "middle" }: { x: number; y: number; lines: string[]; align?: "middle" | "start" }) {
  return (
    <>
      {lines.map((line, i) => (
        <text key={i} x={x} y={y + i * 20} className={align === "start" ? "diagram-note align-start" : "diagram-note"}>
          {line}
        </text>
      ))}
    </>
  );
}

export function ContentDiagram() {
  return (
    <Diagram
      title="From content files to the page"
      description="Content files, written in Markdown and YAML with an SVG drawing per Ingredient, go into loadKitchen at build time. loadKitchen checks every rule and collects every problem; if there is any, the build fails with all of them listed. Valid content goes to createKitchen, which builds the Kitchen. The same Kitchen code renders the static pages at build time and runs again in the browser for any basket."
      wide={{
        width: 640,
        height: 300,
        children: (
          <>
            <Box x={10} y={20} width={170} height={84} lines={["Content", "Markdown, YAML,", "one SVG per Ingredient"]} />
            <Box x={235} y={20} width={170} height={84} lines={["loadKitchen", "checks every rule,", "collects every error"]} emphasis />
            <Box x={460} y={20} width={170} height={84} lines={["Build fails", "listing every problem", "in one pass"]} />
            <Box x={235} y={170} width={170} height={84} lines={["createKitchen", "one deep module,", "pure and browser-safe"]} emphasis />
            <Box x={10} y={170} width={170} height={84} lines={["Static pages", "rendered at", "build time"]} />
            <Box x={460} y={170} width={170} height={84} lines={["The browser", "rebuilds the same", "Kitchen for any basket"]} />
            <Arrow d="M180 62H231" />
            <Arrow d="M405 62H456" />
            <Arrow d="M320 104V166" />
            <Arrow d="M235 212H184" />
            <Arrow d="M405 212H456" />
            <Note x={432} y={48} lines={["errors"]} />
            <Note x={344} y={140} lines={["valid"]} align="start" />
          </>
        ),
      }}
      stacked={{
        width: 340,
        height: 470,
        children: (
          <>
            <Box x={10} y={10} width={320} height={64} lines={["Content", "Markdown, YAML, one SVG per Ingredient"]} />
            <Box x={10} y={110} width={320} height={64} lines={["loadKitchen", "checks every rule, collects every error"]} emphasis />
            <Box x={10} y={240} width={155} height={84} lines={["createKitchen", "one deep module,", "pure and browser-safe"]} emphasis />
            <Box x={175} y={240} width={155} height={84} lines={["Build fails", "listing every", "problem in one pass"]} />
            <Box x={10} y={376} width={155} height={84} lines={["Static pages", "rendered at", "build time"]} />
            <Box x={175} y={376} width={155} height={84} lines={["The browser", "rebuilds the same", "Kitchen for any basket"]} />
            <Arrow d="M170 74V106" />
            <Arrow d="M88 174V236" />
            <Arrow d="M252 174V236" />
            <Arrow d="M88 324V372" />
            <Arrow d="M140 324V348H252V372" />
            <Note x={96} y={206} lines={["valid"]} align="start" />
            <Note x={260} y={206} lines={["errors"]} align="start" />
          </>
        ),
      }}
    />
  );
}

export function FillDiagram() {
  return (
    <Diagram
      title="How a dish's parts fill"
      description="A dish's parts fill in four steps. First from the basket, one Ingredient per part. Then from Pairings: each empty part takes the Ingredient that pairs with most of what's already in the dish. Then from the Recipe as written, for any part still empty. Then from Pairings again, since the Recipe's Ingredients can give other parts a Pairing. Every fill keeps the one-line reason it's there, and a part nothing justifies stays open and says so."
      wide={{
        width: 640,
        height: 200,
        children: (
          <>
            <Box x={10} y={20} width={140} height={100} lines={["1 · Basket", "what the Cook", "chose"]} emphasis />
            <Box x={170} y={20} width={140} height={100} lines={["2 · Pairings", "pairs with most", "of the dish"]} />
            <Box x={330} y={20} width={140} height={100} lines={["3 · Recipe", "as written, for", "what's still empty"]} />
            <Box x={490} y={20} width={140} height={100} lines={["4 · Pairings", "again, from the", "Recipe's fills"]} />
            <Arrow d="M150 70H166" />
            <Arrow d="M310 70H326" />
            <Arrow d="M470 70H486" />
            <Note x={320} y={160} lines={["Every fill says why it's there; a part nothing justifies stays open."]} />
          </>
        ),
      }}
      stacked={{
        width: 340,
        height: 370,
        children: (
          <>
            <Box x={10} y={10} width={320} height={60} lines={["1 · Basket", "what the Cook chose"]} emphasis />
            <Box x={10} y={90} width={320} height={60} lines={["2 · Pairings", "pairs with most of the dish"]} />
            <Box x={10} y={170} width={320} height={60} lines={["3 · Recipe", "as written, for what's still empty"]} />
            <Box x={10} y={250} width={320} height={60} lines={["4 · Pairings", "again, from the Recipe's fills"]} />
            <Arrow d="M170 70V86" />
            <Arrow d="M170 150V166" />
            <Arrow d="M170 230V246" />
            <Note x={170} y={335} lines={["Every fill says why it's there;", "a part nothing justifies stays open."]} />
          </>
        ),
      }}
    />
  );
}

export function UrlDiagram() {
  return (
    <Diagram
      title="State you can link to"
      description="The basket lives only in the address, as a with parameter listing Ingredient ids. Every screen reads it, and every link between screens carries it, so Back and Forward step through changes, a shared link reopens the same basket, and the Case Study links straight into any state. Nothing about the basket is stored in the browser; the one thing stored is the chosen theme."
      wide={{
        width: 640,
        height: 210,
        children: (
          <>
            <Box x={10} y={20} width={200} height={84} lines={["The address", "?with=chicken-thigh,", "garlic"]} emphasis />
            <Box x={250} y={20} width={170} height={84} lines={["Every screen", "reads the basket", "from it"]} />
            <Box x={460} y={20} width={170} height={84} lines={["Every link", "carries it to", "the next screen"]} />
            <Arrow d="M210 62H246" />
            <Arrow d="M420 62H456" />
            <Arrow d="M545 104V140H110V108" />
            <Note x={330} y={170} lines={["Back, Forward, a shared link and the Case Study all land on the same state."]} />
          </>
        ),
      }}
      stacked={{
        width: 340,
        height: 350,
        children: (
          <>
            <Box x={10} y={10} width={270} height={70} lines={["The address", "?with=chicken-thigh,garlic"]} emphasis />
            <Box x={10} y={110} width={270} height={70} lines={["Every screen", "reads the basket from it"]} />
            <Box x={10} y={210} width={270} height={70} lines={["Every link", "carries it to the next screen"]} />
            <Arrow d="M145 80V106" />
            <Arrow d="M145 180V206" />
            <Arrow d="M280 245H315V45H284" />
            <Note x={170} y={305} lines={["Back, Forward, a shared link and the", "Case Study all land on the same state."]} />
          </>
        ),
      }}
    />
  );
}

export function TestingDiagram() {
  return (
    <Diagram
      title="What runs on every change"
      description="Four layers of checks. Vitest tests the Kitchen through loadKitchen with small fixture content folders, and checks the real content: every rule, every Pairing's source, the voice guide's banned words, and every launch Cuisine's coverage. Every Storybook story runs as a component test in Chromium: it renders, its interactions by mouse and keyboard hold, and axe finds nothing. Playwright runs against the exact static export that ships: journeys by mouse and keyboard, axe in light and dark at phone and desktop widths, no sideways scrolling from 320 pixels to wide desktop and at 200 percent zoom, touch targets, focus rings and motion. VoiceOver checks the core journey by hand on an iPhone and a Mac."
      wide={{
        width: 640,
        height: 345,
        children: (
          <>
            <Box x={10} y={10} width={620} height={70} lines={["Vitest, through loadKitchen", "fixture content for each rule, and the real content: sources, voice, coverage"]} emphasis />
            <Box x={10} y={95} width={620} height={70} lines={["Storybook, every story a test", "each component on its own in Chromium: its interactions, and axe"]} />
            <Box x={10} y={180} width={620} height={70} lines={["Playwright, on the static export", "journeys, axe in both themes at two widths, reflow, touch targets, focus, motion"]} />
            <Box x={10} y={265} width={620} height={70} lines={["VoiceOver, by hand", "the core journey, on an iPhone and a Mac"]} />
          </>
        ),
      }}
      stacked={{
        width: 340,
        height: 445,
        children: (
          <>
            <Box x={10} y={10} width={320} height={110} lines={["Vitest, through loadKitchen", "fixture content for each rule,", "and the real content:", "sources, voice, coverage"]} emphasis />
            <Box x={10} y={130} width={320} height={90} lines={["Storybook, every story a test", "each component on its own", "in Chromium: interactions, axe"]} />
            <Box x={10} y={230} width={320} height={110} lines={["Playwright, on the static export", "journeys, axe in both themes", "at two widths, reflow,", "touch targets, focus, motion"]} />
            <Box x={10} y={350} width={320} height={85} lines={["VoiceOver, by hand", "the core journey,", "on an iPhone and a Mac"]} />
          </>
        ),
      }}
    />
  );
}
