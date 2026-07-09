import { useMemo } from "react";
import { useSuspenseQuery } from "hobom-data";
import { wikiPageQueries } from "@/entities/wiki-page";
import { Hb } from "@/shared/ui";
import { flattenPageTree } from "../lib/flatten-page-tree.lib";

interface PageSelectProps {
  spaceKey: string;
  selectedPageId: string | null;
  onSelect: (pageId: string | null) => void;
  excludePageId?: string;
}

export const PageSelect = ({
  spaceKey,
  selectedPageId,
  onSelect,
  excludePageId,
}: PageSelectProps) => {
  const { data } = useSuspenseQuery(wikiPageQueries.tree(spaceKey));
  const flatList = useMemo(
    () => flattenPageTree(data.items, excludePageId),
    [data.items, excludePageId],
  );

  return (
    <Hb.Form.Control fullWidth>
      <Hb.Form.Label>부모 페이지</Hb.Form.Label>
      <Hb.Form.Select
        label="부모 페이지"
        value={selectedPageId ?? "__root__"}
        onChange={(e) => onSelect(e.target.value === "__root__" ? null : e.target.value)}
      >
        <Hb.Form.Option value="__root__">최상위 (루트)</Hb.Form.Option>
        {flatList.map((item) => (
          <Hb.Form.Option key={item.id} value={item.id}>
            {"─".repeat(item.depth)} {item.title}
          </Hb.Form.Option>
        ))}
      </Hb.Form.Select>
    </Hb.Form.Control>
  );
};
