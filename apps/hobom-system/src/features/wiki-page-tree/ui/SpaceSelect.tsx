import { useSuspenseQuery } from "hobom-data";
import { wikiSpaceQueries } from "@/entities/wiki-space";
import { Hb } from "@/shared/ui";

interface SpaceSelectProps {
  selectedSpaceKey: string;
  onSelect: (spaceKey: string) => void;
}

export const SpaceSelect = ({ selectedSpaceKey, onSelect }: SpaceSelectProps) => {
  const { data } = useSuspenseQuery(wikiSpaceQueries.list());
  const spaces = data.items.items;

  return (
    <Hb.TextField
      select
      fullWidth
      label="대상 스페이스"
      value={selectedSpaceKey}
      onChange={(e) => onSelect(e.target.value)}
    >
      {spaces.map((space) => (
        <Hb.Form.Option key={space.key} value={space.key}>
          {space.name}
        </Hb.Form.Option>
      ))}
    </Hb.TextField>
  );
};
