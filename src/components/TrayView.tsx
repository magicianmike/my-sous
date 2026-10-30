import { Button } from "./Button";
import { Chip } from "./Chip";
import { IngredientMark, type IngredientLook } from "./IngredientMark";
import { Panel } from "./Panel";
import styles from "./TrayView.module.css";

type Props<T extends IngredientLook> = {
  ingredients: T[];
  /** The heading's id; unique per page, since it names the tray. */
  titleId: string;
  limit: number;
  /** Ids from a link that aren't in MySous. */
  unknown?: string[];
  /** Ingredients past the limit. */
  overLimit?: T[];
  /** The latest change, announced to assistive technology. */
  status?: string;
  onRemove: (ingredient: T) => void;
  /** Each Ingredient's name, as a link to its page the container provides. */
  renderName?: (ingredient: T) => React.ReactNode;
  /** "See what to make", as a link the container provides. */
  action?: React.ReactNode;
  titleRef?: React.Ref<HTMLHeadingElement>;
};

/** The Combination tray, from props alone. */
export function TrayView<T extends IngredientLook>({
  ingredients,
  titleId,
  limit,
  unknown = [],
  overLimit = [],
  status = "",
  onRemove,
  renderName = ({ name }) => name,
  action,
  titleRef,
}: Props<T>) {
  return (
    <Panel
      as="aside"
      className={styles.tray}
      title="Your Combination"
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
          A Combination holds up to {limit} Ingredients, so these are left out:{" "}
          {overLimit.map(({ name }) => name).join(", ")}.
        </p>
      )}
      {ingredients.length === 0 ? (
        <p className={styles.empty}>Add an Ingredient to start a Combination.</p>
      ) : (
        <>
          <ul className={styles.items}>
            {ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <Chip
                  colour={ingredient.colour}
                  leading={<IngredientMark ingredient={ingredient} size="sm" />}
                  trailing={
                    <Button variant="quiet" onClick={() => onRemove(ingredient)}>
                      Remove<span className="visually-hidden"> {ingredient.name}</span>
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
      <p role="status" className={styles.notice}>
        {status}
      </p>
    </Panel>
  );
}
