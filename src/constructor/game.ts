import { DEFAULT_COLUMNS, DEFAULT_ROWS } from "@/config";
import { Player } from "@/store/game/types";

export type PlayerMap = {
  1: Player;
  2: Player;
};

interface GameOptions {
  rows?: number;
  columns?: number;
  currentPlayer?: number;
  playerMap?: PlayerMap;
}

export interface CallbackOptions {
  nextTurnCallback: (nextPlayer: Player) => void;
  setWinnerCallback: (winner: Player) => void;
  endGameCallback: () => void;
}

export interface IConnect4Game {
  readonly rows: number;
  readonly columns: number;
  currentPlayer: number;
  initializeGame(): void;
  dropDisc(column: number): boolean;
  checkForWin(): boolean;
  isBoardFull(): boolean;
  printBoard(): void;
}

class Connect4Game implements IConnect4Game {
  readonly rows: IConnect4Game["rows"];
  readonly columns: IConnect4Game["columns"];
  currentPlayer: IConnect4Game["currentPlayer"];
  private board: number[][];
  private playerMap: PlayerMap;

  private nextTurnCallback: CallbackOptions["nextTurnCallback"];
  private setWinnerCallback: CallbackOptions["setWinnerCallback"];
  private endGameCallback: CallbackOptions["endGameCallback"];

  constructor(gameOptions: GameOptions = {}, callbacks: CallbackOptions) {
    const {
      rows = DEFAULT_ROWS,
      columns = DEFAULT_COLUMNS,
      currentPlayer = 1,
      playerMap = { 1: "player1", 2: "player2" },
    } = gameOptions;

    this.rows = rows;
    this.columns = columns;
    this.currentPlayer = currentPlayer;
    this.playerMap = playerMap;
    this.board = Array.from({ length: this.rows }, () =>
      Array(this.columns).fill(0)
    );

    this.nextTurnCallback = callbacks.nextTurnCallback;
    this.setWinnerCallback = callbacks.setWinnerCallback;
    this.endGameCallback = callbacks.endGameCallback;

    this.initializeGame();
  }

  initializeGame(): void {
    // this.board = Array.from({ length: this.rows }, () =>
    //   Array(this.columns).fill(0)
    // );
    console.log("Game initialized");
  }

  dropDisc(column: number): boolean {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[row][column] === 0) {
        this.board[row][column] = this.currentPlayer;

        const win = this.checkForWin();
        const boardFull = this.isBoardFull();

        if (win) {
          this.setWinnerCallback(this.playerMap[this.currentPlayer as 1 | 2]);
          return true;
        }

        if (boardFull) {
          this.endGameCallback();
          return true;
        }

        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

        this.nextTurnCallback(this.playerMap[this.currentPlayer as 1 | 2]);

        return true;
      }
    }

    return false; // Column is full, cannot place disc
  }

  checkForWin(): boolean {
    return false;
  }

  isBoardFull(): boolean {
    return this.board[0].every((cell) => cell !== 0);
  }

  printBoard(): void {
    console.log(this.board.map((row) => row.join(" ")).join("\n"));
  }
}

export default Connect4Game;
