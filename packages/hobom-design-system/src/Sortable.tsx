import { createContext, useContext, type ReactNode } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  type DragCancelEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

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

/* ── Context for Handle ── */

interface SortableItemContextValue {
  setActivatorNodeRef: (element: HTMLElement | null) => void;
  listeners: SyntheticListenerMap | undefined;
}

const SortableItemContext = createContext<SortableItemContextValue | null>(
  null,
);

/* ── Root ── */

interface RootProps {
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
  onDragStart?: (event: DragStartEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragCancel?: (event: DragCancelEvent) => void;
  overlay?: ReactNode;
}

const Root = ({
  children,
  onDragEnd,
  onDragStart,
  onDragOver,
  onDragCancel,
  overlay,
}: RootProps) => {
  const sensors = useSensors(
    useSensor(GrabSensor, { activationConstraint: { distance: 8 } }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      {children}
      {overlay !== undefined && <DragOverlay>{overlay}</DragOverlay>}
    </DndContext>
  );
};

/* ── List ── */

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

/* ── Item ── */

interface ItemProps {
  children: ReactNode;
  id: string | number;
  style?: React.CSSProperties;
  className?: string;
  useHandle?: boolean;
  placeholderStyle?: React.CSSProperties;
  overStyle?: React.CSSProperties;
}

const Item = ({
  children,
  id,
  style,
  className,
  useHandle = false,
  placeholderStyle,
  overStyle,
}: ItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id });

  const dragStyle: React.CSSProperties = isDragging
    ? placeholderStyle
      ? { ...placeholderStyle, opacity: 0, visibility: "hidden" as const }
      : { opacity: 0.5, zIndex: 1 }
    : {};

  const hoverStyle: React.CSSProperties =
    isOver && !isDragging && overStyle ? overStyle : {};

  return (
    <SortableItemContext.Provider value={{ setActivatorNodeRef, listeners }}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...(useHandle ? {} : listeners)}
        className={className}
        style={{
          ...style,
          transform: CSS.Translate.toString(transform),
          transition: transition ?? undefined,
          ...dragStyle,
          ...hoverStyle,
        }}
      >
        {children}
      </div>
    </SortableItemContext.Provider>
  );
};

/* ── Handle ── */

interface HandleProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Handle = ({ children, className, style }: HandleProps) => {
  const context = useContext(SortableItemContext);

  if (!context) {
    throw new Error(
      "Sortable.Handle must be used inside Sortable.Item with useHandle",
    );
  }

  return (
    <div
      ref={context.setActivatorNodeRef}
      {...(context.listeners ?? {})}
      className={className}
      style={{ cursor: "grab", ...style }}
    >
      {children}
    </div>
  );
};

export const Sortable = { Root, List, Item, Handle };
export type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
