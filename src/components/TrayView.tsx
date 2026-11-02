import { Button } from "./Button";
import { Chip } from "./Chip";
import { IngredientMark, type IngredientLook } from "./IngredientMark";
import { Panel } from "./Panel";
import styles from "./TrayView.module.css";
import { useArrivalClass } from "./arrivals";

type Props<T extends IngredientLook> = {
  ingredients: T[];
  /** The heading's id; unique per page, since it names the tray. */
  titleId: string;
  limit: number;
  /** Ids from a link that aren't in MySous. */
  unknown?: string[];
  /** Ingredients past the limit. */
  overLimit?: T[];
  /** The latest change, announced to assistive technology but not shown. Leave out when the container announces. */
  status?: string;
  onRemove: (ingredient: T) => void;
  /** Each Ingredient's name, as a link to its page the container provides. */
  renderName?: (ingredient: T) => React.ReactNode;
  /** Each Ingredient's drawing, as a link to its page the container provides. */
  renderMark?: (ingredient: T) => React.ReactNode;
  /** "See what to make", as a link the container provides. */
  action?: React.ReactNode;
  titleRef?: React.Ref<HTMLHeadingElement>;
  /** Ingredients side by side, each as wide as its name, wrapping as needed, rather than one per line. */
  wrap?: boolean;
};

/** The Combination tray, from props alone. */
export function TrayView<T extends IngredientLook>({
  ingredients,
  titleId,
  limit,
  unknown = [],
  overLimit = [],
  status,
  onRemove,
  renderName = ({ name }) => name,
  renderMark = (ingredient) => <IngredientMark ingredient={ingredient} size="sm" />,
  action,
  titleRef,
  wrap = false,
}: Props<T>) {
  const arrivalClass = useArrivalClass(ingredients.map(({ id }) => id));
  return (
    <Panel
      as="aside"
      className={styles.tray}
      title="Your basket"
      titleId={titleId}
      titleExtra={`${ingredients.length} of ${limit}`}
      titleRef={titleRef}
    >
      {unknown.length > 0 && (
        <p className={styles.notice}>
          Some Ingredients in this link aren&rsquo;t in MySous yet, so they&rsquo;re left out: {unknown.join(", ")}.
        </p>
      )}
      {overLimit.length > 0 && (
        <p className={styles.notice}>
          A basket holds up to {limit} Ingredients, so these are left out:{" "}
          {overLimit.map(({ name }) => name).join(", ")}.
        </p>
      )}
      {ingredients.length === 0 ? (
        <p className={styles.empty}>Add an Ingredient to start a basket.</p>
      ) : (
        <>
          <ul className={`${styles.items} ${wrap ? styles.wrap : ""}`}>
            {ingredients.map((ingredient) => (
              <li key={ingredient.id} className={arrivalClass(ingredient.id)}>
                <Chip
                  colour={ingredient.colour}
                  leading={renderMark(ingredient)}
                  trailing={
                    <Button variant="quiet" className={styles.remove} onClick={() => onRemove(ingredient)}>
                      <TrashIcon />
                      <span className="visually-hidden">Remove {ingredient.name}</span>
                    </Button>
                  }
                >
                  {renderName(ingredient)}
                </Chip>
              </li>
            ))}
          </ul>
          {action}
        </>
      )}
      {status !== undefined && (
        <p role="status" className="visually-hidden">
          {status}
        </p>
      )}
    </Panel>
  );
}

/** A bin, for removing; the button around it carries the words. */
function TrashIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
    </svg>
  );
}
