/** A market basket, the sign for the Cook's basket. Decorative: words always go with it. */
export function BasketIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10h18l-1.8 8.4A2 2 0 0 1 17.2 20H6.8a2 2 0 0 1-2-1.6zM8 10l3-6M16 10l-3-6M9 13.5v3M12 13.5v3M15 13.5v3" />
    </svg>
  );
}
