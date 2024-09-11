"use client";

import { DragAction } from "@/store/drag/actions";
import { useDragContext } from "@/store/drag/context";
import { useGameContext } from "@/store/game/context";
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { PropsWithChildren } from "react";

// OVER: DROPPABLE
// ACTIVE: DRAGGABLE

export default function DndContextProvider({ children }: PropsWithChildren) {
  const { dispatch } = useDragContext();
  const { onDropDisc } = useGameContext();

  function handleDragStart(dragStart: DragStartEvent) {
    dispatch({ type: DragAction.DragStart, payload: dragStart });
  }

  function handleDragMove(dragMove: DragMoveEvent) {
    // console.log("Drag Move:", dragMove);
    dispatch({ type: DragAction.DragMove, payload: dragMove });
  }

  function handleDragOver(dragOver: DragOverEvent) {
    dispatch({ type: DragAction.DragOver, payload: dragOver });
  }

  function handleDragEnd(dragEnd: DragEndEvent) {
    // console.log("Drag End:", dragEnd);
    dispatch({ type: DragAction.DragEnd, payload: dragEnd });

    const { over } = dragEnd;

    console.log(dragEnd);

    if (over) {
      const droppedColumn = +over?.data?.current?.columnIdx;
      if (Number.isInteger(droppedColumn)) {
        const value = onDropDisc(droppedColumn);
      }
    }
  }

  function handleDragCancel(dragCancel: DragCancelEvent) {
    // console.log("Drag Cancel:", dragCancel);
    dispatch({ type: DragAction.DragCancel, payload: dragCancel });
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
    >
      {children}
    </DndContext>
  );
}
