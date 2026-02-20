import { type ReactNode, Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { FutureMessageGrid } from "@/features/send-future-message/ui/FutureMessageGrid";
import {
  fetchFutureMessagesBySendStatusOptions,
  type FutureMessageSendStatusType,
} from "@/entities/future-message";
import { useRouterQuery } from "@/shared/model";
import { HoBomSkeleton } from "@/shared/ui";

export const FutureMessageContent = () => {
  return (
    <Suspense
      fallback={
        <FutureMessageContent.Layout>
          <Box sx={{ p: 2 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <HoBomSkeleton.List key={i} />
            ))}
          </Box>
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
    <FutureMessageContent.Layout>
      <FutureMessageGrid messages={messages.items} />
    </FutureMessageContent.Layout>
  );
};

FutureMessageContent.Layout = ({ children }: { children: ReactNode }) => (
  <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
    {children}
  </Box>
);
