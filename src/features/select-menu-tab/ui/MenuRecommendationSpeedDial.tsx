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
        <Typography variant="subtitle1" mt={1}>
          메뉴 추가하기
        </Typography>
      ),
      content: (
        <Box sx={{ px: 2 }}>
          <TextField
            fullWidth
            size="small"
            variant="standard"
            label="Menu name"
            sx={{ mt: 2 }}
            {...register("name")}
          />
          <Select
            fullWidth
            size="small"
            sx={{ mt: 2 }}
            defaultValue={MenuKindModel.KOREAN}
            {...register("menuKind")}
          >
            {Bom.values(MenuKindModel).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            size="small"
            sx={{ mt: 2 }}
            defaultValue={TimeOfMealModel.LUNCH}
            {...register("timeOfMeal")}
          >
            {Bom.values(TimeOfMealModel).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            size="small"
            sx={{ mt: 2 }}
            defaultValue={FoodTypeModel.MEAL}
            {...register("foodType")}
          >
            {Bom.values(FoodTypeModel).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ),
      footer: (
        <Box display="flex" gap={2} px={2}>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            fullWidth
            variant="contained"
            loading={menuRecommendationHandler.isPending}
            onClick={() => {
              Bom.pipe(
                getValues(),
                validateMenuRecommendationInput,
                (validationResult) =>
                  handleValidationResult(
                    validationResult,
                    (err) => openWarnToast({ message: err.message }),
                    (requestBody) => {
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
    <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
      메뉴 추가하기
    </Button>
  );
};
