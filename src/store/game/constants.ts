import { noop } from "@/utils/other";
import { GameContextType } from "./types";

export const defaultGameContext: GameContextType = {
  currentPlayerIndex: 0,
  switchTurn: noop,
  playerScores: [0, 0],
  resetGame: noop,
};
