import { useState } from "react";
import { Hb } from "@/shared/ui";
import type { ErrorSearchParams } from "@/entities/analytics";

interface ErrorSearchFormProps {
  initialParams: ErrorSearchParams;
  onSearch: (params: Partial<ErrorSearchParams>) => void;
  onReset: () => void;
}

export const ErrorSearchForm = ({ initialParams, onSearch, onReset }: ErrorSearchFormProps) => {
  const [exceptionType, setExceptionType] = useState(initialParams.exceptionType ?? "");
  const [source, setSource] = useState(initialParams.source ?? "");
  const [from, setFrom] = useState(initialParams.from ?? "");
  const [to, setTo] = useState(initialParams.to ?? "");

  const handleSearch = () => {
    onSearch({
      exceptionType: exceptionType || undefined,
      source: source || undefined,
      from: from || undefined,
      to: to || undefined,
    });
  };

  const handleReset = () => {
    setExceptionType("");
    setSource("");
    setFrom("");
    setTo("");
    onReset();
  };

  return (
    <Hb.Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center", mb: 2 }}>
      <Hb.TextField
        value={exceptionType}
        onChange={(e) => setExceptionType(e.target.value)}
        placeholder="Exception Type"
        size="small"
        sx={{ minWidth: 200 }}
      />
      <Hb.TextField
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Source"
        size="small"
        sx={{ minWidth: 200 }}
      />
      <Hb.TextField
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        type="datetime-local"
        size="small"
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ minWidth: 200 }}
      />
      <Hb.TextField
        value={to}
        onChange={(e) => setTo(e.target.value)}
        type="datetime-local"
        size="small"
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ minWidth: 200 }}
      />
      <Hb.Button variant="primary" size="small" onClick={handleSearch}>
        검색
      </Hb.Button>
      <Hb.Button variant="secondary" size="small" onClick={handleReset}>
        초기화
      </Hb.Button>
    </Hb.Box>
  );
};
