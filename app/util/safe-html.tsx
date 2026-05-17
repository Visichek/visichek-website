/**
 * Sanitize backend-supplied HTML (FAQ answers, footer copy, etc.) and
 * parse it into real React elements — no `dangerouslySetInnerHTML`.
 *
 * Two-step:
 *   1. `sanitize-html` strips anything outside a small allowlist
 *      (tags + attributes). Defense-in-depth: the content comes from
 *      our own admin backend, but a compromised admin account or a
 *      future copy-paste shouldn't be able to inject script.
 *   2. `html-react-parser` turns the sanitized HTML string into React
 *      nodes so React owns the resulting tree.
 */

import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import type { ReactNode } from "react";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "a",
  "ul",
  "ol",
  "li",
  "code",
  "pre",
  "blockquote",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
];

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    "*": [],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  // Force every link to open safely. `noopener noreferrer` blocks the
  // tab-nabbing class of attacks; `_blank` matches editorial intent
  // for "have an infrequently asked question?" mail links etc.
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      rel: "noopener noreferrer",
      target: "_blank",
    }),
  },
};

export function renderSafeHtml(html: string | null | undefined): ReactNode {
  if (!html) return null;
  const clean = sanitizeHtml(html, SANITIZE_OPTIONS);
  return parse(clean);
}
