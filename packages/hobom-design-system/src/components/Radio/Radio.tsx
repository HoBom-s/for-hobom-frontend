import {
  createContext,
  useId,
  type ChangeEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import * as stylex from "@stylexjs/stylex";

export interface RadioGroupContextValue {
  value: unknown;
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  name: string;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

const styles = stylex.create({
  group: { display: "flex", flexDirection: "column" },
  radio: {
    accentColor: "var(--hb-color-accent)",
    cursor: "pointer",
    margin: 0,
    flexShrink: 0,
  },
  medium: { width: 20, height: 20 },
  small: { width: 16, height: 16 },
  disabled: { cursor: "default" },
});

const cx = (a: string | undefined, b: string | undefined): string | undefined =>
  [a, b].filter(Boolean).join(" ") || undefined;

interface GroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: unknown;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  name?: string;
  children?: ReactNode;
}

const Group = ({ value, onChange, name, className, style, children, ...rest }: GroupProps) => {
  const generatedName = useId();
  const sx = stylex.props(styles.group);

  return (
    <RadioGroupContext.Provider
      value={{ value, onChange: onChange ?? (() => {}), name: name ?? generatedName }}
    >
      <div
        role="radiogroup"
        {...rest}
        className={cx(sx.className, className)}
        style={{ ...sx.style, ...style }}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

interface RootProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "small" | "medium";
}

const Root = ({ size = "medium", disabled = false, className, style, ...rest }: RootProps) => {
  const sx = stylex.props(
    styles.radio,
    size === "small" ? styles.small : styles.medium,
    disabled && styles.disabled,
  );

  return (
    <input
      type="radio"
      disabled={disabled}
      {...rest}
      className={cx(sx.className, className)}
      style={{ ...sx.style, ...style }}
    />
  );
};

export const Radio = { Root, Group };
