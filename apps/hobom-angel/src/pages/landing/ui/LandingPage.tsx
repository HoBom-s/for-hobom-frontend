import * as stylex from "@stylexjs/stylex";
import { AngelButton, AnimalCard, PublicShell } from "hobom-design-system";
import type { PublicShellNavItem } from "hobom-design-system";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

const NAV: PublicShellNavItem[] = [
  { label: "동물 찾기", href: "#animals" },
  { label: "봉사활동", href: "#volunteer" },
  { label: "보호소", href: "#shelters" },
  { label: "소식", href: "#news" },
];

const STATS = [
  { value: "1,840", label: "함께한 입양" },
  { value: "96곳", label: "파트너 보호소" },
  { value: "4,200", label: "봉사 참여" },
];

const ANIMALS = [
  { name: "봄이", meta: "2살 · 암컷 · 소형", shelter: "서울보호소" },
  { name: "초코", meta: "3살 · 수컷 · 중형", shelter: "경기보호소" },
  { name: "하양", meta: "1살 · 암컷 · 소형", shelter: "인천보호소" },
  { name: "바다", meta: "4살 · 수컷 · 대형", shelter: "부산보호소" },
];

const STEPS = [
  { icon: "🔍", n: "01", title: "친구 찾기", desc: "지역·나이·성격으로 나와 맞는 아이를 찾아보세요." },
  { icon: "📝", n: "02", title: "신청서 작성", desc: "보호소의 간단한 사전 설문에 답하고 신청해요." },
  { icon: "🤝", n: "03", title: "만남과 입양", desc: "보호소 검토 후 만남을 거쳐 가족이 됩니다." },
];

const FOOTER_GROUPS = [
  { title: "서비스", links: ["동물 찾기", "봉사활동", "보호소 등록"] },
  { title: "안내", links: ["이용약관", "개인정보처리방침", "자주 묻는 질문"] },
  { title: "문의", links: ["고객센터", "제휴 문의", "제보하기"] },
];

