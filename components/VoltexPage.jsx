"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import HeroCallout from "./HeroCallout";

const HeroGlobe = dynamic(() => import("./HeroOrbitalGlobe"), {
  ssr: false,
});

const GRID_TICKER_ITEMS = [
  ["FREQ", "50.00 HZ"],
  ["VOLTAGE", "440,000 V"],
  ["LOAD", "78%"],
  ["NODES", "2,847 ACTIVE"],
  ["LINE LOSS", "3%"],
  ["STATUS", "NOMINAL"],
  ["NCC-LAG-01", "TRANSMIT MODE"],
  ["COVERAGE", "95% NATIONAL"],
];

const ATLAS_NODES = [
  {
    key: "grid",
    label: "Grid",
    alt: "National transmission grid node",
    src: "https://images.unsplash.com/photo-1509391111737-9b07f052f6b6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG93ZXIlMjBncmlkfGVufDB8fDB8fHww",
    style: { "--x": "12%", "--y": "8%" },
    active: true,
  },
  {
    key: "transformers",
    label: "Transformers",
    alt: "Transformer banks",
    src: "https://images.unsplash.com/photo-1509390144018-eeaf65052242?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG93ZXIlMjBncmlkfGVufDB8fDB8fHww",
    style: { "--x": "27%", "--y": "20%" },
  },
  {
    key: "cables",
    label: "Power cables",
    alt: "Power cables and lines",
    src: "https://media.istockphoto.com/id/2224775705/photo/high-voltage-power-lines-illustrating-ai-driven-surge-in-electricity-demand.webp?a=1&b=1&s=612x612&w=0&k=20&c=f5qg5p8_QGeipZoSBGFD70_dLWeZ7_TWuD5XjbcKEy8=",
    style: { "--x": "45%", "--y": "12%" },
  },
  {
    key: "substations",
    label: "Substations",
    alt: "Bulk substations",
    src: "https://images.unsplash.com/photo-1728808668131-76d40d112271?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG93ZXIlMjBzdWJzdGF0aW9ufGVufDB8fDB8fHww",
    style: { "--x": "64%", "--y": "24%" },
  },
  {
    key: "market",
    label: "Market ops",
    alt: "Market operator and dispatch",
    src: "https://images.unsplash.com/photo-1590437019634-551af5ac2e96?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cmljaXR5JTIwbWFya2V0fGVufDB8fDB8fHww",
    style: { "--x": "42%", "--y": "54%" },
  },
  {
    key: "commission",
    label: "Commission",
    alt: "Regulatory commission oversight",
    src: "https://images.unsplash.com/photo-1563456019560-2b37aa7ad890?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3RyaWNpdHklMjBjb250cm9sfGVufDB8fDB8fHww",
    style: { "--x": "61%", "--y": "58%" },
  },
  {
    key: "control",
    label: "Control",
    alt: "National control room",
    src: "https://images.unsplash.com/photo-1761064039597-908570d50c23?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG93ZXIlMjBicmVha2VyfGVufDB8fDB8fHww",
    style: { "--x": "80%", "--y": "42%" },
  },
  {
    key: "oversight",
    label: "Oversight",
    alt: "National oversight structure",
    src: "https://images.unsplash.com/photo-1652715648725-c84d5035e9a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWxlY3RyaWNpdHklMjBjb250cm9sfGVufDB8fDB8fHww",
    style: { "--x": "34%", "--y": "76%" },
  },
  {
    key: "delivery",
    label: "Delivery",
    alt: "End-user delivery network",
    src: "https://images.unsplash.com/photo-1706643874107-f05612a5d584?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvd2VyJTIwdHJhbnNmb3JtZXJ8ZW58MHx8MHx8fDA%3D",
    style: { "--x": "61%", "--y": "82%" },
  },
];

function TickerItem({ label, value, index }) {
  return (
    <span className="grid-ticker__item" key={`${label}-${value}-${index}`}>
      <strong>{label}</strong>
      {value}
    </span>
  );
}

function AtlasNode({ node }) {
  return (
    <button
      className={`atlas-node${node.active ? " is-active" : ""}`}
      data-node={node.key}
      style={node.style}
    >
      <img src={node.src} alt={node.alt} />
      <span>{node.label}</span>
    </button>
  );
}

