"use client";

import { DEFAULT_COLUMNS, DEFAULT_ROWS } from "@/config";
import Connect4Game, { Disc, IConnect4Game } from "@/constructor/game";
import { create2DArray, getPlayerMap } from "@/utils/game";
import React, {
  createContext,
  PropsWithChildren,
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
  const [board, setBoard] = useState<number[][]>(() =>
    create2DArray(DEFAULT_ROWS, DEFAULT_COLUMNS, 0)
  );
  const [gameInstance, setGameInstance] = useState<IConnect4Game | null>(null);

  const useGameActions = useMemo(() => {
    const skipTurn = () => {
      if (gameInstance) {
        gameInstance.skipTurn();
      }
    };

    const updateDiscCount = (player: Player) => {
      dispatch({
        type: GameAction.UpdateDiscCount,
        payload: { player },
      });
    };

    const nextTurn = (nextPlayer: Player) => {
      dispatch({ type: GameAction.NextTurn, payload: nextPlayer });
    };

    const setWinner = ({
      player,
      discs,
    }: {
      player: Player;
      discs: Disc[];
    }) => {
      dispatch({ type: GameAction.SetWinner, payload: { player, discs } });
    };

    const endGame = () => {
      dispatch({ type: GameAction.EndGame });
    };

    const restartGame = () => {
      if (gameInstance) {
        gameInstance.restart();
      }

      dispatch({ type: GameAction.RestartGame });
    };

    const resetGame = () => {
      if (gameInstance) {
        gameInstance.reset();

        const currentPlayer =
          gameInstance.playerMap[gameInstance.currentPlayer];

        dispatch({
          type: GameAction.ResetGame,
          payload: {
            currentPlayer: currentPlayer,
            lastStartingPlayer: currentPlayer,
          },
        });
      }
    };

    const pauseGame = () => {
      dispatch({ type: GameAction.PauseGame });
    };

    const continueGame = () => {
      dispatch({ type: GameAction.ResumeGame });
    };

    const onDropDisc = (column: number) => {
      if (gameInstance) {
        return gameInstance.dropDisc(column);
      }
      return false;
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
            setWinner(winner);
          },
          endGameCallback: () => {
            endGame();
          },
          setBoardCallback: (board: number[][]) => {
            setBoard(board);
          },
        }
      );

      setGameInstance(game);
      dispatch({ type: GameAction.StartGame, payload: mode });
    };

    return {
      startGame,
      nextTurn,
      setWinner,
      onDropDisc,
      endGame,
      restartGame,
      pauseGame,
      skipTurn,
      resetGame,
      continueGame,
      updateDiscCount,
    };
  }, [gameInstance, dispatch]);

  const contextValue = useMemo(
    () => ({
      state,
      board,
      ...useGameActions,
    }),
    [board, state, useGameActions]
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
