"use client";

import { useEffect } from "react";
import { initVoltex } from "./voltex-runtime";

export default function VoltexBoot() {
  useEffect(() => {
    initVoltex();
  }, []);

  return null;
}
