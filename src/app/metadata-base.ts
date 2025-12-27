export const metadataBase = new URL("https://monicxed.vercel.app");

export const siteName = "Monicx";

const ogImages = [
  "/og/monicx-og-default-1.jpeg",
  "/og/monicx-og-default-2.png",
  "/og/monicx-og-default-3.jpeg",
  "/og/monicx-og-default.jpeg",
];

export const defaultOGImage =
  ogImages[Math.floor(Math.random() * ogImages.length)];
