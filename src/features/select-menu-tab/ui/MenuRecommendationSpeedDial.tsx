import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  Typography,
} from "@mui/material";
import { DinnerDiningTwoTone } from "@mui/icons-material";
import {
  type AddMenuRecommendationInput,
  FoodTypeModel,
  MenuKindModel,
  TimeOfMealModel,
  useAddMenuRecommendation,
  validateMenuRecommendationInput,
} from "@/entities/menu-recommendation";
import { useBottomSheetCTA } from "@/shared/bottom-sheet-cta";
import { handleValidationResult } from "@/shared/assert";
import { useToast } from "@/shared/toast";
import { Bom } from "@/packages/bom";

const DIAL_MENUS = [{ icon: <DinnerDiningTwoTone />, name: "Menu" }] as const;

export const MenuRecommendationSpeedDial = () => {
  const [open, setOpen] = useState<boolean>(false);

  const menuRecommendationHandler = useAddMenuRecommendation();
  const { onOpen, onClose } = useBottomSheetCTA();
  const { openWarnToast } = useToast();
  const formMethods = useForm<AddMenuRecommendationInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      menuKind: MenuKindModel.KOREAN,
      timeOfMeal: TimeOfMealModel.LUNCH,
      foodType: FoodTypeModel.MEAL,
    },
  });
  const { register, getValues, reset } = formMethods;

  return (
    <SpeedDial
      open={open}
      ariaLabel="menu-recommendation-speed-dial"
      sx={{
        position: "absolute",
        bottom: 100,
        right: 28,
      }}
      icon={<SpeedDialIcon />}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      {DIAL_MENUS.map((item) => (
        <SpeedDialAction
          key={item.name}
          icon={item.icon}
          slotProps={{
            tooltip: {
              title: item.name,
            },
            fab: {
              size: "small",
            },
          }}
          onClick={() => {
            onOpen({
              title: (
                <Typography variant="subtitle1" mt={1}>
                  Add Menu
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
                    variant="contained"
                    color="warning"
                    onClick={onClose}
                  >
                    Exit
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="info"
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
                    Confirm
                  </Button>
                </Box>
              ),
            });
            setOpen(false);
          }}
        />
      ))}
    </SpeedDial>
  );
};
