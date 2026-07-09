import type { CSSProperties } from "react";
import { Box } from "../../components/Box/Box";
import { Progress } from "../../components/Progress/Progress";
import { Text } from "../../components/Text/Text";

interface Props {
  /** true이면 100vh 풀스크린, false이면 가장 가까운 positioned 부모 영역 정중앙 */
  fullScreen?: boolean;
}

export const SuspenseLoader = ({ fullScreen = false }: Props) => {
  const placement: CSSProperties = fullScreen
    ? { width: "100%", height: "100vh" }
    : { position: "absolute", inset: 0 };

  return (
    <Box
      style={{
        ...placement,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        backgroundColor: "var(--hb-color-canvas)",
      }}
    >
      <Text
        variant="h4"
        style={{ fontWeight: 800, color: "var(--hb-color-accent)", letterSpacing: "-0.02em" }}
      >
        HoBom
      </Text>
      <Progress.Linear style={{ width: 240, borderRadius: 2 }} />
    </Box>
  );
};
