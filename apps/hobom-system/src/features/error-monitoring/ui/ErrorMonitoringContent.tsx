import { useState } from "react";
import { Box, CircularProgress, Pagination } from "@mui/material";
import type { ErrorEventDto } from "@/entities/error-event";
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
    <Box>
      <ErrorEventFilter
        filter={filter}
        totalCount={totalCount}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <ErrorEventTable data={items} onRowClick={setSelectedEvent} />
      )}

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(_, v) => setPage(v - 1)}
            shape="rounded"
            size="medium"
          />
        </Box>
      )}

      <ErrorEventDetailDialog
        event={selectedEvent}
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      />
    </Box>
  );
};
