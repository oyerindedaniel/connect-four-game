import { noop } from "@/utils/other";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { DragActions } from "./actions";
import { dragReducer, DragState, initialDragState } from "./reducer";

interface DragContextType {
  state: DragState;
  dispatch: React.Dispatch<DragActions>;
}

const defaultDragContext: DragContextType = {
  state: initialDragState,
  dispatch: noop,
};

const DragContext = createContext<DragContextType>(defaultDragContext);

export const useDragContext = (): DragContextType => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDragContext must be used within a DragProvider");
  }
  return context;
};

export const DragProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(dragReducer, initialDragState);

  console.log(state);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <DragContext.Provider value={value}>{children}</DragContext.Provider>;
};
