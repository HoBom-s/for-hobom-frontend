import { useState, memo } from "react";
import { MoreVert } from "hobom-design-system/icons";
import { Bom } from "hobom-utils";
import { Hb } from "@/shared/ui";
import {
  formatDate,
  normalizeTodoDateToUtcMidnight,
  changeCompleteStatus,
  isCompleteStatus,
  useChangeDailyTodoCompleteStatus,
  useDeleteDailyTodo,
  useUpdateDailyTodoReaction,
  CYCLE_LABELS,
  type DailyTodoType,
  type ProgressType,
  type CycleType,
} from "@/entities/daily-todo";
import { useBottomSheetCTA } from "@/shared/model";
import { DailyTodoReactionPopover } from "./DailyTodoReactionPopover";
import { DailyTodoEditDialog } from "./DailyTodoEditDialog";

interface Props {
  item: DailyTodoType;
}

export const DailyTodoListItem = memo(function DailyTodoListItem({ item }: Props) {
  const { mutate, isPending } = useChangeDailyTodoCompleteStatus(item);
  const { mutate: mutateDelete, isPending: isDeletePending } = useDeleteDailyTodo();
  const { mutate: mutateReaction } = useUpdateDailyTodoReaction();
  const { onOpen, onClose } = useBottomSheetCTA();

  const [editOpen, setEditOpen] = useState(false);
  const [reactionAnchor, setReactionAnchor] = useState<HTMLElement | null>(null);

  const handleChangeCompleteStatus = (id: string, status: ProgressType) => {
    Bom.pipe(status, changeCompleteStatus, (newStatus) => mutate({ id, status: newStatus }));
  };

  const handleReaction = (emoji: string) => {
    mutateReaction({
      id: item.id,
      reaction: emoji,
      reactionUserId: item.owner.id,
    });
    setReactionAnchor(null);
  };

  return (
    <>
      <Hb.List.Item
        disablePadding
        secondaryAction={
          <Hb.Stack
            direction="row"
            spacing={0.5}
            style={{
              alignItems: "center",
            }}
          >
            {item.reaction && (
              <Hb.Button.Icon
                size="small"
                aria-label="리액션 변경"
                onClick={(e) => setReactionAnchor(e.currentTarget)}
                style={{
                  fontSize: "1rem",
                  padding: 4,
                }}
              >
                {item.reaction.value}
              </Hb.Button.Icon>
            )}
            <Hb.Button.Icon
              size="small"
              aria-label="더보기"
              edge="end"
              onClick={() =>
                onOpen({
                  title: (
                    <Hb.Text variant="subtitle1" style={{ marginTop: 8 }}>
                      {item.title}
                    </Hb.Text>
                  ),
                  content: (
                    <Hb.Box
                      style={{
                        paddingLeft: 16,
                        paddingRight: 16,
                      }}
                    >
                      <Hb.Text gutterBottom variant="subtitle1" style={{ fontWeight: "bold" }}>
                        {formatDate(normalizeTodoDateToUtcMidnight(item.date))}
                      </Hb.Text>
                      <Hb.Stack
                        direction="row"
                        spacing={1}
                        style={{
                          marginTop: 8,
                        }}
                      >
                        <Hb.Chip
                          color={isCompleteStatus(item.progress) ? "success" : "warning"}
                          variant="outlined"
                          label={item.progress}
                          size="small"
                        />
                        <Hb.Chip
                          color="secondary"
                          variant="outlined"
                          label={CYCLE_LABELS[item.cycle as CycleType] ?? item.cycle}
                          size="small"
                        />
                      </Hb.Stack>
                    </Hb.Box>
                  ),
                  footer: (
                    <Hb.Box
                      style={{
                        display: "flex",
                        gap: 16,
                      }}
                    >
                      <Hb.Button
                        fullWidth
                        variant="danger"
                        loading={isDeletePending}
                        onClick={() => {
                          mutateDelete({ id: item.id });
                          onClose();
                        }}
                      >
                        삭제하기
                      </Hb.Button>
                      <Hb.Button fullWidth variant="primary" onClick={() => setEditOpen(true)}>
                        수정하기
                      </Hb.Button>
                    </Hb.Box>
                  ),
                  height: "32%",
                })
              }
            >
              <MoreVert />
            </Hb.Button.Icon>
          </Hb.Stack>
        }
      >
        <style href="hb-todo-reveal" precedence="medium">
          {".hb-todo-reveal:hover .reaction-trigger{opacity:1}"}
        </style>
        <Hb.List.ItemButton
          className="hb-todo-reveal"
          style={{ paddingInline: 20, paddingBlock: 6 }}
        >
          <Hb.List.ItemIcon style={{
            minWidth: 36
          }}>
            <Hb.Checkbox
              edge="start"
              size="small"
              tabIndex={-1}
              disableRipple
              disabled={isPending}
              checked={isCompleteStatus(item.progress)}
              onChange={() => handleChangeCompleteStatus(item.id, item.progress)}
            />
          </Hb.List.ItemIcon>
          <Hb.List.ItemText
            primary={
              <Hb.Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{item.title}</span>
                {item.cycle !== "EVERYDAY" && (
                  <Hb.Chip
                    label={CYCLE_LABELS[item.cycle as CycleType] ?? item.cycle}
                    size="small"
                    style={{
                      height: 20,
                      fontSize: "0.6875rem",
                      backgroundColor: "var(--hb-color-border)",
                    }}
                  />
                )}
              </Hb.Box>
            }
            primaryStyle={{
              fontSize: "0.925rem",
              textDecoration: isCompleteStatus(item.progress) ? "line-through" : "none",
              color: isCompleteStatus(item.progress)
                ? "var(--hb-color-text-disabled)"
                : "var(--hb-color-text-primary)",
              transition: "color 0.2s ease, text-decoration-color 0.2s ease",
            }}
          />
          {!item.reaction && (
            <Hb.Button.Icon
              size="small"
              aria-label="리액션 추가"
              className="reaction-trigger"
              style={{
                opacity: 0,
                transition: "opacity 0.15s ease",
                fontSize: "0.875rem",
                padding: 4,
                marginRight: 8,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setReactionAnchor(e.currentTarget);
              }}
            >
              😊
            </Hb.Button.Icon>
          )}
        </Hb.List.ItemButton>
      </Hb.List.Item>
      <DailyTodoReactionPopover
        anchorEl={reactionAnchor}
        onClose={() => setReactionAnchor(null)}
        onSelect={handleReaction}
      />
      <DailyTodoEditDialog
        item={item}
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          onClose();
        }}
      />
    </>
  );
});
