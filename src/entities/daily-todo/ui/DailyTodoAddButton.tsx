import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import {
  type DailyTodoWithCategoryType,
  formatDate,
  getNow,
  getSelectedDate,
  useCreateDailyTodo,
} from "@/entities/daily-todo";
import { useOverlay } from "@/shared/overlay";
import { Bom } from "@/packages/bom";
import { useRouterQuery } from "@/shared/router/model";
import { useToast } from "@/shared/toast";

interface Props {
  item: DailyTodoWithCategoryType;
}

export const DailyTodoAddButton = ({ item }: Props) => {
  const { register, watch, reset } = useForm<{ title: string }>({
    mode: "onChange",
  });

  const { openWarnToast } = useToast();
  const { query } = useRouterQuery();
  const { onOpen } = useOverlay();
  const { mutate, isPending } = useCreateDailyTodo();

  return (
    <IconButton
      size="small"
      onClick={() => {
        onOpen(({ isOpen, onClose }) => (
          <Modal open={isOpen} onClose={onClose}>
            <Box sx={BoxStyle}>
              <Typography variant="subtitle1" component="h2">
                Create Daily Todo Item
              </Typography>
              <Typography variant="caption">
                Please enter daily todo's title.
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                label="Title"
                sx={{ mt: 2 }}
                {...register("title")}
              />
              <Box
                display="flex"
                justifyContent="flex-end"
                width="100%"
                gap={1}
                mt={4}
              >
                <Button
                  variant="contained"
                  type="button"
                  color="error"
                  size="small"
                  onClick={() => {
                    reset();
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  size="small"
                  color="primary"
                  loading={isPending}
                  onClick={() => {
                    const title = watch("title");
                    Bom.pipe(
                      title.trim(),
                      (t) => {
                        if (Bom.isEmpty(t)) {
                          openWarnToast({ message: "Title is empty !" });
                          return null;
                        }

                        return t;
                      },
                      (t) => {
                        if (t == null) {
                          return;
                        }
                        const now = getNow();
                        const date = Bom.pipe(
                          getSelectedDate(query, now),
                          formatDate,
                        );
                        const categoryId = Bom.prop("categoryId")(item);

                        mutate({ title: t, category: categoryId, date });
                        reset();
                        onClose();
                      },
                    );
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </Modal>
        ));
      }}
    >
      <AddCircle fontSize="small" />
    </IconButton>
  );
};

const BoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
} as const;
