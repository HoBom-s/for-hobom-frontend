import { useState } from "react";
import { Hb } from "@/shared/ui";
import { createSampleDocument } from "@/entities/document";
import { Canvas } from "@/widgets/canvas";

/**
 * HoBom Studio — 디자인 시스템 기반 웹 캔버스 진입점.
 * 좌: 컴포넌트 팔레트 / 중앙: 캔버스 / 우: 인스펙터+코드.
 */
export default function StudioPage() {
  const [document] = useState(createSampleDocument);

  return (
    <Hb.Stack direction="row" sx={{ height: "100%", minHeight: 0 }}>
      <Pane label="컴포넌트" width={240} border="right">
        <Hb.Text variant="body2" color="text.secondary">
          매니페스트 기반 Insert 팔레트 (예정)
        </Hb.Text>
      </Pane>

      <Hb.Box
        sx={{
          flex: 1,
          minWidth: 0,
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Canvas document={document} />
      </Hb.Box>

      <Pane label="속성 · 코드" width={320} border="left">
        <Hb.Text variant="body2" color="text.secondary">
          Inspector + 코드 스니펫 (예정)
        </Hb.Text>
      </Pane>
    </Hb.Stack>
  );
}

interface PaneProps {
  label: string;
  width: number;
  border: "left" | "right";
  children: React.ReactNode;
}

function Pane({ label, width, border, children }: PaneProps) {
  return (
    <Hb.Stack
      sx={{
        width,
        flexShrink: 0,
        bgcolor: "background.paper",
        [`border${border === "right" ? "Right" : "Left"}`]: 1,
        borderColor: "divider",
        p: 2,
        gap: 1,
      }}
    >
      <Hb.Text variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
        {label}
      </Hb.Text>
      {children}
    </Hb.Stack>
  );
}
