import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "hobom-data";
import { Bom } from "hobom-utils";
import { Hb } from "@/shared/ui";
import { todoQueries, useUpdateDailyTodo, type DailyTodoType } from "@/entities/daily-todo";

interface Props {
  item: DailyTodoType;
  open: boolean;
  onClose: () => void;
}

export const DailyTodoEditDialog = ({ item, open, onClose }: Props) => {
  const { register, getValues } = useForm<{ title: string }>({
    defaultValues: { title: item.title },
  });
  const [editCategory, setEditCategory] = useState(item.category.id);
  const { mutate, isPending } = useUpdateDailyTodo();
  const { data: categoriesData } = useQuery({
    ...todoQueries.categories(),
    enabled: open,
  });

  const handleSubmit = () => {
    const title = getValues("title").trim();

    if (Bom.isEmpty(title)) return;
    mutate({ id: item.id, title, category: editCategory }, { onSuccess: onClose });
  };

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="xs">
      <Hb.Dialog.Title style={{
        paddingBottom: 8
      }}>할 일 수정</Hb.Dialog.Title>
      <Hb.Dialog.Content style={{ paddingTop: 12 }}>
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
          label="카테고리"
          size="small"
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
        >
          {(categoriesData?.items ?? []).map((cat) => (
            <Hb.Form.Option key={cat.id} value={cat.id}>
              {cat.title}
            </Hb.Form.Option>
          ))}
        </Hb.TextField>
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 16,
        gap: 8
      }}>
        <Hb.Button fullWidth variant="ghost" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button fullWidth variant="primary" loading={isPending} onClick={handleSubmit}>
          저장
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
