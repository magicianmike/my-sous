import { Button } from "./Button";
import { Chip } from "./Chip";
import { IngredientMark, type IngredientColour } from "./IngredientMark";
import { Panel } from "./Panel";
import styles from "./TrayView.module.css";

export type TrayIngredient = { id: string; name: string; colour: IngredientColour; drawing: string };

type Props = {
  ingredients: TrayIngredient[];
  limit: number;
  /** Ids from a link that aren't in MySous. */
  unknown?: string[];
  /** Ingredients past the limit. */
  overLimit?: TrayIngredient[];
  /** The latest change, announced to assistive technology. */
  status?: string;
  onRemove: (ingredient: TrayIngredient) => void;
  /** "See what to make", as a link the container provides. */
  action?: React.ReactNode;
  titleRef?: React.Ref<HTMLHeadingElement>;
};

/** The Combination tray, from props alone. */
export function TrayView({ ingredients, limit, unknown = [], overLimit = [], status = "", onRemove, action, titleRef }: Props) {
  return (
    <Panel
      as="aside"
      className={styles.tray}
      title="Your Combination"
      titleId="tray-heading"
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
                  {ingredient.name}
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
