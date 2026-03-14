import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "hobom-data";
import { ArrowForwardOutlined, CompareArrowsOutlined } from "hobom-design-system/icons";
import { privacyLawQueries } from "@/entities/privacy-law";
import { Hb } from "@/shared/ui";

const CHANGE_COLORS: Record<string, "success" | "warning" | "error"> = {
  ADDED: "success",
  MODIFIED: "warning",
  DELETED: "error",
};

export const LawDiffList = () => {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(privacyLawQueries.diffs());
  const diffs = data.items;

  return (
    <Hb.Stack spacing={2}>
      {diffs.map((diff) => {
        const counts = diff.changes.reduce(
          (acc, c) => {
            acc[c.changeType] = (acc[c.changeType] || 0) + 1;

            return acc;
          },
          {} as Record<string, number>,
        );

        return (
          <Hb.Card.Root key={diff.id} variant="outlined">
            <Hb.Card.Clickable onClick={() => navigate(`/privacy-law/diffs/${diff.id}`)}>
              <Hb.Card.Content>
                <Hb.Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Hb.Stack direction="row" alignItems="center" spacing={1.5}>
                    <CompareArrowsOutlined color="primary" fontSize="small" />
                    <Hb.Stack direction="row" alignItems="center" spacing={0.5}>
                      <Hb.Text variant="subtitle2">{diff.fromProclamationDate}</Hb.Text>
                      <ArrowForwardOutlined fontSize="small" sx={{ color: "text.secondary" }} />
                      <Hb.Text variant="subtitle2">{diff.toProclamationDate}</Hb.Text>
                    </Hb.Stack>
                  </Hb.Stack>
                  <Hb.Stack direction="row" spacing={0.5}>
                    {Object.entries(counts).map(([type, count]) => (
                      <Hb.Chip
                        key={type}
                        label={`${type} ${count}`}
                        size="small"
                        color={CHANGE_COLORS[type] ?? "default"}
                        variant="outlined"
                      />
                    ))}
                    <Hb.Chip label={`${diff.changes.length}건`} size="small" variant="outlined" />
                  </Hb.Stack>
                </Hb.Stack>
              </Hb.Card.Content>
            </Hb.Card.Clickable>
          </Hb.Card.Root>
        );
      })}
      {diffs.length === 0 && (
        <Hb.Text color="text.secondary" textAlign="center" py={4}>
          변경 이력이 없습니다.
        </Hb.Text>
      )}
    </Hb.Stack>
  );
};
