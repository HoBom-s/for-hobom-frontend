import { useNavigate } from "react-router-dom";
import { useSuspenseQuery, useMutation, useDataLot } from "hobom-data";
import { CloudDownloadOutlined, GavelOutlined } from "hobom-design-system/icons";
import { privacyLawQueries, privacyLawMutations } from "@/entities/privacy-law";
import { Hb } from "@/shared/ui";

export const LawVersionList = () => {
  const navigate = useNavigate();
  const dataLot = useDataLot();
  const { data } = useSuspenseQuery(privacyLawQueries.versions());
  const versions = data.items;

  const fetchMutation = useMutation({
    ...privacyLawMutations.fetch(),
    onSuccess: () => {
      void dataLot.invalidateQueries({
        queryKey: privacyLawQueries.all(),
      });
    },
  });

  return (
    <Hb.Stack spacing={2}>
      {versions.length === 0 && (
        <Hb.Card.Root
          variant="outlined"
          style={{
            textAlign: "center",
            paddingTop: 32,
            paddingBottom: 32,
            backgroundColor: "var(--hb-color-canvas)",
          }}
        >
          <Hb.Card.Content>
            <GavelOutlined sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
            <Hb.Text color="text.secondary" gutterBottom>
              등록된 법률 버전이 없습니다.
            </Hb.Text>
            <Hb.Text variant="caption" color="text.disabled" gutterBottom>
              법률 데이터를 수집하면 최신 개인정보보호법을 불러옵니다.
            </Hb.Text>
            <Hb.Box
              style={{
                marginTop: 16,
              }}
            >
              <Hb.Button
                variant="primary"
                startIcon={<CloudDownloadOutlined />}
                onClick={() => fetchMutation.mutate()}
                disabled={fetchMutation.isPending}
              >
                {fetchMutation.isPending ? "수집 중..." : "법률 데이터 수집"}
              </Hb.Button>
            </Hb.Box>
          </Hb.Card.Content>
        </Hb.Card.Root>
      )}
      {versions.map((version) => (
        <Hb.Card.Root key={version.id} variant="outlined">
          <Hb.Card.Clickable onClick={() => navigate(`/privacy-law/versions/${version.id}`)}>
            <Hb.Card.Content>
              <Hb.Stack
                direction="row"
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Hb.Stack
                  direction="row"
                  spacing={1.5}
                  style={{
                    alignItems: "center",
                  }}
                >
                  <GavelOutlined color="primary" fontSize="small" />
                  <Hb.Box>
                    <Hb.Text variant="subtitle2">{version.lawName}</Hb.Text>
                    <Hb.Text variant="caption" color="text.secondary">
                      {version.articles.length}개 조문
                    </Hb.Text>
                  </Hb.Box>
                </Hb.Stack>
                <Hb.Stack direction="row" spacing={1}>
                  <Hb.Chip
                    label={`공포 ${version.proclamationDate}`}
                    size="small"
                    variant="outlined"
                  />
                  <Hb.Chip
                    label={`시행 ${version.enforcementDate}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Hb.Stack>
              </Hb.Stack>
            </Hb.Card.Content>
          </Hb.Card.Clickable>
        </Hb.Card.Root>
      ))}
    </Hb.Stack>
  );
};
