import { HeroSection } from "./HeroSection";
import { StatsSection } from "./StatsSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { CtaSection } from "./CtaSection";

/** The marketing landing — the only public consumer screen. Chrome comes from
 *  the ConsumerShellLayout (GlobalNav), so this renders just the sections. */
export const LandingPage = () => (
  <>
    <HeroSection />
    <StatsSection />
    <HowItWorksSection />
    <CtaSection />
  </>
);
