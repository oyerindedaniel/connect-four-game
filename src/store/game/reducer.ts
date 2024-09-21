import { DEFAULT_COLUMNS, DEFAULT_ROWS, LOCAL_STORAGE_NAME } from "@/config";
import { getMaxDiscsPerPlayer, getPlayerMap } from "@/utils/game";
import { isWindowDefined } from "@/utils/other";
import { GameAction, GameActions } from "./actions";
import { defaultInitialState } from "./constants";
import { GameState, GameStateType } from "./types";

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
      const gameMode = action.payload;
      return {
        ...state,
        gameMode,
        gameStatus: GameState.InProgress,
        playerMap: getPlayerMap(gameMode),
        currentPlayer: "player1", // Player 1 starts by default
      };

    case GameAction.NextTurn:
      return {
        ...state,
        currentPlayer: action.payload,
      };

    case GameAction.SetWinner:
      const { player, discs } = action.payload;

      return {
        ...state,
        playerScores: {
          ...state.playerScores,
          [player]: (state.playerScores[player] || 0) + 1,
        },
        lastWinner: player,
        winningDiscs: discs,
        gameStatus: GameState.GameOver,
      };

    case GameAction.ResetGame:
      return {
        ...state,
        currentPlayer: action.payload.currentPlayer,
        lastStartingPlayer: action.payload.lastStartingPlayer,
        lastWinner: null,
        winningDiscs: [],
        gameStatus: GameState.InProgress,
        discsByPlayer: defaultInitialState.discsByPlayer,
      };

    case GameAction.RestartGame:
      return {
        ...state,
        ...defaultInitialState,
      };

    case GameAction.PauseGame:
      return {
        ...state,
        gameStatus: GameState.Paused,
      };

    case GameAction.ResumeGame:
      return {
        ...state,
        gameStatus: GameState.InProgress,
      };

    case GameAction.EndGame:
      return {
        ...state,
        gameStatus: GameState.GameOver,
      };

    case GameAction.UpdateDiscCount: {
      const { player } = action.payload;
      const maxDiscs = getMaxDiscsPerPlayer(DEFAULT_COLUMNS, DEFAULT_ROWS);
      return {
        ...state,
        discsByPlayer: {
          ...state.discsByPlayer,
          [player]: Math.min(state.discsByPlayer[player] + 1, maxDiscs),
        },
      };
    }

    default:
      return state;
  }
};
