import {
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";

export enum DragAction {
  DragStart = "DragStart",
  DragMove = "DragMove",
  DragEnd = "DragEnd",
  DragCancel = "DragCancel",
  DragOver = "DragOver",
}

export type DragActions =
  | { type: DragAction.DragStart; payload: DragStartEvent }
  | { type: DragAction.DragMove; payload: DragMoveEvent }
  | { type: DragAction.DragEnd; payload: DragEndEvent }
  | { type: DragAction.DragCancel; payload: DragCancelEvent }
  | { type: DragAction.DragOver; payload: DragOverEvent };
