import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { RestartAltOutlined, SearchOutlined } from "@mui/icons-material";

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
          에러 검색
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
        alignItems: "center",
        gap: 1.5,
        flexWrap: "wrap",
        mb: 2,
      }}
    >
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>에러 타입</InputLabel>
        <Select
          label="에러 타입"
          value={filter.errorType}
          onChange={(e) => onFilterChange("errorType", e.target.value)}
        >
          {TYPE_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        size="small"
        label="화면 (path)"
        value={filter.screen}
        onChange={(e) => onFilterChange("screen", e.target.value)}
        sx={{ width: 200 }}
      />

      <Button
        size="small"
        variant="outlined"
        color="inherit"
        startIcon={<RestartAltOutlined sx={{ fontSize: 16 }} />}
        onClick={onReset}
        sx={{ color: "text.secondary", textTransform: "none" }}
      >
        초기화
      </Button>
    </Box>
  </Box>
);
