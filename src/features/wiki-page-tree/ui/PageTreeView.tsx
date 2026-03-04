import { useCallback, useState } from "react";
import { List } from "@mui/material";
import type { PageTreeNode as PageTreeNodeType } from "@/entities/wiki-page";
import { PageTreeNode } from "./PageTreeNode";

interface PageTreeViewProps {
  nodes: PageTreeNodeType[];
  activePageId?: string;
  onSelect: (pageId: string) => void;
  onCreateChild: (parentId: string, parentTitle: string) => void;
}

export const PageTreeView = ({
  nodes,
  activePageId,
  onSelect,
  onCreateChild,
}: PageTreeViewProps) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpand = useCallback((pageId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(pageId)) next.delete(pageId);
      else next.add(pageId);
      return next;
    });
  }, []);

  return (
    <List dense disablePadding>
      {nodes.map((node) => (
        <PageTreeNode
          key={node.id}
          node={node}
          depth={0}
          expanded={expanded}
          activePageId={activePageId}
          onToggle={toggleExpand}
          onSelect={onSelect}
          onCreateChild={onCreateChild}
        />
      ))}
    </List>
  );
};
