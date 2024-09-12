"use client";

import { useDragContext } from "@/store/drag/context";
import { Player } from "@/store/game/types";
import { useDroppable } from "@dnd-kit/core";
import { playerDiscs } from "./disc";

interface GameDroppableProps {
  id: number;
}

const GameDroppable: React.FC<GameDroppableProps> = ({ id }) => {
  const {
    state: {
      currentDrag: { over, isDragging, active },
      drags,
    },
  } = useDragContext();

  const { setNodeRef } = useDroppable({
    id: `droppable-${id}`,
    data: { id, columnIdx: id - 1 },
  });

  const droppedDiscData = drags.get(`droppable-${id}`);

  const isOverCurrentDroppable = over?.id === `droppable-${id}`;
  const isDragFinished = !isDragging;

  const isDropped = isOverCurrentDroppable && isDragFinished;

  const renderDisc = () => {
    const droppedPlayer = droppedDiscData?.active?.data?.current?.player;
    return playerDiscs[
      (droppedPlayer as Player) ?? (active?.data?.current?.player as Player)
    ];
  };

  return (
    <div className="aspect-square w-full h-full relative" ref={setNodeRef}>
      {(isDropped || droppedDiscData) && (
        <span className="absolute left-2/4 -translate-x-2/4 bottom-0">
          {renderDisc()}
        </span>
      )}
    </div>
  );
};

export default GameDroppable;
