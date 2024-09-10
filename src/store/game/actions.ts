import { GameMode, Player } from "./types";

export enum GameAction {
  StartGame = "StartGame",
  NextTurn = "NextTurn",
  EndGame = "EndGame",
  SetWinner = "SetWinner",
  RestartGame = "RestartGame",
  PauseGame = "PauseGame",
  ResumeGame = "ResumeGame",
}

export type GameActions =
  | { type: GameAction.StartGame; payload: GameMode }
  | { type: GameAction.NextTurn; payload: Player }
  | { type: GameAction.SetWinner; payload: Player }
  | { type: GameAction.EndGame }
  | { type: GameAction.RestartGame }
  | { type: GameAction.PauseGame }
  | { type: GameAction.ResumeGame };
