import { AddOutlined } from "hobom-design-system/icons";
import {
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  type IssueKind,
  type IssuePriority,
} from "@/entities/issue";
import { ParentIssueAutocomplete } from "@/entities/issue/ui";
import type { SprintType } from "@/entities/sprint";
import { ProjectLabelPicker } from "@/entities/project-label/ui";
import { Hb } from "@/shared/ui";
import { useCreateIssueForm } from "../model/useCreateIssueForm";

interface CreateIssueDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  defaultParentId?: string;
}

export const CreateIssueDialog = ({
  open,
  onClose,
  projectId,
  defaultParentId,
}: CreateIssueDialogProps) => {
  const {
    fields,
    labelAnchor,
    setLabelAnchor,
    handleSubmit,
    isPending,
    parentCandidates,
    activeSprints,
    labelMap,
  } = useCreateIssueForm({
    projectId,
    defaultParentId,
    enabled: open,
    onSuccess: onClose,
  });

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="sm">
      <Hb.Dialog.Title>{defaultParentId ? "하위 이슈 만들기" : "이슈 만들기"}</Hb.Dialog.Title>
      <Hb.Dialog.Content sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Hb.TextField
          label="제목"
          value={fields.title}
          onChange={(e) => fields.setTitle(e.target.value)}
          fullWidth
          size="small"
          sx={{ mt: 1 }}
        />
        <Hb.TextField
          label="설명"
          value={fields.description}
          onChange={(e) => fields.setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          size="small"
        />
        <Hb.Box
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <Hb.Form.Control size="small" sx={{ flex: 1 }}>
            <Hb.Form.Label>유형</Hb.Form.Label>
            <Hb.Form.Select
              value={fields.kind}
              label="유형"
              onChange={(e) => fields.setKind(e.target.value as IssueKind)}
            >
              {Object.entries(ISSUE_KIND_LABEL).map(([k, label]) => (
                <Hb.Menu.Item key={k} value={k}>
                  {label}
                </Hb.Menu.Item>
              ))}
            </Hb.Form.Select>
          </Hb.Form.Control>
          <Hb.Form.Control size="small" sx={{ flex: 1 }}>
            <Hb.Form.Label>우선순위</Hb.Form.Label>
            <Hb.Form.Select
              value={fields.priority}
              label="우선순위"
              onChange={(e) => fields.setPriority(e.target.value as IssuePriority)}
            >
              {Object.entries(ISSUE_PRIORITY_LABEL).map(([k, label]) => (
                <Hb.Menu.Item key={k} value={k}>
                  {label}
                </Hb.Menu.Item>
              ))}
            </Hb.Form.Select>
          </Hb.Form.Control>
        </Hb.Box>
        <Hb.Box
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {activeSprints.length > 0 && (
            <Hb.Form.Control size="small" sx={{ flex: 1 }}>
              <Hb.Form.Label>스프린트 (선택)</Hb.Form.Label>
              <Hb.Form.Select
                value={fields.sprint}
                label="스프린트 (선택)"
                displayEmpty
                onChange={(e) => fields.setSprint(e.target.value)}
              >
                <Hb.Menu.Item value="">없음</Hb.Menu.Item>
                {activeSprints.map((s: SprintType) => (
                  <Hb.Menu.Item key={s.id} value={s.id}>
                    {s.name}
                  </Hb.Menu.Item>
                ))}
              </Hb.Form.Select>
            </Hb.Form.Control>
          )}
          <Hb.TextField
            label="스토리 포인트"
            type="number"
            value={fields.storyPoints}
            onChange={(e) => fields.setStoryPoints(e.target.value)}
            size="small"
            slotProps={{ htmlInput: { min: 0, step: 1 } }}
            sx={{ width: 140 }}
          />
        </Hb.Box>
        <Hb.Box>
          <Hb.Text
            variant="body2"
            style={{
              marginBottom: 4,
              fontSize: 13,
              color: "var(--hb-color-text-secondary)",
            }}
          >
            라벨
          </Hb.Text>
          <Hb.Box
            style={{
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {fields.selectedLabels.map((labelId) => {
              const label = labelMap.get(labelId);

              if (!label) return null;

              return (
                <Hb.Chip
                  key={label.id}
                  label={label.name}
                  size="small"
                  onDelete={() =>
                    fields.setSelectedLabels((prev) => prev.filter((id) => id !== labelId))
                  }
                  style={{
                    height: 22,
                    fontSize: 11,
                    fontWeight: 500,
                    backgroundColor: `${label.color}18`,
                    color: label.color,
                  }}
                />
              );
            })}
            <Hb.Chip
              icon={<AddOutlined sx={{ fontSize: 14 }} />}
              label="추가"
              size="small"
              variant="outlined"
              onClick={(e) => setLabelAnchor(e.currentTarget)}
              style={{
                height: 22,
                fontSize: 11,
                cursor: "pointer",
                borderStyle: "dashed",
              }}
            />
          </Hb.Box>
          <ProjectLabelPicker
            anchorEl={labelAnchor}
            onClose={() => setLabelAnchor(null)}
            projectId={projectId}
            selectedIds={new Set(fields.selectedLabels)}
            onToggle={(labelId) => {
              fields.setSelectedLabels((prev) =>
                prev.includes(labelId) ? prev.filter((id) => id !== labelId) : [...prev, labelId],
              );
            }}
          />
        </Hb.Box>
        <ParentIssueAutocomplete
          value={fields.parentIssue}
          options={parentCandidates}
          onChange={fields.setParentIssue}
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions sx={{ px: 3, pb: 2 }}>
        <Hb.Button variant="secondary" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!fields.title.trim()}
          loading={isPending}
        >
          만들기
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
