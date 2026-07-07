import { Hb } from "@/shared/ui";
export const MenuRecommendationHeader = () => {
  return (
    <Hb.Box
      style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 20,
        paddingBottom: 20,
        flexShrink: 0,
      }}
    >
      <Hb.Box>
        <Hb.Text
          variant="h6"
          style={{
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          오늘의 메뉴
        </Hb.Text>
        <Hb.Text
          variant="body2"
          style={{
            color: "var(--hb-color-text-secondary)",
          }}
        >
          추천받고 싶은 메뉴를 추가하고 추첨해 보세요.
        </Hb.Text>
      </Hb.Box>
    </Hb.Box>
  );
};
