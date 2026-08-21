import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { ROUTES } from "@/shared/config";
import { styles } from "./GlobalFooter.styles";

const YEAR = new Date().getFullYear();

interface FooterLink {
  label: string;
  /** When omitted, the item renders as a non-navigable placeholder (its
   *  destination isn't built yet), matching the design mockup. */
  to?: string;
}

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "둘러보기",
    links: [
      { label: "입양하기", to: ROUTES.ANIMALS },
      { label: "임시보호", to: ROUTES.FOSTER },
      { label: "봉사활동", to: ROUTES.VOLUNTEER },
      { label: "보호소 찾기", to: ROUTES.SHELTERS },
    ],
  },
  {
    heading: "지원",
    links: [
      { label: "공지사항" },
      { label: "자주 묻는 질문" },
      { label: "구조·학대 제보" },
      { label: "1:1 문의", to: ROUTES.INQUIRIES },
    ],
  },
  {
    heading: "보호소·기관",
    links: [
      { label: "보호소 등록 신청", to: ROUTES.SHELTER_REGISTER },
      { label: "관리 콘솔", to: ROUTES.CONSOLE },
      { label: "운영 정책" },
    ],
  },
];

const LEGAL: FooterLink[] = [
  { label: "이용약관", to: ROUTES.TERMS },
  { label: "개인정보처리방침", to: ROUTES.PRIVACY },
  { label: "동물보호법 고지", to: ROUTES.ANIMAL_LAW },
];

const FooterItem = ({ label, to }: FooterLink) =>
  to ? (
    <Link to={to} {...stylex.props(styles.link)}>
      {label}
    </Link>
  ) : (
    <span {...stylex.props(styles.link)}>{label}</span>
  );

/** Desktop-only global footer (§0.5) — a dark, four-column footer with a brand
 *  block and a legal bar. Hidden on mobile, where the bottom tab navigates. */
export const GlobalFooter = () => (
  <footer {...stylex.props(styles.root)}>
    <div {...stylex.props(styles.top)}>
      <div {...stylex.props(styles.brand)}>
        <div {...stylex.props(styles.brandRow)}>
          <span {...stylex.props(styles.brandName)}>호봄엔젤</span>
        </div>
        <p {...stylex.props(styles.brandDesc)}>
          유기동물의 새로운 시작을 잇는 따뜻한 다리. 입양·임시보호·봉사로 함께해요.
        </p>
      </div>

      {COLUMNS.map((column) => (
        <nav key={column.heading} aria-label={column.heading}>
          <h2 {...stylex.props(styles.colHeading)}>{column.heading}</h2>
          <div {...stylex.props(styles.colLinks)}>
            {column.links.map((link) => (
              <FooterItem key={link.label} {...link} />
            ))}
          </div>
        </nav>
      ))}
    </div>

    <div {...stylex.props(styles.bottom)}>
      <div {...stylex.props(styles.bottomInner)}>
        <nav {...stylex.props(styles.legal)} aria-label="약관 및 정보">
          {LEGAL.map((link) => (
            <FooterItem key={link.label} {...link} />
          ))}
        </nav>
        <span {...stylex.props(styles.copyright)}>
          © {YEAR} HoBom Angel · 비영리 유기동물 입양 플랫폼
        </span>
      </div>
    </div>
  </footer>
);
