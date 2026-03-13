import { Hb } from "@/shared/ui";
export const PickMenuHeader = () => {
  return (
    <Hb.Box sx={{ px: 3, py: 2.5, flexShrink: 0 }}>
      <Hb.Text variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
        메뉴 추첨
      </Hb.Text>
      <Hb.Text variant="body2" sx={{ color: "text.secondary" }}>
        추첨할 메뉴를 선택해 주세요.
      </Hb.Text>
    </Hb.Box>
  );
};
