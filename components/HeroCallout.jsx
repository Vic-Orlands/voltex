"use client";

export default function HeroCallout({ isOpen, onClose, position }) {
  return (
    <button
      id="hero-callout"
      type="button"
      className={`hero__callout${isOpen ? " is-open is-expanded" : ""}`}
      aria-expanded={isOpen}
      aria-hidden={!isOpen}
      aria-label="Close transmission callout"
      tabIndex={isOpen ? 0 : -1}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={onClose}
    >
      <span className="hero__callout-shell">
        <span className="hero__callout-head">
          <span className="hero__callout-kicker">Bulk transmission</span>
          <span className="hero__callout-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m20 17-5-5 5-5" />
              <path d="m4 17 5-5-5-5" />
            </svg>
          </span>
        </span>

        <span className="hero__callout-body">
          <strong className="hero__callout-value">440kV</strong>
          <small className="hero__callout-copy">
            step-up, move, step-down, distribute, monitor
          </small>
        </span>
      </span>
    </button>
  );
}
