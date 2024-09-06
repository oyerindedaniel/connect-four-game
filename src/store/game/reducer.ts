import { LOCAL_STORAGE_NAME } from "@/config";
import { isWindowDefined } from "@/utils/other";
import { GameAction, GameActions } from "./actions";
import { GameMode, GameState, GameStateType } from "./types";

export function getInitialState(): GameStateType {
  if (isWindowDefined()) {
    const savedState = localStorage.getItem(LOCAL_STORAGE_NAME);
    if (savedState) {
      return JSON.parse(savedState);
    }
  }

  return {
    gameMode: null,
    currentPlayer: "player1",
    lastWinner: null,
    gameStatus: GameState.NotStarted,
  };
}

export const gameReducer = (
  state: GameStateType,
  action: GameActions
): GameStateType => {
  switch (action.type) {
    case GameAction.StartGame:
      return {
        ...state,
        gameMode: action.payload,
        gameStatus: GameState.InProgress,
        currentPlayer: "player1", // Player 1 starts by default
      };

    case GameAction.NextTurn:
      return {
        ...state,
        currentPlayer: (() => {
          if (state.gameMode === GameMode.Local) {
            return state.currentPlayer === "player1" ? "player2" : "player1";
          } else if (state.gameMode === GameMode.Computer) {
            return state.currentPlayer === "player1" ? "computer" : "player1";
          } else if (state.gameMode === GameMode.Socket) {
            return state.currentPlayer === "player1" ? "player2" : "player1";
          }
          return state.currentPlayer;
        })(),
      };

    case GameAction.SetWinner:
      return {
        ...state,
        lastWinner: action.payload,
        gameStatus: GameState.GameOver,
      };

    case GameAction.EndGame:
      return {
        ...state,
        gameStatus: GameState.GameOver,
      };

    default:
      return state;
  }
};
