import { useState } from "react";
import type { ErrorEventDto } from "@/entities/error-event";
import { Hb } from "@/shared/ui";
import { useErrorEventSearch } from "../model/useErrorEventSearch";
import { ErrorEventFilter } from "./ErrorEventFilter";
import { ErrorEventTable } from "./ErrorEventTable";
import { ErrorEventDetailDialog } from "./ErrorEventDetailDialog";

export const ErrorMonitoringContent = () => {
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
  } = useErrorEventSearch();

  const [selectedEvent, setSelectedEvent] = useState<ErrorEventDto | null>(
    null,
  );

  return (
    <Hb.Box>
      <ErrorEventFilter
        filter={filter}
        totalCount={totalCount}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {isLoading ? (
        <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <Hb.Progress.Circular size={28} />
        </Hb.Box>
      ) : (
        <ErrorEventTable data={items} onRowClick={setSelectedEvent} />
      )}

      {totalPages > 1 && (
        <Hb.Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Hb.Pagination
            count={totalPages}
            page={page + 1}
            onChange={(_, v) => setPage(v - 1)}
            shape="rounded"
            size="medium"
          />
        </Hb.Box>
      )}

      <ErrorEventDetailDialog
        event={selectedEvent}
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      />
    </Hb.Box>
  );
};
