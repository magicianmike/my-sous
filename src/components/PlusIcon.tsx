/** A plus, for adding; it turns a quarter while the pointer is on its button. Decorative: words always go with it. */
export function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`plus-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
