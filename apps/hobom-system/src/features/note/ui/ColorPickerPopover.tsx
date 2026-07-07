import { Check } from "hobom-design-system/icons";
import { NOTE_COLORS } from "@/entities/note";
import { Hb } from "@/shared/ui";

const swatchBorderColor = (selected: boolean, isWhite: boolean): string => {
  if (selected) {
    return "primary.main";
  }

  return isWhite ? "#dadce0" : "transparent";
};

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
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: hex,
              border: "2px solid",
              borderColor: swatchBorderColor(selected, isWhite),
              p: 0,
              minWidth: 0,
              "&:hover": {
                backgroundColor: hex,
                borderColor: selected ? "primary.main" : "#bdc1c6",
              },
            }}
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
