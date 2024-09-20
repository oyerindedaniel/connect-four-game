import {
  Active,
  Collision,
  Over,
  Translate,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { DragAction, DragActions } from "./actions";

export interface DragEvent {
  activatorEvent: Event;
  active: Active;
  collisions: Collision[] | null;
  delta: Translate;
  over: Over | null;
}

export interface DragData {
  active: DragEvent["active"] | null;
  over: DragEvent["over"] | null;
  collisions: DragEvent["collisions"] | null;
  delta: DragEvent["delta"] | { x: number; y: number };
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
      const { over, active } = action.payload;

      const dragData = {
        ...state.currentDrag,
        over,
        isDragging: false,
        collisions: action.payload.collisions,
        lastAction: DragAction.DragEnd,
      };

      return {
        ...state,
        currentDrag: dragData,
        drags: over?.id
          ? new Map(state.drags).set(over.id, dragData)
          : state.drags,
      };

    case DragAction.DragRemove:
      const { over: removeOver } = action.payload;

      const updatedDrags = new Map(state.drags);

      if (removeOver?.id) {
        updatedDrags.delete(removeOver.id);
      }

      return {
        ...state,
        drags: updatedDrags,
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
