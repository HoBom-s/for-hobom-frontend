import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useId,
  type ChangeEvent,
  type CSSProperties,
  type FocusEvent,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type OptionHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
  type SelectHTMLAttributes,
} from "react";
import * as stylex from "@stylexjs/stylex";
import { RadioGroupContext } from "../Radio/Radio";

type FieldSize = "small" | "medium";

interface FormControlContextValue {
  size: FieldSize;
  id: string;
}

const FormControlContext = createContext<FormControlContextValue>({ size: "medium", id: "" });

const styles = stylex.create({
  control: { display: "inline-flex", flexDirection: "column", gap: 4, minWidth: 0 },
  fullWidth: { display: "flex", width: "100%" },
  label: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.8125rem",
    fontWeight: 500,
    lineHeight: 1.4,
    color: "var(--hb-color-text-primary)",
  },
  helper: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.75rem",
    lineHeight: 1.4,
    color: "var(--hb-color-text-secondary)",
    margin: 0,
  },
  selectWrap: { position: "relative", display: "inline-flex", width: "100%" },
  select: {
    boxSizing: "border-box",
    width: "100%",
    appearance: "none",
    paddingBlock: 8,
    paddingLeft: 12,
    paddingRight: 32,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: "var(--hb-color-border)", ":focus": "var(--hb-color-accent)" },
    borderRadius: 8,
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    cursor: "pointer",
    outline: "none",
  },
  selectSmall: { paddingBlock: 5, fontSize: "0.8125rem" },
  chevron: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "var(--hb-color-text-secondary)",
    display: "inline-flex",
  },
  controlLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    boxSizing: "border-box",
  },
  controlLabelDisabled: { cursor: "default", opacity: 0.6 },
});

const cx = (a: string | undefined, b: string | undefined): string | undefined =>
  [a, b].filter(Boolean).join(" ") || undefined;

interface ControlProps extends HTMLAttributes<HTMLDivElement> {
  size?: FieldSize;
  fullWidth?: boolean;
  /** No-op kept for API compatibility. */
  error?: boolean;
}

const Control = ({
  size = "medium",
  fullWidth = false,
  error: _error,
  className,
  style,
  children,
  ...rest
}: ControlProps) => {
  const id = useId();
  const sx = stylex.props(styles.control, fullWidth && styles.fullWidth);

  return (
    <FormControlContext.Provider value={{ size, id }}>
      <div {...rest} className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
        {children}
      </div>
    </FormControlContext.Provider>
  );
};

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** No-op kept for API compatibility (the label is always shown above). */
  shrink?: boolean;
}

const Label = ({ shrink: _shrink, htmlFor, className, style, children, ...rest }: LabelProps) => {
  const { id } = useContext(FormControlContext);
  const sx = stylex.props(styles.label);

  return (
    <label
      htmlFor={(htmlFor ?? id) || undefined}
      {...rest}
      className={cx(sx.className, className)}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </label>
  );
};

const Helper = ({ className, style, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) => {
  const sx = stylex.props(styles.helper);

  return (
    <p {...rest} className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
      {children}
    </p>
  );
};

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "onChange" | "onBlur"> {
  /** No-op kept for API compatibility (the label sits above via `Form.Label`). */
  label?: ReactNode;
  /** No-op kept for API compatibility. */
  displayEmpty?: boolean;
  /** No-op kept for API compatibility (the select fills its control). */
  fullWidth?: boolean;
  size?: FieldSize;
  /** Forwarded to the native `<select>` (e.g. a react-hook-form ref). */
  ref?: Ref<HTMLSelectElement>;
  // Loosened so a react-hook-form handler (which returns a Promise) is accepted.
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => unknown;
  onBlur?: (event: FocusEvent<HTMLSelectElement>) => unknown;
}

const Select = ({
  label: _label,
  displayEmpty: _displayEmpty,
  fullWidth: _fullWidth,
  size: sizeProp,
  id,
  ref,
  className,
  style,
  children,
  ...rest
}: SelectProps) => {
  const { size: ctxSize, id: ctxId } = useContext(FormControlContext);
  const size = sizeProp ?? ctxSize;
  const sx = stylex.props(styles.select, size === "small" && styles.selectSmall);
  const wrapSx = stylex.props(styles.selectWrap);
  const chevronSx = stylex.props(styles.chevron);

  return (
    <span {...wrapSx}>
      <select
        ref={ref}
        id={(id ?? ctxId) || undefined}
        {...rest}
        className={cx(sx.className, className)}
        style={{ ...sx.style, ...style }}
      >
        {children}
      </select>
      <span {...chevronSx}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
};

const Option = (props: OptionHTMLAttributes<HTMLOptionElement>) => <option {...props} />;

interface ControlLabelProps {
  value?: string;
  label?: ReactNode;
  control: ReactElement<{
    checked?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    value?: string;
    disabled?: boolean;
  }>;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const ControlLabel = ({ value, label, control, disabled, className, style }: ControlLabelProps) => {
  const group = useContext(RadioGroupContext);
  const checked = group ? group.value === value : undefined;
  const sx = stylex.props(styles.controlLabel, disabled && styles.controlLabelDisabled);

  const controlEl = isValidElement(control)
    ? cloneElement(control, {
        checked,
        disabled,
        name: group?.name,
        value,
        onChange:
          group && value !== undefined ? (event) => group.onChange(event, value) : undefined,
      })
    : control;

  return (
    <label className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
      {controlEl}
      {label}
    </label>
  );
};

export const Form = { Control, Label, Helper, Select, Option, ControlLabel };
