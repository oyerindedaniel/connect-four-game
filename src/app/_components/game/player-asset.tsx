"use client";

import { CPUSVG, PlayerOneSVG, PlayerTwoSVG } from "@/assets";
import { Player } from "@/store/game/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface PlayerInfoProps {
  player: Player;
}

const playerAssets = {
  player1: <PlayerOneSVG />,
  player2: <PlayerTwoSVG />,
  computer: <CPUSVG />,
};

const PlayerAsset: React.FC<PlayerInfoProps> = ({ player }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${player}`,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

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
