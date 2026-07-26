import { HeroSection } from "./HeroSection";
import { StatsSection } from "./StatsSection";
import { AnimalsSection } from "./AnimalsSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { CtaSection } from "./CtaSection";

/** The marketing landing — the only public consumer screen. Chrome comes from
 *  the ConsumerShellLayout (GlobalNav), so this renders just the sections. */
export const LandingPage = () => (
  <>
    <HeroSection />
    <StatsSection />
    <AnimalsSection />
    <HowItWorksSection />
    <CtaSection />
  </>
);
