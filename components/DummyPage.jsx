"use client";

export default function DummyPage({ onBack }) {
  return (
    <section className="dummy-page">
      <div className="dummy-page__chrome">
        <button
          className="dummy-page__back"
          type="button"
          onClick={onBack}
          aria-label="Return to VOLTEX"
        ></button>
        <div className="dummy-page__meta">
          <span>Dummy network view</span>
          <strong>Advanced node preview</strong>
        </div>
      </div>

      <div className="dummy-page__body">
        <div className="dummy-page__hero">
          <p className="dummy-page__eyebrow">Preview state</p>
          <h1 className="dummy-page__title">Dummy page component active.</h1>
          <p className="dummy-page__copy">
            This is a placeholder page surface driven by local state and
            persisted with localStorage. Slide left to return to the original
            VOLTEX experience.
          </p>
        </div>

        <div className="dummy-page__grid">
          <article className="dummy-page__card">
            <span>Node cluster</span>
            <strong>Primary routing</strong>
            <p>Placeholder cluster data for a deeper system map.</p>
          </article>
          <article className="dummy-page__card">
            <span>Relay path</span>
            <strong>Cross-grid telemetry</strong>
            <p>Future page content will expand this into a fuller network view.</p>
          </article>
          <article className="dummy-page__card">
            <span>Dispatch lane</span>
            <strong>Load balancing</strong>
            <p>Reserved for the next stage of the advanced connection layout.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
