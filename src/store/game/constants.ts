import { noop } from "@/utils/other";
import { GameContextType, GameState, GameStateType } from "./types";

export const defaultInitialState: GameStateType = {
  gameMode: null,
  currentPlayer: "player1",
  lastWinner: null,
  playerScores: [0, 0],
  playerMap: { 1: "player1", 2: "player2" },
  gameStatus: GameState.NotStarted,
};

export const defaultGameContext: GameContextType = {
  state: defaultInitialState,
  board: [[]],
  restartGame: noop,
  onDropDisc: (args) => false,
  pauseGame: noop,
  continueGame: noop,
  startGame: noop,
  nextTurn: noop,
  setWinner: noop,
  endGame: noop,
};
