import { type ReactNode, Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { List, Paper } from "@mui/material";
import { FutureMessageSpeedDial } from "@/features/send-future-message/ui/FutureMessageSpeedDial.tsx";
import { fetchFutureMessagesBySendStatusOptions } from "@/entities/future-message/api/future-message.queries.ts";
import { FutureMessageStatusListItem } from "@/entities/future-message";
import type { FutureMessageSendStatusType } from "@/entities/future-message/model/future-message-send-status.model.ts";
import { useRouterQuery } from "@/shared/router/model";
import { HoBomSkeleton } from "@/shared/skeleton";

export const FutureMessageContent = () => {
  return (
    <Suspense
      fallback={
        <FutureMessageContent.Layout>
          {Array.from({ length: 25 }).map((_, i) => (
            <HoBomSkeleton.List key={i} />
          ))}
        </FutureMessageContent.Layout>
      }
    >
      <Inner />
    </Suspense>
  );
};

const Inner = () => {
  const { query } = useRouterQuery();
  const status = query.get("status") ?? "PENDING";
  const { data: messages } = useSuspenseQuery(
    fetchFutureMessagesBySendStatusOptions({
      status: status as FutureMessageSendStatusType,
    }),
  );

  return (
    <div>
      <FutureMessageContent.Layout>
        <List dense>
          {messages.items.map((message, idx) => (
            <FutureMessageStatusListItem
              key={message.id}
              item={message}
              showDivider={idx !== messages.items.length - 1}
            />
          ))}
        </List>
        <FutureMessageSpeedDial />
      </FutureMessageContent.Layout>
    </div>
  );
};

FutureMessageContent.Layout = ({ children }: { children: ReactNode }) => (
  <Paper
    elevation={2}
    sx={{
      width: "92%",
      height: "calc(100vh - 174px)",
      m: "0 auto",
      mt: "6px",
      px: 3,
      py: 1,
      bgcolor: "background.paper",
      overflowY: "auto",
    }}
  >
    {children}
  </Paper>
);
