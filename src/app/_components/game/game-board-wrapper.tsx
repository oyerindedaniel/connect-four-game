"use client";

import { useGameContext } from "@/store/game/context";
import GameBoard from "./game-board";
import PlayerInfoWrapper from "./player-info-wrapper";

const GameBoardWrapper: React.FC = () => {
  const {
    state: { playerScores, playerMap },
  } = useGameContext();

  const firstGamePlayer = playerMap[1];
  const otherGamePlayer = playerMap[2];

  return (
    <div className="flex justify-around items-center h-full">
      <PlayerInfoWrapper
        player={firstGamePlayer}
        playerScore={playerScores[firstGamePlayer]}
      />

      <GameBoard />

      <PlayerInfoWrapper
        player={otherGamePlayer}
        playerScore={playerScores[otherGamePlayer]}
      />
    </div>
  );
};

export default GameBoardWrapper;