function JourneyDataRow({ label, width, value, tone }) {
  return (
    <div className="journey-data__row">
      <span>{label}</span>
      <i>
        <b className={tone} style={{ width }}></b>
      </i>
      <strong>{value}</strong>
    </div>
  );
}

export default function VoltexPage({
  isAtlasSwitcherOpen = false,
  onOpenAtlasSwitcher,
}) {
  const heroVisualRef = useRef(null);
  const [heroCalloutState, setHeroCalloutState] = useState({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const handleHeroGlobeClick = (event) => {
    const container = heroVisualRef.current;

    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const maxWidth = Math.min(rect.width * 0.42, 248);
    const maxHeight = 144;
    const margin = 18;
    const clickX = event.clientX || rect.left + rect.width / 2;
    const clickY = event.clientY || rect.top + rect.height / 2;
    const nextX = clickX - rect.left;
    const nextY = clickY - rect.top;
    const maxX = Math.max(margin, rect.width - maxWidth - margin);
    const maxY = Math.max(margin, rect.height - maxHeight - margin);

    setHeroCalloutState({
      isOpen: true,
      x: Math.min(maxX, Math.max(margin, nextX)),
      y: Math.min(maxY, Math.max(margin, nextY)),
    });
  };

  return (
    <>
      <div className="loader" id="loader">
        <div className="loader__brand">VOLTEX</div>
        <div className="loader__tag">
          Transmission atlas / initializing live grid
        </div>
        <div className="loader__bar">
          <span className="loader__fill" id="loader-fill"></span>
        </div>
        <div className="loader__meta">
          <strong id="loader-pct">0%</strong>
          <span id="loader-status">Booting control surfaces</span>
        </div>
      </div>

      <canvas
        className="field-canvas"
        id="field-canvas"
        aria-hidden="true"
      ></canvas>
      <div className="cursor-dot" id="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" id="cursor-ring" aria-hidden="true"></div>

      <div className="progress-rail" aria-hidden="true">
        <span className="progress-fill" id="progress-fill"></span>
      </div>

      <div className="corner-mark corner-mark--tl" aria-hidden="true"></div>
      <div className="corner-mark corner-mark--tr" aria-hidden="true"></div>
      <div className="corner-mark corner-mark--bl" aria-hidden="true"></div>
      <div className="corner-mark corner-mark--br" aria-hidden="true"></div>

      <div className="grid-ticker" aria-hidden="true">
        <div className="grid-ticker__track">
          {GRID_TICKER_ITEMS.concat(GRID_TICKER_ITEMS).map(
            ([label, value], index) => (
              <TickerItem
                key={`${label}-${value}-${index}`}
                label={label}
                value={value}
                index={index}
              />
            ),
          )}
        </div>
      </div>

      <header className="nav">
        <a className="nav__brand" href="#hero">
          <span>VOLT</span>
          <em>EX</em>
        </a>
        <nav className="nav__links" aria-label="Primary">
          <a href="#s1">Journey</a>
          <a href="#atlas">Atlas</a>
          <a href="#finale">Delivery</a>
        </nav>
        <button
          className="nav__menu-toggle"
          id="nav-menu-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="nav-menu"
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className="nav-menu" id="nav-menu" aria-hidden="true">
        <div className="nav-menu__backdrop" data-menu-close=""></div>
        <div
          className="nav-menu__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            className="nav-menu__close"
            id="nav-menu-close"
            type="button"
            aria-label="Close menu"
          >
            <span></span>
            <span></span>
          </button>
          <div className="nav-menu__meta">
            <span>Transmission atlas</span>
            <strong>Menu</strong>
          </div>
          <nav className="nav-menu__links" aria-label="Menu">
            <a href="#hero" data-menu-link="">
              Home
            </a>
            <a href="#s1" data-menu-link="">
              Journey
            </a>
            <a href="#atlas" data-menu-link="">
              Atlas
            </a>
            <a href="#finale" data-menu-link="">
              Delivery
            </a>
          </nav>
        </div>
      </div>

      <main className="voltex-main" id="main">
        <section className="hero" id="hero" data-dot="hero">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              Nigeria Power Grid — Transmission Journey 2025
            </p>
            <h1 className="hero__title">
              <span className="hero__line">
                <span>POWER.</span>
              </span>
              <span className="hero__line">
                <span className="hero__accent">TRANS-</span>
              </span>
              <span className="hero__line">
                <span>MITTED.</span>
              </span>
            </h1>
            <p className="hero__body">
              Follow 440,000 volts from generating station to your doorstep
              through a cleaner, more cinematic atlas of transmission
              infrastructure, control rooms, substations, and national
              distribution intelligence.
            </p>
            <div className="hero__actions">
              <a className="hero__btn hero__btn--solid" href="#s1">
                Start the transmission
              </a>
              <a className="hero__btn" href="#atlas">
                Open image atlas
              </a>
            </div>
          </div>
          <div className="hero__visual" ref={heroVisualRef}>
            <button
              className="orbital-core orbital-core--trigger"
              type="button"
              aria-expanded={heroCalloutState.isOpen}
              aria-controls="hero-callout"
              aria-label={
                heroCalloutState.isOpen
                  ? "Move transmission callout"
                  : "Show transmission callout"
              }
              onClick={handleHeroGlobeClick}
            >
              <HeroGlobe />
            </button>
            <HeroCallout
              isOpen={heroCalloutState.isOpen}
              position={heroCalloutState}
              onClose={() =>
                setHeroCalloutState((currentState) => ({
                  ...currentState,
                  isOpen: false,
                }))
              }
            />
          </div>

          <div className="scroll-cue">
            <span>SCROLL</span>
            <i></i>
          </div>
        </section>

        <section className="journey-scene" id="s1" data-dot="s1">
          <div className="journey-scene__spacer"></div>
          <div className="journey-scene__sticky">
            <div className="journey-copy">
              <div className="journey-copy__num">01</div>
              <div className="journey-copy__tag">Origin · Generation</div>
              <h2 className="journey-copy__title">
                THE POWER <span>FACILITY</span>
              </h2>
              <p className="journey-copy__body">
                Deep within the generation complex, turbines spinning at 3,000
                RPM convert thermal energy into electrical current. Alternators
                produce 11kV AC power, the raw pulse that begins its journey
                across the nation.
              </p>
              <div className="journey-data">
                <JourneyDataRow label="OUTPUT" width="92%" value="920MW" />
                <JourneyDataRow label="LOAD" width="78%" value="78%" />
                <JourneyDataRow label="EFFICIENCY" width="85%" value="85%" />
              </div>
              <div className="journey-stats">
                <div>
                  <strong>920</strong>
                  <span>MW GENERATED</span>
                </div>
                <div>
                  <strong>11kV</strong>
                  <span>BASE VOLTAGE</span>
                </div>
              </div>
            </div>
            <div className="journey-stage">
              <div className="journey-stage__panel journey-stage__panel--generation">
                <div className="journey-stage__grid"></div>
                <div className="energy-node energy-node--lg"></div>
                <div className="energy-node energy-node--md"></div>
                <div className="energy-node energy-node--sm"></div>
                <div className="journey-stage__caption">
                  Generation chamber / live alternator field
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider">
          <span></span>
          <p>STEP-UP INITIATED</p>
          <span></span>
        </div>

        <section
          className="journey-scene journey-scene--right"
          id="s2"
          data-dot="s2"
        >
          <div className="journey-scene__spacer"></div>
          <div className="journey-scene__sticky">
            <div className="journey-stage">
              <div className="journey-stage__panel journey-stage__panel--lines">
                <img
                  src="https://images.unsplash.com/photo-1509390144018-eeaf65052242?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG93ZXIlMjBncmlkfGVufDB8fDB8fHww"
                  alt="Transformer banks"
                />
                <div className="journey-stage__caption">
                  Long-range transmission corridor / low-loss mode
                </div>
              </div>
            </div>
            <div className="journey-copy journey-copy--right">
              <div className="journey-copy__num">02</div>
              <div className="journey-copy__tag">Transmission · 440kV</div>
              <h2 className="journey-copy__title">
                HIGH VOLTAGE <span className="alt">LINES</span>
              </h2>
              <p className="journey-copy__body">
                Step-up transformers elevate voltage to 440,000 volts. At this
                level, current drops dramatically, minimizing resistive heat
                loss. Towers over 50 meters tall move enough power for a million
                homes across the national corridor.
              </p>
              <div className="journey-data">
                <JourneyDataRow label="VOLTAGE" width="100%" value="440KV" />
                <JourneyDataRow
                  label="LINE LOSS"
                  width="3%"
                  value="3%"
                  tone="warn"
                />
              </div>
              <div className="journey-stats journey-stats--right">
                <div>
                  <strong>440</strong>
                  <span>KV VOLTAGE</span>
                </div>
                <div>
                  <strong>800</strong>
                  <span>KM SPAN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider">
          <span></span>
          <p>GRID NODE REACHED</p>
          <span></span>
        </div>

        <section className="journey-scene" id="s3" data-dot="s3">
          <div className="journey-scene__spacer"></div>
          <div className="journey-scene__sticky">
            <div className="journey-copy">
              <div className="journey-copy__num">03</div>
              <div className="journey-copy__tag">Substation · Step-Down</div>
              <h2 className="journey-copy__title">
                THE <span>SUBSTATION</span>
              </h2>
              <p className="journey-copy__body">
                The bulk transmission substation receives 440kV and reduces it
                to 132kV. Banks of power transformers, circuit breakers, and bus
                bars manage the immense energy flow, acting like a steel nervous
                system for the national grid.
              </p>
              <div className="journey-data">
                <JourneyDataRow label="INPUT" width="100%" value="440KV" />
                <JourneyDataRow label="OUTPUT" width="60%" value="132KV" />
                <JourneyDataRow label="UPTIME" width="99%" value="99.97%" />
              </div>
              <div className="journey-stats">
                <div>
                  <strong>6</strong>
                  <span>TRANSFORMER BANKS</span>
                </div>
                <div>
                  <strong>132</strong>
                  <span>KV OUTPUT</span>
                </div>
              </div>
            </div>
            <div className="journey-stage">
              <div className="journey-stage__panel journey-stage__panel--substation">
                <img
                  src="https://images.unsplash.com/photo-1728808668131-76d40d112271?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG93ZXIlMjBzdWJzdGF0aW9ufGVufDB8fDB8fHww"
                  alt="Bulk substations"
                />
                <div className="journey-stage__caption">
                  Bulk transmission substation / routing and protection
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider">
          <span></span>
          <p>DISTRIBUTION BEGINS</p>
          <span></span>
        </div>

        <section
          className="journey-scene journey-scene--right"
          id="s4"
          data-dot="s4"
        >
          <div className="journey-scene__spacer"></div>
          <div className="journey-scene__sticky">
            <div className="journey-stage">
              <div className="journey-stage__panel journey-stage__panel--urban">
                <img
                  src="https://images.unsplash.com/photo-1640238489602-29b9f18604f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGVsZWN0cmljaXR5JTIwcG9sZXN8ZW58MHx8MHx8fDA%3D"
                  alt="Power cables and lines"
                />
                <div className="journey-stage__caption">
                  Urban distribution lattice / neighborhood step-down
                </div>
              </div>
            </div>
            <div className="journey-copy journey-copy--right">
              <div className="journey-copy__num">04</div>
              <div className="journey-copy__tag">Distribution · Urban Grid</div>
              <h2 className="journey-copy__title">
                URBAN <span className="alt">DISTRIBUTION</span>
              </h2>
              <p className="journey-copy__body">
                Distribution transformers on rooftops and poles bring voltage
                from 11kV to 240V. These compact conversion points serve
                neighborhoods, industrial estates, and business corridors,
                completing the journey from generator to socket in milliseconds.
              </p>
              <div className="journey-data">
                <JourneyDataRow label="11KV IN" width="100%" value="" />
                <JourneyDataRow
                  label="240V OUT"
                  width="35%"
                  value=""
                  tone="ok"
                />
              </div>
              <div className="journey-stats journey-stats--right">
                <div>
                  <strong>240</strong>
                  <span>V END USER</span>
                </div>
                <div>
                  <strong>50Hz</strong>
                  <span>FREQUENCY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider">
          <span></span>
          <p>SITUATION ROOM</p>
          <span></span>
        </div>

        <section className="journey-scene" id="s5" data-dot="s5">
          <div className="journey-scene__spacer"></div>
          <div className="journey-scene__sticky">
            <div className="journey-copy">
              <div className="journey-copy__num">05</div>
              <div className="journey-copy__tag">Control · SCADA</div>
              <h2 className="journey-copy__title">
                SITUATION <span>ROOM</span>
              </h2>
              <p className="journey-copy__body">
                At the National Control Center, engineers monitor every node in
                real time. SCADA systems track thousands of measurement points
                across the network, detect faults in milliseconds, and reroute
                load to keep the system stable.
              </p>
              <div className="journey-data">
                <JourneyDataRow label="NODES" width="100%" value="2,847" />
                <JourneyDataRow
                  label="ALERTS"
                  width="1%"
                  value="CLEAR"
                  tone="danger"
                />
                <JourneyDataRow label="COVERAGE" width="95%" value="95%" />
              </div>
              <div className="journey-stats">
                <div>
                  <strong>24/7</strong>
                  <span>MONITORING</span>
                </div>
                <div>
                  <strong>0.3s</strong>
                  <span>RESPONSE TIME</span>
                </div>
              </div>
            </div>
            <div className="journey-stage">
              <div className="journey-stage__panel journey-stage__panel--control">
                <img
                  src="https://images.unsplash.com/photo-1563456019560-2b37aa7ad890?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3RyaWNpdHklMjBjb250cm9sfGVufDB8fDB8fHww"
                  alt="Regulatory commission oversight"
                />
                <div className="journey-stage__caption">
                  National control center / live telemetry and switching
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="atlas" id="atlas" data-dot="atlas">
          <div className="atlas__intro">
            <div className="atlas__intro__content">
              <p className="atlas__eyebrow">Interactive image atlas</p>
              <h2 className="atlas__title">
                Zoom through the transmission network.
              </h2>
              <p className="atlas__body">
                A linked image field inspired by intelligence maps and network
                diagrams. Hover to tilt. Click any node and the section zooms
                inward, clarifying the image while opening context on the grid,
                transformers, cables, market operators, oversight, and delivery
                chain.
              </p>
            </div>

            <button
              className="atlas__launch-arrow"
              id="atlas-launch-arrow"
              type="button"
              aria-expanded={isAtlasSwitcherOpen}
              aria-label="Open advanced network preview"
              onClick={onOpenAtlasSwitcher}
            ></button>
          </div>

          <div className="atlas__shell" id="atlas-shell">
            <div className="atlas-details" id="atlas-details">
              <p className="atlas-details__eyebrow" id="atlas-kicker">
                Grid intelligence / 01
              </p>
              <h3 className="atlas-details__title" id="atlas-title">
                National Transmission Grid
              </h3>
              <p className="atlas-details__copy" id="atlas-copy">
                The national grid binds generating assets, regional substations,
                control rooms, and last-mile distribution into one constantly
                balanced system.
              </p>
              <div className="atlas-details__stats" id="atlas-stats">
                <div>
                  <strong>440kV</strong>
                  <span>PRIMARY BACKBONE</span>
                </div>
                <div>
                  <strong>800km</strong>
                  <span>LONG-RANGE CORRIDORS</span>
                </div>
              </div>
              <blockquote className="atlas-details__quote" id="atlas-quote">
                “Transmission is not one object. It is choreography across
                steel, distance, switching, regulation, and time.”
              </blockquote>
            </div>

            <div className="atlas-stage" id="atlas-stage">
              <div className="atlas-stage__frame">
                <svg
                  className="atlas-stage__links"
                  viewBox="0 0 1000 860"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M150 120 L290 220 L470 160 L650 250 L820 160" />
                  <path d="M290 220 L260 420 L420 500 L620 540 L820 420" />
                  <path d="M470 160 L500 350 L620 540" />
                  <path d="M500 350 L360 650 L620 700 L820 420" />
                  <path d="M260 420 L150 700 L360 650" />
                </svg>

                <div className="atlas-network" id="atlas-network">
                  {ATLAS_NODES.map((node) => (
                    <AtlasNode key={node.key} node={node} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="finale" id="finale" data-dot="finale">
          <p className="finale__eyebrow">End of journey</p>
          <h2 className="finale__title">
            <span>POWER</span>
            <span className="accent">DELIVERED.</span>
          </h2>
          <p className="finale__body">
            From turbine to terminal, every electron travels a precise
            engineered path. 440,000 volts are stepped, steered, balanced, and
            translated into the everyday reliability people feel only when it
            works.
          </p>
          <a className="hero__btn" href="#hero">
            Back to Home
          </a>
        </section>
      </main>
    </>
  );
}
