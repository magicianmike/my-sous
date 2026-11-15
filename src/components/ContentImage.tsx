import { IMAGE_FORMATS, variantName, variantWidths } from "@/images/variants";
import type { Image } from "@/kitchen/kitchen";
import styles from "./ContentImage.module.css";
import { SparkleIcon } from "./SparkleIcon";
import { Tooltip } from "./Tooltip";

type Props = {
  image: Image;
  /** How wide it shows, as an `<img sizes>`, so the browser fetches the smallest file that's sharp. */
  sizes: string;
  /** On the first screen: fetched straight away rather than when it scrolls near. */
  priority?: boolean;
  /** Hidden from screen readers, for an image that only repeats what's beside it, such as a card's heading. */
  decorative?: boolean;
  /** Words before the note, such as what the dish is made with. */
  caption?: string;
  /** The note on the image's top corner, for a banner, rather than below it. */
  noteOnImage?: boolean;
  className?: string;
};

/** A banner across the page's column: an Ingredient's, or a dish's header. */
export const BANNER_SIZES = "(min-width: 50rem) 50rem, 100vw";

/**
 * Says what an image is: made by AI, as a sparkle, named for a screen reader and in a tooltip under the pointer;
 * or standing in until one is, in words.
 */
function Note({ made }: { made: Image["made"] }) {
  if (made === "placeholder") return <span className={styles.note}>Placeholder image</span>;
  return (
    <Tooltip label="AI-generated image">
      <span className={styles.sparkle}>
        <SparkleIcon />
        <span className="visually-hidden">AI-generated image</span>
      </span>
    </Tooltip>
  );
}

/**
 * One of content's images, in modern formats at the widths the build made. Its width and height are
 * given, so its space is kept before it arrives and nothing moves.
 */
export function ContentImage({
  image,
  sizes,
  priority = false,
  decorative = false,
  caption,
  noteOnImage = false,
  className = "",
}: Props) {
  const widths = variantWidths(image.width);
  const srcSet = (format: (typeof IMAGE_FORMATS)[number]) =>
    widths.map((width) => `/images/${variantName(image.file, width, format)} ${width}w`).join(", ");
  // For a browser that takes neither format's srcset: a middling WebP.
  const fallback = widths.find((width) => width >= 800) ?? widths.at(-1)!;
  return (
    <figure className={`${styles.figure} ${className}`}>
      <picture>
        {IMAGE_FORMATS.map((format) => (
          <source key={format} type={`image/${format}`} srcSet={srcSet(format)} sizes={sizes} />
        ))}
        <img
          className={styles.image}
          src={`/images/${variantName(image.file, fallback, "webp")}`}
          width={image.width}
          height={image.height}
          alt={decorative ? "" : image.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
        />
      </picture>
      <figcaption className={`${styles.caption} ${noteOnImage ? styles.onImage : ""}`}>
        {caption && <span>{caption} </span>}
        <Note made={image.made} />
      </figcaption>
    </figure>
  );
}
