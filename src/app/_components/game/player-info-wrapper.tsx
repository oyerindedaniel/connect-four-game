"use client";

import { CPUSVG, PlayerOneSVG, PlayerTwoSVG } from "@/assets";
import { Player } from "@/store/game/types";
import Discs from "./discs";
import PlayerInfo from "./player-info";

interface PlayerInfoWrapperProps {
  player: Player;
  playerScore: number;
}

export const playerAssets = {
  player1: <PlayerOneSVG />,
  player2: <PlayerTwoSVG />,
  computer: <CPUSVG />,
};

const PlayerInfoWrapper: React.FC<PlayerInfoWrapperProps> = ({
  player,
  playerScore,
}) => {
  return (
    <div className="flex flex-col items-center gap-10">
      <Discs player={player} />
      <PlayerInfo player={player} score={playerScore} />
    </div>
  );
};

export default PlayerInfoWrapper;
