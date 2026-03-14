import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ExpandMore, SearchOutlined } from "hobom-design-system/icons";
import { privacyLawQueries } from "@/entities/privacy-law";
import type { LawArticle } from "@/entities/privacy-law";
import { Hb } from "@/shared/ui";

interface Props {
  versionId: string;
}

const ArticleContent = ({ article }: { article: LawArticle }) => (
  <Hb.Box>
    <Hb.Text variant="body2" sx={{ whiteSpace: "pre-wrap", mb: 1 }}>
      {article.content}
    </Hb.Text>
    {article.paragraphs.length > 0 && (
      <Hb.Stack spacing={0.5} sx={{ pl: 2 }}>
        {article.paragraphs.map((p) => (
          <Hb.Text key={p.no} variant="body2" color="text.secondary">
            <Hb.Text component="span" variant="body2" fontWeight={600} color="text.primary">
              {p.no}
            </Hb.Text>{" "}
            {p.content}
            {p.subItems.length > 0 && (
              <Hb.Stack component="span" spacing={0.25} sx={{ display: "block", pl: 2, mt: 0.5 }}>
                {p.subItems.map((sub) => (
                  <Hb.Text
                    key={sub.no}
                    variant="body2"
                    color="text.secondary"
                    component="span"
                    display="block"
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
      <Hb.Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Hb.Box>
          <Hb.Text variant="h6">{version.lawName}</Hb.Text>
          <Hb.Stack direction="row" spacing={1} mt={0.5}>
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
              <Hb.Stack direction="row" alignItems="center" spacing={1}>
                <Hb.Chip
                  label={article.articleNo}
                  size="small"
                  color="primary"
                  sx={{ fontWeight: 600, minWidth: 64 }}
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
          <Hb.Text color="text.secondary" textAlign="center" py={4}>
            검색 결과가 없습니다.
          </Hb.Text>
        )}
      </Hb.Stack>
    </Hb.Box>
  );
};
