import { Box, Chip } from "@mui/material";
import {
  LightbulbOutlined,
  ArchiveOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import type { NoteStatus } from "@/entities/note";

interface NoteStatusTabsProps {
  value: NoteStatus | undefined;
  onChange: (status: NoteStatus | undefined) => void;
}

const TAB_ITEMS: {
  label: string;
  value: NoteStatus | undefined;
  icon: React.ReactElement;
}[] = [
  {
    label: "메모",
    value: undefined,
    icon: <LightbulbOutlined sx={{ fontSize: 16 }} />,
  },
  {
    label: "보관함",
    value: "ARCHIVED",
    icon: <ArchiveOutlined sx={{ fontSize: 16 }} />,
  },
  {
    label: "휴지통",
    value: "TRASHED",
    icon: <DeleteOutlined sx={{ fontSize: 16 }} />,
  },
];

export const NoteStatusTabs = ({ value, onChange }: NoteStatusTabsProps) => (
  <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
    {TAB_ITEMS.map((item) => {
      const selected = value === item.value;
      return (
        <Chip
          key={item.label}
          icon={item.icon}
          label={item.label}
          onClick={() => onChange(item.value)}
          variant={selected ? "filled" : "outlined"}
          sx={{
            fontWeight: 500,
            fontSize: "0.8125rem",
            px: 0.5,
            borderColor: selected ? "transparent" : "#dadce0",
            bgcolor: selected ? "#e8f0fe" : "transparent",
            color: selected ? "primary.dark" : "text.secondary",
            "& .MuiChip-icon": {
              color: selected ? "primary.dark" : "text.secondary",
            },
            "&:hover": {
              bgcolor: selected ? "#d2e3fc" : "action.hover",
            },
          }}
        />
      );
    })}
  </Box>
);
