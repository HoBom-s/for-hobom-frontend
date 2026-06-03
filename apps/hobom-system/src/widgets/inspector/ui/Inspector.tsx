import { Hb } from "@/shared/ui";
import { getManifest, type PropSpec } from "@/entities/manifest";
import { isComponentNode, type DocumentNode, type PropValue } from "@/entities/document";

interface InspectorProps {
  node: DocumentNode | undefined;
  onChange: (prop: string, value: PropValue) => void;
}

/** 선택된 노드의 prop을 매니페스트 기반 컨트롤로 편집한다. */
export function Inspector({ node, onChange }: InspectorProps) {
  if (!node || !isComponentNode(node)) {
    return (
      <Hb.Text variant="body2" color="text.secondary">
        노드를 선택하세요
      </Hb.Text>
    );
  }

  const manifest = getManifest(node.type);

  if (!manifest) {
    return (
      <Hb.Text variant="caption" color="error">
        ⚠ 미등록 컴포넌트: {node.type}
      </Hb.Text>
    );
  }

  return (
    <Hb.Stack gap={2}>
      <Hb.Text variant="body2" sx={{ fontWeight: 600 }}>
        {node.type}
      </Hb.Text>
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
  );
}

interface PropFieldProps {
  name: string;
  spec: PropSpec;
  value: PropValue | undefined;
  onChange: (prop: string, value: PropValue) => void;
}

/** prop 한 개를 spec.kind에 맞는 컨트롤로 렌더한다. slot은 편집 대상이 아니다. */
function PropField({ name, spec, value, onChange }: PropFieldProps) {
  if (spec.kind === "slot") {
    return null;
  }

  return (
    <Hb.Stack gap={0.5}>
      <Hb.Text variant="caption" color="text.secondary">
        {name}
      </Hb.Text>

      {spec.kind === "enum" && (
        <Hb.Stack direction="row" gap={0.5} sx={{ flexWrap: "wrap" }}>
          {spec.values.map((option) => (
            <Hb.Button
              key={option}
              size="small"
              variant={value === option ? "primary" : "ghost"}
              onClick={() => onChange(name, option)}
            >
              {option}
            </Hb.Button>
          ))}
        </Hb.Stack>
      )}

      {spec.kind === "boolean" && (
        <Hb.Checkbox
          checked={Boolean(value)}
          onChange={(event) => onChange(name, event.target.checked)}
        />
      )}
    </Hb.Stack>
  );
}
