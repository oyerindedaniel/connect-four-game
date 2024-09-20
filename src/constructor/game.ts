import { DEFAULT_COLUMNS, DEFAULT_ROWS } from "@/config";
import { Player } from "@/store/game/types";
import { create2DArray } from "@/utils/game";

export type PlayerMap = {
  1: Player;
  2: Player;
};

type GridPlayer = 1 | 2;

interface GameOptions {
  rows?: number;
  columns?: number;
  currentPlayer?: GridPlayer;
  playerMap?: PlayerMap;
}

export interface CallbackOptions {
  nextTurnCallback: (nextPlayer: Player) => void;
  setWinnerCallback: (winner: Player) => void;
  setBoardCallback: (board: number[][]) => void;
  endGameCallback: () => void;
}

export interface IConnect4Game {
  readonly rows: number;
  readonly columns: number;
  currentPlayer: GridPlayer;
  lastStartingPlayer: GridPlayer;
  readonly playerMap: PlayerMap;
  initializeGame(): void;
  dropDisc(column: number): boolean;
  skipTurn(): void;
  checkForWin(row: number, column: number): boolean;
  isBoardFull(): boolean;
  printBoard(): void;
  reset(): void;
}

class Connect4Game implements IConnect4Game {
  readonly rows: IConnect4Game["rows"];
  readonly columns: IConnect4Game["columns"];
  currentPlayer: IConnect4Game["currentPlayer"];
  lastStartingPlayer: IConnect4Game["lastStartingPlayer"];
  private board: number[][];
  readonly playerMap: IConnect4Game["playerMap"];

  private nextTurnCallback: CallbackOptions["nextTurnCallback"];
  private setWinnerCallback: CallbackOptions["setWinnerCallback"];
  private endGameCallback: CallbackOptions["endGameCallback"];
  private setBoardCallback: CallbackOptions["setBoardCallback"];

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
    this.lastStartingPlayer = currentPlayer;
    this.playerMap = playerMap;
    this.board = create2DArray(this.rows, this.columns, 0);

    this.nextTurnCallback = callbacks.nextTurnCallback;
    this.setWinnerCallback = callbacks.setWinnerCallback;
    this.endGameCallback = callbacks.endGameCallback;
    this.setBoardCallback = callbacks.setBoardCallback;

    this.initializeGame();
  }

  initializeGame(): void {
    // this.board = Array.from({ length: this.rows }, () =>
    //   Array(this.columns).fill(0)
    // );
    console.log("Game initialized");
  }

  dropDisc(column: number): boolean {
    if (column < 0 || column >= this.columns) {
      return false;
    }

    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[row][column] === 0) {
        this.board[row][column] = this.currentPlayer;

        this.setBoardCallback(this.board);

        const win = this.checkForWin(row, column);

        const boardFull = this.isBoardFull();

        if (win) {
          this.setWinnerCallback(this.playerMap[this.currentPlayer]);
          return true;
        }

        if (boardFull) {
          this.endGameCallback();
          return true;
        }

        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

        this.nextTurnCallback(this.playerMap[this.currentPlayer]);

        return true;
      }
    }

    return false; // Column is full, cannot place disc
  }

  checkForWin(row: number, column: number): boolean {
    const player = this.currentPlayer;
    const directions = [
      { dx: 1, dy: 0 }, // Horizontal right
      { dx: 0, dy: 1 }, // Vertical down
      { dx: 1, dy: 1 }, // Diagonal down-right
      { dx: 1, dy: -1 }, // Diagonal up-right
    ];

    const inBounds = (r: number, c: number): boolean =>
      r >= 0 && r < this.rows && c >= 0 && c < this.columns;

    const countConsecutiveDiscs = (
      row: number,
      col: number,
      dx: number,
      dy: number
    ): number => {
      let count = 1;

      // Check in the (dx, dy) direction
      for (let i = 1; i < 4; i++) {
        const newRow = row + i * dy;
        const newCol = col + i * dx;
        if (inBounds(newRow, newCol) && this.board[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }

      // Check in the (-dx, -dy) direction (opposite direction)
      for (let i = 1; i < 4; i++) {
        const newRow = row - i * dy;
        const newCol = col - i * dx;
        if (inBounds(newRow, newCol) && this.board[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }

      return count;
    };

    // Check all directions starting from the last dropped disc
    for (const { dx, dy } of directions) {
      if (countConsecutiveDiscs(row, column, dx, dy) >= 4) {
        return true; // Winning condition met
      }
    }

    return false; // No win found
  }

  skipTurn(): void {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    this.nextTurnCallback(this.playerMap[this.currentPlayer]);
  }

  isBoardFull(): boolean {
    return this.board[0].every((cell) => cell !== 0);
  }

  reset(): void {
    this.lastStartingPlayer = this.lastStartingPlayer === 1 ? 2 : 1;
    this.currentPlayer = this.lastStartingPlayer;

    // Reset the board
    this.board = create2DArray(this.rows, this.columns, 0);
    this.setBoardCallback(this.board);

    // Notify that the game has been reset and the current player is updated
    // this.nextTurnCallback(this.playerMap[this.currentPlayer]);
  }

  printBoard(): void {
    console.log(this.board.map((row) => row.join(" ")).join("\n"));
  }
}

export default Connect4Game;
