"use client";

import { useDragContext } from "@/store/drag/context";
import { Player } from "@/store/game/types";
import { useDroppable } from "@dnd-kit/core";
import { playerDiscs } from "./disc";

interface GameDroppableProps {
  id: number;
  disabled: boolean;
}

const GameDroppable: React.FC<GameDroppableProps> = ({
  id,
  disabled = false,
}) => {
  const droppableId = `droppable-${id}`;

  const { setNodeRef } = useDroppable({
    id: droppableId,
    data: { id, columnIdx: id - 1 },
    disabled,
  });

  const {
    state: {
      currentDrag: { over, isDragging },
      drags,
    },
  } = useDragContext();

  const droppedDiscData = drags.get(droppableId);

  const isOverCurrentDroppable = over?.id === droppableId;
  const isDragFinished = !isDragging;

  const isDropped = isOverCurrentDroppable && isDragFinished;

  const renderDisc = () => {
    const droppedPlayer = droppedDiscData?.active?.data?.current?.player;

    if (droppedPlayer) {
      return playerDiscs[droppedPlayer as Player];
    }

    return null;
  };

  return (
    <div ref={setNodeRef} className="w-20 h-full relative aspect-auto">
      {isDropped && droppedDiscData && (
        <span className="absolute bottom-0">{renderDisc()}</span>
      )}
    </div>
  );
};

export default GameDroppable;
