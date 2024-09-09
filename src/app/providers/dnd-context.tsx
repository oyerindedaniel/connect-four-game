"use client";

import { DndContext } from "@dnd-kit/core";
import { PropsWithChildren, useState } from "react";

export default function Providers({ children }: PropsWithChildren) {
  const [parent, setParent] = useState();

  function handleDragEnd({ over }) {
    console.log("here");
    setParent(over ? over.id : null);
  }
  console.log(parent);
  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
}
