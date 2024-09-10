"use client";

import { CPUSVG, PlayerOneSVG, PlayerTwoSVG } from "@/assets";
import { useDragContext } from "@/store/drag/context";
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
    state: { over },
  } = useDragContext();

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return !over ? (
    <span
      className="absolute top-0 -translate-y-2/4 left-2/4 -translate-x-2/4 z-50"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {playerAssets[player]}
    </span>
  ) : null;
};

export default PlayerAsset;
