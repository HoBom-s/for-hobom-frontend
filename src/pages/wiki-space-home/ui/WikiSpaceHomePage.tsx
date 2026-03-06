import { Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { wikiSpaceQueries } from "@/entities/wiki-space";
import { SuspenseLoader } from "@/shared/ui";

interface WikiSpaceContext {
  spaceKey: string;
}

const SpaceHomeContent = ({ spaceKey }: { spaceKey: string }) => {
  const { data } = useSuspenseQuery(wikiSpaceQueries.detail(spaceKey));
  const space = data.items;

  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {space.name}
      </Typography>
      {space.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {space.description}
        </Typography>
      )}
      <Typography variant="body2" color="text.disabled">
        왼쪽 트리에서 페이지를 선택하거나, 새 페이지를 생성하세요.
      </Typography>
    </Box>
  );
};

const WikiSpaceHomePage = () => {
  const { spaceKey } = useOutletContext<WikiSpaceContext>();

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <SpaceHomeContent spaceKey={spaceKey} />
    </Suspense>
  );
};

export default WikiSpaceHomePage;
