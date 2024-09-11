import { PlayerMap } from "@/constructor/game";
import { GameMode } from "@/store/game/types";

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
