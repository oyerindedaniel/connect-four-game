"use client";

import { useGameContext } from "@/store/game/context";
import GameBoard from "./game-board";
import PlayerInfoWrapper from "./player-info-wrapper";

const GameBoardWrapper: React.FC = () => {
  const {
    state: { currentPlayer, playerScores },
  } = useGameContext();

  return (
    <div className="flex justify-around items-center h-full">
      <PlayerInfoWrapper player="player1" playerScore={playerScores[0]} />

      <GameBoard />

      <PlayerInfoWrapper player="player2" playerScore={playerScores[1]} />
    </div>
  );
};

export default GameBoardWrapper;
