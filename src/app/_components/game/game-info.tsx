"use client";

import {
  TurnBackgroundRedSVG,
  TurnBackgroundYellowSVG,
  WinsSVG,
} from "@/assets";
import Button from "@/components/ui/button";
import { useGameContext } from "@/store/game/context";
import { GameState, Player } from "@/store/game/types";
import { classNames } from "@/utils/other";
import Timer from "./timer";

interface GameInfoProps {
  currentPlayer: Player;
}

const playerNames: Record<Player, string> = {
  player1: "Player 1",
  player2: "Player 2",
  computer: "CPU",
};

const playerBackground: Record<Player, JSX.Element> = {
  player1: <TurnBackgroundRedSVG />,
  player2: <TurnBackgroundYellowSVG />,
  computer: <TurnBackgroundYellowSVG />,
};

const GameMessage: React.FC<{
  gameStatus: GameState;
  lastWinner: Player | null;
  currentPlayer: Player;
}> = ({ gameStatus, lastWinner, currentPlayer }) => {
  if (gameStatus === GameState.GameOver) {
    if (lastWinner) {
      return (
        <>
          <span className="font-bold text-base uppercase">
            {playerNames[lastWinner]}
          </span>
          <span className="font-bold text-[56px]">WINS</span>
        </>
      );
    }
    return (
      <>
        <span className="font-bold text-[56px]">DRAW</span>
      </>
    );
  }

  return (
    <span
      className={classNames("font-bold text-base uppercase", {
        "text-white": currentPlayer === "player1",
      })}
    >{`${playerNames[currentPlayer]}'S TURN`}</span>
  );
};

const GameInfo: React.FC<GameInfoProps> = ({ currentPlayer }) => {
  const {
    state: { gameStatus, lastWinner },
    resetGame,
  } = useGameContext();

  const isGameOver = gameStatus === GameState.GameOver;

  return (
    <div
      className={classNames(
        "absolute bottom-[20px] left-2/4 -translate-x-2/4 text-black"
      )}
    >
      {isGameOver ? (
        <WinsSVG className="fill-white" />
      ) : (
        playerBackground[currentPlayer]
      )}

      <div
        className={classNames(
          "flex flex-col items-center justify-center absolute left-2/4 -translate-x-2/4 w-max bottom-[28px]",
          {
            "bottom-[18px]": isGameOver,
          }
        )}
      >
        <GameMessage
          gameStatus={gameStatus}
          lastWinner={lastWinner}
          currentPlayer={currentPlayer}
        />

        {isGameOver && (
          <Button className="uppercase" onClick={resetGame}>
            Play again
          </Button>
        )}

        {!isGameOver && <Timer currentPlayer={currentPlayer} />}
      </div>
    </div>
  );
};

export default GameInfo;
