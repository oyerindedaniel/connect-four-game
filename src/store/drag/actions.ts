import { type DragEvent } from "./reducer";

export enum DragAction {
  DragStart = "DragStart",
  DragMove = "DragMove",
  DragEnd = "DragEnd",
  DragCancel = "DragCancel",
  DragOver = "DragOver",
  DragRemove = "DragRemove",
}

export type DragActions =
  | { type: DragAction.DragStart; payload: Pick<DragEvent, "active"> }
  | { type: DragAction.DragMove; payload: DragEvent }
  | { type: DragAction.DragEnd; payload: DragEvent }
  | { type: DragAction.DragCancel; payload: DragEvent }
  | { type: DragAction.DragOver; payload: DragEvent }
  | { type: DragAction.DragRemove; payload: Pick<DragEvent, "over"> };
