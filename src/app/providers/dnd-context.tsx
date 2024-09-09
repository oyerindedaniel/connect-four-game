"use client";

import { PropsWithChildren } from "react";
import { DndContext } from "@dnd-kit/core";

export default function Providers({ children }: PropsWithChildren) {
  return <DndContext>{children}</DndContext>;
}
