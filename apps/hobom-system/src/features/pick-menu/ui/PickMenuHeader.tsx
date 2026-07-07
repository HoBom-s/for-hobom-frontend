import { Hb } from "@/shared/ui";
export const PickMenuHeader = () => {
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
      <Hb.Text
        variant="h6"
        style={{
          fontWeight: 700,
          lineHeight: 1.3,
        }}
      >
        메뉴 추첨
      </Hb.Text>
      <Hb.Text
        variant="body2"
        style={{
          color: "var(--hb-color-text-secondary)",
        }}
      >
        추첨할 메뉴를 선택해 주세요.
      </Hb.Text>
    </Hb.Box>
  );
};
