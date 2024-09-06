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
  currentPlayerIndex: number;
  switchTurn: () => void;
  playerScores: number[];
  resetGame: () => void;
}
