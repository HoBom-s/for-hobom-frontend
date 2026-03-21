import { useSuspenseQuery, useDataLot } from "hobom-data";
import { wikiPageQueries } from "@/entities/wiki-page";
import { wikiLabelQueries, useAddPageLabel, useRemovePageLabel } from "@/entities/wiki-label";
import { Hb } from "@/shared/ui";

interface PageLabelChipsProps {
  spaceKey: string;
  pageId: string;
  pageLabels: { id: string; name: string; color: string }[];
}

export const PageLabelChips = ({ spaceKey, pageId, pageLabels }: PageLabelChipsProps) => {
  const dataLot = useDataLot();
  const { data } = useSuspenseQuery(wikiLabelQueries.list(spaceKey));
  const allLabels = data.items;
  const pageLabelIds = new Set(pageLabels.map((l) => l.id));

  const addLabel = useAddPageLabel();
  const removeLabel = useRemovePageLabel();

  const invalidatePageDetail = () => {
    dataLot.invalidateQueries({ queryKey: wikiPageQueries.pages() });
  };

  const availableLabels = allLabels.filter((l) => !pageLabelIds.has(l.id));

  return (
    <Hb.Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", alignItems: "center" }}>
      {pageLabels.map((label) => (
        <Hb.Chip
          key={label.id}
          label={label.name}
          size="small"
          onDelete={() =>
            removeLabel.mutate(
              { spaceKey, pageId, labelId: label.id },
              { onSuccess: invalidatePageDetail },
            )
          }
          sx={{
            bgcolor: label.color,
            color: "#fff",
            fontWeight: 500,
            fontSize: "0.75rem",
            "& .MuiChip-deleteIcon": { color: "rgba(255,255,255,0.7)" },
          }}
        />
      ))}
      {availableLabels.length > 0 && (
        <Hb.TextField
          select
          size="small"
          value=""
          onChange={(e) => {
            if (e.target.value) {
              addLabel.mutate(
                { spaceKey, pageId, labelId: e.target.value },
                { onSuccess: invalidatePageDetail },
              );
            }
          }}
          sx={{ minWidth: 100 }}
          slotProps={{
            select: {
              displayEmpty: true,
              renderValue: () => (
                <Hb.Text variant="caption" color="text.disabled">
                  + 라벨
                </Hb.Text>
              ),
            },
          }}
        >
          {availableLabels.map((label) => (
            <Hb.Menu.Item key={label.id} value={label.id}>
              <Hb.Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: label.color,
                  mr: 1,
                }}
              />
              {label.name}
            </Hb.Menu.Item>
          ))}
        </Hb.TextField>
      )}
    </Hb.Box>
  );
};
