import { RestartAltOutlined, SearchOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

const TYPE_OPTIONS = [
  { value: "", label: "전체" },
  { value: "SERVER_RESPONSE", label: "Server Response" },
  { value: "CLIENT_LOGIC", label: "Client Logic" },
];

interface ErrorEventFilterProps {
  filter: { errorType: string; screen: string };
  totalCount: number;
  onFilterChange: (key: "errorType" | "screen", value: string) => void;
  onReset: () => void;
}

export const ErrorEventFilter = ({
  filter,
  totalCount,
  onFilterChange,
  onReset,
}: ErrorEventFilterProps) => (
  <Hb.Box>
    <Hb.Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
      }}
    >
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <SearchOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
        <Hb.Text variant="body2" fontWeight={600}>
          에러 검색
        </Hb.Text>
        {totalCount > 0 && (
          <Hb.Text variant="caption" color="text.secondary">
            ({totalCount.toLocaleString()}건)
          </Hb.Text>
        )}
      </Hb.Box>
    </Hb.Box>

    <Hb.Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        marginBottom: 16,
      }}
    >
      <Hb.Form.Control size="small" sx={{ minWidth: 160 }}>
        <Hb.Form.Label>에러 타입</Hb.Form.Label>
        <Hb.Form.Select
          label="에러 타입"
          value={filter.errorType}
          onChange={(e) => onFilterChange("errorType", e.target.value)}
        >
          {TYPE_OPTIONS.map((opt) => (
            <Hb.Menu.Item key={opt.value} value={opt.value}>
              {opt.label}
            </Hb.Menu.Item>
          ))}
        </Hb.Form.Select>
      </Hb.Form.Control>

      <Hb.TextField
        size="small"
        label="화면 (path)"
        value={filter.screen}
        onChange={(e) => onFilterChange("screen", e.target.value)}
        sx={{ width: 200 }}
      />

      <Hb.Button
        size="small"
        variant="secondary"
        startIcon={<RestartAltOutlined sx={{ fontSize: 16 }} />}
        onClick={onReset}
        sx={{ color: "text.secondary", textTransform: "none" }}
      >
        초기화
      </Hb.Button>
    </Hb.Box>
  </Hb.Box>
);
