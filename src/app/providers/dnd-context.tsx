"use client";

import { DragAction } from "@/store/drag/actions";
import { useDragContext } from "@/store/drag/context";
import { useGameContext } from "@/store/game/context";
import { Player } from "@/store/game/types";
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
  const { onDropDisc, updateDiscCount } = useGameContext();

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
    // Dispatch the DragEnd action
    dispatch({ type: DragAction.DragEnd, payload: dragEnd });

    const { over, active } = dragEnd;

    if (over) {
      const droppedColumn = +over?.data?.current?.columnIdx;
      if (Number.isInteger(droppedColumn) && droppedColumn >= 0) {
        const dropSuccessful = onDropDisc(droppedColumn);

        const activePlayer = active?.data?.current?.player as Player;

        if (dropSuccessful && activePlayer) {
          updateDiscCount(activePlayer);
        }
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
