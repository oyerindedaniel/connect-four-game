export enum GameState {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  GameOver = "GameOver",
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
  lastWinner: Player | null;
  gameStatus: GameState;
};

export interface GameContextType {
  state: GameStateType;
  playerScores: number[];
  resetGame: () => void;
  startGame: (mode: GameMode) => void;
  nextTurn: () => void;
  setWinner: (winner: Player) => void;
  endGame: () => void;
}
