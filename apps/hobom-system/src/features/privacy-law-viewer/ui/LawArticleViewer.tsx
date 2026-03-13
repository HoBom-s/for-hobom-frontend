import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore, SearchOutlined } from "@mui/icons-material";
import { privacyLawQueries } from "@/entities/privacy-law";
import type { LawArticle } from "@/entities/privacy-law";

interface Props {
  versionId: string;
}

const ArticleContent = ({ article }: { article: LawArticle }) => (
  <Box>
    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mb: 1 }}>
      {article.content}
    </Typography>
    {article.paragraphs.length > 0 && (
      <Stack spacing={0.5} sx={{ pl: 2 }}>
        {article.paragraphs.map((p) => (
          <Typography key={p.no} variant="body2" color="text.secondary">
            <Typography
              component="span"
              variant="body2"
              fontWeight={600}
              color="text.primary"
            >
              {p.no}
            </Typography>{" "}
            {p.content}
            {p.subItems.length > 0 && (
              <Stack
                component="span"
                spacing={0.25}
                sx={{ display: "block", pl: 2, mt: 0.5 }}
              >
                {p.subItems.map((sub) => (
                  <Typography
                    key={sub.no}
                    variant="body2"
                    color="text.secondary"
                    component="span"
                    display="block"
                  >
                    {sub.no} {sub.content}
                  </Typography>
                ))}
              </Stack>
            )}
          </Typography>
        ))}
      </Stack>
    )}
  </Box>
);

export const LawArticleViewer = ({ versionId }: Props) => {
  const { data } = useSuspenseQuery(privacyLawQueries.version(versionId));
  const version = data.items;
  const [search, setSearch] = useState("");

  const filtered = version.articles.filter(
    (a) =>
      a.articleNo.includes(search) ||
      a.title.includes(search) ||
      a.content.includes(search),
  );

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Box>
          <Typography variant="h6">{version.lawName}</Typography>
          <Stack direction="row" spacing={1} mt={0.5}>
            <Chip
              label={`공포일 ${version.proclamationDate}`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`시행일 ${version.enforcementDate}`}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`${version.articles.length}개 조문`}
              size="small"
              variant="outlined"
            />
          </Stack>
        </Box>
      </Stack>

      <TextField
        placeholder="조문 검색..."
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <SearchOutlined
                fontSize="small"
                sx={{ mr: 1, color: "text.secondary" }}
              />
            ),
          },
        }}
        sx={{ mb: 2, width: 320 }}
      />

      <Stack spacing={0.5}>
        {filtered.map((article) => (
          <Accordion key={article.articleNo} disableGutters variant="outlined">
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Chip
                  label={article.articleNo}
                  size="small"
                  color="primary"
                  sx={{ fontWeight: 600, minWidth: 64 }}
                />
                <Typography variant="subtitle2">{article.title}</Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <ArticleContent article={article} />
            </AccordionDetails>
          </Accordion>
        ))}
        {filtered.length === 0 && (
          <Typography color="text.secondary" textAlign="center" py={4}>
            검색 결과가 없습니다.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
