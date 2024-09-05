import { useCallback, useRef } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useEvent<T extends Function>(handler: T | undefined) {
  const handlerRef = useRef<T | undefined>(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback(function (...args: any) {
    return handlerRef.current?.(...args);
  }, []);
}

// this is like a hook to assign usecallback automatically to any function
//Takes in a function and returns a memorized callback of thesame function
// the use isomorphiclayouteffect ensures the latest handler is stored in ref
