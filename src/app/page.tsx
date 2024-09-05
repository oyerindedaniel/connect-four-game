"use client";

import { useGameContext } from "@/store/game/context";
import Controls from "./_components/controls";
import GameBoard from "./_components/game-board";
import PlayerInfo from "./_components/player-info";
import Timer from "./_components/timer";

const ConnectFour: React.FC = () => {
  const { currentPlayerIndex, playerScores, switchTurn } = useGameContext();

  return (
    <div>
      <Controls />
      <div>
        <PlayerInfo playerName="Player 1" score={playerScores[0]} />

        <GameBoard />

        <PlayerInfo playerName="Player 2" score={playerScores[1]} />
      </div>
      <Timer timeLeft={3} />

      <button onClick={switchTurn}>End Turn</button>
    </div>
  );
};

export default ConnectFour;
