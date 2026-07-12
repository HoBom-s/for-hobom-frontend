import * as stylex from "@stylexjs/stylex";
import { SessionAction } from "@/features/session";
import { PublicShell } from "@/shared/ui";
import { NAV } from "../model/landing.fixtures";
import { HeroSection } from "./HeroSection";
import { StatsSection } from "./StatsSection";
import { AnimalsSection } from "./AnimalsSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { CtaSection } from "./CtaSection";
import { styles } from "./LandingPage.styles";

const BRAND = (
  <>
    <span {...stylex.props(styles.brandIcon)} aria-hidden="true">
      🐾
    </span>
    호봄엔젤
  </>
);

export const LandingPage = () => (
  <PublicShell brand={BRAND} nav={NAV} actions={<SessionAction />}>
    <HeroSection />
    <StatsSection />
    <AnimalsSection />
    <HowItWorksSection />
    <CtaSection />
  </PublicShell>
);
