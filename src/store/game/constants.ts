import { noop } from "@/utils/other";
import { GameContextType, GameState, GameStateType } from "./types";

export const defaultInitialState: GameStateType = {
  gameMode: null,
  currentPlayer: "player1",
  lastWinner: null,
  playerScores: { player1: 0, player2: 0, computer: 0 },
  playerMap: { 1: "player1", 2: "player2" },
  gameStatus: GameState.NotStarted,
  lastStartingPlayer: "player1",
  discsByPlayer: {
    player1: 0,
    player2: 0,
    computer: 0,
  },
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
  skipTurn: noop,
  resetGame: noop,
  updateDiscCount: (player) => {},
};
