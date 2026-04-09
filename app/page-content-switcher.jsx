"use client";

import DummyPage from "../components/DummyPage";

export default function PageContentSwitcher({
  activePage,
  isModalOpen,
  onClose,
  onSelectPage,
  onTogglePage,
}) {
  return (
    <>
      <div className={`dummy-page-switcher${activePage === "dummy" ? " is-active" : ""}`}>
        <DummyPage onBack={() => onSelectPage("main")} />
      </div>

      <div
        className={`atlas-explorer${isModalOpen ? " is-open" : ""}`}
        aria-hidden={isModalOpen ? "false" : "true"}
        data-slide={activePage === "dummy" ? "1" : "0"}
      >
        <div
          className="atlas-explorer__backdrop"
          onClick={onClose}
        ></div>
        <div
          className="atlas-explorer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Atlas explorer"
        >
          <button
            className="atlas-explorer__close"
            type="button"
            onClick={onClose}
            aria-label="Close atlas explorer"
          >
            <span></span>
            <span></span>
          </button>
          <div className="atlas-explorer__pages">
            <section
              className={`atlas-explorer__page${
                activePage === "main" ? " is-active" : ""
              }`}
              data-slide="0"
              style={{
                transform:
                  activePage === "main" ? "translateX(0%)" : "translateX(-100%)",
              }}
            >
              <div className="atlas-explorer__header">
                <span>Atlas switchboard</span>
                <strong>Keep the landing page active.</strong>
              </div>
              <div className="atlas-explorer__surface">
                <div className="atlas-explorer__media">
                  <img
                    src="https://images.unsplash.com/photo-1509391111737-9b07f052f6b6?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG93ZXIlMjBncmlkfGVufDB8fDB8fHww"
                    alt="Image atlas transmission network view"
                  />
                </div>
                <div className="atlas-explorer__copy">
                  <p className="atlas-explorer__eyebrow">Default state</p>
                  <h3>Landing Page Active</h3>
                  <p>
                    Keep the current VOLTEX landing experience visible behind
                    the modal and stay in the linked atlas flow.
                  </p>
                  <button
                    className="hero__btn hero__btn--solid"
                    type="button"
                    onClick={() => onSelectPage("main")}
                  >
                    Use landing page
                  </button>
                </div>
              </div>
            </section>

            <section
              className={`atlas-explorer__page${
                activePage === "dummy" ? " is-active" : ""
              }`}
              data-slide="1"
              style={{
                transform:
                  activePage === "dummy" ? "translateX(0%)" : "translateX(100%)",
              }}
            >
              <div className="atlas-explorer__header">
                <span>Advanced routing layer</span>
                <strong>Show the advanced node preview.</strong>
              </div>
              <div className="atlas-explorer__surface">
                <div className="atlas-explorer__media">
                  <img
                    src="https://images.unsplash.com/photo-1563456019560-2b37aa7ad890?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3RyaWNpdHklMjBjb250cm9sfGVufDB8fDB8fHww"
                    alt="Advanced node network connection view"
                  />
                </div>
                <div className="atlas-explorer__copy">
                  <p className="atlas-explorer__eyebrow">Second state</p>
                  <h3>Advanced Node Preview</h3>
                  <p>
                    Slide right and the advanced preview appears underneath the
                    modal immediately, while the modal stays in control.
                  </p>
                  <button
                    className="hero__btn hero__btn--solid"
                    type="button"
                    onClick={() => onSelectPage("dummy")}
                  >
                    Use advanced preview
                  </button>
                </div>
              </div>
            </section>
          </div>
          <button
            className="atlas-explorer__nav"
            type="button"
            aria-label={
              activePage === "dummy"
                ? "Show landing page option"
                : "Show advanced preview option"
            }
            onClick={onTogglePage}
          ></button>
        </div>
      </div>
    </>
  );
}
