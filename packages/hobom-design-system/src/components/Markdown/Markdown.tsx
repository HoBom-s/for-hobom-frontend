import type { CSSProperties } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import * as stylex from "@stylexjs/stylex";
import { Text } from "../Text/Text";
import { Link } from "../Link/Link";

interface MarkdownProps {
  /** The Markdown source string. Rendered safely (no raw HTML executed). */
  children: string;
  className?: string;
  style?: CSSProperties;
}

// The single audited sanitize policy for untrusted, user-authored Markdown.
// Starts from rehype-sanitize's `defaultSchema` (which already strips <script>,
// event handlers, and raw HTML the way GitHub does), then narrows the allowed
// anchor `href` protocols to http/https/mailto — so `javascript:` and `data:`
// URLs are dropped rather than rendered.
const schema = {
  ...defaultSchema,
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto"],
  },
};

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  list: {
    margin: 0,
    paddingInlineStart: 24,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  code: {
    fontFamily: "'SFMono-Regular', 'Menlo', 'Consolas', monospace",
    fontSize: "0.85em",
    backgroundColor: "var(--hb-color-canvas)",
    borderRadius: 4,
    paddingBlock: 2,
    paddingInline: 4,
  },
  pre: {
    margin: 0,
    overflowX: "auto",
    fontFamily: "'SFMono-Regular', 'Menlo', 'Consolas', monospace",
    fontSize: "0.85em",
    backgroundColor: "var(--hb-color-canvas)",
    borderRadius: 8,
    padding: 12,
  },
});

// Map the common prose nodes to DS typography. Unmapped nodes fall back to
// react-markdown defaults, which are still passed through the sanitizer above.
const components: Components = {
  p: ({ children }) => (
    <Text variant="body1" component="p">
      {children}
    </Text>
  ),
  a: ({ href, children }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  ),
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  h1: ({ children }) => (
    <Text variant="h5" component="h1">
      {children}
    </Text>
  ),
  h2: ({ children }) => (
    <Text variant="h6" component="h2">
      {children}
    </Text>
  ),
  h3: ({ children }) => (
    <Text variant="h6" component="h3">
      {children}
    </Text>
  ),
  h4: ({ children }) => (
    <Text variant="h6" component="h4">
      {children}
    </Text>
  ),
  h5: ({ children }) => (
    <Text variant="h6" component="h5">
      {children}
    </Text>
  ),
  h6: ({ children }) => (
    <Text variant="h6" component="h6">
      {children}
    </Text>
  ),
  ul: ({ children }) => <ul {...stylex.props(styles.list)}>{children}</ul>,
  ol: ({ children }) => <ol {...stylex.props(styles.list)}>{children}</ol>,
  li: ({ children }) => (
    <Text variant="body1" component="li">
      {children}
    </Text>
  ),
  code: ({ children }) => <code {...stylex.props(styles.code)}>{children}</code>,
  pre: ({ children }) => <pre {...stylex.props(styles.pre)}>{children}</pre>,
};

/**
 * The single audited boundary for rendering untrusted, user-authored Markdown
 * (shelter intros, visit/support guides). Content is treated as a stored-XSS
 * risk: GFM is enabled, raw HTML is never executed, output is sanitized, and
 * link protocols are restricted to http/https/mailto. Use this for any
 * user-authored Markdown rather than rendering it yourself.
 */
export const Markdown = ({ children, className, style }: MarkdownProps) => {
  if (children.trim() === "") return null;

  const sx = stylex.props(styles.root);

  return (
    <div
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, schema]]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
