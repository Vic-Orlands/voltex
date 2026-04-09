const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const body = document.body;
const loader = document.getElementById("loader");
const loaderFill = document.getElementById("loader-fill");
const loaderPct = document.getElementById("loader-pct");
const loaderStatus = document.getElementById("loader-status");
const progressFill = document.getElementById("progress-fill");
const navTime = document.getElementById("nav-time");
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");
const dotRailButtons = [...document.querySelectorAll(".dot-rail__dot")];
const sections = [...document.querySelectorAll("[data-dot]")];
const heroLineInner = [...document.querySelectorAll(".hero__line span")];
const atlasStage = document.getElementById("atlas-stage");
const atlasFrame = document.querySelector(".atlas-stage__frame");
const atlasNetwork = document.getElementById("atlas-network");
const atlasShell = document.getElementById("atlas-shell");
const atlasNodes = [...document.querySelectorAll(".atlas-node")];

const atlasKicker = document.getElementById("atlas-kicker");
const atlasTitle = document.getElementById("atlas-title");
const atlasCopy = document.getElementById("atlas-copy");
const atlasStats = document.getElementById("atlas-stats");
const atlasQuote = document.getElementById("atlas-quote");

const atlasContent = {
  grid: {
    kicker: "Grid intelligence / 01",
    title: "National Transmission Grid",
    copy:
      "The national grid binds generating assets, regional substations, control rooms, and last-mile distribution into one constantly balanced system. It is the main switching surface that lets Nigeria move bulk power between sources and demand centers.",
    stats: [
      ["440kV", "PRIMARY BACKBONE"],
      ["800km", "LONG-RANGE CORRIDORS"],
    ],
    quote:
      "Transmission is not one object. It is choreography across steel, distance, switching, regulation, and time.",
  },
  transformers: {
    kicker: "Equipment detail / 02",
    title: "Transformer Banks",
    copy:
      "Bulk transformers elevate and reduce voltage at critical moments in the chain. They make long-distance movement efficient, then prepare electricity for substations, industrial clusters, and urban feeders without destabilizing the wider network.",
    stats: [
      ["11→440", "STEP-UP PATH"],
      ["440→132", "STEP-DOWN PATH"],
    ],
    quote:
      "Transformers are where raw generation becomes transport-ready infrastructure.",
  },
  cables: {
    kicker: "Corridor detail / 03",
    title: "Power Cables & Lines",
    copy:
      "Conductors, insulators, and tower geometry are tuned to keep losses low while surviving heat, weather, and load fluctuation. This corridor is where the grid becomes visible as a national-scale line of movement.",
    stats: [
      ["3%", "TARGET LINE LOSS"],
      ["50m+", "AVERAGE TOWER HEIGHT"],
    ],
    quote:
      "The line is not just a route. It is the invisible economics of distance made physical.",
  },
  substations: {
    kicker: "Routing detail / 04",
    title: "Bulk Substations",
    copy:
      "Substations reroute, protect, and rebalance energy at scale. Here, bus bars, breakers, and transformer bays turn a single high-voltage corridor into multiple controlled regional outputs with redundancy built in.",
    stats: [
      ["132kV", "REGIONAL OUTPUT"],
      ["99.97%", "TARGET AVAILABILITY"],
    ],
    quote:
      "A substation is equal parts junction, filter, shield, and command point.",
  },
  discos: {
    kicker: "Delivery detail / 05",
    title: "Distribution Companies",
    copy:
      "DisCos receive stepped-down electricity and manage the final relationship with homes, streets, estates, and businesses. Their systems translate grid-level flow into neighborhood reliability, maintenance response, and billing reality.",
    stats: [
      ["11kV", "INBOUND FEEDERS"],
      ["240V", "END-USER SERVICE"],
    ],
    quote:
      "The customer feels power only at the distribution edge, but that edge rests on the whole chain behind it.",
  },
  market: {
    kicker: "Operations detail / 06",
    title: "Market & Dispatch",
    copy:
      "Beyond the hardware sits the trading and dispatch layer: market operator logic, generation scheduling, balancing, and system-wide coordination. These interfaces decide what moves, when, and under which operating assumptions.",
    stats: [
      ["24/7", "DISPATCH WINDOW"],
      ["REALTIME", "LOAD MATCHING"],
    ],
    quote:
      "The market is the invisible switching logic that tells steel when to matter.",
  },
  commission: {
    kicker: "Oversight detail / 07",
    title: "Regulatory Commission",
    copy:
      "The regulatory layer defines rules, service obligations, tariff frameworks, market oversight, and compliance pressure. It shapes how transmission, generation, and distribution entities behave across the same national system.",
    stats: [
      ["RULES", "MARKET FRAMEWORK"],
      ["AUDITS", "COMPLIANCE OVERSIGHT"],
    ],
    quote:
      "Grid trust is not only technical. It is also regulatory, contractual, and procedural.",
  },
  control: {
    kicker: "Telemetry detail / 08",
    title: "National Control Center",
    copy:
      "The control room sees the grid as a live behavioral model. Engineers track faults, voltage swings, line trips, and route changes, then issue switching decisions that keep transmission stable across time and terrain.",
    stats: [
      ["2,847", "MONITORED NODES"],
      ["0.3s", "FAULT RESPONSE"],
    ],
    quote:
      "The control room is where the grid becomes a living map instead of a static diagram.",
  },
  oversight: {
    kicker: "Coordination detail / 09",
    title: "National Oversight Structure",
    copy:
      "National oversight spans policy direction, operational review, emergency coordination, performance tracking, and public accountability. It gives the network a governance layer above its physical footprint.",
    stats: [
      ["NATIONWIDE", "COORDINATION SCOPE"],
      ["MULTI-AGENCY", "OPERATING MODEL"],
    ],
    quote:
      "A resilient grid needs a map of responsibility as much as a map of cables.",
  },
  delivery: {
    kicker: "End-state detail / 10",
    title: "Final Delivery Layer",
    copy:
      "The endpoint is deceptively ordinary: homes lit, machines running, signals staying alive. Behind that calm surface is a sequence of voltage shifts, market decisions, protection systems, and field infrastructure.",
    stats: [
      ["240V", "HOUSEHOLD SERVICE"],
      ["50Hz", "SYSTEM FREQUENCY"],
    ],
    quote:
      "Reliability is the art of making an immense system feel effortless at the final socket.",
  },
};

