"use client";

import { CPUSVG, PlayerOneSVG, PlayerTwoSVG } from "@/assets";
import { DragAction } from "@/store/drag/actions";
import { useDragContext } from "@/store/drag/context";
import { useGameContext } from "@/store/game/context";
import { Player } from "@/store/game/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface PlayerInfoProps {
  player: Player;
}

export const playerAssets = {
  player1: <PlayerOneSVG />,
  player2: <PlayerTwoSVG />,
  computer: <CPUSVG />,
};

const PlayerAsset: React.FC<PlayerInfoProps> = ({ player }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${player}`,
  });

  const {
    state: { currentPlayer },
  } = useGameContext();

  const {
    state: { over, lastAction, active },
  } = useDragContext();

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const isDropped = Boolean(
    over && lastAction === DragAction.DragEnd && player === currentPlayer
  );

  console.log({ isDropped });

  if (isDropped) return null;

  return (
    <span
      className="absolute top-0 -translate-y-2/4 left-2/4 -translate-x-2/4 z-50"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {playerAssets[player]}
    </span>
  );
};

export default PlayerAsset;
