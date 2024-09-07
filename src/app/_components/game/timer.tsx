"use client";

import { TurnBackgroundYellowSVG } from "@/assets";
import { Player } from "@/store/game/types";

interface TimerProps {
  timeLeft: number;
  currentPlayer: Player;
}

const playerNames = {
  player1: "Player 1",
  player2: "Player 2",
  computer: "CPU",
};

const Timer: React.FC<TimerProps> = ({ timeLeft, currentPlayer }) => {
  return (
    <div className="absolute bottom-[20px] left-2/4 -translate-x-2/4 text-black">
      <TurnBackgroundYellowSVG />

      <div className="flex flex-col items-center justify-center absolute left-2/4 -translate-x-2/4 w-max bottom-[28px]">
        <span className="font-bold text-base uppercase">{`${playerNames[currentPlayer]}'S TURN`}</span>
        <span className="font-bold text-[56px] h-[71px]">{timeLeft}s</span>
      </div>
    </div>
  );
};

export default Timer;
