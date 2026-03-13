import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SearchOutlined, RestartAltOutlined } from "@mui/icons-material";
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
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="body2" fontWeight={600}>
            로그 검색
          </Typography>
          {totalCount > 0 && (
            <Typography variant="caption" color="text.secondary">
              ({totalCount.toLocaleString()}건)
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>서비스</InputLabel>
            <Select
              label="서비스"
              value={filter.serviceType}
              onChange={(e) =>
                handleFilterChange("serviceType", e.target.value)
              }
            >
              {SERVICE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Method</InputLabel>
            <Select
              label="Method"
              value={filter.httpMethod}
              onChange={(e) => handleFilterChange("httpMethod", e.target.value)}
            >
              {METHOD_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Status Code"
            type="number"
            value={filter.statusCode}
            onChange={(e) => handleFilterChange("statusCode", e.target.value)}
            sx={{ width: 130 }}
            slotProps={{ htmlInput: { min: 100, max: 599 } }}
          />

          <Button
            size="small"
            variant="outlined"
            color="inherit"
            startIcon={<RestartAltOutlined sx={{ fontSize: 16 }} />}
            onClick={handleReset}
            sx={{ color: "text.secondary", textTransform: "none" }}
          >
            초기화
          </Button>
        </Box>
        {totalPages > 1 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(_, v) => setPage(v - 1)}
              shape="rounded"
              size="small"
            />
          </Box>
        )}
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <LogEntryTable data={items} />
      )}
    </Box>
  );
};