const styles = stylex.create({
  container: { maxWidth: 1200, marginInline: "auto", paddingInline: 20 },

  // ── Hero ──────────────────────────────────────────────
  hero: {
    position: "relative",
    overflow: "hidden",
    backgroundImage:
      "radial-gradient(90% 120% at 15% 0%, var(--hb-angel-green-tint) 0%, var(--hb-angel-surface) 60%)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-angel-line)",
  },
  blob: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 360,
    height: 360,
    borderRadius: "50%",
    backgroundColor: "var(--hb-angel-green-tint-strong)",
    filter: "blur(40px)",
    opacity: 0.6,
    pointerEvents: "none",
  },
  heroGrid: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1.05fr 0.95fr" },
    alignItems: "center",
    gap: { default: 40, [DESKTOP]: 56 },
    paddingBlock: { default: "56px 64px", [DESKTOP]: "88px 96px" },
  },
  heroCopy: { textAlign: { default: "center", [DESKTOP]: "left" } },
  eyebrow: {
    display: "inline-block",
    paddingBlock: 6,
    paddingInline: 14,
    borderRadius: 999,
    backgroundColor: "var(--hb-angel-green-tint-strong)",
    color: "var(--hb-angel-green-dark)",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
  },
  heroTitle: {
    margin: 0,
    marginTop: 20,
    fontSize: { default: "36px", [TABLET]: "48px", [DESKTOP]: "60px" },
    lineHeight: 1.18,
    fontWeight: 800,
    letterSpacing: "-0.025em",
    color: "var(--hb-angel-ink)",
  },
  heroLead: {
    margin: 0,
    marginTop: 20,
    marginInline: { default: "auto", [DESKTOP]: 0 },
    maxWidth: 480,
    fontSize: "1.0625rem",
    lineHeight: 1.7,
    color: "var(--hb-angel-ink-soft)",
  },
  heroCta: {
    marginTop: 32,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: { default: "center", [DESKTOP]: "flex-start" },
    gap: 12,
  },
  trust: {
    marginTop: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "center", [DESKTOP]: "flex-start" },
    gap: 12,
  },
  avatars: { display: "flex" },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    backgroundColor: "var(--hb-angel-green-tint)",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "var(--hb-angel-surface)",
    marginLeft: -10,
  },
  avatarFirst: { marginLeft: 0 },
  trustText: { fontSize: "0.875rem", color: "var(--hb-angel-ink-soft)" },
  trustStrong: { fontWeight: 700, color: "var(--hb-angel-ink)" },

  // ── Hero visual ───────────────────────────────────────
  visual: { position: "relative", display: { default: "none", [TABLET]: "block" } },
  visualCard: {
    aspectRatio: { default: "16 / 10", [DESKTOP]: "4 / 4.4" },
    borderRadius: 28,
    backgroundImage:
      "linear-gradient(160deg, var(--hb-angel-green-tint) 0%, var(--hb-angel-green) 130%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "96px",
    boxShadow: "0 24px 60px rgba(46, 75, 57, 0.18)",
  },
  floatCard: {
    position: "absolute",
    left: -18,
    bottom: 28,
    display: { default: "none", [DESKTOP]: "flex" },
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    borderRadius: 16,
    backgroundColor: "var(--hb-angel-surface)",
    boxShadow: "0 12px 32px rgba(46, 75, 57, 0.16)",
  },
  floatAvatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.125rem",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  floatName: { margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "var(--hb-angel-ink)" },
  floatSub: { margin: 0, fontSize: "0.75rem", color: "var(--hb-angel-green-dark)", fontWeight: 600 },
  floatChip: {
    position: "absolute",
    top: 22,
    right: -14,
    display: { default: "none", [DESKTOP]: "inline-flex" },
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 999,
    backgroundColor: "var(--hb-angel-surface)",
    fontSize: "0.8125rem",
    fontWeight: 700,
    color: "var(--hb-angel-ink)",
    boxShadow: "0 10px 28px rgba(46, 75, 57, 0.14)",
  },

  // ── Stats band ────────────────────────────────────────
  statsBand: { borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "var(--hb-angel-line)" },
  statsRow: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingInline: 20,
    paddingBlock: 32,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  statItem: {
    textAlign: "center",
    borderLeftWidth: { default: 0, [TABLET]: 1 },
    borderLeftStyle: "solid",
    borderLeftColor: "var(--hb-angel-line)",
  },
  statItemFirst: { borderLeftWidth: 0 },
  statValue: {
    fontSize: { default: "1.5rem", [TABLET]: "2rem" },
    fontWeight: 800,
    color: "var(--hb-angel-green-deep)",
    fontVariantNumeric: "tabular-nums",
  },
  statLabel: { marginTop: 6, fontSize: { default: "0.75rem", [TABLET]: "0.875rem" }, color: "var(--hb-angel-ink-soft)" },

  // ── Generic section ───────────────────────────────────
  section: { paddingBlock: { default: 56, [DESKTOP]: 80 } },
  sectionMuted: {
    paddingBlock: { default: 56, [DESKTOP]: 80 },
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  head: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 28,
  },
  headCenter: { textAlign: "center", marginBottom: 40 },
  title: { margin: 0, fontSize: { default: "1.5rem", [DESKTOP]: "1.875rem" }, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--hb-angel-ink)" },
  subtitle: { margin: 0, marginTop: 12, fontSize: "1rem", color: "var(--hb-angel-ink-soft)" },
  more: { fontSize: "0.875rem", fontWeight: 600, color: "var(--hb-angel-green-dark)", whiteSpace: "nowrap" },

  animals: {
    display: "grid",
    gridTemplateColumns: { default: "repeat(2, 1fr)", [DESKTOP]: "repeat(4, 1fr)" },
    gap: { default: 14, [TABLET]: 20 },
  },

  steps: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "repeat(3, 1fr)" },
    gap: 20,
  },
  step: {
    position: "relative",
    backgroundColor: "var(--hb-angel-surface)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-angel-line)",
    borderRadius: 20,
    padding: "32px 24px",
    textAlign: "center",
  },
  stepIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "var(--hb-angel-green-tint)",
    fontSize: "1.75rem",
  },
  stepN: { marginTop: 16, fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.1em", color: "var(--hb-angel-green)" },
  stepTitle: { margin: 0, marginTop: 6, fontSize: "1.125rem", fontWeight: 700, color: "var(--hb-angel-ink)" },
  stepDesc: { margin: 0, marginTop: 8, fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--hb-angel-ink-soft)" },

  // ── CTA ───────────────────────────────────────────────
  cta: { paddingBlock: { default: 8, [DESKTOP]: 24 }, paddingInline: 20 },
  ctaInner: {
    maxWidth: 1200,
    marginInline: "auto",
    position: "relative",
    overflow: "hidden",
    padding: { default: "48px 28px", [DESKTOP]: "72px 40px" },
    borderRadius: 28,
    backgroundImage: "linear-gradient(135deg, var(--hb-angel-green) 0%, var(--hb-angel-green-deep) 100%)",
    textAlign: "center",
    color: "#ffffff",
  },
  ctaTitle: { margin: 0, fontSize: { default: "1.5rem", [DESKTOP]: "2rem" }, fontWeight: 800, letterSpacing: "-0.02em" },
  ctaLead: { margin: 0, marginTop: 12, marginBottom: 28, fontSize: "1rem", color: "rgba(255,255,255,0.85)" },

  // ── Footer ────────────────────────────────────────────
  footer: {
    display: "flex",
    flexDirection: { default: "column", [DESKTOP]: "row" },
    justifyContent: "space-between",
    gap: 32,
  },
  footerBrand: { fontWeight: 800, fontSize: "1.125rem", color: "var(--hb-angel-green-deep)" },
  footerTagline: { margin: 0, marginTop: 12, fontSize: "0.875rem", color: "var(--hb-angel-ink-soft)" },
  footerGroups: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    flex: { default: "none", [DESKTOP]: 1 },
    maxWidth: { default: "none", [DESKTOP]: 560 },
  },
  footerTitle: { margin: 0, marginBottom: 12, fontSize: "0.8125rem", fontWeight: 700, color: "var(--hb-angel-ink)" },
  footerLink: {
    display: "block",
    paddingBlock: 5,
    fontSize: "0.875rem",
    color: { default: "var(--hb-angel-ink-soft)", ":hover": "var(--hb-angel-green-dark)" },
  },
});

