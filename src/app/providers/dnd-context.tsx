"use client";

import { DragAction } from "@/store/drag/actions";
import { useDragContext } from "@/store/drag/context";
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { PropsWithChildren } from "react";

export default function DndContextProvider({ children }: PropsWithChildren) {
  const { dispatch } = useDragContext();

  function handleDragStart(dragStart: DragStartEvent) {
    dispatch({ type: DragAction.DragStart, payload: dragStart });
  }

  function handleDragMove(dragMove: DragMoveEvent) {
    console.log("Drag Move:", dragMove);
    dispatch({ type: DragAction.DragMove, payload: dragMove });
  }

  function handleDragOver(dragOver: DragOverEvent) {
    dispatch({ type: DragAction.DragOver, payload: dragOver });
  }

  function handleDragEnd(dragEnd: DragEndEvent) {
    dispatch({ type: DragAction.DragEnd, payload: dragEnd });
  }

  function handleDragCancel(dragCancel: DragCancelEvent) {
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
