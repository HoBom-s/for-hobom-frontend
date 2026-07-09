import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";
import * as stylex from "@stylexjs/stylex";
import { filterOptions, groupOptions } from "./autocomplete-filter.lib";

interface RenderInputParams {
  InputProps: { ref: Ref<HTMLDivElement>; endAdornment?: ReactNode };
  inputProps: Record<string, unknown>;
  size?: "small" | "medium";
  id: string;
}

interface RenderOptionProps {
  key?: string | number;
  id: string;
  role: "option";
  "aria-selected": boolean;
  className?: string;
  onClick: (event: SyntheticEvent) => void;
  onMouseEnter: () => void;
}

interface RenderGroupParams {
  key: string;
  group: string;
  children: ReactNode;
}

interface AutocompleteProps<T> {
  options: T[];
  value?: T | null;
  onChange?: (event: SyntheticEvent, value: T | null) => void;
  getOptionLabel?: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  renderInput: (params: RenderInputParams) => ReactNode;
  renderOption?: (props: RenderOptionProps, option: T) => ReactNode;
  groupBy?: (option: T) => string;
  renderGroup?: (params: RenderGroupParams) => ReactNode;
  inputValue?: string;
  onInputChange?: (event: SyntheticEvent, value: string) => void;
  freeSolo?: boolean;
  loading?: boolean;
  noOptionsText?: ReactNode;
  size?: "small" | "medium";
  blurOnSelect?: boolean;
  clearOnBlur?: boolean;
  slotProps?: { paper?: { style?: CSSProperties } };
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}

const styles = stylex.create({
  popup: {
    position: "fixed",
    zIndex: 1300,
    maxHeight: 320,
    overflowY: "auto",
    marginTop: 4,
    padding: 4,
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
    listStyle: "none",
  },
  optionHighlighted: { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  empty: {
    padding: "12px 16px",
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
  },
  groupList: { listStyle: "none", margin: 0, padding: 0 },
});

const cx = (...names: (string | undefined | false)[]): string | undefined =>
  names.filter(Boolean).join(" ") || undefined;

export function Autocomplete<T>({
  options,
  value = null,
  onChange,
  getOptionLabel = (option) => String(option),
  isOptionEqualToValue = (option, val) => option === val,
  renderInput,
  renderOption,
  groupBy,
  renderGroup,
  inputValue: inputValueProp,
  onInputChange,
  freeSolo = false,
  loading = false,
  noOptionsText = "No options",
  size,
  blurOnSelect = false,
  clearOnBlur = false,
  slotProps,
  className,
  style,
  "aria-label": ariaLabel,
}: AutocompleteProps<T>) {
  const id = useId();
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [internalInput, setInternalInput] = useState(value ? getOptionLabel(value) : "");
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);

  const isInputControlled = inputValueProp !== undefined;
  const inputValue = isInputControlled ? inputValueProp : internalInput;

  const filtered = filterOptions(options, inputValue, getOptionLabel);
  const flat = filtered;

  const reposition = useCallback(() => {
    const anchor = anchorRef.current;

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

      if (anchorRef.current?.contains(target) || popupRef.current?.contains(target)) return;
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

  const setInput = (event: SyntheticEvent, next: string) => {
    if (!isInputControlled) setInternalInput(next);
    onInputChange?.(event, next);
  };

  const selectOption = (event: SyntheticEvent, option: T) => {
    onChange?.(event, option);
    setInput(event, getOptionLabel(option));
    setOpen(false);
    if (blurOnSelect) inputRef.current?.blur();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event, event.target.value);
    setOpen(true);
    setHighlighted(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setHighlighted((prev) => Math.min(prev + 1, flat.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter") {
      const option = flat[highlighted];

      if (open && option) {
        event.preventDefault();
        selectOption(event, option);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleBlur = (event: SyntheticEvent) => {
    setOpen(false);
    if (clearOnBlur && !freeSolo) setInput(event, value ? getOptionLabel(value) : "");
  };

  const optionProps = (option: T, index: number): RenderOptionProps => ({
    id: `${id}-option-${index}`,
    role: "option",
    "aria-selected": value != null && isOptionEqualToValue(option, value),
    className: cx(
      stylex.props(styles.option).className,
      index === highlighted && stylex.props(styles.optionHighlighted).className,
    ),
    onClick: (event) => selectOption(event, option),
    onMouseEnter: () => setHighlighted(index),
  });

  const renderOne = (option: T, index: number): ReactNode => {
    const props = optionProps(option, index);
    const key = props.id;

    if (renderOption) return renderOption({ ...props, key }, option);

    return (
      <li {...props} key={key} style={stylex.props(styles.option).style}>
        {getOptionLabel(option)}
      </li>
    );
  };

  const renderList = (): ReactNode => {
    if (flat.length === 0) {
      return <div {...stylex.props(styles.empty)}>{loading ? "..." : noOptionsText}</div>;
    }

    if (groupBy) {
      let index = 0;
      const grouped = groupOptions(flat, groupBy);

      return grouped.map(({ group, options: groupOpts }) => {
        const children = (
          <ul {...stylex.props(styles.groupList)}>{groupOpts.map((opt) => renderOne(opt, index++))}</ul>
        );

        return renderGroup
          ? renderGroup({ key: group, group, children })
          : <div key={group}>{children}</div>;
      });
    }

    return <ul {...stylex.props(styles.groupList)}>{flat.map((opt, i) => renderOne(opt, i))}</ul>;
  };

  const params: RenderInputParams = {
    id,
    size,
    InputProps: { ref: anchorRef },
    inputProps: {
      ref: inputRef,
      value: inputValue,
      onChange: handleInputChange,
      onKeyDown: handleKeyDown,
      onFocus: () => setOpen(true),
      onBlur: handleBlur,
      role: "combobox",
      "aria-expanded": open,
      "aria-autocomplete": "list",
      "aria-label": ariaLabel,
      autoComplete: "off",
    },
  };

  return (
    <div className={className} style={style}>
      {renderInput(params)}
      {open &&
        coords &&
        createPortal(
          <div
            ref={popupRef}
            role="listbox"
            {...stylex.props(styles.popup)}
            style={{
              ...stylex.props(styles.popup).style,
              top: coords.top,
              left: coords.left,
              width: coords.width,
              ...slotProps?.paper?.style,
            }}
          >
            {renderList()}
          </div>,
          document.body,
        )}
    </div>
  );
}
