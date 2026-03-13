import { useForm } from "react-hook-form";
import { AddCircle } from "hobom-design-system/icons";
import { Bom } from "hobom-utils";
import { Hb } from "@/shared/ui";
import {
  type DailyTodoWithCategoryType,
  type CycleType,
  DailyTodoCycleModel,
  CYCLE_LABELS,
  formatDate,
  getNow,
  getSelectedDate,
  useCreateDailyTodo,
} from "@/entities/daily-todo";
import { useOverlay, useRouterQuery, useToast } from "@/shared/model";

interface Props {
  item: DailyTodoWithCategoryType;
}

const CYCLE_OPTIONS = Object.keys(DailyTodoCycleModel) as CycleType[];

export const DailyTodoAddButton = ({ item }: Props) => {
  const { register, watch, reset, setValue } = useForm<{
    title: string;
    cycle: CycleType;
  }>({
    mode: "onChange",
    defaultValues: { cycle: "EVERYDAY" },
  });
  const { openWarnToast } = useToast();
  const { query } = useRouterQuery();
  const { onOpen } = useOverlay();
  const { mutate, isPending } = useCreateDailyTodo();

  return (
    <Hb.Button.Icon
      size="small"
      onClick={() => {
        onOpen(({ isOpen, onClose }) => (
          <Hb.Dialog.Root
            open={isOpen}
            onClose={() => {
              reset();
              onClose();
            }}
            size="xs"
          >
            <Hb.Dialog.Title sx={{ pb: 1 }}>
              할 일 추가
              <Hb.Text variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {item.categoryTitle}
              </Hb.Text>
            </Hb.Dialog.Title>
            <Hb.Dialog.Content sx={{ pt: "12px !important" }}>
              <Hb.TextField
                fullWidth
                autoFocus
                label="제목"
                size="small"
                sx={{ mb: 2 }}
                {...register("title")}
              />
              <Hb.TextField
                fullWidth
                select
                label="반복 주기"
                size="small"
                value={watch("cycle")}
                onChange={(e) => setValue("cycle", e.target.value as CycleType)}
              >
                {CYCLE_OPTIONS.map((key) => (
                  <Hb.Menu.Item key={key} value={key}>
                    {CYCLE_LABELS[key]}
                  </Hb.Menu.Item>
                ))}
              </Hb.TextField>
            </Hb.Dialog.Content>
            <Hb.Dialog.Actions sx={{ px: 3, pb: 2, gap: 1 }}>
              <Hb.Button
                fullWidth
                variant="ghost"
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                취소
              </Hb.Button>
              <Hb.Button
                fullWidth
                variant="primary"
                loading={isPending}
                onClick={() => {
                  const title = watch("title");

                  Bom.pipe(
                    title.trim(),
                    (t) => {
                      if (Bom.isEmpty(t)) {
                        openWarnToast({ message: "제목을 입력해주세요." });

                        return null;
                      }

                      return t;
                    },
                    (t) => {
                      if (t == null) return;
                      const now = getNow();
                      const date = Bom.pipe(
                        getSelectedDate(query, now),
                        formatDate,
                      );
                      const categoryId = Bom.prop("categoryId")(item);
                      const cycle = watch("cycle");

                      mutate({
                        title: t,
                        category: categoryId,
                        date,
                        ...(cycle !== "EVERYDAY" && { cycle }),
                      });
                      reset();
                      onClose();
                    },
                  );
                }}
              >
                추가
              </Hb.Button>
            </Hb.Dialog.Actions>
          </Hb.Dialog.Root>
        ));
      }}
    >
      <AddCircle fontSize="small" />
    </Hb.Button.Icon>
  );
};
