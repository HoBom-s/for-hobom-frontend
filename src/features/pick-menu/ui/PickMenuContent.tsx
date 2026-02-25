import { type ReactNode, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Box, Button, Checkbox, List, Paper } from "@mui/material";
import {
  MenuRecommendationListItem,
  useAddCandidatesTodayMenu,
  validateTodayMenuInput,
} from "@/entities/menu-recommendation";
import { HoBomSkeleton } from "@/shared/ui";
import { useToast } from "@/shared/model";
import { RoutesConfig } from "@/shared/config";
import { handleValidationResult } from "@/shared/lib";
import { Bom } from "@/packages/bom";

import { usePickMenuContentList } from "../model/usePickMenuContentList";

interface Props {
  onNextCallback: () => void;
}

export const PickMenuContent = ({ onNextCallback }: Props) => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 3,
          }}
        >
          <PickMenuContent.Layout>
            {Array.from({ length: 25 }).map((_, i) => (
              <HoBomSkeleton.List key={i} />
            ))}
          </PickMenuContent.Layout>
        </Box>
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 2,
        p: 3,
      }}
    >
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
      <Box display="flex" gap={1} width="100%">
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={() => navigate(RoutesConfig.MAIN.DAILY_TODO)}
        >
          나가기
        </Button>
        <Button
          fullWidth
          variant="contained"
          loading={addCandidatesTodayMenu.isPending}
          onClick={() => {
            if (selectedItems.length === 0) {
              openWarnToast({ message: "메뉴를 선택해 주세요." });
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
          다음
        </Button>
      </Box>
    </Box>
  );
};

PickMenuContent.Layout = ({ children }: { children: ReactNode }) => (
  <Paper
    elevation={2}
    sx={{
      flexGrow: 1,
      overflowY: "auto",
      px: 3,
      py: 1,
      bgcolor: "background.paper",
    }}
  >
    {children}
  </Paper>
);
