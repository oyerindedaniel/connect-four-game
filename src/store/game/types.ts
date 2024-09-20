import { CallbackOptions, IConnect4Game, PlayerMap } from "@/constructor/game";

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
  playerScores: Record<Player, number>;
  lastWinner: Player | null;
  gameStatus: GameState;
  playerMap: PlayerMap;
  lastStartingPlayer: Player;
  discsByPlayer: Record<Player, number>;
};

export interface GameContextType {
  state: GameStateType;
  board: number[][];
  startGame: (mode: GameMode) => void;
  nextTurn: CallbackOptions["nextTurnCallback"];
  setWinner: CallbackOptions["setWinnerCallback"];
  skipTurn: () => void;
  restartGame: () => void;
  resetGame: () => void;
  onDropDisc: IConnect4Game["dropDisc"];
  pauseGame: () => void;
  continueGame: () => void;
  endGame: CallbackOptions["endGameCallback"];
  updateDiscCount: (player: Player) => void;
}
