"use client";

import { useEffect, useState } from "react";
import VoltexPage from "../components/VoltexPage";
import PageContentSwitcher from "./page-content-switcher";
import VoltexBoot from "./voltex-boot";
import FinaleScenePortal from "./finale-scene-portal";

const STORAGE_KEY = "voltex-active-page";

export default function Page() {
  const [activePage, setActivePage] = useState("main");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedPage = window.localStorage.getItem(STORAGE_KEY);
    if (storedPage === "dummy") {
      setActivePage("dummy");
    }
  }, []);

  useEffect(() => {
    const isDummyPage = activePage === "dummy";
    document.body.classList.toggle("is-dummy-page-active", isDummyPage);
    window.localStorage.setItem(STORAGE_KEY, activePage);

    return () => {
      document.body.classList.remove("is-dummy-page-active");
    };
  }, [activePage]);

  useEffect(() => {
    document.body.classList.toggle("is-atlas-modal-open", isModalOpen);

    return () => {
      document.body.classList.remove("is-atlas-modal-open");
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <VoltexPage
        isAtlasSwitcherOpen={isModalOpen}
        onOpenAtlasSwitcher={() => setIsModalOpen(true)}
      />
      <VoltexBoot />
      <FinaleScenePortal />
      <PageContentSwitcher
        activePage={activePage}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectPage={(page) => {
          setActivePage(page);
          setIsModalOpen(false);
        }}
        onTogglePage={() =>
          setActivePage((currentPage) =>
            currentPage === "dummy" ? "main" : "dummy",
          )
        }
      />
    </>
  );
}
