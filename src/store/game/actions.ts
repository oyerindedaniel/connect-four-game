import { GameMode, Player } from "./types";

export enum GameAction {
  StartGame = "StartGame",
  NextTurn = "NextTurn",
  EndGame = "EndGame",
  SetWinner = "SetWinner",
  ResetGame = "ResetGame",
}

export type GameActions =
  | { type: GameAction.StartGame; payload: GameMode }
  | { type: GameAction.NextTurn; payload: Player }
  | { type: GameAction.SetWinner; payload: Player }
  | { type: GameAction.ResetGame }
  | { type: GameAction.EndGame };
