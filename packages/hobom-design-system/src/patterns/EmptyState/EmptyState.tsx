import type { ReactNode } from "react";
import { Box } from "../../components/Box/Box";
import { Text } from "../../components/Text/Text";

interface EmptyStateProps {
  icon?: ReactNode;
  message: string;
}

/** 데이터가 없을 때 표시하는 빈 상태 컴포넌트. */
export const EmptyState = ({ icon, message }: EmptyStateProps) => (
  <Box
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 48,
      paddingBottom: 48,
      gap: 8,
    }}
  >
    {icon}
    <Text variant="body2" style={{ color: "var(--hb-color-text-disabled)", fontSize: 13 }}>
      {message}
    </Text>
  </Box>
);
