"use client";

import { DragProvider } from "@/store/drag/context";
import { GameProvider } from "@/store/game/context";
import { PropsWithChildren } from "react";
import DndContextProvider from "./dnd-context";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <DndContextProvider>
      <GameProvider>
        <DragProvider>{children}</DragProvider>
      </GameProvider>
    </DndContextProvider>
  );
}
