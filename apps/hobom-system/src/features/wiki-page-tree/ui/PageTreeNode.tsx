import { Fragment } from "react";
import { ExpandMore, ChevronRight, ArticleOutlined, AddOutlined } from "hobom-design-system/icons";
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
      <style href="hb-tree-node" precedence="medium">
        {".hb-tree-node:hover .tree-node-add{opacity:1}"}
      </style>
      <Hb.List.ItemButton
        className="hb-tree-node"
        onClick={() => onSelect(node.id)}
        style={{
          paddingLeft: (1 + depth * 2) * 8,
          paddingBlock: 6,
          marginBottom: 2,
          minHeight: 36,
          ...(isActive
            ? { backgroundColor: "var(--hb-color-accent)", color: "#fff" }
            : { color: "var(--hb-color-text-primary)" }),
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
            style={{
              marginRight: 4,
              padding: 2,
              color: "inherit",
            }}
          >
            {isExpanded ? (
              <ExpandMore sx={{ fontSize: 16 }} />
            ) : (
              <ChevronRight sx={{ fontSize: 16 }} />
            )}
          </Hb.Button.Icon>
        ) : (
          <Hb.Box
            style={{
              width: 24,
              marginRight: 4,
            }}
          />
        )}
        <Hb.List.ItemIcon style={{
          minWidth: 24,
          color: isActive ? "#fff" : "inherit"
        }}>
          <ArticleOutlined sx={{ fontSize: 16 }} />
        </Hb.List.ItemIcon>
        <Hb.List.ItemText
          primary={node.title}
          primaryStyle={{
            fontSize: "0.8125rem",
            fontWeight: isActive ? 600 : 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: isActive ? "#fff" : undefined,
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
            style={{
              padding: 2,
              opacity: 0,
              transition: "opacity 0.15s ease",
              color: isActive ? "rgba(255,255,255,0.7)" : "var(--hb-color-text-disabled)",
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
