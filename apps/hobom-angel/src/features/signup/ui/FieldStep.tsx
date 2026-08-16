import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./SignupFunnel.styles";
import type { SignupFormValues } from "../model/signup-form.model";

interface FieldStepProps {
  title: string;
  subtitle: string;
  /** The field this step owns; advancing validates just this one. */
  name: keyof SignupFormValues;
  cta: string;
  onNext: () => void | Promise<void>;
  loading?: boolean;
  children: ReactNode;
}

/** One step of the signup funnel: a single field plus a validate-then-advance CTA. */
export const FieldStep = ({ title, subtitle, name, cta, onNext, loading, children }: FieldStepProps) => {
  const { trigger } = useFormContext<SignupFormValues>();

  const handleNext = async () => {
    if (await trigger(name)) await onNext();
  };

  return (
    <div {...stylex.props(styles.step)}>
      <span {...stylex.props(styles.overline)}>JOIN HOBOM ANGEL</span>
      <h2 {...stylex.props(styles.title)}>{title}</h2>
      <p {...stylex.props(styles.subtitle)}>{subtitle}</p>

      <div {...stylex.props(styles.fields)}>{children}</div>

      <Hb.Button
        variant="primary"
        fullWidth
        loading={loading}
        onClick={() => void handleNext()}
        {...stylex.props(styles.submit)}
      >
        {cta}
      </Hb.Button>
    </div>
  );
};
