import { EmptyMark } from "./EmptyMark";
import { IngredientMark, type IngredientLook } from "./IngredientMark";
import styles from "./TrayBar.module.css";
import { useArrivalClass } from "./arrivals";

type Props<T extends IngredientLook> = {
  ingredients: T[];
  limit: number;
  /** Opens the full tray. */
  onOpen: () => void;
  openerRef?: React.Ref<HTMLButtonElement>;
  /** "See what to make", as a link the container provides. */
  action?: React.ReactNode;
  /** Each Ingredient's drawing, as a link to its page the container provides. */
  renderMark?: (ingredient: T) => React.ReactNode;
};

/** The Combination at a glance, docked to the foot of a phone screen; it opens the full tray. */
export function TrayBar<T extends IngredientLook>({
  ingredients,
  limit,
  onOpen,
  openerRef,
  action,
  renderMark = (ingredient) => <IngredientMark ingredient={ingredient} size="sm" />,
}: Props<T>) {
  const names = ingredients.map(({ name }) => name).join(", ");
  const arrivalClass = useArrivalClass(ingredients.map(({ id }) => id));
  return (
    <div className={styles.bar}>
      {ingredients.length > 0 && action}
      {/* Until the first Ingredient is in, there's nothing to glance at, so no empty circles either.
          Outside the button, so each drawing can open its Ingredient. */}
      {ingredients.length > 0 && (
        <span className={styles.marks}>
          {ingredients.map((ingredient) => (
            <span key={ingredient.id} className={arrivalClass(ingredient.id)}>
              {renderMark(ingredient)}
            </span>
          ))}
          {/* The places still free, as empty circles; the button's name already gives the count. */}
          {Array.from({ length: Math.max(limit - ingredients.length, 0) }, (_, place) => (
            <EmptyMark key={place} />
          ))}
        </span>
      )}
      <button
        ref={openerRef}
        type="button"
        className={styles.opener}
        aria-haspopup="dialog"
        // Starts with the visible text, so voice control can say what it sees; then the names.
        aria-label={`Your basket ${ingredients.length} of ${limit}${names && `: ${names}`}`}
        onClick={onOpen}
      >
        <span className={styles.title}>Your basket</span>{" "}
        <span className={styles.count}>
          {ingredients.length} of {limit}
        </span>
      </button>
    </div>
  );
}
