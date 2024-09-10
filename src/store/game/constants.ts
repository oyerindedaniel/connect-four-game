import { noop } from "@/utils/other";
import { GameContextType, GameState, GameStateType } from "./types";

export const defaultInitialState: GameStateType = {
  gameMode: null,
  currentPlayer: "player1",
  lastWinner: null,
  playerScores: [0, 0],
  gameStatus: GameState.NotStarted,
};

export const defaultGameContext: GameContextType = {
  state: defaultInitialState,
  resetGame: noop,
  startGame: noop,
  nextTurn: noop,
  setWinner: noop,
  endGame: noop,
};
