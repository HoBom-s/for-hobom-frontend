import { Hb } from "@/shared/ui";
import { getManifest, type PropSpec } from "@/entities/manifest";
import { isComponentNode, type DocumentNode, type PropValue } from "@/entities/document";

interface InspectorProps {
  node: DocumentNode | undefined;
  onChange: (prop: string, value: PropValue) => void;
}

/** 선택된 노드의 prop을 매니페스트 기반 컨트롤로 편집한다(피그마식 속성 패널). */
export function Inspector({ node, onChange }: InspectorProps) {
  if (!node || !isComponentNode(node)) {
    return (
      <Hb.Box sx={{ p: 2 }}>
        <Hb.Text sx={{ fontSize: 12, color: "text.secondary" }}>요소를 선택하세요</Hb.Text>
      </Hb.Box>
    );
  }

  const manifest = getManifest(node.type);

  return (
    <Hb.Box sx={{ p: 1.5 }}>
      <Hb.Text sx={{ fontSize: 13, fontWeight: 600, mb: 1.5 }}>{node.type}</Hb.Text>

      {!manifest ? (
        <Hb.Text sx={{ fontSize: 12, color: "error.main" }}>
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
    </Hb.Box>
  );
}

interface PropFieldProps {
  name: string;
  spec: PropSpec;
  value: PropValue | undefined;
  onChange: (prop: string, value: PropValue) => void;
}

const labelSx = { fontSize: 11, color: "text.secondary" } as const;

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
        <Hb.Text sx={labelSx}>{name}</Hb.Text>
        <Hb.Checkbox
          size="small"
          sx={{ p: 0 }}
          checked={Boolean(value)}
          onChange={(event) => onChange(name, event.target.checked)}
        />
      </Hb.Stack>
    );
  }

  return (
    <Hb.Stack gap={0.5} sx={{ minWidth: 0 }}>
      <Hb.Text sx={labelSx}>{name}</Hb.Text>
      <Hb.Box
        sx={{
          display: "flex",
          borderRadius: 1,
          overflow: "hidden",
          border: 1,
          borderColor: "divider",
        }}
      >
        {spec.values.map((option, index) => (
          <Hb.Box
            key={option}
            component="button"
            onClick={() => onChange(name, option)}
            sx={{
              flex: 1,
              border: 0,
              borderLeft: index === 0 ? 0 : 1,
              borderColor: "divider",
              py: 0.5,
              px: 0.5,
              fontSize: 11,
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "background-color 0.12s",
              bgcolor: value === option ? "primary.main" : "transparent",
              color: value === option ? "primary.contrastText" : "text.secondary",
              "&:hover": {
                bgcolor: value === option ? "primary.main" : "action.hover",
              },
            }}
          >
            {option}
          </Hb.Box>
        ))}
      </Hb.Box>
    </Hb.Stack>
  );
}
