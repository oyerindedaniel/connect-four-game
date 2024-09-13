"use client";

import { useGameContext } from "@/store/game/context";
import Controls from "./controls";
import GameBoardWrapper from "./game-board-wrapper";
import Timer from "./timer";

const Game: React.FC = () => {
  const {
    state: { currentPlayer },
  } = useGameContext();

  return (
    <>
      <Controls />

      <GameBoardWrapper />

      <Timer timeLeft={3} currentPlayer={currentPlayer} />
      <div className="h-[200px] rounded-t-[60px] bg-purple-light z-[-1] absolute bottom-0 w-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
    </>
  );
};

export default Game;
