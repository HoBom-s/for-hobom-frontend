import { Grid } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  wikiSpaceQueries,
  SpaceCard,
  type SpaceType,
} from "@/entities/wiki-space";

interface SpaceGridProps {
  onSpaceClick: (spaceKey: string) => void;
  onEdit?: (space: SpaceType) => void;
  onDelete?: (space: SpaceType) => void;
}

export const SpaceGrid = ({
  onSpaceClick,
  onEdit,
  onDelete,
}: SpaceGridProps) => {
  const { data } = useSuspenseQuery(wikiSpaceQueries.list());

  return (
    <Grid container spacing={2.5}>
      {data.items.items.map((space) => (
        <Grid key={space.key} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <SpaceCard
            space={space}
            onClick={() => onSpaceClick(space.key)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};
