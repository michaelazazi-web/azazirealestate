// Server entry used only at build time to pre-render static routes
// (see scripts/prerender.mjs). Not shipped to the browser.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Probate from "./pages/Probate.jsx";
import { PROBATE_META, PROBATE_FAQ } from "./pages/probateContent.js";

export const ROUTES = [
  { ...PROBATE_META, Component: Probate, faq: PROBATE_FAQ },
];

export function render(route) {
  const { Component } = route;
  return renderToString(
    <StaticRouter location={route.path}>
      <Component />
    </StaticRouter>
  );
}
