import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "u",
  "s",
  "h1",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "a",
  "hr",
];

const ALLOWED_ATTRS = ["href", "target", "rel"];

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
    node.setAttribute("rel", "noopener noreferrer");
  }
});

/**
 * DOMPurify 기반 HTML 새니타이저.
 *
 * - 허용 태그: p, br, strong, em, u, s, h1-h3, ul, ol, li, blockquote, pre, code, a, hr
 * - 허용 속성: href, target, rel (data-* 속성 차단)
 * - `target="_blank"` 링크에 `rel="noopener noreferrer"` 자동 부여 (tab-nabbing 방어)
 */
export const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ALLOWED_ATTRS,
    ALLOW_DATA_ATTR: false,
  });