const loaderSteps = [
  "Booting control surfaces",
  "Mapping transmission corridors",
  "Synchronizing station telemetry",
  "Opening atlas overlays",
  "VOLTEX systems online",
];

function setClock() {
  const update = () => {
    const now = new Date();
    navTime.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map((value) => String(value).padStart(2, "0"))
      .join(":");
  };

  update();
  setInterval(update, 1000);
}

function runLoader() {
  return new Promise((resolve) => {
    let progress = 0;
    let statusIndex = 0;

    const tick = () => {
      progress += Math.random() * 16 + 6;
      if (progress > 100) progress = 100;

      loaderFill.style.width = `${progress}%`;
      loaderPct.textContent = `${Math.round(progress)}%`;

      const nextStatusIndex = Math.min(
        loaderSteps.length - 1,
        Math.floor((progress / 100) * loaderSteps.length)
      );

      if (nextStatusIndex !== statusIndex) {
        statusIndex = nextStatusIndex;
        loaderStatus.textContent = loaderSteps[statusIndex];
      }

      if (progress < 100) {
        setTimeout(tick, 220);
      } else {
        setTimeout(() => {
          body.classList.add("is-ready");
          setTimeout(() => {
            loader.remove();
            resolve();
          }, 720);
        }, 300);
      }
    };

    tick();
  });
}

function initCursor() {
  if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  const render = () => {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}

function initFieldCanvas() {
  const canvas = document.getElementById("field-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const nodes = [];
  const links = [];
  let width = 0;
  let height = 0;
  let pointerX = window.innerWidth * 0.6;
  let pointerY = window.innerHeight * 0.35;

  const palette = [
    "129,255,174",
    "223,255,88",
    "181,255,210",
    "255,150,90",
  ];

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    nodes.length = 0;
    links.length = 0;

    const total = Math.max(80, Math.round(width / 18));
    for (let index = 0; index < total; index += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 2 + 0.8,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }
  };

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  });

  const draw = () => {
    context.clearRect(0, 0, width, height);

    nodes.forEach((node, index) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < -30) node.x = width + 30;
      if (node.x > width + 30) node.x = -30;
      if (node.y < -30) node.y = height + 30;
      if (node.y > height + 30) node.y = -30;

      const distanceToPointer = Math.hypot(pointerX - node.x, pointerY - node.y);
      const pulse = Math.max(0, 1 - distanceToPointer / 240);

      context.beginPath();
      context.fillStyle = `rgba(${node.color}, ${0.18 + pulse * 0.42})`;
      context.shadowColor = `rgba(${node.color}, 0.28)`;
      context.shadowBlur = 16;
      context.arc(node.x, node.y, node.radius + pulse * 2.6, 0, Math.PI * 2);
      context.fill();

      const nearby = nodes[index + 1];
      if (!nearby) return;

      const linkDistance = Math.hypot(node.x - nearby.x, node.y - nearby.y);
      if (linkDistance > 120) return;

      context.beginPath();
      context.strokeStyle = `rgba(181,255,210, ${0.02 + (1 - linkDistance / 120) * 0.18})`;
      context.lineWidth = 1;
      context.moveTo(node.x, node.y);
      context.lineTo(nearby.x, nearby.y);
      context.stroke();
    });

    requestAnimationFrame(draw);
  };

  resize();
  draw();
}

