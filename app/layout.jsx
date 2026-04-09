import "./globals.css";

const loaderBootScript = `
  try {
    if (window.localStorage.getItem("voltex-loader-seen") === "1") {
      document.documentElement.classList.add("has-seen-voltex-loader");
    }
  } catch (error) {}
`;

export const metadata = {
  title: "VOLTEX — Power. Transmitted.",
  description:
    "An immersive green-tinted transmission atlas following Nigeria's power grid from generation to national control.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderBootScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:wght@500;600&family=Rajdhani:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
