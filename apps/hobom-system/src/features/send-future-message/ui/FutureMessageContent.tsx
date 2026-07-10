import { type ReactNode, Suspense } from "react";
import { useSuspenseQuery } from "hobom-data";
import { futureMessageQueries, type FutureMessageSendStatusType } from "@/entities/future-message";
import { useRouterQuery } from "@/shared/model";
import { Hb, HoBomSkeleton } from "@/shared/ui";
import { FutureMessageGrid } from "./FutureMessageGrid";

export const FutureMessageContent = () => {
  const { query } = useRouterQuery();
  const status = query.get("status") ?? "SENT";

  return (
    <Suspense
      key={status}
      fallback={
        <FutureMessageContent.Layout>
          <Hb.Box
            style={{
              padding: 16,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <HoBomSkeleton.List key={i} />
            ))}
          </Hb.Box>
        </FutureMessageContent.Layout>
      }
    >
      <Inner />
    </Suspense>
  );
};

const Inner = () => {
  const { query } = useRouterQuery();
  const status = query.get("status") ?? "SENT";
  const { data: messages } = useSuspenseQuery(
    futureMessageQueries.byStatus({
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
  <Hb.Box
    style={{
      width: "100%",
      height: "100%",
      overflow: "hidden",
    }}
  >
    {children}
  </Hb.Box>
);
