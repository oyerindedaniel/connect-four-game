"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  PropsWithChildren,
} from "react";

interface GameContextType {
  currentPlayerIndex: number;
  switchTurn: () => void;
  playerScores: number[];
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

interface GameProviderProps extends PropsWithChildren<{}> {}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [playerScores, setPlayerScores] = useState<number[]>([0, 0]);

  const switchTurn = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerScores.length);
  };

  const resetGame = () => {
    setPlayerScores([0, 0]);
    setCurrentPlayerIndex(0);
  };

  return (
    <GameContext.Provider
      value={{ currentPlayerIndex, switchTurn, playerScores, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};
