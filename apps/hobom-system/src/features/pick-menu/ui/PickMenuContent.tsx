import { type ReactNode, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Bom } from "hobom-utils";
import { useAddCandidatesTodayMenu, validateTodayMenuInput } from "@/entities/menu-recommendation";
import { MenuRecommendationListItem } from "@/entities/menu-recommendation/ui";
import { Hb, HoBomSkeleton } from "@/shared/ui";
import { useToast } from "@/shared/model";
import { RoutesConfig } from "@/shared/config";
import { handleValidationResult } from "@/shared/lib";
import { usePickMenuContentList } from "../model/usePickMenuContentList";

interface Props {
  onNextCallback: () => void;
}

export const PickMenuContent = ({ onNextCallback }: Props) => {
  return (
    <Suspense
      fallback={
        <Hb.Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <PickMenuContent.Layout>
            {Array.from({ length: 25 }).map((_, i) => (
              <HoBomSkeleton.List key={i} />
            ))}
          </PickMenuContent.Layout>
        </Hb.Box>
      }
    >
      <Inner onNextCallback={onNextCallback} />
    </Suspense>
  );
};

const Inner = ({ onNextCallback }: Props) => {
  const navigate = useNavigate();
  const { openWarnToast } = useToast();
  const { selectedMenuIds, itemList, selectedItems, handleToggleId } = usePickMenuContentList();
  const addCandidatesTodayMenu = useAddCandidatesTodayMenu(onNextCallback);

  return (
    <Hb.Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <PickMenuContent.Layout>
        <Hb.List.Root dense>
          {itemList.map((item, index) => (
            <MenuRecommendationListItem
              key={item.id}
              item={item}
              showDivider={index < itemList.length - 1}
              rightAddon={
                <Hb.Checkbox
                  edge="start"
                  disableRipple
                  checked={selectedMenuIds.has(item.id)}
                  onChange={() => handleToggleId(item.id)}
                />
              }
            />
          ))}
        </Hb.List.Root>
      </PickMenuContent.Layout>
      <Hb.Box
        sx={{
          display: "flex",
          gap: 1.5,
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Hb.Button
          fullWidth
          variant="secondary"
          sx={{ borderRadius: 2, py: 1.2, fontWeight: 600 }}
          onClick={() => navigate(RoutesConfig.MAIN.DAILY_TODO)}
        >
          나가기
        </Hb.Button>
        <Hb.Button
          fullWidth
          variant="primary"
          disableElevation
          loading={addCandidatesTodayMenu.isPending}
          sx={{ borderRadius: 2, py: 1.2, fontWeight: 600 }}
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
        </Hb.Button>
      </Hb.Box>
    </Hb.Box>
  );
};

PickMenuContent.Layout = ({ children }: { children: ReactNode }) => (
  <Hb.Paper
    elevation={0}
    style={{
      flexGrow: 1,
      overflowY: "auto",
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 8,
      paddingBottom: 8,
    }}
  >
    {children}
  </Hb.Paper>
);
