import * as stylex from "@stylexjs/stylex";
import { styles } from "./LegalPage.styles";
import type { LegalDoc } from "../model/legal.content";

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

/** Shared layout for the static legal / info pages — an eyebrow, title, effective
 *  date, and structured sections. A "- " prefix renders a body line as a bullet. */
export const LegalPage = ({ doc }: { doc: LegalDoc }) => (
  <div {...stylex.props(styles.root)}>
    <header {...stylex.props(styles.header)}>
      <span {...stylex.props(styles.kicker)}>{doc.kicker}</span>
      <h1 {...stylex.props(styles.title)}>{doc.title}</h1>
      <span {...stylex.props(styles.effective)}>시행일: {formatDate(doc.effectiveDate)}</span>
    </header>

    {doc.intro && <p {...stylex.props(styles.intro)}>{doc.intro}</p>}

    {doc.sections.map((section) => (
      <section key={section.heading} {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.heading)}>{section.heading}</h2>
        {section.body.map((line, index) =>
          line.startsWith("- ") ? (
            <p key={index} {...stylex.props(styles.bullet)}>
              {line.slice(2)}
            </p>
          ) : (
            <p key={index} {...stylex.props(styles.paragraph)}>
              {line}
            </p>
          ),
        )}
      </section>
    ))}
  </div>
);
