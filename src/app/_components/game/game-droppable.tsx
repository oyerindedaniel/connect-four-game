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
    // opacity: isOver ? 0.6 : 0.5,
  };

  const isDropped = over?.id === id && !isDragging;

  return (
    <div
      className="aspect-square w-full h-full relative"
      ref={setNodeRef}
      style={style}
    >
      {isDropped && (
        <span className="absolute left-2/4 -translate-x-2/4 bottom-0">
          {playerAssets[currentPlayer]}
        </span>
      )}
    </div>
  );
};

export default GameDroppable;
