import { GameMode, Player } from "./types";

export enum GameAction {
  StartGame = "StartGame",
  NextTurn = "NextTurn",
  EndGame = "EndGame",
  SetWinner = "SetWinner",
  RestartGame = "RestartGame",
  ResetGame = "ResetGame",
  PauseGame = "PauseGame",
  ResumeGame = "ResumeGame",
  UpdateDiscCount = "UpdateDiscCount",
}

export type GameActions =
  | { type: GameAction.StartGame; payload: GameMode }
  | { type: GameAction.NextTurn; payload: Player }
  | { type: GameAction.SetWinner; payload: Player }
  | { type: GameAction.EndGame }
  | { type: GameAction.RestartGame }
  | {
      type: GameAction.ResetGame;
      payload: { currentPlayer: Player; lastStartingPlayer: Player };
    }
  | { type: GameAction.PauseGame }
  | { type: GameAction.ResumeGame }
  | { type: GameAction.UpdateDiscCount; payload: { player: Player } };
