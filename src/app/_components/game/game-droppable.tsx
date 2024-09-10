"use client";

import { useDragContext } from "@/store/drag/context";
import { useGameContext } from "@/store/game/context";
import { useDroppable } from "@dnd-kit/core";
import { playerAssets } from "./player-asset";

interface GameDroppableProps {
  id: string;
}

const GameDroppable: React.FC<GameDroppableProps> = ({ id }) => {
  const {
    state: { currentPlayer },
  } = useGameContext();

  const {
    state: { over, isDragging },
  } = useDragContext();

  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  const isDropped = over?.id === id && !isDragging;

  return (
    <div
      className="bg-red-600 aspect-square w-full h-full"
      ref={setNodeRef}
      style={style}
    >
      {isDropped ? playerAssets[currentPlayer] : null}
    </div>
  );
};

export default GameDroppable;
