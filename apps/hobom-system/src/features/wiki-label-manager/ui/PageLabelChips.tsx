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
    <Hb.Box
      style={{
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
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
          style={{
            backgroundColor: label.color,
            color: "#fff",
            fontWeight: 500,
            fontSize: "0.75rem",
          }}
        />
      ))}
      {availableLabels.length > 0 && (
        <Hb.Form.Control
          size="small"
          style={{
            minWidth: 100
          }}
        >
          <Hb.Form.Select
            value=""
            onChange={(e) => {
              if (e.target.value) {
                addLabel.mutate(
                  { spaceKey, pageId, labelId: e.target.value },
                  { onSuccess: invalidatePageDetail },
                );
              }
            }}
            displayEmpty
            renderValue={() => (
              <Hb.Text variant="caption" color="text.disabled">
                + 라벨
              </Hb.Text>
            )}
          >
            {availableLabels.map((label) => (
              <Hb.Form.Option key={label.id} value={label.id}>
                <Hb.Box
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: label.color,
                    marginRight: 8,
                  }}
                />
                {label.name}
              </Hb.Form.Option>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
      )}
    </Hb.Box>
  );
};
