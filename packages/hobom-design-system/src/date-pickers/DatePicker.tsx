import { type CSSProperties, useRef, useState } from "react";
import { format, type Locale } from "date-fns";
import * as stylex from "@stylexjs/stylex";
import { CalendarTodayOutlined } from "../icons";
import { Popover } from "../components/Popover/Popover";
import { Calendar } from "./Calendar";

interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  /** display format for the selected date (date-fns tokens). */
  displayFormat?: string;
  locale?: Locale;
  disabled?: boolean;
  style?: CSSProperties;
}

const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--hb-color-text-secondary)",
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
    minHeight: 40,
    paddingInline: 12,
    paddingBlock: 8,
    textAlign: "left",
    fontSize: "0.875rem",
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: "var(--hb-color-border)", ":hover": "var(--hb-color-text-secondary)" },
    borderRadius: 8,
    cursor: "pointer",
    transition: "border-color 0.15s ease",
  },
  triggerOpen: {
    borderColor: "var(--hb-color-accent)",
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.6,
  },
  placeholder: {
    color: "var(--hb-color-text-disabled)",
  },
  icon: {
    color: "var(--hb-color-text-secondary)",
    flexShrink: 0,
  },
  popoverBody: {
    padding: 12,
  },
});

/** A text-field trigger that opens a {@link Calendar} popover. */
export const DatePicker = ({
  value,
  onChange,
  label,
  placeholder = "날짜 선택",
  displayFormat = "yyyy-MM-dd",
  locale,
  disabled,
  style,
}: DatePickerProps) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<Date | null>(value ?? null);
  const selected = value !== undefined ? value : internal;

  const handleSelect = (date: Date) => {
    if (value === undefined) setInternal(date);
    onChange?.(date);
    setOpen(false);
  };

  return (
    <div {...stylex.props(styles.field)} style={style}>
      {label && <span {...stylex.props(styles.label)}>{label}</span>}
      <button
        ref={anchorRef}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => !disabled && setOpen(true)}
        {...stylex.props(styles.trigger, open && styles.triggerOpen, disabled && styles.disabled)}
      >
        <span {...(selected ? {} : stylex.props(styles.placeholder))}>
          {selected ? format(selected, displayFormat, { locale }) : placeholder}
        </span>
        <CalendarTodayOutlined sx={{ fontSize: 18 }} {...stylex.props(styles.icon)} />
      </button>

      <Popover open={open} anchorEl={anchorRef.current} onClose={() => setOpen(false)}>
        <div {...stylex.props(styles.popoverBody)}>
          <Calendar
            value={selected}
            defaultMonth={selected ?? undefined}
            onSelect={handleSelect}
            locale={locale}
          />
        </div>
      </Popover>
    </div>
  );
};
