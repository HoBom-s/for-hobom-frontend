import {
  FutureMessageContent,
  FutureMessageHeader,
  FutureMessageStatusTab,
} from "@/features/send-future-message";
import { Hb } from "@/shared/ui";

export const FutureMessageWorkspace = () => {
  return (
    <Hb.Box
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 24,
        gap: 16,
      }}
    >
      <FutureMessageHeader />
      <Hb.Paper
        elevation={0}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid",
          borderColor: "var(--hb-color-border)",
          borderRadius: 16,
        }}
      >
        <FutureMessageStatusTab />
        <Hb.Box
          style={{
            flex: 1,
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <FutureMessageContent />
        </Hb.Box>
      </Hb.Paper>
    </Hb.Box>
  );
};
