import { useCallback, useRef } from "react";
import { useEvent } from "./useEvent";

export function useNodeRef<T extends Element = HTMLElement>(
  onChange?: (newElement: T | null, previousElement: T | null) => void
) {
  const onChangeHandler = useEvent(onChange);
  const node = useRef<T | null>(null);

  const setNodeRef = useCallback(
    (element: T | null) => {
      if (element !== node.current) {
        onChangeHandler?.(element, node.current);
      }
      node.current = element;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return [node, setNodeRef] as const;
}
