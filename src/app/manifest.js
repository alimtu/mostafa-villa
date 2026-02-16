export default function manifest() {
  return {
    name: "Ali Montazerion - Portfolio",
    short_name: "Ali M",
    description:
      "Senior Front-End Engineer with over 6 years of experience specializing in building scalable web and mobile applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#f0f9ff",
    theme_color: "#0284c7",
    orientation: "portrait",
    icons: [
      {
        src: "/ali.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/ali.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    categories: ["portfolio", "personal"],
    lang: "en",
    dir: "ltr",
  };
}
