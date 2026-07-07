import type { CSSProperties } from "react";
import { Check } from "hobom-design-system/icons";
import * as stylex from "@stylexjs/stylex";
import { NOTE_COLORS } from "@/entities/note";
import { Hb } from "@/shared/ui";

const swatchBorderColor = (selected: boolean, isWhite: boolean): string => {
  if (selected) {
    return "var(--hb-color-accent)";
  }

  return isWhite ? "#dadce0" : "transparent";
};

const styles = stylex.create({
  swatch: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    borderWidth: 2,
    borderStyle: "solid",
    padding: 0,
    minWidth: 0,
    // Colors are dynamic per swatch; driven via custom properties so the
    // button's own styles still layer underneath.
    backgroundColor: "var(--swatch-bg)",
    borderColor: "var(--swatch-border)",
    ":hover": {
      backgroundColor: "var(--swatch-bg)",
      borderColor: "var(--swatch-border-hover)",
    },
  },
});

interface ColorPickerPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  value: string;
  onChange: (color: string) => void;
}

export const ColorPickerPopover = ({
  anchorEl,
  onClose,
  value,
  onChange,
}: ColorPickerPopoverProps) => (
  <Hb.Popover
    open={!!anchorEl}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
  >
    <Hb.Box
      style={{
        display: "flex",
        gap: 4,
        padding: 12,
      }}
    >
      {Object.entries(NOTE_COLORS).map(([key, hex]) => {
        const selected = value === hex;
        const isWhite = hex === "#ffffff";

        return (
          <Hb.Button.Icon
            key={key}
            aria-label={`색상: ${key}`}
            onClick={() => {
              onChange(hex);
              onClose();
            }}
            {...stylex.props(styles.swatch)}
            style={
              {
                "--swatch-bg": hex,
                "--swatch-border": swatchBorderColor(selected, isWhite),
                "--swatch-border-hover": selected ? "var(--hb-color-accent)" : "#bdc1c6",
              } as CSSProperties
            }
          >
            {selected && (
              <Check
                sx={{
                  fontSize: 16,
                  color: isWhite ? "#333" : "rgba(0,0,0,0.54)",
                }}
              />
            )}
          </Hb.Button.Icon>
        );
      })}
    </Hb.Box>
  </Hb.Popover>
);
