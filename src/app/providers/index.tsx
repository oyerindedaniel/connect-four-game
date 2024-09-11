"use client";

import { DragProvider } from "@/store/drag/context";
import { GameProvider } from "@/store/game/context";
import { PropsWithChildren } from "react";
import DndContextProvider from "./dnd-context";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <GameProvider>
      <DragProvider>
        <DndContextProvider>{children}</DndContextProvider>
      </DragProvider>
    </GameProvider>
  );
}
