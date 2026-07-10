import {
  CheckCircle,
  ErrorOutline,
  WarningAmberOutlined,
  InfoOutlined,
} from "hobom-design-system/icons";
import type { IconProps } from "react-toastify";

/**
 * Status icon shown at the left of each toast. Colors are light shades that
 * read on the dark toast surface; `default` toasts (e.g. undo) get no icon.
 */
const STATUS_ICON = {
  success: { Icon: CheckCircle, color: "#4ade80" },
  error: { Icon: ErrorOutline, color: "#f87171" },
  warning: { Icon: WarningAmberOutlined, color: "#fbbf24" },
  info: { Icon: InfoOutlined, color: "#60a5fa" },
} as const;

export const renderToastIcon = ({ type }: IconProps) => {
  const entry = STATUS_ICON[type as keyof typeof STATUS_ICON];

  if (!entry) return null;

  const { Icon, color } = entry;

  return <Icon sx={{ fontSize: 20, color }} />;
};
