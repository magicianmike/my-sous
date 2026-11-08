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

/** Add to the basket, shown as a basket and a plus, with its words in its name and, under the pointer, a tooltip. */
export function AddToBasketButton({ name, added = false, ...props }: Props) {
  return (
    <Tooltip label={added ? null : `Add ${name} to your basket`}>
      <Button variant={added ? "secondary" : "primary"} {...props}>
        {added ? (
          <>
            Remove<span className="visually-hidden"> {name} from your basket</span>
          </>
        ) : (
          <>
            <BasketIcon className="button-icon" />
            <PlusIcon className="button-icon" />
            <span className="visually-hidden">Add {name} to your basket</span>
          </>
        )}
      </Button>
    </Tooltip>
  );
}
