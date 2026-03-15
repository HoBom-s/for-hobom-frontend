import { useSuspenseQuery } from "hobom-data";
import { wikiSpaceQueries, type SpaceType } from "@/entities/wiki-space";
import { SpaceCard } from "@/entities/wiki-space/ui";
import { Hb } from "@/shared/ui";

interface SpaceGridProps {
  onSpaceClick: (spaceKey: string) => void;
  onEdit?: (space: SpaceType) => void;
  onDelete?: (space: SpaceType) => void;
}

export const SpaceGrid = ({ onSpaceClick, onEdit, onDelete }: SpaceGridProps) => {
  const { data } = useSuspenseQuery(wikiSpaceQueries.list());

  return (
    <Hb.Grid container spacing={2.5}>
      {data.items.items.map((space) => (
        <Hb.Grid key={space.key} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <SpaceCard
            space={space}
            onClick={() => onSpaceClick(space.key)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Hb.Grid>
      ))}
    </Hb.Grid>
  );
};
