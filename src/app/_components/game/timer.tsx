"use client";

import { DEFAULT_TIME } from "@/config";
import { useGameContext } from "@/store/game/context";
import { Player } from "@/store/game/types";
import { classNames } from "@/utils/other";
import { useEffect, useState } from "react";

interface TimerProps {
  currentPlayer: Player;
}

const Timer: React.FC<TimerProps> = ({ currentPlayer }) => {
  const { skipTurn } = useGameContext();

  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      skipTurn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(DEFAULT_TIME);
  }, [currentPlayer]);

  return (
    <span
      className={classNames("font-bold text-[56px] h-[71px] text-black", {
        "text-white": currentPlayer === "player1",
      })}
    >
      {timeLeft}s
    </span>
  );
};

export default Timer;