const HeroSection = () => (
  <section {...stylex.props(styles.hero)} id="top">
    <span {...stylex.props(styles.blob)} aria-hidden="true" />
    <div {...stylex.props(styles.container, styles.heroGrid)}>
      <div {...stylex.props(styles.heroCopy)}>
        <span {...stylex.props(styles.eyebrow)}>HAPPINESS FOR ANIMALS</span>
        <h1 {...stylex.props(styles.heroTitle)}>
          좋은 만남은
          <br />
          서두르지 않아요.
        </h1>
        <p {...stylex.props(styles.heroLead)}>
          임시보호와 입양으로 한 생명에게 새로운 봄을 선물하세요. 보호소와 함께 천천히, 신중하게
          가족을 이어드립니다.
        </p>
        <div {...stylex.props(styles.heroCta)}>
          <AngelButton variant="primary">동물 만나보기</AngelButton>
          <AngelButton variant="outline">봉사 지원하기</AngelButton>
        </div>
        <div {...stylex.props(styles.trust)}>
          <div {...stylex.props(styles.avatars)} aria-hidden="true">
            {["🐶", "🐱", "🐰", "🐕"].map((emoji, index) => (
              <span key={emoji} {...stylex.props(styles.avatar, index === 0 && styles.avatarFirst)}>
                {emoji}
              </span>
            ))}
          </div>
          <p {...stylex.props(styles.trustText)}>
            <span {...stylex.props(styles.trustStrong)}>1,840</span>명의 가족이 함께하고 있어요
          </p>
        </div>
      </div>

      <div {...stylex.props(styles.visual)} aria-hidden="true">
        <div {...stylex.props(styles.visualCard)}>🐕</div>
        <span {...stylex.props(styles.floatChip)}>🐾 96개 보호소 함께</span>
        <div {...stylex.props(styles.floatCard)}>
          <span {...stylex.props(styles.floatAvatar)}>🐶</span>
          <div>
            <p {...stylex.props(styles.floatName)}>봄이</p>
            <p {...stylex.props(styles.floatSub)}>방금 가족을 만났어요 ✓</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <div {...stylex.props(styles.statsBand)}>
    <div {...stylex.props(styles.statsRow)}>
      {STATS.map((stat, index) => (
        <div key={stat.label} {...stylex.props(styles.statItem, index === 0 && styles.statItemFirst)}>
          <div {...stylex.props(styles.statValue)}>{stat.value}</div>
          <div {...stylex.props(styles.statLabel)}>{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const AnimalsSection = () => (
  <section {...stylex.props(styles.section)} id="animals">
    <div {...stylex.props(styles.container)}>
      <header {...stylex.props(styles.head)}>
        <h2 {...stylex.props(styles.title)}>지금 만날 수 있는 친구들</h2>
        <a href="#animals" {...stylex.props(styles.more)}>
          전체 보기 →
        </a>
      </header>
      <div {...stylex.props(styles.animals)}>
        {ANIMALS.map((animal) => (
          <AnimalCard
            key={animal.name}
            name={animal.name}
            meta={animal.meta}
            shelter={animal.shelter}
            status="입양가능"
          />
        ))}
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section {...stylex.props(styles.sectionMuted)} id="how">
    <div {...stylex.props(styles.container)}>
      <header {...stylex.props(styles.headCenter)}>
        <h2 {...stylex.props(styles.title)}>이렇게 진행돼요</h2>
        <p {...stylex.props(styles.subtitle)}>처음이어도 괜찮아요. 세 단계면 충분합니다.</p>
      </header>
      <ol {...stylex.props(styles.steps)}>
        {STEPS.map((step) => (
          <li key={step.n} {...stylex.props(styles.step)}>
            <span {...stylex.props(styles.stepIcon)} aria-hidden="true">
              {step.icon}
            </span>
            <div {...stylex.props(styles.stepN)}>STEP {step.n}</div>
            <h3 {...stylex.props(styles.stepTitle)}>{step.title}</h3>
            <p {...stylex.props(styles.stepDesc)}>{step.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const CtaSection = () => (
  <section {...stylex.props(styles.cta)}>
    <div {...stylex.props(styles.ctaInner)}>
      <h2 {...stylex.props(styles.ctaTitle)}>오늘, 한 생명의 봄이 되어주세요</h2>
      <p {...stylex.props(styles.ctaLead)}>지금 만날 수 있는 친구들이 기다리고 있어요.</p>
      <AngelButton variant="onDark">지금 시작하기</AngelButton>
    </div>
  </section>
);

const Footer = () => (
  <div {...stylex.props(styles.footer)}>
    <div>
      <div {...stylex.props(styles.footerBrand)}>🐾 HoBom Angel</div>
      <p {...stylex.props(styles.footerTagline)}>한 생명의 봄이 되어주세요.</p>
    </div>
    <div {...stylex.props(styles.footerGroups)}>
      {FOOTER_GROUPS.map((group) => (
        <div key={group.title}>
          <h3 {...stylex.props(styles.footerTitle)}>{group.title}</h3>
          {group.links.map((link) => (
            <a key={link} href="#top" {...stylex.props(styles.footerLink)}>
              {link}
            </a>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const LandingPage = () => (
  <PublicShell
    nav={NAV}
    actions={
      <AngelButton variant="ghost" size="small">
        로그인
      </AngelButton>
    }
    footer={<Footer />}
  >
    <HeroSection />
    <StatsSection />
    <AnimalsSection />
    <HowItWorksSection />
    <CtaSection />
  </PublicShell>
);
