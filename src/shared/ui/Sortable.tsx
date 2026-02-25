import type { ReactNode } from "react";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const next = array.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

class GrabSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as const,
      handler: ({ nativeEvent: event }: { nativeEvent: PointerEvent }) => {
        const target = event.target as HTMLElement;
        if (
          target.closest("button, a, input, textarea, select, [data-no-dnd]")
        ) {
          return false;
        }
        return true;
      },
    },
  ];
}

/* ── Root ── */

interface RootProps {
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
}

const Root = ({ children, onDragEnd }: RootProps) => {
  const sensors = useSensors(
    useSensor(GrabSensor, { activationConstraint: { distance: 8 } }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  );
};

const STRATEGY_MAP = {
  rect: rectSortingStrategy,
  vertical: verticalListSortingStrategy,
  horizontal: horizontalListSortingStrategy,
} as const;

interface ListProps {
  children: ReactNode;
  items: (string | number)[];
  strategy?: keyof typeof STRATEGY_MAP;
}

const List = ({ children, items, strategy = "rect" }: ListProps) => (
  <SortableContext items={items} strategy={STRATEGY_MAP[strategy]}>
    {children}
  </SortableContext>
);

interface ItemProps {
  children: ReactNode;
  id: string | number;
  style?: React.CSSProperties;
  className?: string;
}

const Item = ({ children, id, style, className }: ItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={className}
      style={{
        ...style,
        transform: CSS.Translate.toString(transform),
        transition: transition ?? undefined,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : undefined,
      }}
    >
      {children}
    </div>
  );
};

export const Sortable = { Root, List, Item };
export type { DragEndEvent } from "@dnd-kit/core";
