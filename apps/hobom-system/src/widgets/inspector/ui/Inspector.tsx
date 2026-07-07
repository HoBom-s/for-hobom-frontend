import * as stylex from "@stylexjs/stylex";
import { DeleteOutline } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { getManifest, type PropSpec } from "@/entities/manifest";
import {
  isComponentNode,
  type DocumentNode,
  type NodeStyle,
  type PropValue,
} from "@/entities/document";

interface InspectorProps {
  node: DocumentNode | undefined;
  onChange: (prop: string, value: PropValue) => void;
  onStyleChange: (key: keyof NodeStyle, value: number | undefined) => void;
  onDelete: () => void;
}

/** 선택된 노드의 prop·사이징을 매니페스트 기반 컨트롤로 편집한다(피그마식 속성 패널). */
export function Inspector({ node, onChange, onStyleChange, onDelete }: InspectorProps) {
  if (!node || !isComponentNode(node)) {
    return (
      <Hb.Box
        style={{
          padding: 16,
        }}
      >
        <Hb.Text
          style={{
            fontSize: 12,
            color: "var(--hb-color-text-secondary)",
          }}
        >
          요소를 선택하세요
        </Hb.Text>
      </Hb.Box>
    );
  }

  const manifest = getManifest(node.type);

  return (
    <Hb.Box
      style={{
        padding: 12,
      }}
    >
      <Hb.Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Hb.Text
          style={{
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {node.type}
        </Hb.Text>
        <Hb.Button.Icon
          size="small"
          aria-label="삭제"
          onClick={onDelete}
          sx={{ p: 0.25, color: "text.secondary" }}
        >
          <DeleteOutline sx={{ fontSize: 16 }} />
        </Hb.Button.Icon>
      </Hb.Stack>
      {!manifest ? (
        <Hb.Text
          style={{
            fontSize: 12,
            color: "var(--hb-color-danger)",
          }}
        >
          미등록 컴포넌트: {node.type}
        </Hb.Text>
      ) : (
        <Hb.Stack gap={1.25}>
          {Object.entries(manifest.props).map(([name, spec]) => (
            <PropField
              key={name}
              name={name}
              spec={spec}
              value={node.props[name]}
              onChange={onChange}
            />
          ))}
        </Hb.Stack>
      )}
      <Hb.Divider
        style={{
          marginTop: 12,
          marginBottom: 12,
        }}
      />
      <Hb.Text
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: "var(--hb-color-text-secondary)",
          marginBottom: 8,
        }}
      >
        사이징
      </Hb.Text>
      <Hb.Stack gap={1.25}>
        <SizeField
          label="W"
          value={node.style?.width}
          onChange={(v) => onStyleChange("width", v)}
        />
        <SizeField
          label="H"
          value={node.style?.height}
          onChange={(v) => onStyleChange("height", v)}
        />
      </Hb.Stack>
    </Hb.Box>
  );
}

interface SizeFieldProps {
  label: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

/** 사이징(W/H) 숫자 입력 행. 비우면 미설정(auto). */
function SizeField({ label, value, onChange }: SizeFieldProps) {
  return (
    <Hb.Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ minHeight: 24 }}
    >
      <Hb.Text style={labelStyle}>{label}</Hb.Text>
      <Hb.TextField
        size="small"
        type="number"
        placeholder="auto"
        value={value === undefined ? "" : String(value)}
        onChange={(event) =>
          onChange(event.target.value === "" ? undefined : Number(event.target.value))
        }
        sx={{ ...inputSx, width: 72 }}
      />
    </Hb.Stack>
  );
}

interface PropFieldProps {
  name: string;
  spec: PropSpec;
  value: PropValue | undefined;
  onChange: (prop: string, value: PropValue) => void;
}

const labelStyle = { fontSize: 11, color: "var(--hb-color-text-secondary)" } as const;
const inputSx = { "& .MuiInputBase-input": { fontSize: 12, py: 0.75 } } as const;

const styles = stylex.create({
  segment: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 11,
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "background-color 0.12s",
  },
  segmentSelectedHover: {
    ":hover": { backgroundColor: "var(--hb-color-accent)" },
  },
  segmentUnselectedHover: {
    ":hover": { backgroundColor: "var(--hb-color-border)" },
  },
});

/** prop 한 개를 spec.kind에 맞는 컨트롤로 렌더한다. slot은 편집 대상이 아니다. */
function PropField({ name, spec, value, onChange }: PropFieldProps) {
  if (spec.kind === "slot") {
    return null;
  }

  if (spec.kind === "boolean") {
    return (
      <Hb.Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ minHeight: 24 }}
      >
        <Hb.Text style={labelStyle}>{name}</Hb.Text>
        <Hb.Checkbox
          size="small"
          sx={{ p: 0 }}
          checked={Boolean(value)}
          onChange={(event) => onChange(name, event.target.checked)}
        />
      </Hb.Stack>
    );
  }

  if (spec.kind === "string") {
    return (
      <Hb.Stack gap={0.5} sx={{ minWidth: 0 }}>
        <Hb.Text style={labelStyle}>{name}</Hb.Text>
        <Hb.TextField
          size="small"
          value={value === undefined ? "" : String(value)}
          onChange={(event) => onChange(name, event.target.value)}
          sx={inputSx}
        />
      </Hb.Stack>
    );
  }

  if (spec.kind === "number") {
    return (
      <Hb.Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ minHeight: 24 }}
      >
        <Hb.Text style={labelStyle}>{name}</Hb.Text>
        <Hb.TextField
          size="small"
          type="number"
          value={value === undefined ? "" : String(value)}
          onChange={(event) => onChange(name, Number(event.target.value))}
          sx={{ ...inputSx, width: 72 }}
        />
      </Hb.Stack>
    );
  }

  return (
    <Hb.Stack gap={0.5} sx={{ minWidth: 0 }}>
      <Hb.Text style={labelStyle}>{name}</Hb.Text>
      <Hb.Box
        style={{
          display: "flex",
          borderRadius: 8,
          overflow: "hidden",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "var(--hb-color-border)",
        }}
      >
        {spec.values.map((option, index) => (
          <Hb.Box
            key={option}
            component="button"
            onClick={() => onChange(name, option)}
            {...stylex.props(
              styles.segment,
              value === option ? styles.segmentSelectedHover : styles.segmentUnselectedHover,
            )}
            style={{
              border: 0,
              borderLeft: index === 0 ? 0 : "1px solid",
              borderColor: "var(--hb-color-border)",
              backgroundColor: value === option ? "var(--hb-color-accent)" : "transparent",
              color:
                value === option
                  ? "var(--hb-color-accent-contrast)"
                  : "var(--hb-color-text-secondary)",
            }}
          >
            {option}
          </Hb.Box>
        ))}
      </Hb.Box>
    </Hb.Stack>
  );
}
