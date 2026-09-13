interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
}

/** Literary, on-brand placeholder for empty lists — never "No results found". */
export default function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <svg
        className="empty-state-mark"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 30 C 12 12, 20 12, 20 20 C 20 28, 28 28, 34 10"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
      <p>{message}</p>
      {action}
    </div>
  );
}
