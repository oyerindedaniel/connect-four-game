"use client";

import Connect4Game, { IConnect4Game } from "@/constructor/game";
import { getPlayerMap } from "@/utils/game";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import { GameAction } from "./actions";
import { defaultGameContext } from "./constants";
import { gameReducer, getInitialState } from "./reducer";
import { GameContextType, GameMode, Player } from "./types";

const GameContext = createContext<GameContextType>(defaultGameContext);

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

interface GameProviderProps extends PropsWithChildren {}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, undefined, getInitialState);
  const [playerScores, setPlayerScores] = useState<number[]>([0, 0]);
  const [gameInstance, setGameInstance] = useState<IConnect4Game | null>(null);

  const resetGame = useCallback(() => {
    setPlayerScores([0, 0]);
  }, [setPlayerScores]);

  const useGameActions = useMemo(() => {
    const nextTurn = (nextPlayer: Player) => {
      dispatch({ type: GameAction.NextTurn, payload: nextPlayer });
    };

    const setWinner = (winner: Player) => {
      dispatch({ type: GameAction.SetWinner, payload: winner });
    };

    const endGame = () => {
      dispatch({ type: GameAction.EndGame });
    };

    const startGame = (mode: GameMode) => {
      const playerMap = getPlayerMap(mode);

      const game = new Connect4Game(
        {
          currentPlayer: 1,
          playerMap,
        },
        {
          nextTurnCallback: (nextPlayer) => {
            nextTurn(nextPlayer);
          },
          setWinnerCallback: (winner) => {
            console.log(`${winner} is the winner`);
          },
          endGameCallback: () => {
            console.log("The game is over. It's a draw");
          },
        }
      );

      setGameInstance(game);
      dispatch({ type: GameAction.StartGame, payload: mode });
    };

    return { startGame, nextTurn, setWinner, endGame };
  }, [dispatch]);

  const contextValue = useMemo(
    () => ({
      state,
      resetGame,
      playerScores,
      ...useGameActions,
    }),
    [state, resetGame, playerScores, useGameActions]
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
