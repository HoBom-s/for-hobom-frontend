import { Box, IconButton, Popover } from "@mui/material";
import { Check } from "@mui/icons-material";
import { NOTE_COLORS } from "@/entities/note";

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
  <Popover
    open={!!anchorEl}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
  >
    <Box sx={{ display: "flex", gap: 0.5, p: 1.5 }}>
      {Object.entries(NOTE_COLORS).map(([key, hex]) => {
        const selected = value === hex;
        const isWhite = hex === "#ffffff";
        return (
          <IconButton
            key={key}
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
              borderColor: selected
                ? "primary.main"
                : isWhite
                  ? "#dadce0"
                  : "transparent",
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
          </IconButton>
        );
      })}
    </Box>
  </Popover>
);
