import { LegalPage } from "./ui/LegalPage";
import { ANIMAL_LAW_DOC, PRIVACY_DOC, TERMS_DOC } from "./model/legal.content";

export const TermsPage = () => <LegalPage doc={TERMS_DOC} />;
export const PrivacyPage = () => <LegalPage doc={PRIVACY_DOC} />;
export const AnimalLawPage = () => <LegalPage doc={ANIMAL_LAW_DOC} />;
