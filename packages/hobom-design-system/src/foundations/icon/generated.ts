import { createIcon } from "./Icon";

/**
 * SPIKE: five icons generated from their Material path data, rendered by the
 * in-house `Icon` base. Paths are the exact `@mui/icons-material` 24×24 `d`
 * values, so these are pixel-identical drop-ins for the `sx`-based call sites.
 */
export const Add = createIcon("M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z", "Add");
export const MenuOutlined = createIcon("M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z", "MenuOutlined");
export const SearchOutlined = createIcon(
  "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14",
  "SearchOutlined",
);
export const ExpandMore = createIcon("M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z", "ExpandMore");
export const NotificationsNoneOutlined = createIcon(
  "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2m6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5z",
  "NotificationsNoneOutlined",
);
