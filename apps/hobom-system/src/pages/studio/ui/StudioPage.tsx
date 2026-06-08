import { Hb } from "@/shared/ui";
import { Canvas } from "@/widgets/canvas";
import { CodePanel } from "@/widgets/code-panel";
import { InsertPalette } from "@/widgets/insert-palette";
import { Inspector } from "@/widgets/inspector";
import { LayersPanel } from "@/widgets/layers-panel";
import { useStudioEditor } from "../model/useStudioEditor";
import { studioTheme } from "../config/studio-theme";

/**
 * HoBom Studio — 디자인 시스템 기반 웹 캔버스 진입점.
 * 좌: 삽입+레이어 / 중앙: 캔버스(아트보드) / 우: 속성 + 코드. (디자인 툴 류 다크 UI)
 */
export default function StudioPage() {
  const {
    document,
    selectedId,
    selectedNode,
    selectNode,
    updateProp,
    updateStyle,
    resizeNode,
    reorderNode,
    insertComponent,
    deleteSelected,
  } = useStudioEditor();

  return (
    <Hb.ThemeProvider theme={studioTheme}>
      <Hb.Stack
        direction="row"
        sx={{
          height: "100%",
          minHeight: 0,
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Panel width={232} side="right">
          <SectionHeader>삽입</SectionHeader>
          <InsertPalette onInsert={insertComponent} />
          <Hb.Divider />
          <SectionHeader>레이어</SectionHeader>
          <LayersPanel
            document={document}
            selectedId={selectedId}
            onSelect={selectNode}
            onReorder={reorderNode}
          />
        </Panel>

        <Hb.Stack
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            p: 4,
            gap: 1,
            overflow: "auto",
          }}
        >
          <Hb.Text sx={{ fontSize: 11, color: "text.secondary", flexShrink: 0 }}>Frame</Hb.Text>
          <Hb.Box
            sx={{
              flex: 1,
              minHeight: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
              bgcolor: "#ffffff",
              borderRadius: 1,
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
            }}
          >
            <Canvas
              document={document}
              selectedId={selectedId}
              onSelect={selectNode}
              onResize={resizeNode}
            />
          </Hb.Box>
        </Hb.Stack>

        <Panel width={280} side="left">
          <Inspector
            node={selectedNode}
            onChange={updateProp}
            onStyleChange={updateStyle}
            onDelete={deleteSelected}
          />
          <Hb.Divider />
          <Hb.Box sx={{ p: 1.5 }}>
            <CodePanel document={document} />
          </Hb.Box>
        </Panel>
      </Hb.Stack>
    </Hb.ThemeProvider>
  );
}

interface PanelProps {
  width: number;
  side: "left" | "right";
  children: React.ReactNode;
}

/** 좌/우 사이드 패널 — 스크롤 본문 컨테이너. */
function Panel({ width, side, children }: PanelProps) {
  return (
    <Hb.Stack
      sx={{
        width,
        flexShrink: 0,
        minWidth: 0,
        bgcolor: "background.paper",
        [side === "right" ? "borderRight" : "borderLeft"]: 1,
        borderColor: "divider",
        overflow: "auto",
      }}
    >
      {children}
    </Hb.Stack>
  );
}

/** 패널 내 섹션 헤더(작은 대문자 라벨). */
function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Hb.Box sx={{ px: 1.5, py: 1, borderBottom: 1, borderColor: "divider" }}>
      <Hb.Text
        sx={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        {children}
      </Hb.Text>
    </Hb.Box>
  );
}
