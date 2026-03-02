import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import {
  type AddMenuRecommendationInput,
  FoodTypeModel,
  MenuKindModel,
  TimeOfMealModel,
  useAddMenuRecommendation,
  validateMenuRecommendationInput,
} from "@/entities/menu-recommendation";
import { useBottomSheetCTA } from "@/shared/model";
import { handleValidationResult } from "@/shared/lib";
import { useToast } from "@/shared/model";
import { Bom } from "@/packages/bom";

const MENU_KIND_LABEL: Record<string, string> = {
  KOREAN: "한식",
  JAPANESE: "일식",
  CHINESE: "중식",
  INDIAN: "인도식",
  MEXICAN: "멕시칸",
  AMERICAN: "양식",
  ITALIAN: "이탈리안",
};

const TIME_LABEL: Record<string, string> = {
  BREAKFAST: "아침",
  LUNCH: "점심",
  DINNER: "저녁",
};

const FOOD_TYPE_LABEL: Record<string, string> = {
  MEAL: "식사",
  DESERT: "디저트",
  BOTH: "식사+디저트",
};

export const MenuRecommendationSpeedDial = () => {
  const menuRecommendationHandler = useAddMenuRecommendation();
  const { onOpen, onClose } = useBottomSheetCTA();
  const { openWarnToast } = useToast();
  const { register, getValues, reset } = useForm<AddMenuRecommendationInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      menuKind: MenuKindModel.KOREAN,
      timeOfMeal: TimeOfMealModel.LUNCH,
      foodType: FoodTypeModel.MEAL,
    },
  });

  const handleOpen = () => {
    onOpen({
      title: (
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          메뉴 추가하기
        </Typography>
      ),
      content: (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="메뉴 이름"
            placeholder="예: 김치찌개"
            {...register("name")}
          />
          <Select
            fullWidth
            size="small"
            defaultValue={MenuKindModel.KOREAN}
            {...register("menuKind")}
          >
            {Bom.values(MenuKindModel).map((item) => (
              <MenuItem key={item} value={item}>
                {MENU_KIND_LABEL[item] ?? item}
              </MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            size="small"
            defaultValue={TimeOfMealModel.LUNCH}
            {...register("timeOfMeal")}
          >
            {Bom.values(TimeOfMealModel).map((item) => (
              <MenuItem key={item} value={item}>
                {TIME_LABEL[item] ?? item}
              </MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            size="small"
            defaultValue={FoodTypeModel.MEAL}
            {...register("foodType")}
          >
            {Bom.values(FoodTypeModel).map((item) => (
              <MenuItem key={item} value={item}>
                {FOOD_TYPE_LABEL[item] ?? item}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ),
      footer: (
        <Box display="flex" gap={1.5} width="100%">
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            onClick={onClose}
            sx={{ borderRadius: 2, py: 1.2, fontWeight: 600 }}
          >
            취소
          </Button>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            loading={menuRecommendationHandler.isPending}
            sx={{ borderRadius: 2, py: 1.2, fontWeight: 600 }}
            onClick={() => {
              Bom.pipe(
                getValues(),
                validateMenuRecommendationInput,
                (validationResult) =>
                  handleValidationResult(
                    validationResult,
                    (err: Error) => openWarnToast({ message: err.message }),
                    (requestBody: AddMenuRecommendationInput) => {
                      menuRecommendationHandler.mutate(requestBody);
                      reset();
                      onClose();
                    },
                  ),
              );
            }}
          >
            추가하기
          </Button>
        </Box>
      ),
    });
  };

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<Add />}
      onClick={handleOpen}
      sx={{ textTransform: "none", borderRadius: 2, px: 2 }}
    >
      메뉴 추가
    </Button>
  );
};
