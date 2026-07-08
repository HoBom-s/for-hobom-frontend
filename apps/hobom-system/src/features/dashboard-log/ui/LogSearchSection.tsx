import { SearchOutlined, RestartAltOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { SERVICE_LABEL_MAP } from "../lib/log-dashboard.lib";
import { useLogSearch } from "../model/useLogSearch";
import { LogEntryTable } from "./LogEntryTable";

const SERVICE_OPTIONS = [
  { value: "", label: "전체" },
  ...Object.entries(SERVICE_LABEL_MAP).map(([value, label]) => ({
    value,
    label,
  })),
];

const METHOD_OPTIONS = [
  { value: "", label: "전체" },
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
  { value: "PUT", label: "PUT" },
  { value: "PATCH", label: "PATCH" },
  { value: "DELETE", label: "DELETE" },
];

export const LogSearchSection = () => {
  const {
    filter,
    page,
    setPage,
    items,
    totalCount,
    totalPages,
    isLoading,
    handleFilterChange,
    handleReset,
  } = useLogSearch();

  return (
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
            로그 검색
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
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Hb.Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <Hb.Form.Control size="small" sx={{ minWidth: 130 }}>
            <Hb.Form.Label>서비스</Hb.Form.Label>
            <Hb.Form.Select
              label="서비스"
              value={filter.serviceType}
              onChange={(e) => handleFilterChange("serviceType", e.target.value)}
            >
              {SERVICE_OPTIONS.map((opt) => (
                <Hb.Form.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Hb.Form.Option>
              ))}
            </Hb.Form.Select>
          </Hb.Form.Control>

          <Hb.Form.Control size="small" sx={{ minWidth: 120 }}>
            <Hb.Form.Label>Method</Hb.Form.Label>
            <Hb.Form.Select
              label="Method"
              value={filter.httpMethod}
              onChange={(e) => handleFilterChange("httpMethod", e.target.value)}
            >
              {METHOD_OPTIONS.map((opt) => (
                <Hb.Form.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Hb.Form.Option>
              ))}
            </Hb.Form.Select>
          </Hb.Form.Control>

          <Hb.TextField
            size="small"
            label="Status Code"
            type="number"
            value={filter.statusCode}
            onChange={(e) => handleFilterChange("statusCode", e.target.value)}
            sx={{ width: 130 }}
            slotProps={{ htmlInput: { min: 100, max: 599 } }}
          />

          <Hb.Button
            size="small"
            variant="secondary"
            startIcon={<RestartAltOutlined sx={{ fontSize: 16 }} />}
            onClick={handleReset}
            style={{
              color: "var(--hb-color-text-secondary)",
              textTransform: "none",
            }}
          >
            초기화
          </Hb.Button>
        </Hb.Box>
        {totalPages > 1 && (
          <Hb.Box
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Hb.Pagination
              count={totalPages}
              page={page + 1}
              onChange={(_, v) => setPage(v - 1)}
              shape="rounded"
              size="small"
            />
          </Hb.Box>
        )}
      </Hb.Box>
      {isLoading ? (
        <Hb.Box
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <Hb.Progress.Circular size={28} />
        </Hb.Box>
      ) : (
        <LogEntryTable data={items} />
      )}
    </Hb.Box>
  );
};
