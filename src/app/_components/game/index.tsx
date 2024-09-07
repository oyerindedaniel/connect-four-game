"use client";

import { useGameContext } from "@/store/game/context";
import Controls from "./controls";
import GameBoard from "./game-board";
import PlayerInfo from "./player-info";
import Timer from "./timer";

const Game: React.FC = () => {
  const {
    state: { currentPlayer },
    playerScores,
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

export default Game;
