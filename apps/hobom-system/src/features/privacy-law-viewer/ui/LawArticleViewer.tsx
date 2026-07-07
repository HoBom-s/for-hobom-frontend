import { useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import { ExpandMore, SearchOutlined } from "hobom-design-system/icons";
import { privacyLawQueries } from "@/entities/privacy-law";
import type { LawArticle } from "@/entities/privacy-law";
import { Hb } from "@/shared/ui";

interface Props {
  versionId: string;
}

const ArticleContent = ({ article }: { article: LawArticle }) => (
  <Hb.Box>
    <Hb.Text
      variant="body2"
      style={{
        whiteSpace: "pre-wrap",
        marginBottom: 8,
      }}
    >
      {article.content}
    </Hb.Text>
    {article.paragraphs.length > 0 && (
      <Hb.Stack
        spacing={0.5}
        style={{
          paddingLeft: 16,
        }}
      >
        {article.paragraphs.map((p) => (
          <Hb.Text key={p.no} variant="body2" color="text.secondary">
            <Hb.Text component="span" variant="body2" fontWeight={600} color="text.primary">
              {p.no}
            </Hb.Text>{" "}
            {p.content}
            {p.subItems.length > 0 && (
              <Hb.Stack
                component="span"
                spacing={0.25}
                style={{
                  display: "block",
                  paddingLeft: 16,
                  marginTop: 4,
                }}
              >
                {p.subItems.map((sub) => (
                  <Hb.Text
                    key={sub.no}
                    variant="body2"
                    color="text.secondary"
                    component="span"
                    style={{ display: "block" }}
                  >
                    {sub.no} {sub.content}
                  </Hb.Text>
                ))}
              </Hb.Stack>
            )}
          </Hb.Text>
        ))}
      </Hb.Stack>
    )}
  </Hb.Box>
);

export const LawArticleViewer = ({ versionId }: Props) => {
  const { data } = useSuspenseQuery(privacyLawQueries.version(versionId));
  const version = data.items;
  const [search, setSearch] = useState("");

  const filtered = version.articles.filter(
    (a) => a.articleNo.includes(search) || a.title.includes(search) || a.content.includes(search),
  );

  return (
    <Hb.Box>
      <Hb.Stack
        direction="row"
        spacing={2}
        style={{
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Hb.Box>
          <Hb.Text variant="h6">{version.lawName}</Hb.Text>
          <Hb.Stack
            direction="row"
            spacing={1}
            style={{
              marginTop: 4,
            }}
          >
            <Hb.Chip label={`공포일 ${version.proclamationDate}`} size="small" variant="outlined" />
            <Hb.Chip
              label={`시행일 ${version.enforcementDate}`}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Hb.Chip label={`${version.articles.length}개 조문`} size="small" variant="outlined" />
          </Hb.Stack>
        </Hb.Box>
      </Hb.Stack>
      <Hb.TextField
        placeholder="조문 검색..."
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <SearchOutlined fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            ),
          },
        }}
        sx={{ mb: 2, width: 320 }}
      />
      <Hb.Stack spacing={0.5}>
        {filtered.map((article) => (
          <Hb.Accordion.Root key={article.articleNo} disableGutters variant="outlined">
            <Hb.Accordion.Summary expandIcon={<ExpandMore />}>
              <Hb.Stack
                direction="row"
                spacing={1}
                style={{
                  alignItems: "center",
                }}
              >
                <Hb.Chip
                  label={article.articleNo}
                  size="small"
                  color="primary"
                  style={{
                    fontWeight: 600,
                    minWidth: 64,
                  }}
                />
                <Hb.Text variant="subtitle2">{article.title}</Hb.Text>
              </Hb.Stack>
            </Hb.Accordion.Summary>
            <Hb.Accordion.Details>
              <ArticleContent article={article} />
            </Hb.Accordion.Details>
          </Hb.Accordion.Root>
        ))}
        {filtered.length === 0 && (
          <Hb.Text
            color="text.secondary"
            style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}
          >
            검색 결과가 없습니다.
          </Hb.Text>
        )}
      </Hb.Stack>
    </Hb.Box>
  );
};
