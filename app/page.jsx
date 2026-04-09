import fs from "node:fs";
import path from "node:path";
import VoltexBoot from "./voltex-boot";
import FinaleScenePortal from "./finale-scene-portal";

function getVoltexBodyMarkup() {
  const html = fs.readFileSync(path.join(process.cwd(), "voltex.html"), "utf8");
  const bodyStart = html.indexOf("<body>");
  const scriptStart = html.indexOf(
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>'
  );

  if (bodyStart === -1 || scriptStart === -1) {
    throw new Error("Unable to extract VOLTEX body markup from voltex.html");
  }

  return html.slice(bodyStart + "<body>".length, scriptStart).trim();
}

export default function Page() {
  return (
    <>
      <div
        style={{ display: "contents" }}
        dangerouslySetInnerHTML={{ __html: getVoltexBodyMarkup() }}
      />
      <VoltexBoot />
      <FinaleScenePortal />
    </>
  );
}
