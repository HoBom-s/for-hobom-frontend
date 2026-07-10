import { COLUMNS, COLORS } from "../config/future-message-grid.config";

interface Props {
  colIndex: number;
  onStartResize: (colIndex: number, e: React.PointerEvent<HTMLElement>) => void;
}

export const GridHeaderCell = ({ colIndex, onStartResize }: Props) => {
  const col = COLUMNS[colIndex];

  if (!col) return null;

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: col.key === "rowNum" ? "0 0 0 16px" : "0 16px",
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        color: COLORS.headerText,
        backgroundColor: COLORS.headerBg,
        borderBottom: `2px solid ${COLORS.headerBorder}`,
        boxSizing: "border-box",
        userSelect: "none",
      }}
    >
      <span>{col.label}</span>
      {col.key !== "actions" && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "20%",
            bottom: "20%",
            width: 4,
            cursor: "col-resize",
            borderRadius: 2,
            backgroundColor: "transparent",
            transition: "background-color 0.15s",
          }}
          onPointerEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = COLORS.resizeHandle;
          }}
          onPointerLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onStartResize(colIndex, e);
          }}
        />
      )}
    </div>
  );
};
