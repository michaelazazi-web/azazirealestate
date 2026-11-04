import { useEffect } from "react";

// Sets the document title and meta description for a given route.
// Client-side routing means the static HTML only carries the homepage's
// meta tags, so this backfills them for real browsers and any crawler
// that executes JS. It also restores the homepage defaults on unmount.
export default function useDocMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaEl = document.querySelector('meta[name="description"]');
    const prevDescription = metaEl ? metaEl.getAttribute("content") : null;

    document.title = title;
    if (metaEl && description) metaEl.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (metaEl && prevDescription) metaEl.setAttribute("content", prevDescription);
    };
  }, [title, description]);
}
