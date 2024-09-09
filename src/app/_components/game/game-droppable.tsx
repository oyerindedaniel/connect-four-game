"use client";

import { useDroppable } from "@dnd-kit/core";

interface GameDroppableProps {
  id: string;
}

const GameDroppable: React.FC<GameDroppableProps> = ({ id }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      className="bg-red-600 aspect-square w-full h-full"
      ref={setNodeRef}
    ></div>
  );
};

export default GameDroppable;
