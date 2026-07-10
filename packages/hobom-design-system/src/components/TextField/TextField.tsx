import {
  useId,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import * as stylex from "@stylexjs/stylex";

type TextFieldSize = "small" | "medium";

/** Slot props for the bordered input container (adornments, ref, className). */
interface InputSlotProps {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  style?: CSSProperties;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  /** Accept (and ignore) other input-slot props such as `disableUnderline`. */
  [key: string]: unknown;
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "ref"> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  size?: TextFieldSize;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  /** Newer slot API. */
  slotProps?: {
    htmlInput?: InputHTMLAttributes<HTMLInputElement>;
    input?: InputSlotProps;
    inputLabel?: Record<string, unknown>;
  };
  /** Legacy props supplied by the Autocomplete `renderInput` params. */
  InputProps?: InputSlotProps;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  InputLabelProps?: Record<string, unknown>;
  className?: string;
  style?: CSSProperties;
}

const styles = stylex.create({
  root: {
    display: "inline-flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  fullWidth: { display: "flex", width: "100%" },
  label: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.8125rem",
    fontWeight: 500,
    lineHeight: 1.4,
    color: "var(--hb-color-text-primary)",
  },
  labelError: { color: "var(--hb-color-danger)" },
  container: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxSizing: "border-box",
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "var(--hb-color-border)",
      ":focus-within": "var(--hb-color-accent)",
    },
    borderRadius: 8,
    backgroundColor: "var(--hb-color-surface)",
    transition: "border-color 0.15s",
  },
  containerError: { borderColor: "var(--hb-color-danger)" },
  medium: { paddingBlock: 8, paddingInline: 12 },
  small: { paddingBlock: 5, paddingInline: 10 },
  input: {
    flex: 1,
    minWidth: 0,
    borderWidth: 0,
    borderStyle: "none",
    outline: "none",
    padding: 0,
    margin: 0,
    backgroundColor: "transparent",
    color: "var(--hb-color-text-primary)",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    appearance: "none",
    "::placeholder": { color: "var(--hb-color-text-disabled)" },
  },
  textarea: {
    resize: "none",
    fieldSizing: "content",
  },
  helper: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.75rem",
    lineHeight: 1.4,
    color: "var(--hb-color-text-secondary)",
  },
  helperError: { color: "var(--hb-color-danger)" },
});

const cx = (...names: (string | undefined)[]): string | undefined =>
  names.filter(Boolean).join(" ") || undefined;

export const TextField = ({
  label,
  helperText,
  error = false,
  size = "medium",
  fullWidth = false,
  multiline = false,
  rows,
  minRows,
  maxRows,
  slotProps,
  InputProps,
  inputProps,
  // Consumed (kept out of the input props); the top label has no shrink state.
  InputLabelProps: _InputLabelProps,
  id,
  required,
  disabled,
  className,
  style,
  // `input`/`textarea` are void-ish; never forward children onto them.
  children: _children,
  ...rest
}: TextFieldProps) => {
  const reactId = useId();
  const inputId = id ?? reactId;

  const container = { ...InputProps, ...slotProps?.input };
  const startAdornment = container.startAdornment;
  const endAdornment = container.endAdornment;

  const rootSx = stylex.props(styles.root, fullWidth && styles.fullWidth);
  const containerSx = stylex.props(
    styles.container,
    size === "small" ? styles.small : styles.medium,
    error && styles.containerError,
  );
  const inputSx = stylex.props(styles.input, multiline && styles.textarea);
  const labelSx = stylex.props(styles.label, error && styles.labelError);
  const helperSx = stylex.props(styles.helper, error && styles.helperError);

  // Autocomplete supplies value/onChange/ref via inputProps; merge it last.
  const nativeProps = { ...rest, ...inputProps, ...slotProps?.htmlInput };

  const textareaStyle: CSSProperties | undefined = multiline
    ? {
        minHeight: minRows != null ? `${minRows * 1.5}em` : undefined,
        maxHeight: maxRows != null ? `${maxRows * 1.5}em` : undefined,
      }
    : undefined;

  return (
    <div
      className={cx(rootSx.className, className)}
      style={{ ...rootSx.style, ...style }}
    >
      {label != null && (
        <label htmlFor={inputId} className={labelSx.className} style={labelSx.style}>
          {label}
          {required ? " *" : ""}
        </label>
      )}
      <div
        ref={container.ref}
        className={cx(containerSx.className, container.className)}
        style={{ ...containerSx.style, ...container.style }}
        data-disabled={disabled || undefined}
      >
        {startAdornment}
        {multiline ? (
          <textarea
            id={inputId}
            required={required}
            disabled={disabled}
            rows={rows ?? minRows}
            {...(nativeProps as InputHTMLAttributes<HTMLTextAreaElement>)}
            className={inputSx.className}
            style={{ ...inputSx.style, ...textareaStyle }}
          />
        ) : (
          <input
            id={inputId}
            required={required}
            disabled={disabled}
            {...nativeProps}
            className={inputSx.className}
            style={inputSx.style}
          />
        )}
        {endAdornment}
      </div>
      {helperText != null && (
        <p className={helperSx.className} style={helperSx.style}>
          {helperText}
        </p>
      )}
    </div>
  );
};
