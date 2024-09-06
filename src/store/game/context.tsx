"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
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
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [playerScores, setPlayerScores] = useState<number[]>([0, 0]);

  const switchTurn = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerScores.length);
  };

  const resetGame = () => {
    setPlayerScores([0, 0]);
    setCurrentPlayerIndex(0);
  };

  const useGameActions = () => {
    const startGame = (mode: GameMode) => {
      dispatch({ type: GameAction.StartGame, payload: mode });
    };

    const nextTurn = () => {
      dispatch({ type: GameAction.NextTurn });
    };

    const setWinner = (winner: Player) => {
      dispatch({ type: GameAction.SetWinner, payload: winner });
    };

    const endGame = () => {
      dispatch({ type: GameAction.EndGame });
    };

    return { startGame, nextTurn, setWinner, endGame };
  };

  return (
    <GameContext.Provider
      value={{ currentPlayerIndex, switchTurn, playerScores, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};
