import { useId } from "react";

/**
 * A diagram: an image named by its title and described in words, so it works without being seen.
 * Shapes draw in the theme's ink, lines and surfaces (`.diagram` in globals.css), so dark mode
 * needs nothing of its own.
 */
function Diagram({ title, description, height, children }: {
  title: string;
  description: string;
  /** In viewBox units; every diagram is 640 wide. */
  height: number;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    // On a narrow screen the frame scrolls sideways, so it takes focus and is named by its caption.
    <figure className="diagram" tabIndex={0} role="group" aria-labelledby={`${id}-caption`}>
      <svg role="img" viewBox={`0 0 640 ${height}`} aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`}>
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{description}</desc>
        <defs>
          <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 10 5 0 10z" className="diagram-arrowhead" />
          </marker>
        </defs>
        <g style={{ "--arrow": `url(#${id}-arrow)` } as React.CSSProperties}>{children}</g>
      </svg>
      <figcaption id={`${id}-caption`}>{title}</figcaption>
    </figure>
  );
}

/** A labelled box, with up to three lines of text centred in it. */
function Box({ x, y, width, height, lines, strong = false }: {
  x: number;
  y: number;
  width: number;
  height: number;
  lines: string[];
  strong?: boolean;
}) {
  const lineHeight = 20;
  const top = y + height / 2 - ((lines.length - 1) * lineHeight) / 2;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="10" className={strong ? "diagram-box strong" : "diagram-box"} />
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

export function ContentDiagram() {
  return (
    <Diagram
      title="From content files to the page"
      description="Content files, written in Markdown and YAML with an SVG drawing per Ingredient, go into loadKitchen at build time. loadKitchen checks every rule and collects every problem; if there is any, the build fails with all of them listed. Valid content goes to createKitchen, which builds the Kitchen. The same Kitchen code renders the static pages at build time and runs again in the browser for any basket."
      height={300}
    >
      <Box x={10} y={20} width={170} height={84} lines={["Content", "Markdown, YAML,", "one SVG per Ingredient"]} />
      <Box x={235} y={20} width={170} height={84} lines={["loadKitchen", "checks every rule,", "collects every error"]} strong />
      <Box x={460} y={20} width={170} height={84} lines={["Build fails", "listing every problem", "in one pass"]} />
      <Box x={235} y={170} width={170} height={84} lines={["createKitchen", "one deep module,", "pure and browser-safe"]} strong />
      <Box x={10} y={170} width={170} height={84} lines={["Static pages", "rendered at", "build time"]} />
      <Box x={460} y={170} width={170} height={84} lines={["The browser", "rebuilds the same", "Kitchen for any basket"]} />
      <Arrow d="M180 62H231" />
      <Arrow d="M405 62H456" />
      <Arrow d="M320 104V166" />
      <Arrow d="M235 212H184" />
      <Arrow d="M405 212H456" />
      <text x={432} y={48} className="diagram-note">errors</text>
      <text x={344} y={140} className="diagram-note start">valid</text>
    </Diagram>
  );
}

export function FillDiagram() {
  return (
    <Diagram
      title="How a dish's parts fill"
      description="A dish's parts fill in four steps. First from the basket, one Ingredient per part. Then from Pairings: each empty part takes the Ingredient that pairs with most of what's already in the dish. Then from the Recipe as written, for any part still empty. Then from Pairings again, since the Recipe's Ingredients can give other parts a Pairing. Every fill keeps the one-line reason it's there, and a part nothing justifies stays open and says so."
      height={200}
    >
      <Box x={10} y={20} width={140} height={100} lines={["1 · Basket", "what the Cook", "chose"]} strong />
      <Box x={170} y={20} width={140} height={100} lines={["2 · Pairings", "pairs with most", "of the dish"]} />
      <Box x={330} y={20} width={140} height={100} lines={["3 · Recipe", "as written, for", "what's still empty"]} />
      <Box x={490} y={20} width={140} height={100} lines={["4 · Pairings", "again, from the", "Recipe's fills"]} />
      <Arrow d="M150 70H166" />
      <Arrow d="M310 70H326" />
      <Arrow d="M470 70H486" />
      <text x={320} y={160} className="diagram-note">Every fill says why it's there; a part nothing justifies stays open.</text>
    </Diagram>
  );
}

export function UrlDiagram() {
  return (
    <Diagram
      title="State you can link to"
      description="The basket lives only in the address, as a with parameter listing Ingredient ids. Every screen reads it, and every link between screens carries it, so Back and Forward step through changes, a shared link reopens the same basket, and the Case Study links straight into any state. Nothing about the basket is stored in the browser; the one thing stored is the chosen theme."
      height={210}
    >
      <Box x={10} y={20} width={200} height={84} lines={["The address", "?with=chicken-thigh,", "garlic"]} strong />
      <Box x={250} y={20} width={170} height={84} lines={["Every screen", "reads the basket", "from it"]} />
      <Box x={460} y={20} width={170} height={84} lines={["Every link", "carries it to", "the next screen"]} />
      <Arrow d="M210 62H246" />
      <Arrow d="M420 62H456" />
      <Arrow d="M545 104V140H110V108" />
      <text x={330} y={170} className="diagram-note">Back, Forward, a shared link and the Case Study all land on the same state.</text>
    </Diagram>
  );
}

export function TestingDiagram() {
  return (
    <Diagram
      title="What runs on every change"
      description="Three layers of checks. Vitest tests the Kitchen through loadKitchen with small fixture content folders, and checks the real content: every rule, every Pairing's source, the voice guide's banned words, and every launch Cuisine's coverage. Playwright runs against the exact static export that ships: journeys by mouse and keyboard, axe in light and dark at phone and desktop widths, no sideways scrolling from 320 pixels to wide desktop and at 200 percent zoom, touch targets, focus rings and motion. VoiceOver checks the core journey by hand on an iPhone and a Mac."
      height={260}
    >
      <Box x={10} y={10} width={620} height={70} lines={["Vitest, through loadKitchen", "fixture content for each rule, and the real content: sources, voice, coverage"]} strong />
      <Box x={10} y={95} width={620} height={70} lines={["Playwright, on the static export", "journeys, axe in both themes at two widths, reflow, touch targets, focus, motion"]} />
      <Box x={10} y={180} width={620} height={70} lines={["VoiceOver, by hand", "the core journey, on an iPhone and a Mac"]} />
    </Diagram>
  );
}
