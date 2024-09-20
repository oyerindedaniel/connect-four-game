import { PlayerMap } from "@/constructor/game";
import { GameMode, Player } from "@/store/game/types";

export function getPlayerMap(mode: GameMode): PlayerMap {
  switch (mode) {
    case GameMode.Local:
      return { 1: "player1", 2: "player2" };
    case GameMode.Socket:
      return { 1: "player1", 2: "player2" };
    case GameMode.Computer:
      return { 1: "player1", 2: "computer" };
    default:
      return { 1: "player1", 2: "player2" };
  }
}

export function getMaxDiscsPerPlayer(columns: number, rows: number): number {
  const totalCells = columns * rows;
  return Math.floor(totalCells / 2);
}

/**
 * Creates a 2D array with specified number of rows and columns, initialized with a given value.
 * @param rows - Number of rows in the array.
 * @param columns - Number of columns in the array.
 * @param value - Value to fill the array with.
 * @returns A 2D array with the specified dimensions and value.
 */
export function create2DArray<T>(
  rows: number,
  columns: number,
  value: T
): T[][] {
  return Array.from({ length: rows }, () => Array(columns).fill(value));
}

export const getNextStartingPlayer = (
  lastStartingPlayer: Player,
  gameMode: GameMode
): Player => {
  if (gameMode === GameMode.Computer) {
    return lastStartingPlayer === "player1" ? "computer" : "player1";
  } else {
    return lastStartingPlayer === "player1" ? "player2" : "player1";
  }
};

export const getOtherPlayer = (
  currentPlayer: Player,
  playerMap: PlayerMap
): Player => {
  const currentPlayerKey = Object.keys(playerMap).find(
    (key) => playerMap[Number(key) as 1 | 2] === currentPlayer
  );

  const nextPlayerKey = currentPlayerKey === "1" ? 2 : 1;

  return playerMap[nextPlayerKey];
};
