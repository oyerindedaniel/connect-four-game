import { LOCAL_STORAGE_NAME } from "@/config";
import { isWindowDefined } from "@/utils/other";
import { GameAction, GameActions } from "./actions";
import { defaultInitialState } from "./constants";
import { GameMode, GameState, GameStateType } from "./types";

export function getInitialState(): GameStateType {
  if (isWindowDefined()) {
    const savedState = localStorage.getItem(LOCAL_STORAGE_NAME);
    if (savedState) {
      return JSON.parse(savedState);
    }
  }

  return defaultInitialState;
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
        currentPlayer: action.payload,
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
