"use client";

import { useDroppable } from "@dnd-kit/core";

interface GameDroppableProps {
  id: string;
}

const GameDroppable: React.FC<GameDroppableProps> = ({ id }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div
      className="bg-red-600 aspect-square w-full h-full"
      ref={setNodeRef}
      style={style}
    />
  );
};

export default GameDroppable;
