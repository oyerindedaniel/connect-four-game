import { CallbackOptions, IConnect4Game } from "@/constructor/game";

export enum GameState {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  GameOver = "GameOver",
  Paused = "Paused",
}

export enum GameMode {
  Local = "local",
  Socket = "socket",
  Computer = "computer",
}

export type Player = "player1" | "player2" | "computer";

export type GameStateType = {
  gameMode: GameMode | null;
  currentPlayer: Player;
  playerScores: number[];
  lastWinner: Player | null;
  gameStatus: GameState;
};

export interface GameContextType {
  state: GameStateType;
  startGame: (mode: GameMode) => void;
  nextTurn: CallbackOptions["nextTurnCallback"];
  setWinner: CallbackOptions["setWinnerCallback"];
  restartGame: () => void;
  onDropDisc: IConnect4Game["dropDisc"];
  pauseGame: () => void;
  continueGame: () => void;
  endGame: CallbackOptions["endGameCallback"];
}
