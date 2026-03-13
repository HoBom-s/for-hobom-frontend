import { Fragment } from "react";
import {
  ExpandMore,
  ChevronRight,
  ArticleOutlined,
  AddOutlined,
} from "hobom-design-system/icons";
import type { PageTreeNode as PageTreeNodeType } from "@/entities/wiki-page";
import { Hb } from "@/shared/ui";

interface PageTreeNodeProps {
  node: PageTreeNodeType;
  depth: number;
  expanded: Set<string>;
  activePageId?: string;
  onToggle: (pageId: string) => void;
  onSelect: (pageId: string) => void;
  onCreateChild: (parentId: string, parentTitle: string) => void;
}

export const PageTreeNode = ({
  node,
  depth,
  expanded,
  activePageId,
  onToggle,
  onSelect,
  onCreateChild,
}: PageTreeNodeProps) => {
  const hasChildren = node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isActive = node.id === activePageId;

  return (
    <Fragment>
      <Hb.List.ItemButton
        selected={isActive}
        onClick={() => onSelect(node.id)}
        sx={{
          pl: 1 + depth * 2,
          py: 0.75,
          borderRadius: 1,
          mb: 0.25,
          minHeight: 36,
          color: "text.primary",
          "&:hover": {
            bgcolor: "action.hover",
            color: "text.primary",
            "& .tree-node-add": { opacity: 1 },
          },
          "&.Mui-selected": {
            bgcolor: "primary.main",
            color: "#fff",
            "& .MuiListItemIcon-root": { color: "#fff" },
            "& .tree-node-add": { color: "rgba(255,255,255,0.7)" },
            "&:hover": { bgcolor: "primary.dark", color: "#fff" },
          },
        }}
      >
        {hasChildren ? (
          <Hb.Button.Icon
            size="small"
            aria-label={isExpanded ? "접기" : "펼치기"}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            sx={{ mr: 0.5, p: 0.25, color: "inherit" }}
          >
            {isExpanded ? (
              <ExpandMore sx={{ fontSize: 16 }} />
            ) : (
              <ChevronRight sx={{ fontSize: 16 }} />
            )}
          </Hb.Button.Icon>
        ) : (
          <Hb.Box sx={{ width: 24, mr: 0.5 }} />
        )}
        <Hb.List.ItemIcon sx={{ minWidth: 24, color: "inherit" }}>
          <ArticleOutlined sx={{ fontSize: 16 }} />
        </Hb.List.ItemIcon>
        <Hb.List.ItemText
          primary={node.title}
          slotProps={{
            primary: {
              noWrap: true,
              sx: {
                fontSize: "0.8125rem",
                fontWeight: isActive ? 600 : 400,
              },
            },
          }}
        />
        <Hb.Tooltip title="하위 페이지 추가">
          <Hb.Button.Icon
            className="tree-node-add"
            size="small"
            aria-label="하위 페이지 추가"
            onClick={(e) => {
              e.stopPropagation();
              onCreateChild(node.id, node.title);
            }}
            sx={{
              p: 0.25,
              opacity: 0,
              transition: "opacity 0.15s ease",
              color: "text.disabled",
            }}
          >
            <AddOutlined sx={{ fontSize: 15 }} />
          </Hb.Button.Icon>
        </Hb.Tooltip>
      </Hb.List.ItemButton>

      {hasChildren && (
        <Hb.Collapse in={isExpanded} unmountOnExit>
          {node.children.map((child) => (
            <PageTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              activePageId={activePageId}
              onToggle={onToggle}
              onSelect={onSelect}
              onCreateChild={onCreateChild}
            />
          ))}
        </Hb.Collapse>
      )}
    </Fragment>
  );
};
