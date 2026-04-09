"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const VoltexFinaleScene = dynamic(() => import("../components/VoltexFinaleScene"), {
  ssr: false,
});

const FINALE_DROP_DURATION_MS = 5000;

export default function FinaleScenePortal() {
  const [target, setTarget] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setTarget(document.getElementById("finale"));
  }, []);

  useEffect(() => {
    if (!target || hasStarted) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setHasStarted(true);
        target.classList.add("is-active");
        observer.disconnect();
      },
      { threshold: 0.45 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasStarted, target]);

  useEffect(() => {
    if (!target || !hasStarted) return undefined;

    const timeoutId = window.setTimeout(() => {
      target.classList.add("is-revealed");
      window.dispatchEvent(new CustomEvent("voltex:finale-reveal"));
    }, FINALE_DROP_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [hasStarted, target]);

  if (!target) return null;

  return createPortal(
    <div className="finale__scene" aria-hidden="true">
      {hasStarted ? <VoltexFinaleScene /> : null}
    </div>,
    target
  );
}
