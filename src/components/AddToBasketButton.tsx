import { BasketIcon } from "./BasketIcon";
import { Button } from "./Button";
import { PlusIcon } from "./PlusIcon";
import { Tooltip } from "./Tooltip";

type Props = Omit<React.ComponentProps<typeof Button>, "children" | "variant"> & {
  /** What's added, for the button's name and tooltip: "Add Garlic to your basket". */
  name: string;
  /** Once it's in the basket, the same button says Remove, so keyboard focus stays on it after a press. */
  added?: boolean;
};

/** What adding or removing an Ingredient is called, for a button's name: "Add Garlic to your basket". */
export function basketWords(name: string, added: boolean): string {
  return added ? `Remove ${name} from your basket` : `Add ${name} to your basket`;
}

/** Add to the basket, shown as a basket and a plus, with its words in its name and, under the pointer, a tooltip. */
export function AddToBasketButton({ name, added = false, ...props }: Props) {
  return (
    <Tooltip label={added ? null : basketWords(name, false)}>
      <Button variant={added ? "secondary" : "primary"} {...props}>
        {added ? (
          <>
            Remove<span className="visually-hidden"> {name} from your basket</span>
          </>
        ) : (
          <>
            <BasketIcon className="button-icon" />
            <PlusIcon className="button-icon" />
            <span className="visually-hidden">{basketWords(name, false)}</span>
          </>
        )}
      </Button>
    </Tooltip>
  );
}
