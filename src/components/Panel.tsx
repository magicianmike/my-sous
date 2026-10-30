import styles from "./Panel.module.css";

type Props = {
  /** The landmark element: an aside for complementary content, a section otherwise. */
  as?: "aside" | "section";
  /** The panel's heading; it also names the landmark. */
  title: React.ReactNode;
  titleId: string;
  /** Extra content beside the title, such as a count. */
  titleExtra?: React.ReactNode;
  titleRef?: React.Ref<HTMLHeadingElement>;
  className?: string;
  children: React.ReactNode;
};

/** A titled surface that sits apart from the page, such as the Combination tray. */
export function Panel({ as: Tag = "section", title, titleId, titleExtra, titleRef, className = "", children }: Props) {
  return (
    <Tag className={`${styles.panel} ${className}`} aria-labelledby={titleId}>
      <h2 id={titleId} ref={titleRef} tabIndex={-1} className={styles.title}>
        {title}
        {titleExtra && <span className={styles.extra}> {titleExtra}</span>}
      </h2>
      {children}
    </Tag>
  );
}
