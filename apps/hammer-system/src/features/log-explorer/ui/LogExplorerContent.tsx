import { useState, type SyntheticEvent } from "react";
import { Hb } from "@/shared/ui";
import { DashboardPaper } from "@/entities/analytics";
import { useRequestSearch } from "../model/useRequestSearch";
import { useErrorSearch } from "../model/useErrorSearch";
import { RequestSearchForm } from "./RequestSearchForm";
import { RequestTable } from "./RequestTable";
import { ErrorSearchForm } from "./ErrorSearchForm";
import { ErrorTable } from "./ErrorTable";
import { TraceDetailDialog } from "./TraceDetailDialog";

type TabValue = "requests" | "errors";

export const LogExplorerContent = () => {
  const [tab, setTab] = useState<TabValue>("requests");
  const [selectedTraceId, setSelectedTraceId] = useState<string | null>(null);

  const reqSearch = useRequestSearch();
  const errSearch = useErrorSearch();

  const handleTabChange = (_: SyntheticEvent, value: TabValue) => {
    setTab(value);
  };

  return (
    <Hb.Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Hb.Tabs.Root value={tab} onChange={handleTabChange} sx={{ mb: 1 }}>
        <Hb.Tabs.Item value="requests" label="Requests" sx={{ minHeight: 44 }} />
        <Hb.Tabs.Item value="errors" label="Errors" sx={{ minHeight: 44 }} />
      </Hb.Tabs.Root>

      {tab === "requests" && (
        <DashboardPaper>
          <RequestSearchForm
            initialParams={reqSearch.params}
            onSearch={reqSearch.search}
            onReset={reqSearch.reset}
          />
          {reqSearch.isLoading && (
            <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <Hb.Progress.Circular size={28} />
            </Hb.Box>
          )}
          {reqSearch.data && !reqSearch.isLoading && (
            <RequestTable
              data={reqSearch.data}
              onTraceClick={setSelectedTraceId}
              onPageChange={reqSearch.goToPage}
            />
          )}
        </DashboardPaper>
      )}

      {tab === "errors" && (
        <DashboardPaper>
          <ErrorSearchForm
            initialParams={errSearch.params}
            onSearch={errSearch.search}
            onReset={errSearch.reset}
          />
          {errSearch.isLoading && (
            <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <Hb.Progress.Circular size={28} />
            </Hb.Box>
          )}
          {errSearch.data && !errSearch.isLoading && (
            <ErrorTable
              data={errSearch.data}
              onTraceClick={setSelectedTraceId}
              onPageChange={errSearch.goToPage}
            />
          )}
        </DashboardPaper>
      )}

      <TraceDetailDialog traceId={selectedTraceId} onClose={() => setSelectedTraceId(null)} />
    </Hb.Box>
  );
};
