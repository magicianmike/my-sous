import styles from "./ListRow.module.css";

type Props = {
  /** Something to lead the row, such as an IngredientMark. */
  mark?: React.ReactNode;
  /** The row's title, usually a link. */
  title: React.ReactNode;
  /** An action at the end of the title line, such as Add. */
  action?: React.ReactNode;
  children?: React.ReactNode;
};

/** One item in a list of things the Cook can open or act on, such as a Pairing. */
export function ListRow({ mark, title, action, children }: Props) {
  return (
    <div className={`${styles.row} ${mark ? styles.withMark : ""}`}>
      {mark && <div className={styles.mark}>{mark}</div>}
      <div className={styles.title}>{title}</div>
      {action && <div className={styles.action}>{action}</div>}
      {children && <div className={styles.body}>{children}</div>}
    </div>
  );
}
