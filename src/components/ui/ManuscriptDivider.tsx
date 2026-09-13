/** The site's one signature visual mark: a hand-drawn ink-line divider used instead of a plain <hr>. */
export default function ManuscriptDivider() {
  return (
    <div className="manuscript-divider in-view" role="presentation" aria-hidden="true">
      <svg viewBox="0 0 168 20" fill="none">
        <path d="M2 10 C 30 -2, 46 22, 74 10 S 118 -2, 140 10 S 160 18, 166 8" />
      </svg>
    </div>
  );
}
