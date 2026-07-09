import { useState } from "react";
import { BottomSheetCTA } from "./BottomSheetCTA";
import { Button } from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Patterns/BottomSheetCTA",
  component: BottomSheetCTA,
  args: { open: false, onClose: () => {}, children: null },
  parameters: {
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof BottomSheetCTA>;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <Button onClick={() => setOpen(true)}>열기</Button>
      <BottomSheetCTA open={open} onClose={() => setOpen(false)}>
        <BottomSheetCTA.Title>
          <Text variant="subtitle1" style={{ fontWeight: 700 }}>
            메뉴 추가하기
          </Text>
        </BottomSheetCTA.Title>
        <BottomSheetCTA.Body>
          <Text variant="body2">여기에 폼 내용이 들어갑니다.</Text>
        </BottomSheetCTA.Body>
        <BottomSheetCTA.Footer>
          <Button variant="secondary" fullWidth onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button variant="primary" fullWidth onClick={() => setOpen(false)}>
            확인
          </Button>
        </BottomSheetCTA.Footer>
      </BottomSheetCTA>
    </div>
  );
};

export const Basic: Story = { render: () => <Demo /> };
