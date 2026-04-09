"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let hasInitialized = false;

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

function buildStatsMarkup(items) {
  return items
    .map(
      ([value, label]) =>
        `<div><strong>${value}</strong><span>${label}</span></div>`
    )
    .join("");
}

export function initVoltex() {
  if (hasInitialized || typeof window === "undefined") return;
  hasInitialized = true;

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const body = document.body;
  const loader = document.getElementById("loader");
  const loaderFill = document.getElementById("loader-fill");
  const loaderPct = document.getElementById("loader-pct");
  const loaderStatus = document.getElementById("loader-status");
  const progressFill = document.getElementById("progress-fill");
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  const navMenu = document.getElementById("nav-menu");
  const navMenuToggle = document.getElementById("nav-menu-toggle");
  const navMenuClose = document.getElementById("nav-menu-close");
  const navMenuBackdrop = navMenu?.querySelector("[data-menu-close]") ?? null;
  const navMenuLinks = [...document.querySelectorAll("[data-menu-link]")];
  const atlasExplorer = document.getElementById("atlas-explorer");
  const atlasExplorerTrack = document.getElementById("atlas-explorer-track");
  const atlasExplorerNav = document.getElementById("atlas-explorer-nav");
  const atlasExplorerClose = document.getElementById("atlas-explorer-close");
  const atlasExplorerBackdrop =
    atlasExplorer?.querySelector("[data-atlas-close]") ?? null;
  const atlasLaunchArrow = document.getElementById("atlas-launch-arrow");
  const atlasGotoLinks = [...document.querySelectorAll("[data-atlas-goto]")];
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

  if (
    !body ||
    !loader ||
    !loaderFill ||
    !loaderPct ||
    !loaderStatus ||
    !progressFill ||
    !cursorDot ||
    !cursorRing ||
    !navMenu ||
    !navMenuToggle ||
    !navMenuClose ||
    !atlasExplorer ||
    !atlasExplorerTrack ||
    !atlasExplorerNav ||
    !atlasExplorerClose ||
    !atlasLaunchArrow ||
    !atlasStage ||
    !atlasFrame ||
    !atlasNetwork ||
    !atlasShell ||
    !atlasKicker ||
    !atlasTitle ||
    !atlasCopy ||
    !atlasStats ||
    !atlasQuote
  ) {
    return;
  }

  function initMenu(lenis) {
    const openMenu = () => {
      body.classList.add("is-menu-open");
      navMenu.classList.add("is-open");
      navMenu.setAttribute("aria-hidden", "false");
      navMenuToggle.setAttribute("aria-expanded", "true");
      if (lenis) lenis.stop();
    };

    const closeMenu = () => {
      body.classList.remove("is-menu-open");
      navMenu.classList.remove("is-open");
      navMenu.setAttribute("aria-hidden", "true");
      navMenuToggle.setAttribute("aria-expanded", "false");
      if (lenis && !body.classList.contains("is-atlas-explorer-open")) {
        lenis.start();
      }
    };

    navMenuToggle.addEventListener("click", openMenu);
    navMenuClose.addEventListener("click", closeMenu);
    navMenuBackdrop?.addEventListener("click", closeMenu);
    navMenuLinks.forEach((link) => link.addEventListener("click", closeMenu));

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  function initAtlasExplorer(lenis) {
    let activeSlide = 0;

    const syncSlide = () => {
      atlasExplorer.dataset.slide = String(activeSlide);
      atlasExplorerTrack.style.transform = `translateX(-${activeSlide * 50}%)`;
      atlasExplorerNav.setAttribute(
        "aria-label",
        activeSlide === 0 ? "Show next atlas view" : "Show previous atlas view"
      );
      atlasExplorer
        .querySelectorAll(".atlas-explorer__slide")
        .forEach((slide, index) => {
          slide.classList.toggle("is-active", index === activeSlide);
        });
    };

    const openExplorer = () => {
      body.classList.add("is-atlas-explorer-open");
      atlasExplorer.classList.add("is-open");
      atlasExplorer.setAttribute("aria-hidden", "false");
      atlasLaunchArrow.setAttribute("aria-expanded", "true");
      if (lenis) lenis.stop();
    };

    const closeExplorer = () => {
      body.classList.remove("is-atlas-explorer-open");
      atlasExplorer.classList.remove("is-open");
      atlasExplorer.setAttribute("aria-hidden", "true");
      atlasLaunchArrow.setAttribute("aria-expanded", "false");
      if (lenis && !body.classList.contains("is-menu-open")) lenis.start();
    };

    atlasLaunchArrow.addEventListener("click", openExplorer);
    atlasExplorerClose.addEventListener("click", closeExplorer);
    atlasExplorerBackdrop?.addEventListener("click", closeExplorer);
    atlasExplorerNav.addEventListener("click", () => {
      activeSlide = activeSlide === 0 ? 1 : 0;
      syncSlide();
    });

    atlasGotoLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        if (link.dataset.atlasGoto !== "atlas") return;
        event.preventDefault();
        closeExplorer();
        if (lenis) {
          lenis.scrollTo(atlasShell, { offset: -60 });
        } else {
          atlasShell.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && atlasExplorer.classList.contains("is-open")) {
        closeExplorer();
      }
    });

    syncSlide();
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
          window.setTimeout(tick, 220);
        } else {
          window.setTimeout(() => {
            body.classList.add("is-ready");
            window.setTimeout(() => {
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
    if (
      prefersReducedMotion ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

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
      window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(render);
  }

  function initFieldCanvas() {
    const canvas = document.getElementById("field-canvas");
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

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

      window.requestAnimationFrame(draw);
    };

    resize();
    draw();
  }

  function initLenis() {
    if (prefersReducedMotion) return null;

    const lenis = new Lenis({
      duration: 1.18,
      wheelMultiplier: 0.94,
      touchMultiplier: 1.16,
    });

    const raf = (time) => {
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    };

    window.requestAnimationFrame(raf);
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

    const observer = new window.IntersectionObserver(
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
    gsap.to(heroLineInner, {
      y: "0%",
      duration: 1.3,
      stagger: 0.09,
      delay: 0.28,
      ease: "expo.out",
    });

    gsap.to(".hero__eyebrow", {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: 0.2,
      ease: "power3.out",
    });
    gsap.to(".hero__body", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.1,
      ease: "power3.out",
    });
    gsap.to(".hero__actions", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.28,
      ease: "power3.out",
    });
    gsap.to(".scroll-cue", {
      opacity: 1,
      duration: 0.9,
      delay: 1.5,
      ease: "power2.out",
    });

    gsap.set(".hero__body, .hero__actions", { y: 18, opacity: 0 });

    if (!prefersReducedMotion) {
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
    if (prefersReducedMotion) return;

    const scenePresets = {
      s1: {
        copy: { x: -90, y: 36, rotate: -4, scale: 0.92 },
        num: { x: -34, y: 22, rotate: -10, scale: 0.74 },
        panel: {
          x: 132,
          y: 62,
          rotate: 8,
          rotateY: -26,
          scale: 0.8,
          clipPath: "inset(18% 16% 20% 18% round 3rem)",
        },
        child: { y: 42, scale: 0.46, rotate: -10 },
      },
      s2: {
        copy: { x: 92, y: 24, rotate: 3, scale: 0.9 },
        num: { x: 36, y: 18, rotate: 12, scale: 0.72 },
        panel: {
          x: -148,
          y: 20,
          rotate: -10,
          rotateY: 28,
          scale: 0.78,
          clipPath: "inset(20% 22% 14% 18% round 3rem)",
        },
        child: { x: -28, y: 34, scale: 0.54, rotate: 8 },
      },
      s3: {
        copy: {
          y: 92,
          rotateX: -64,
          transformOrigin: "top center",
          scale: 0.92,
        },
        num: { y: 38, rotateX: -20, scale: 0.72 },
        panel: {
          y: 110,
          rotateX: 26,
          transformOrigin: "center top",
          scaleY: 0.7,
          scaleX: 0.92,
          clipPath: "inset(0% 0% 40% 0% round 3rem)",
        },
        child: { y: 58, scale: 0.5, rotate: -8 },
      },
      s4: {
        copy: { x: 84, y: 40, rotate: -2, scale: 0.88 },
        num: { x: 42, y: 24, rotate: 10, scale: 0.76 },
        panel: {
          x: -130,
          y: 58,
          rotate: 11,
          rotateY: -18,
          scale: 0.76,
          clipPath: "inset(16% 24% 20% 14% round 3rem)",
        },
        child: { x: 30, y: 46, scale: 0.56, rotate: 11 },
      },
      s5: {
        copy: { x: -72, y: 70, rotate: -5, scale: 0.9 },
        num: { x: -24, y: 36, rotate: -14, scale: 0.74 },
        panel: {
          x: 138,
          y: 84,
          rotate: -12,
          rotateY: 24,
          scale: 0.75,
          clipPath: "inset(20% 18% 18% 18% round 3rem)",
        },
        child: { scale: 0.34, y: 0, rotate: 0 },
      },
    };

    document.querySelectorAll(".journey-scene").forEach((scene) => {
      const preset = scenePresets[scene.id] || scenePresets.s1;
      const sticky = scene.querySelector(".journey-scene__sticky");
      const copy = scene.querySelector(".journey-copy");
      const panel = scene.querySelector(".journey-stage__panel");
      const num = scene.querySelector(".journey-copy__num");
      const tag = scene.querySelector(".journey-copy__tag");
      const title = scene.querySelector(".journey-copy__title");
      const titleAccent = title?.querySelector("span");
      const sceneBody = scene.querySelector(".journey-copy__body");
      const caption = scene.querySelector(".journey-stage__caption");
      const panelChildren = [
        ...scene.querySelectorAll(
          ".energy-node, .tower, .substation-cell, .city-node, .control-wave"
        ),
      ];
      const lines = [...scene.querySelectorAll(".journey-data__row")];
      const stats = [...scene.querySelectorAll(".journey-stats > div")];
      const isRight = scene.classList.contains("journey-scene--right");
      const lineDirection = isRight ? 30 : -30;
      const statsDirection = isRight ? 34 : -34;

      if (!sticky || !copy || !panel || !num || !tag || !title || !sceneBody || !caption) {
        return;
      }

      gsap.set(copy, {
        opacity: 0,
        transformPerspective: 1200,
        ...preset.copy,
      });
      gsap.set(num, {
        opacity: 0,
        ...preset.num,
      });
      gsap.set([tag, title, sceneBody, caption], { opacity: 0, y: 26 });
      gsap.set(titleAccent, {
        opacity: 0,
        x: isRight ? 34 : -34,
        scale: 0.88,
      });
      gsap.set(lines, { opacity: 0, x: lineDirection, y: 12 });
      gsap.set(stats, {
        opacity: 0,
        x: statsDirection,
        y: 22,
        scale: 0.86,
      });
      gsap.set(panel, {
        opacity: 0,
        transformPerspective: 1400,
        transformOrigin: "center center",
        ...preset.panel,
      });
      gsap.set(panelChildren, {
        opacity: 0,
        ...preset.child,
      });

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: sticky,
          start: "top 98%",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      reveal
        .to(copy, {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.95,
          ease: "expo.out",
          clearProps: "transform",
        })
        .to(
          panel,
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
            rotateX: 0,
            rotateY: 0,
            clipPath: "inset(0% 0% 0% 0% round 2.8rem)",
            duration: 1,
            ease: "expo.out",
            clearProps: "transform,clipPath",
          },
          0.05
        )
        .to(
          num,
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)",
          },
          0.1
        )
        .to(
          tag,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          0.18
        )
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "expo.out",
          },
          0.22
        )
        .to(
          titleAccent,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.62,
            ease: "back.out(1.35)",
          },
          0.34
        )
        .to(
          sceneBody,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          0.3
        )
        .to(
          panelChildren,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: "back.out(1.3)",
          },
          0.24
        )
        .to(
          lines,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power2.out",
          },
          0.42
        )
        .to(
          stats,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.62,
            stagger: 0.08,
            ease: "back.out(1.1)",
          },
          0.52
        )
        .to(
          caption,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.52
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
            trigger: panel.closest(".journey-scene__sticky"),
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
            trigger: copy.closest(".journey-scene__sticky"),
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
    if (prefersReducedMotion) return;

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
    const scale =
      window.innerWidth > 1100 ? 1.62 : window.innerWidth > 720 ? 1.34 : 1.12;
    const translateX = (0.5 - nodeX) * stageWidth * 0.96;
    const translateY = (0.42 - nodeY) * stageHeight * 0.86;

    if (withAnimation && !prefersReducedMotion) {
      gsap.to(atlasNetwork, {
        x: translateX,
        y: translateY,
        scale,
        duration: 0.75,
        ease: "power3.out",
      });

      gsap.fromTo(
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

    if (prefersReducedMotion) return;

    gsap.set(".atlas__intro > *", { opacity: 0, y: 36, scale: 0.96 });
    gsap.set("#atlas-details", {
      opacity: 0,
      y: 38,
      rotateY: -18,
      transformPerspective: 1200,
    });
    gsap.set(".atlas-node", {
      opacity: 0,
      y: 26,
      scale: 0.62,
      rotateZ: (_, target) =>
        target.dataset.node === "grid" || target.dataset.node === "control" ? -6 : 6,
    });

    gsap.to(".atlas__intro > *", {
      y: 0,
      opacity: 1,
      scale: 1,
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
      rotateY: 0,
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".atlas-stage",
        start: "top 72%",
      },
    });

    gsap.to(".atlas-node", {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      duration: 0.85,
      stagger: {
        each: 0.04,
        from: "random",
      },
      ease: "back.out(1.25)",
      scrollTrigger: {
        trigger: ".atlas-stage",
        start: "top 72%",
      },
    });
  }

  function initFinaleAnimation() {
    gsap.set(".finale__eyebrow", { opacity: 0, y: 26 });
    gsap.set(".finale__title", {
      opacity: 0,
      y: 46,
      scale: 0.92,
      rotateX: -22,
      transformPerspective: 1200,
    });
    gsap.set(".finale__body", { opacity: 0, y: 30 });
    gsap.set(".finale__actions", { opacity: 0, y: 32, scale: 0.96 });

    let hasPlayed = false;

    const play = () => {
      if (hasPlayed) return;
      hasPlayed = true;

      const tl = gsap.timeline();

      tl.to(".finale__eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      })
        .to(
          ".finale__title",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: "expo.out",
          },
          0.08
        )
        .to(
          ".finale__body",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0.24
        )
        .to(
          ".finale__actions",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.68,
            ease: "back.out(1.1)",
          },
          0.34
        );
    };

    window.addEventListener("voltex:finale-reveal", play, { once: true });
  }

  async function init() {
    initCursor();
    initFieldCanvas();

    const lenis = initLenis();
    initMenu(lenis);
    initAtlasExplorer(lenis);
    const scrollHandler = () => updateProgress();

    if (lenis) {
      lenis.on("scroll", () => {
        updateProgress();
        ScrollTrigger.update();
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
}
