import { type ReactNode, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Box, Button, Checkbox, List, Paper } from "@mui/material";
import {
  MenuRecommendationListItem,
  useAddCandidatesTodayMenu,
  validateTodayMenuInput,
} from "@/entities/menu-recommendation";
import { HoBomSkeleton } from "@/shared/skeleton";
import { useToast } from "@/shared/toast";
import { RoutesConfig } from "@/shared/router/config/routes.config";
import { handleValidationResult } from "@/shared/assert";
import { Bom } from "@/packages/bom";

import { usePickMenuContentList } from "../model/usePickMenuContentList";

interface Props {
  onNextCallback: () => void;
}

export const PickMenuContent = ({ onNextCallback }: Props) => {
  return (
    <Suspense
      fallback={
        <PickMenuContent.Layout>
          {Array.from({ length: 25 }).map((_, i) => (
            <HoBomSkeleton.List key={i} />
          ))}
        </PickMenuContent.Layout>
      }
    >
      <Inner onNextCallback={onNextCallback} />
    </Suspense>
  );
};

const Inner = ({ onNextCallback }: Props) => {
  const navigate = useNavigate();
  const { openWarnToast } = useToast();
  const { selectedMenuIds, itemList, selectedItems, handleToggleId } =
    usePickMenuContentList();
  const addCandidatesTodayMenu = useAddCandidatesTodayMenu(onNextCallback);

  return (
    <div>
      <PickMenuContent.Layout>
        <List dense>
          {itemList.map((item, index) => (
            <MenuRecommendationListItem
              key={item.id}
              item={item}
              showDivider={index < itemList.length - 1}
              rightAddon={
                <Checkbox
                  edge="start"
                  disableRipple
                  checked={selectedMenuIds.has(item.id)}
                  onChange={() => handleToggleId(item.id)}
                />
              }
            />
          ))}
        </List>
      </PickMenuContent.Layout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        mt={2}
        px={2}
        width="100%"
      >
        <Button
          fullWidth
          color="warning"
          variant="contained"
          onClick={() => navigate(RoutesConfig.MAIN.DAILY_TODO)}
        >
          Exit
        </Button>
        <Button
          fullWidth
          color="info"
          variant="contained"
          loading={addCandidatesTodayMenu.isPending}
          onClick={() => {
            if (Bom.pipe(selectedItems, Bom.isEmpty)) {
              openWarnToast({ message: "Please select menu items !" });
              return;
            }
            const request = {
              candidates: selectedItems,
              recommendationDate: format(new Date(), "yyyy-MM-dd"),
            };
            Bom.pipe(request, validateTodayMenuInput, (validated) =>
              handleValidationResult(
                validated,
                (err) => openWarnToast({ message: err.message }),
                (data) => addCandidatesTodayMenu.mutate(data),
              ),
            );
          }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

PickMenuContent.Layout = ({ children }: { children: ReactNode }) => (
  <Paper
    elevation={2}
    sx={{
      width: "92%",
      height: "calc(100vh - 180px)",
      m: "0 auto",
      mt: "6px",
      px: 3,
      py: 1,
      bgcolor: "background.paper",
      overflowY: "auto",
    }}
  >
    {children}
  </Paper>
);
