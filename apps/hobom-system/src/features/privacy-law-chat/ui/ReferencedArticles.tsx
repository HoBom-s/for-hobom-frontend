import { ArticleOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

interface Props {
  articles: string[];
}

export const ReferencedArticles = ({ articles }: Props) => (
  <Hb.Stack
    direction="row"
    spacing={0.5}
    style={{
      flexWrap: "wrap",
      marginTop: 12,
      gap: 4,
    }}
  >
    <Hb.Text
      variant="caption"
      color="text.secondary"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
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
        style={{
          height: 22,
          fontSize: "0.7rem",
        }}
      />
    ))}
  </Hb.Stack>
);
