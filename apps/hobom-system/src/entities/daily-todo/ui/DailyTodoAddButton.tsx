import { useForm, useWatch } from "react-hook-form";
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

const AddTodoDialog = ({
  item,
  isOpen,
  onClose,
}: {
  item: DailyTodoWithCategoryType;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, getValues, control, reset, setValue } = useForm<{
    title: string;
    cycle: CycleType;
  }>({
    mode: "onChange",
    defaultValues: { cycle: "EVERYDAY" },
  });
  const cycle = useWatch({ control, name: "cycle" });
  const { openWarnToast } = useToast();
  const { query } = useRouterQuery();
  const { mutate, isPending } = useCreateDailyTodo();

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    const title = getValues("title");

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
        const date = Bom.pipe(getSelectedDate(query, now), formatDate);
        const categoryId = Bom.prop("categoryId")(item);
        const cycle = getValues("cycle");

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
  };

  return (
    <Hb.Dialog.Root open={isOpen} onClose={handleClose} size="xs">
      <Hb.Dialog.Title style={{
        paddingBottom: 8
      }}>
        할 일 추가
        <Hb.Text
          variant="body2"
          color="text.secondary"
          style={{
            marginTop: 4,
          }}
        >
          {item.categoryTitle}
        </Hb.Text>
      </Hb.Dialog.Title>
      <Hb.Dialog.Content style={{ paddingTop: 12 }}>
        <Hb.TextField
          fullWidth
          autoFocus
          label="제목"
          size="small"
          style={{
            marginBottom: 16
          }}
          {...register("title")}
        />
        <Hb.Form.Control fullWidth size="small">
          <Hb.Form.Label>반복 주기</Hb.Form.Label>
          <Hb.Form.Select
            label="반복 주기"
            value={cycle}
            onChange={(e) => setValue("cycle", e.target.value as CycleType)}
          >
            {CYCLE_OPTIONS.map((key) => (
              <Hb.Form.Option key={key} value={key}>
                {CYCLE_LABELS[key]}
              </Hb.Form.Option>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 16,
        gap: 8
      }}>
        <Hb.Button fullWidth variant="secondary" onClick={handleClose}>
          취소
        </Hb.Button>
        <Hb.Button fullWidth variant="primary" loading={isPending} onClick={handleSubmit}>
          추가
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};

export const DailyTodoAddButton = ({ item }: Props) => {
  const { onOpen } = useOverlay();

  return (
    <Hb.Button.Icon
      size="small"
      aria-label="할 일 추가"
      onClick={() => {
        onOpen(({ isOpen, onClose }) => (
          <AddTodoDialog item={item} isOpen={isOpen} onClose={onClose} />
        ));
      }}
    >
      <AddCircle fontSize="small" />
    </Hb.Button.Icon>
  );
};
