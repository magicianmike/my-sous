import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "quiet";

/** The class for a button's look, for links that act like buttons (such as "See what to make"). */
export function buttonClass(variant: ButtonVariant = "secondary"): string {
  // Secondary is the base look, with no class of its own.
  return [styles.button, styles[variant]].filter(Boolean).join(" ");
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  ref?: React.Ref<HTMLButtonElement>;
};

export function Button({ variant = "secondary", className = "", type = "button", ...props }: Props) {
  return <button type={type} className={`${buttonClass(variant)} ${className}`} {...props} />;
}
