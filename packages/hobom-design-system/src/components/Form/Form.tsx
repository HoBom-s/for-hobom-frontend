import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type LabelHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
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
  trigger: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxSizing: "border-box",
    width: "100%",
    paddingBlock: 8,
    paddingLeft: 12,
    paddingRight: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "var(--hb-color-border)",
      ":focus-visible": "var(--hb-color-accent)",
    },
    borderRadius: 8,
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    textAlign: "left",
    cursor: "pointer",
    appearance: "none",
    outline: "none",
  },
  triggerSmall: { paddingBlock: 5, fontSize: "0.8125rem" },
  triggerDisabled: { cursor: "default", opacity: 0.6, pointerEvents: "none" },
  triggerValue: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  placeholder: { color: "var(--hb-color-text-disabled)" },
  chevron: { flexShrink: 0, display: "inline-flex", color: "var(--hb-color-text-secondary)" },
  listbox: {
    position: "fixed",
    zIndex: 1300,
    listStyle: "none",
    margin: 0,
    marginTop: 4,
    padding: 4,
    maxHeight: 320,
    overflowY: "auto",
    boxSizing: "border-box",
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 8,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.16), 0 1px 4px rgba(0, 0, 0, 0.08)",
  },
  option: {
    display: "flex",
    alignItems: "center",
    paddingBlock: 8,
    paddingInline: 12,
    borderRadius: 6,
    fontSize: "0.875rem",
    color: "var(--hb-color-text-primary)",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  optionHighlighted: { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  optionSelected: {
    backgroundColor: "color-mix(in srgb, var(--hb-color-accent) 8%, transparent)",
    fontWeight: 500,
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

const cx = (...names: (string | undefined | false)[]): string | undefined =>
  names.filter(Boolean).join(" ") || undefined;

const Chevron = () => (
  <span {...stylex.props(styles.chevron)}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </span>
);

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

interface OptionProps {
  value?: string;
  disabled?: boolean;
  children?: ReactNode;
}

/** Marker read by `Select`; never rendered on its own. */
const Option = (_props: OptionProps): null => null;

interface SelectChangeShim {
  target: { value: string };
}

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: SelectChangeShim, value: string) => void;
  /** No-op kept for API compatibility (the label sits above via `Form.Label`). */
  label?: ReactNode;
  /** No-op kept for API compatibility (an empty-value option acts as placeholder). */
  displayEmpty?: boolean;
  /** No-op kept for API compatibility (the select fills its control). */
  fullWidth?: boolean;
  placeholder?: ReactNode;
  size?: FieldSize;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

interface ExtractedOption {
  value: string;
  label: ReactNode;
  disabled: boolean;
}

const Select = ({
  value,
  defaultValue,
  onChange,
  label: _label,
  displayEmpty: _displayEmpty,
  fullWidth: _fullWidth,
  placeholder,
  size: sizeProp,
  disabled = false,
  id,
  name: _name,
  className,
  style,
  children,
}: SelectProps) => {
  const { size: ctxSize, id: ctxId } = useContext(FormControlContext);
  const size = sizeProp ?? ctxSize;

  const [internal, setInternal] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const options: ExtractedOption[] = [];

  // Treat every element child as an option (they are `Form.Option`s). Matching
  // by reference identity is fragile across module reloads, so read props
  // directly rather than checking `child.type === Option`.
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const props = (child as ReactElement<OptionProps>).props;

      options.push({
        value: String(props.value ?? ""),
        label: props.children,
        disabled: props.disabled ?? false,
      });
    }
  });

  const selectedIndex = options.findIndex((option) => option.value === String(current ?? ""));
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const reposition = useCallback(() => {
    const anchor = triggerRef.current;

    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();

    setCoords({ top: rect.bottom, left: rect.left, width: rect.width });
  }, []);

  useEffect(() => {
    if (!open) return;

    reposition();

    const onScrollOrResize = () => reposition();
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (triggerRef.current?.contains(target) || listRef.current?.contains(target)) return;
      setOpen(false);
    };

    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    document.addEventListener("mousedown", onPointerDown);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, reposition]);

  const openMenu = () => {
    setHighlight(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const commit = (option: ExtractedOption) => {
    if (option.disabled) return;
    if (!isControlled) setInternal(option.value);
    onChange?.({ target: { value: option.value } }, option.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openMenu();
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((prev) => Math.min(prev + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[highlight];

      if (option) commit(option);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const triggerSx = stylex.props(
    styles.trigger,
    size === "small" && styles.triggerSmall,
    disabled && styles.triggerDisabled,
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={(id ?? ctxId) || undefined}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={cx(triggerSx.className, className)}
        style={{ ...triggerSx.style, ...style }}
      >
        <span {...stylex.props(styles.triggerValue, !selected && styles.placeholder)}>
          {selected ? selected.label : placeholder}
        </span>
        <Chevron />
      </button>
      {open &&
        coords &&
        createPortal(
          <ul
            ref={listRef}
            role="listbox"
            {...stylex.props(styles.listbox)}
            style={{
              ...stylex.props(styles.listbox).style,
              top: coords.top,
              left: coords.left,
              width: coords.width,
            }}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === String(current ?? "")}
                {...stylex.props(
                  styles.option,
                  index === highlight && styles.optionHighlighted,
                  option.value === String(current ?? "") && styles.optionSelected,
                )}
                onClick={() => commit(option)}
                onMouseEnter={() => setHighlight(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </>
  );
};

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
