import { useCallback } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowBackOutlined } from "hobom-design-system/icons";
import { Hb, EditableLabel } from "@/shared/ui";
import { RoutesConfig } from "@/shared/config";
import { useWorkspace } from "@/features/workspace";
import type { StudioDocument } from "@/entities/document";
import { Canvas } from "@/widgets/canvas";
import { CodePanel } from "@/widgets/code-panel";
import { InsertPalette } from "@/widgets/insert-palette";
import { Inspector } from "@/widgets/inspector";
import { LayersPanel } from "@/widgets/layers-panel";
import { useStudioEditor } from "../model/useStudioEditor";
import { useStudioKeyboard } from "../model/useStudioKeyboard";
import { studioTheme } from "../config/studio-theme";

/**
 * HoBom Studio 에디터 — 워크스페이스 Item(:itemId)의 문서를 로드해 편집한다.
 * 문서는 워크스페이스 store에 저장되고, 편집은 store로 흐른다.
 */
export default function StudioPage() {
  const { itemId } = useParams();
  const { getItem, getDocument } = useWorkspace();

  const item = itemId ? getItem(itemId) : undefined;
  const document = itemId ? getDocument(itemId) : undefined;

  if (!item || !document) {
    return <Navigate to={RoutesConfig.STUDIO.HOME} replace />;
  }

  return <StudioEditor itemId={item.id} name={item.name} document={document} />;
}

interface StudioEditorProps {
  itemId: string;
  name: string;
  document: StudioDocument;
}

function StudioEditor({ itemId, name, document }: StudioEditorProps) {
  const navigate = useNavigate();
  const { updateDocument, renameItem } = useWorkspace();

  const setDocument = useCallback(
    (updater: (prev: StudioDocument) => StudioDocument) => updateDocument(itemId, updater),
    [updateDocument, itemId],
  );

  const {
    selectedId,
    selectedNode,
    selectNode,
    clearSelection,
    updateProp,
    updateStyle,
    resizeNode,
    reorderNode,
    insertComponent,
    deleteSelected,
  } = useStudioEditor(document, setDocument);

  useStudioKeyboard({ onDelete: deleteSelected, onDeselect: clearSelection });

  return (
    <Hb.ThemeProvider theme={studioTheme}>
      <Hb.Stack
        direction="row"
        style={{
          height: "100%",
          minHeight: 0,
          backgroundColor: "var(--hb-color-canvas)",
          color: "var(--hb-color-text-primary)",
        }}
      >
        <Panel width={232} side="right">
          <Hb.Stack
            direction="row"
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              paddingBottom: 8,
              borderBottom: "1px solid",
              borderColor: "var(--hb-color-border)",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Hb.Button.Icon
              size="small"
              aria-label="워크스페이스로"
              onClick={() => navigate(RoutesConfig.STUDIO.HOME)}
              style={{
                padding: 2,
                color: "var(--hb-color-text-secondary)",
              }}
            >
              <ArrowBackOutlined sx={{ fontSize: 18 }} />
            </Hb.Button.Icon>
            <EditableLabel
              value={name}
              onCommit={(next) => renameItem(itemId, next)}
              textSx={{ fontSize: 12, fontWeight: 600, minWidth: 0 }}
              inputSx={{ fontSize: 12, fontWeight: 600 }}
            />
          </Hb.Stack>

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
          onClick={clearSelection}
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            padding: 32,
            gap: 8,
            overflow: "auto",
          }}
        >
          <Hb.Text
            style={{
              fontSize: 11,
              color: "var(--hb-color-text-secondary)",
              flexShrink: 0,
            }}
          >
            Frame
          </Hb.Text>
          <Hb.Box
            style={{
              flex: 1,
              minHeight: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
              backgroundColor: "#ffffff",
              borderRadius: 8,
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
          <Hb.Box
            style={{
              padding: 12,
            }}
          >
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
      style={{
        width,
        flexShrink: 0,
        minWidth: 0,
        backgroundColor: "var(--hb-color-surface)",
        [side === "right" ? "borderRight" : "borderLeft"]: "1px solid",
        borderColor: "var(--hb-color-border)",
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
    <Hb.Box
      style={{
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderBottom: 1,
        borderColor: "var(--hb-color-border)",
      }}
    >
      <Hb.Text
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: "var(--hb-color-text-secondary)",
        }}
      >
        {children}
      </Hb.Text>
    </Hb.Box>
  );
}
