"use client";

import { GameProvider } from "@/store/game/context";
import { PropsWithChildren } from "react";
import { DndContext } from "@dnd-kit/core";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <DndContext>
      <GameProvider>{children}</GameProvider>
    </DndContext>
  );
}
