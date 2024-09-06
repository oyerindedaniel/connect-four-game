"use client";

import { useGameContext } from "@/store/game/context";
import Controls from "./_components/controls";
import GameBoard from "./_components/game-board";
import PlayerInfo from "./_components/player-info";
import Timer from "./_components/timer";

const ConnectFour: React.FC = () => {
  const {
    state: { currentPlayer },
    playerScores,
    resetGame,
    startGame,
    nextTurn,
    setWinner,
    endGame,
  } = useGameContext();

  return (
    <div className="flex flex-col h-full">
      <Controls />
      <div>
        <PlayerInfo
          player="player1"
          score={playerScores[0]}
          className="left-[10%]"
        />

        <GameBoard />

        <PlayerInfo
          player="player2"
          score={playerScores[1]}
          className="right-[10%]"
        />
      </div>
      <Timer timeLeft={3} currentPlayer={currentPlayer} />
      <div className="h-[200px] rounded-t-[60px] bg-purple-light z-[-1] absolute bottom-0 w-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
    </div>
  );
};

export default ConnectFour;