function initLenis() {
  if (!window.Lenis || prefersReducedMotion) return null;

  const lenis = new Lenis({
    duration: 1.18,
    wheelMultiplier: 0.94,
    touchMultiplier: 1.16,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
  return lenis;
}

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressFill.style.width = `${progress}%`;
}

function setActiveDot(id) {
  dotRailButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.target === id);
  });
}

function initDotNavigation(lenis) {
  dotRailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target, { offset: -20 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveDot(entry.target.id);
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initHeroAnimations() {
  if (!window.gsap) return;

  const { gsap } = window;

  gsap.to(heroLineInner, {
    y: "0%",
    duration: 1.3,
    stagger: 0.09,
    delay: 0.28,
    ease: "expo.out",
  });

  gsap.to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: "power3.out" });
  gsap.to(".hero__body", { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power3.out" });
  gsap.to(".hero__actions", { opacity: 1, y: 0, duration: 1, delay: 1.28, ease: "power3.out" });
  gsap.to(".scroll-cue", { opacity: 1, duration: 0.9, delay: 1.5, ease: "power2.out" });

  gsap.set(".hero__body, .hero__actions", { y: 18, opacity: 0 });

  if (window.ScrollTrigger && !prefersReducedMotion) {
    gsap.to(".orbital-core", {
      rotate: 32,
      scale: 1.14,
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

function initJourneyScenes() {
  if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion) return;

  const { gsap, ScrollTrigger } = window;

  document.querySelectorAll(".journey-scene").forEach((scene) => {
    const copy = scene.querySelector(".journey-copy");
    const panel = scene.querySelector(".journey-stage__panel");
    const panelChildren = [
      ...scene.querySelectorAll(
        ".energy-node, .tower, .substation-cell, .city-node, .control-wave"
      ),
    ];
    const lines = [...scene.querySelectorAll(".journey-data__row")];
    const stats = [...scene.querySelectorAll(".journey-stats > div")];

    gsap.set(
      [
        scene.querySelector(".journey-copy__tag"),
        scene.querySelector(".journey-copy__title"),
        scene.querySelector(".journey-copy__body"),
        scene.querySelector(".journey-copy__num"),
        scene.querySelector(".journey-stage__caption"),
        ...lines,
        ...stats,
      ],
      { opacity: 0, y: 28 }
    );
    gsap.set(panel, { opacity: 0, y: 56, scale: 0.96, rotateX: 6 });
    gsap.set(panelChildren, { opacity: 0, scale: 0.82 });

    const reveal = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top 68%",
      },
      defaults: {
        ease: "power3.out",
      },
    });

    reveal
      .to(panel, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1,
        clearProps: "transform",
      })
      .to(
        scene.querySelector(".journey-copy__num"),
        { opacity: 1, y: 0, duration: 0.55 },
        0.08
      )
      .to(
        [
          scene.querySelector(".journey-copy__tag"),
          scene.querySelector(".journey-copy__title"),
          scene.querySelector(".journey-copy__body"),
        ],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
        },
        0.16
      )
      .to(
        lines,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.06,
        },
        0.32
      )
      .to(
        stats,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
        },
        0.46
      )
      .to(
        scene.querySelector(".journey-stage__caption"),
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        0.54
      )
      .to(
        panelChildren,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.2)",
        },
        0.26
      );
  });

  document.querySelectorAll(".journey-stage__panel").forEach((panel) => {
    gsap.fromTo(
      panel,
      { yPercent: 8, rotate: -1.8 },
      {
        yPercent: -8,
        rotate: 1.8,
        ease: "none",
        scrollTrigger: {
          trigger: panel.closest(".journey-scene"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  document.querySelectorAll(".journey-copy").forEach((copy) => {
    gsap.fromTo(
      copy,
      { yPercent: 10 },
      {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: copy.closest(".journey-scene"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  gsap.to(".energy-node", {
    scale: 1.08,
    repeat: -1,
    yoyo: true,
    duration: 1.8,
    stagger: 0.2,
    ease: "sine.inOut",
  });

  gsap.to(".control-wave", {
    scale: 1.2,
    opacity: 0.12,
    repeat: -1,
    yoyo: true,
    duration: 2.8,
    stagger: 0.5,
    ease: "sine.inOut",
  });
}

function initDividerAnimations() {
  if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion) return;

  const { gsap } = window;

  document.querySelectorAll(".divider").forEach((divider) => {
    const lines = divider.querySelectorAll("span");
    const label = divider.querySelector("p");

    gsap.set(lines, { scaleX: 0, transformOrigin: "center center" });
    gsap.set(label, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: divider,
        start: "top 84%",
      },
    });

    tl.to(lines, {
      scaleX: 1,
      duration: 0.85,
      stagger: 0.08,
      ease: "power2.out",
    }).to(
      label,
      {
        opacity: 0.7,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      },
      0.16
    );
  });
}

function buildStatsMarkup(items) {
  return items
    .map(
      ([value, label]) =>
        `<div><strong>${value}</strong><span>${label}</span></div>`
    )
    .join("");
}

function applyAtlasNode(key, withAnimation = true) {
  const content = atlasContent[key];
  const node = atlasNodes.find((item) => item.dataset.node === key);
  if (!content || !node) return;

  atlasNodes.forEach((item) => item.classList.toggle("is-active", item === node));
  atlasStage.classList.add("is-zoomed");

  const nodeX = Number.parseFloat(node.style.getPropertyValue("--x")) / 100;
  const nodeY = Number.parseFloat(node.style.getPropertyValue("--y")) / 100;
  const stageWidth = atlasFrame.clientWidth;
  const stageHeight = atlasFrame.clientHeight;
  const scale = window.innerWidth > 1100 ? 1.62 : window.innerWidth > 720 ? 1.34 : 1.12;
  const translateX = (0.5 - nodeX) * stageWidth * 0.96;
  const translateY = (0.42 - nodeY) * stageHeight * 0.86;

  if (withAnimation && window.gsap && !prefersReducedMotion) {
    window.gsap.to(atlasNetwork, {
      x: translateX,
      y: translateY,
      scale,
      duration: 0.75,
      ease: "power3.out",
    });

    window.gsap.fromTo(
      "#atlas-details",
      { opacity: 0.55, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
    );
  } else {
    atlasNetwork.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  atlasKicker.textContent = content.kicker;
  atlasTitle.textContent = content.title;
  atlasCopy.textContent = content.copy;
  atlasStats.innerHTML = buildStatsMarkup(content.stats);
  atlasQuote.textContent = `“${content.quote}”`;
}

function initAtlasInteractions(lenis) {
  applyAtlasNode("grid", false);

  atlasNodes.forEach((node) => {
    node.addEventListener("click", () => {
      applyAtlasNode(node.dataset.node, true);
      if (lenis) {
        lenis.scrollTo(atlasShell, { offset: -60 });
      } else {
        atlasShell.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    node.addEventListener("pointermove", (event) => {
      if (prefersReducedMotion) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--rx", `${py * -14}deg`);
      node.style.setProperty("--ry", `${px * 18}deg`);
    });

    node.addEventListener("pointerleave", () => {
      node.style.removeProperty("--rx");
      node.style.removeProperty("--ry");
    });
  });

  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    const { gsap } = window;

    gsap.set(".atlas__intro > *", { opacity: 0, y: 36 });
    gsap.set(["#atlas-details", ".atlas-node"], { opacity: 0, y: 24 });

    gsap.to(".atlas__intro > *", {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".atlas",
        start: "top 70%",
      },
    });

    gsap.to("#atlas-details", {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".atlas-stage",
        start: "top 72%",
      },
    });

    gsap.to(".atlas-node", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: {
        each: 0.04,
        from: "random",
      },
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".atlas-stage",
        start: "top 72%",
      },
    });
  }
}

function initFinaleAnimation() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;

  gsap.set(".finale__eyebrow, .finale__title, .finale__body, .finale__actions", {
    y: 38,
    opacity: 0,
  });

  gsap.from(".finale__eyebrow, .finale__title, .finale__body, .finale__actions", {
    y: 38,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".finale",
      start: "top 72%",
      once: true,
    },
  });
}

async function init() {
  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  setClock();
  initCursor();
  initFieldCanvas();

  const lenis = initLenis();
  const scrollHandler = () => updateProgress();

  if (lenis) {
    lenis.on("scroll", () => {
      updateProgress();
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    });
  } else {
    window.addEventListener("scroll", scrollHandler, { passive: true });
  }

  initDotNavigation(lenis);
  await runLoader();
  initHeroAnimations();
  initJourneyScenes();
  initDividerAnimations();
  initAtlasInteractions(lenis);
  initFinaleAnimation();
  updateProgress();

  window.addEventListener("resize", () => {
    const activeNode = document.querySelector(".atlas-node.is-active");
    if (activeNode) applyAtlasNode(activeNode.dataset.node, false);
  });
}

init();
