import { Chip, Stack, Typography } from "@mui/material";
import { ArticleOutlined } from "@mui/icons-material";

interface Props {
  articles: string[];
}

export const ReferencedArticles = ({ articles }: Props) => (
  <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={1.5} gap={0.5}>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
    >
      <ArticleOutlined sx={{ fontSize: 14 }} />
      참조 조문:
    </Typography>
    {articles.map((article) => (
      <Chip
        key={article}
        label={article}
        size="small"
        variant="outlined"
        sx={{ height: 22, fontSize: "0.7rem" }}
      />
    ))}
  </Stack>
);
