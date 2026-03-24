import { useState } from "react";
import { Hb } from "@/shared/ui";
import type { RequestSearchParams } from "@/entities/analytics";

interface RequestSearchFormProps {
  initialParams: RequestSearchParams;
  onSearch: (params: Partial<RequestSearchParams>) => void;
  onReset: () => void;
}

const METHODS = ["", "GET", "POST", "PUT", "PATCH", "DELETE"];

export const RequestSearchForm = ({ initialParams, onSearch, onReset }: RequestSearchFormProps) => {
  const [method, setMethod] = useState(initialParams.method ?? "");
  const [path, setPath] = useState(initialParams.path ?? "");
  const [statusCode, setStatusCode] = useState(initialParams.statusCode?.toString() ?? "");
  const [from, setFrom] = useState(initialParams.from ?? "");
  const [to, setTo] = useState(initialParams.to ?? "");

  const handleSearch = () => {
    onSearch({
      method: method || undefined,
      path: path || undefined,
      statusCode: statusCode ? Number(statusCode) : undefined,
      from: from || undefined,
      to: to || undefined,
    });
  };

  const handleReset = () => {
    setMethod("");
    setPath("");
    setStatusCode("");
    setFrom("");
    setTo("");
    onReset();
  };

  return (
    <Hb.Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center", mb: 2 }}>
      <Hb.Form.Select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        size="small"
        displayEmpty
        sx={{ minWidth: 100 }}
      >
        <Hb.Menu.Item value="">All Methods</Hb.Menu.Item>
        {METHODS.filter(Boolean).map((m) => (
          <Hb.Menu.Item key={m} value={m}>
            {m}
          </Hb.Menu.Item>
        ))}
      </Hb.Form.Select>
      <Hb.TextField
        value={path}
        onChange={(e) => setPath(e.target.value)}
        placeholder="Path"
        size="small"
        sx={{ minWidth: 200 }}
      />
      <Hb.TextField
        value={statusCode}
        onChange={(e) => setStatusCode(e.target.value)}
        placeholder="Status Code"
        size="small"
        sx={{ minWidth: 120 }}
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
