import {
  FutureMessageContent,
  FutureMessageHeader,
  FutureMessageStatusTab,
} from "@/features/send-future-message";
import { Hb } from "@/shared/ui";

export const FutureMessageWorkspace = () => {
  return (
    <Hb.Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 2,
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
          sx={{
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
