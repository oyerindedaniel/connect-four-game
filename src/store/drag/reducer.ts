import { DragEndEvent, DragMoveEvent, DragStartEvent } from "@dnd-kit/core";
import { DragAction, DragActions } from "./actions";

export interface DragState {
  active: DragStartEvent["active"] | null;
  over: DragEndEvent["over"] | null;
  collisions: DragMoveEvent["collisions"] | null;
  delta: DragMoveEvent["delta"] | { x: 0; y: 0 };
  isDragging: boolean;
}

export const initialDragState: DragState = {
  active: null,
  over: null,
  collisions: null,
  delta: { x: 0, y: 0 },
  isDragging: false,
};

export const dragReducer = (
  state: DragState,
  action: DragActions
): DragState => {
  switch (action.type) {
    case DragAction.DragStart:
      return {
        ...state,
        active: action.payload.active,
        isDragging: true,
      };

    case DragAction.DragMove:
      return {
        ...state,
        delta: action.payload.delta,
        collisions: action.payload.collisions,
      };

    case DragAction.DragOver:
      return {
        ...state,
        over: action.payload.over,
        collisions: action.payload.collisions,
        delta: action.payload.delta,
      };

    case DragAction.DragEnd:
      return {
        ...state,
        active: null,
        over: action.payload.over,
        isDragging: false,
        collisions: action.payload.collisions,
        delta: { x: 0, y: 0 },
      };

    case DragAction.DragCancel:
      return {
        ...state,
        active: null,
        over: null,
        isDragging: false,
        collisions: null,
        delta: { x: 0, y: 0 },
      };

    default:
      return state;
  }
};
