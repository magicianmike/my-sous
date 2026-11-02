import { IngredientMark, type IngredientLook } from "./IngredientMark";
import styles from "./TrayBar.module.css";
import { useArrivalClass } from "./arrivals";

type Props = {
  ingredients: IngredientLook[];
  limit: number;
  /** Opens the full tray. */
  onOpen: () => void;
  openerRef?: React.Ref<HTMLButtonElement>;
  /** "See what to make", as a link the container provides. */
  action?: React.ReactNode;
};

/** The Combination at a glance, docked to the foot of a phone screen; it opens the full tray. */
export function TrayBar({ ingredients, limit, onOpen, openerRef, action }: Props) {
  const names = ingredients.map(({ name }) => name).join(", ");
  const arrivalClass = useArrivalClass(ingredients.map(({ id }) => id));
  return (
    <div className={styles.bar}>
      {ingredients.length > 0 && action}
      <button
        ref={openerRef}
        type="button"
        className={styles.opener}
        aria-haspopup="dialog"
        // Starts with the visible text, so voice control can say what it sees; then the names.
        aria-label={`Your Combination ${ingredients.length} of ${limit}${names && `: ${names}`}`}
        onClick={onOpen}
      >
        <span className={styles.title}>Your Combination</span>{" "}
        <span className={styles.count}>
          {ingredients.length} of {limit}
        </span>
        <span className={styles.marks}>
          {ingredients.map((ingredient) => (
            <span key={ingredient.id} className={arrivalClass(ingredient.id)}>
              <IngredientMark ingredient={ingredient} size="sm" />
            </span>
          ))}
          {/* The slots still free, as empty circles; the button's name already gives the count. */}
          {Array.from({ length: Math.max(limit - ingredients.length, 0) }, (_, slot) => (
            <span key={slot} className={styles.slot} />
          ))}
        </span>
      </button>
    </div>
  );
}
