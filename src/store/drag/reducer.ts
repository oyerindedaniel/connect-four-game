import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { DragAction, DragActions } from "./actions";

export interface DragData {
  active: DragStartEvent["active"] | null;
  over: DragEndEvent["over"] | null;
  collisions: DragMoveEvent["collisions"] | null;
  delta: DragMoveEvent["delta"] | { x: 0; y: 0 };
  isDragging: boolean;
  lastAction: DragAction | null;
}

export interface DragState {
  currentDrag: DragData;
  drags: Map<UniqueIdentifier, DragData>;
}

export const initialDragState: DragState = {
  currentDrag: {
    active: null,
    over: null,
    collisions: null,
    delta: { x: 0, y: 0 },
    isDragging: false,
    lastAction: null,
  },
  drags: new Map(),
};

export const dragReducer = (
  state: DragState,
  action: DragActions
): DragState => {
  switch (action.type) {
    case DragAction.DragStart:
      return {
        ...state,
        currentDrag: {
          ...state.currentDrag,
          active: action.payload.active,
          isDragging: true,
          lastAction: DragAction.DragStart,
        },
      };

    case DragAction.DragMove:
      return {
        ...state,
        currentDrag: {
          ...state.currentDrag,
          delta: action.payload.delta,
          collisions: action.payload.collisions,
          lastAction: DragAction.DragMove,
        },
      };

    case DragAction.DragOver:
      return {
        ...state,
        currentDrag: {
          ...state.currentDrag,
          over: action.payload.over,
          collisions: action.payload.collisions,
          delta: action.payload.delta,
          lastAction: DragAction.DragOver,
        },
      };

    case DragAction.DragEnd:
      const { over } = action.payload;

      const dragData = {
        ...state.currentDrag,
        over,
        isDragging: false,
        collisions: action.payload.collisions,
        delta: { x: 0, y: 0 },
        lastAction: DragAction.DragEnd,
      };

      if (over?.id) {
        state.drags.set(over.id, dragData);
      }

      return {
        ...state,
        currentDrag: dragData,
      };

    case DragAction.DragCancel:
      return {
        ...state,
        currentDrag: {
          active: null,
          over: null,
          isDragging: false,
          collisions: null,
          delta: { x: 0, y: 0 },
          lastAction: DragAction.DragCancel,
        },
      };

    default:
      return state;
  }
};
