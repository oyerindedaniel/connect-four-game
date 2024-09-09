import { GameMode } from "@/store/game/types";
import { PlayerMap } from "@/constructor/game";

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
