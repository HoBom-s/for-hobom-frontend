import { LightbulbOutlined, ArchiveOutlined, DeleteOutlined } from "hobom-design-system/icons";
import type { NoteStatus } from "@/entities/note";
import { Hb } from "@/shared/ui";

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
  <Hb.Box role="tablist" sx={{ display: "flex", gap: 1, mb: 3 }}>
    {TAB_ITEMS.map((item) => {
      const selected = value === item.value;

      return (
        <Hb.Chip
          key={item.label}
          role="tab"
          aria-selected={selected}
          tabIndex={selected ? 0 : -1}
          icon={item.icon}
          label={item.label}
          onClick={() => onChange(item.value)}
          variant={selected ? "filled" : "outlined"}
          style={{
            fontWeight: 500,
            fontSize: "0.8125rem",
            paddingInline: 8,
            borderColor: selected ? "transparent" : "var(--hb-color-border)",
            backgroundColor: selected ? "#e8f0fe" : "transparent",
            color: selected ? "var(--hb-color-accent)" : "var(--hb-color-text-secondary)",
          }}
        />
      );
    })}
  </Hb.Box>
);
