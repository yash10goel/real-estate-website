import { useEffect } from "react";

const DEFAULT_TITLE = "RKGC Group";

// Minimal per-route <title>/description setter — the project has no
// react-helmet-style solution yet, so this keeps things dependency-free.
// Restores the default title on unmount so other routes aren't affected.
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    const previousContent = meta?.getAttribute("content");
    if (description) {
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (meta && previousContent !== undefined) {
        if (previousContent === null) meta.removeAttribute("content");
        else meta.setAttribute("content", previousContent);
      }
    };
  }, [title, description]);
}
