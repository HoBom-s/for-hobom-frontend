import { useSuspenseQuery } from "hobom-data";
import { wikiPageQueries, type DiffChangeType, type DiffEntryType } from "@/entities/wiki-page";
import { Hb } from "@/shared/ui";

interface VersionDiffViewProps {
  spaceKey: string;
  pageId: string;
  fromVersion: number;
  toVersion: number;
}

const DIFF_COLORS: Record<DiffChangeType, { bgcolor: string; color: string }> = {
  ADDED: { bgcolor: "success.50", color: "success.dark" },
  REMOVED: { bgcolor: "error.50", color: "error.dark" },
  UNCHANGED: { bgcolor: "transparent", color: "text.secondary" },
};

const DIFF_PREFIX: Record<DiffChangeType, string> = { ADDED: "+", REMOVED: "-", UNCHANGED: " " };

const DiffLine = ({ entry }: { entry: DiffEntryType }) => {
  const prefix = DIFF_PREFIX[entry.type];
  const style = DIFF_COLORS[entry.type];

  return (
    <Hb.Box
      component="tr"
      sx={{
        bgcolor: style.bgcolor,
        "&:hover": { filter: "brightness(0.97)" },
      }}
    >
      <Hb.Box
        component="td"
        sx={{
          px: 1.5,
          py: 0.25,
          textAlign: "right",
          color: "text.disabled",
          fontSize: "0.75rem",
          fontFamily: "monospace",
          userSelect: "none",
          borderRight: "1px solid",
          borderColor: "divider",
          minWidth: 40,
        }}
      >
        {entry.lineNumber}
      </Hb.Box>
      <Hb.Box
        component="td"
        sx={{
          px: 1,
          py: 0.25,
          color: style.color,
          fontSize: "0.75rem",
          fontFamily: "monospace",
          userSelect: "none",
          width: 16,
          fontWeight: entry.type !== "UNCHANGED" ? 600 : 400,
        }}
      >
        {prefix}
      </Hb.Box>
      <Hb.Box
        component="td"
        sx={{
          px: 1,
          py: 0.25,
          fontSize: "0.8125rem",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          color: style.color,
        }}
      >
        {entry.content}
      </Hb.Box>
    </Hb.Box>
  );
};

export const VersionDiffView = ({
  spaceKey,
  pageId,
  fromVersion,
  toVersion,
}: VersionDiffViewProps) => {
  const { data } = useSuspenseQuery(
    wikiPageQueries.versionDiff(spaceKey, pageId, fromVersion, toVersion),
  );
  const entries = data.items;

  return (
    <Hb.Box sx={{ px: 2.5, py: 2 }}>
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Hb.Chip
          label={`v${fromVersion}`}
          size="small"
          variant="outlined"
          style={{
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
        <Hb.Text variant="caption" color="text.disabled">
          →
        </Hb.Text>
        <Hb.Chip
          label={`v${toVersion}`}
          size="small"
          color="primary"
          style={{
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </Hb.Box>
      <Hb.Box
        component="table"
        aria-label={`v${fromVersion}에서 v${toVersion}으로의 변경 사항`}
        sx={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <tbody>
          {entries.map((entry, index) => (
            <DiffLine key={index} entry={entry} />
          ))}
        </tbody>
      </Hb.Box>
    </Hb.Box>
  );
};
