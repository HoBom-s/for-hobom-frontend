import { ArticleOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

interface Props {
  articles: string[];
}

export const ReferencedArticles = ({ articles }: Props) => (
  <Hb.Stack direction="row" spacing={0.5} flexWrap="wrap" mt={1.5} gap={0.5}>
    <Hb.Text
      variant="caption"
      color="text.secondary"
      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
    >
      <ArticleOutlined sx={{ fontSize: 14 }} />
      참조 조문:
    </Hb.Text>
    {articles.map((article) => (
      <Hb.Chip
        key={article}
        label={article}
        size="small"
        variant="outlined"
        sx={{ height: 22, fontSize: "0.7rem" }}
      />
    ))}
  </Hb.Stack>
);
