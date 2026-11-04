// Post-build step: turns client-rendered routes into real static HTML so
// search engines and AI crawlers (which often don't run JavaScript) can read them.
//
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.jsx`.
// For each route it writes dist/<route>/index.html with the page's text,
// title, description, canonical URL, and structured data baked in.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://azazirealestate.com";
const distDir = path.join(root, "dist");
const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
const { ROUTES, render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

for (const route of ROUTES) {
  const url = SITE + route.path;
  const appHtml = render(route);

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url + "#webpage",
      url,
      name: route.title,
      description: route.description,
      isPartOf: { "@id": SITE + "/#website" },
      about: { "@id": SITE + "/#agent" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: route.title.split(" | ")[0], item: url },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Probate and inherited property sales",
      serviceType: "Probate real estate representation",
      provider: { "@id": SITE + "/#agent" },
      areaServed: [
        { "@type": "City", name: "Charlotte, NC" },
        { "@type": "AdministrativeArea", name: "Mecklenburg County, NC" },
        { "@type": "AdministrativeArea", name: "North Carolina" },
        { "@type": "AdministrativeArea", name: "South Carolina" },
      ],
      url,
    },
  ];
  if (route.faq?.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: route.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  let html = template;
  // Drop the homepage-only structured data and noscript fallback; this page carries its own.
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "");
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>\s*/, "");
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.description)}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`);
  const ldTags = ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n    ");
  html = html.replace("</head>", `    ${ldTags}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const outDir = path.join(distDir, route.path.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  console.log(`prerendered ${route.path} -> ${path.relative(root, path.join(outDir, "index.html"))}`);
}
