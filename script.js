const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const body = document.body;
const header = document.querySelector(".site-header");
const progressFill = document.querySelector(".progress-fill");
const cursorHalo = document.querySelector(".cursor-halo");
const sectionLabels = [...document.querySelectorAll("section[id], section[data-theme]")];
const miniHudValue = document.querySelector(".mini-hud__value");
const heroLines = [...document.querySelectorAll(".headline-line")];
const manifestoLines = [...document.querySelectorAll(".manifesto-line")];
const signalCards = [...document.querySelectorAll(".signal-card")];
const starfield = document.querySelector(".starfield");

if (cursorHalo && !prefersReducedMotion && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorHalo.style.opacity = "1";
    cursorHalo.style.left = `${event.clientX}px`;
    cursorHalo.style.top = `${event.clientY}px`;
  });
}

const updateTheme = () => {
  const triggerLine = header.getBoundingClientRect().bottom + 32;
  const current = sectionLabels.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= triggerLine && rect.bottom >= triggerLine;
  });

  if (!current) return;

  body.classList.toggle("theme-light", current.dataset.theme === "light");
  if (current.id && miniHudValue) miniHudValue.textContent = current.id.replace(/-/g, " ");
};

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressFill.style.width = `${progress}%`;
};

const buildStarfield = () => {
  if (!starfield) return;

  const context = starfield.getContext("2d");
  const points = [];
  let width = 0;
  let height = 0;
  let rafId = 0;
  let pointerX = 0;
  let pointerY = 0;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    starfield.width = width * window.devicePixelRatio;
    starfield.height = height * window.devicePixelRatio;
    starfield.style.width = `${width}px`;
    starfield.style.height = `${height}px`;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    points.length = 0;

    const total = Math.max(36, Math.round(width / 34));
    for (let index = 0; index < total; index += 1) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.45,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      });
    }
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);

    for (const point of points) {
      point.x += point.vx + window.scrollY * 0.00002;
      point.y += point.vy;

      if (point.x < -40) point.x = width + 40;
      if (point.x > width + 40) point.x = -40;
      if (point.y < -40) point.y = height + 40;
      if (point.y > height + 40) point.y = -40;

      const dx = pointerX - point.x;
      const dy = pointerY - point.y;
      const distance = Math.hypot(dx, dy);
      const alpha = Math.max(0.05, 1 - distance / 280);

      context.beginPath();
      context.fillStyle = `rgba(255,255,255,${alpha * 0.45})`;
      context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      context.fill();
    }

    for (let index = 0; index < points.length; index += 1) {
      const current = points[index];
      const next = points[index + 1];
      if (!next) continue;

      const distance = Math.hypot(current.x - next.x, current.y - next.y);
      if (distance > 150) continue;

      context.beginPath();
      context.strokeStyle = `rgba(111,89,255,${1 - distance / 150})`;
      context.lineWidth = 0.55;
      context.moveTo(current.x, current.y);
      context.lineTo(next.x, next.y);
      context.stroke();
    }

    rafId = requestAnimationFrame(draw);
  };

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  });

  window.addEventListener("resize", resize);
  resize();
  draw();

  return () => cancelAnimationFrame(rafId);
};

const applyPointerTilt = () => {
  const hero = document.querySelector(".hero");
  const manifesto = document.querySelector(".manifesto-wall");
  if (!hero || prefersReducedMotion) return;

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroLines.forEach((line, index) => {
      const depth = Number(line.dataset.depth || 1);
      const xMove = x * 44 * depth;
      const yMove = y * 28 * depth;
      line.style.transform = `translate3d(${xMove}px, ${yMove}px, 0) rotate(${x * 4.5}deg) skewX(${x * 10}deg)`;
    });

    if (manifesto) {
      manifesto.style.transform = `rotate(${x * -2.5}deg) skewY(${y * 3}deg)`;
    }
  });

  hero.addEventListener("pointerleave", () => {
    heroLines.forEach((line) => {
      line.style.transform = "";
    });

    if (manifesto) manifesto.style.transform = "";
  });
};

const initSignalCards = () => {
  signalCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      const video = card.querySelector(".signal-card__video");
      if (video) video.style.clipPath = `circle(var(--reveal, 0%) at ${x}% ${y}%)`;
    });

    card.addEventListener("pointerenter", () => {
      const video = card.querySelector(".signal-card__video");
      if (video && video.paused) video.play().catch(() => {});
    });
  });
};

const initScrollMotion = () => {
  if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  heroLines.forEach((line, index) => {
    gsap.to(line, {
      yPercent: index % 2 === 0 ? -14 - index * 2 : 10 + index * 2,
      xPercent: index % 2 === 0 ? 3 : -3,
      rotate: index % 2 === 0 ? -2.5 : 2.5,
      skewX: index % 2 === 0 ? -8 : 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  gsap.to(".core-shell", {
    scale: 1.22,
    rotate: 18,
    yPercent: -8,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.fromTo(
    ".diagonal-shell",
    {
      xPercent: 28,
      yPercent: 40,
      scale: 0.34,
      rotate: 18,
      transformOrigin: "bottom right",
    },
    {
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      rotate: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".diagonal-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    ".diagonal-text span",
    { yPercent: 40, opacity: 0.18 },
    {
      yPercent: 0,
      opacity: 0.35,
      stagger: 0.08,
      ease: "none",
      scrollTrigger: {
        trigger: ".diagonal-section",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    }
  );

  manifestoLines.forEach((line, index) => {
    gsap.fromTo(
      line,
      {
        xPercent: index % 2 === 0 ? -8 : 8,
        rotate: index % 2 === 0 ? -3 : 3,
      },
      {
        xPercent: index % 2 === 0 ? 8 : -8,
        rotate: index % 2 === 0 ? 3 : -3,
        scaleX: index % 2 === 0 ? 1.08 : 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  signalCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        yPercent: index % 2 === 0 ? 22 : -18,
        rotate: index % 2 === 0 ? -6 : 6,
      },
      {
        yPercent: index % 2 === 0 ? -18 : 14,
        rotate: index % 2 === 0 ? 6 : -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  gsap.from(".metric-card", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".metrics-grid",
      start: "top 80%",
    },
  });

  gsap.from(".partners-list span", {
    xPercent: -12,
    opacity: 0,
    stagger: 0.06,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".partners-list",
      start: "top 75%",
    },
  });
};

const initLenis = () => {
  if (!window.Lenis || prefersReducedMotion) return;

  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    wheelMultiplier: 0.92,
    touchMultiplier: 1.2,
  });

  lenis.on("scroll", () => {
    updateTheme();
    updateProgress();
    if (window.ScrollTrigger) window.ScrollTrigger.update();
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
};

window.addEventListener("scroll", () => {
  updateTheme();
  updateProgress();
});

window.addEventListener("resize", updateTheme);

buildStarfield();
applyPointerTilt();
initSignalCards();
initScrollMotion();
initLenis();
updateTheme();
updateProgress();
