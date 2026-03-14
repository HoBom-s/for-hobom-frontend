import { Hb } from "@/shared/ui";
import { ISSUE_KIND_LABEL } from "../model/issue.model";
import { ISSUE_KIND_REGISTRY } from "./IssueRegistry";
import type { IssueKind } from "../model/issue.model";
import type { IssueType } from "../api/issue.type";

interface ParentIssueAutocompleteProps {
  value: IssueType | null;
  options: IssueType[];
  onChange: (value: IssueType | null) => void;
  label?: string;
  placeholder?: string;
}

export const ParentIssueAutocomplete = ({
  value,
  options,
  onChange,
  label = "상위 이슈 (선택)",
  placeholder = "에픽 또는 스토리 검색",
}: ParentIssueAutocompleteProps) => (
  <Hb.Autocomplete<IssueType>
    size="small"
    value={value}
    options={options}
    getOptionLabel={(opt) => `${opt.issueKey} ${opt.title}`}
    isOptionEqualToValue={(opt, val) => opt.id === val.id}
    groupBy={(option) => ISSUE_KIND_LABEL[option.type]}
    onChange={(_e, newValue) => onChange(newValue)}
    renderGroup={(params) => {
      const kind = Object.entries(ISSUE_KIND_LABEL).find(([, l]) => l === params.group)?.[0] as
        | IssueKind
        | undefined;
      const config = kind ? ISSUE_KIND_REGISTRY[kind] : null;

      return (
        <li key={params.key}>
          <Hb.Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              px: 1.5,
              py: 0.75,
              position: "sticky",
              top: -8,
              bgcolor: config?.bg ?? "#f3f4f6",
              zIndex: 1,
            }}
          >
            {config && <config.Icon sx={{ fontSize: 14, color: config.color }} />}
            <Hb.Text
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: 11,
                color: config?.color ?? "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {params.group}
            </Hb.Text>
          </Hb.Box>
          <ul style={{ padding: 0 }}>{params.children}</ul>
        </li>
      );
    }}
    renderOption={({ key, ...props }, option) => {
      const config = ISSUE_KIND_REGISTRY[option.type];

      return (
        <Hb.Menu.Item
          key={key}
          {...props}
          sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.75 }}
        >
          <config.Icon sx={{ fontSize: 16, color: config.color, flexShrink: 0 }} />
          <Hb.Text
            variant="caption"
            sx={{
              fontWeight: 600,
              fontSize: 11,
              color: "text.disabled",
              flexShrink: 0,
            }}
          >
            {option.issueKey}
          </Hb.Text>
          <Hb.Text
            variant="body2"
            sx={{
              fontSize: 13,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {option.title}
          </Hb.Text>
        </Hb.Menu.Item>
      );
    }}
    renderInput={(params) => <Hb.TextField {...params} label={label} placeholder={placeholder} />}
    noOptionsText="선택 가능한 상위 이슈 없음"
    slotProps={{
      paper: { sx: { borderRadius: 2, boxShadow: 3 } },
    }}
  />
);
