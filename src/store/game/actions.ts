import { Player } from "./types";
import { GameMode } from "./types";

export enum GameAction {
  StartGame = "StartGame",
  NextTurn = "NextTurn",
  EndGame = "EndGame",
  SetWinner = "SetWinner",
}

export type GameActions =
  | { type: GameAction.StartGame; payload: GameMode }
  | { type: GameAction.NextTurn }
  | { type: GameAction.SetWinner; payload: Player }
  | { type: GameAction.EndGame };
