"use client";

import { useState } from "react";

export default function HeroCallout() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <button
      type="button"
      className={`hero__callout${isExpanded ? " is-expanded" : ""}`}
      aria-expanded={isExpanded}
      aria-label={
        isExpanded
          ? "Collapse transmission callout"
          : "Expand transmission callout"
      }
      onClick={() => setIsExpanded((value) => !value)}
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
