import { IGameAction, GameActionTypes } from '../actions/game';
import IGameState from '../models/game/IGameState';
import IGameLobbyPlayer from '../models/game/lobby/IGameLobbyPlayer';

function joinServer(state: IGameState, { payload }: IGameAction): IGameState {
  const [uuid, name]: [string, string] = payload;

  return {
    ...state,
    lobbyState: {
      ...state.lobbyState,
      localPlayer: {
        uuid,
        name,
        isReady: false,
      },
      canStart: false,
    },
  };
}

function getLobbyPlayers(
  state: IGameState,
  { payload }: IGameAction
): IGameState {
  const localPlayerUUID = state.lobbyState?.localPlayer?.uuid;

  const remotePlayers: IGameLobbyPlayer[] = payload[0]
    .map(function ([uuid, name, isReady]: [string, string, boolean]) {
      return {
        uuid,
        name,
        isReady,
      };
    })
    .filter(function ({ uuid }: IGameLobbyPlayer) {
      return uuid !== localPlayerUUID;
    });

  return {
    ...state,
    lobbyState: {
      ...state.lobbyState,
      remotePlayers,
    },
  };
}

function updateIsReady(
  state: IGameState,
  { payload }: IGameAction
): IGameState {
  const localPlayer = state.lobbyState?.localPlayer;
  const remotePlayers = state.lobbyState?.remotePlayers;
  const [uuid, isReady]: [string, boolean] = payload;

  if (localPlayer && localPlayer.uuid === uuid) {
    return {
      ...state,
      lobbyState: {
        ...state.lobbyState,
        localPlayer: {
          ...localPlayer,
          isReady,
        },
      },
    };
  }

  const updatedRemotePlayers =
    remotePlayers &&
    [...remotePlayers].map(function (player) {
      if (player?.uuid === uuid) {
        return {
          ...player,
          isReady,
        };
      }

      return player;
    });

  return {
    ...state,
    lobbyState: {
      ...state.lobbyState,
      remotePlayers: updatedRemotePlayers,
    },
  };
}

function chat(state: IGameState, { payload }: IGameAction): IGameState {
  const [sender, message, time]: [string, string, string] = payload;
  const chatMessages = state.chatMessages || [];

  const updatedChatMessages = chatMessages && [
    { sender, message, time },
    ...chatMessages,
  ];

  return {
    ...state,
    chatMessages: updatedChatMessages,
  };
}

export default function (state: IGameState, action: IGameAction): IGameState {
  switch (action.type) {
    case GameActionTypes.JOIN_SERVER:
      return joinServer(state, action);
    case GameActionTypes.GET_LOBBY_PLAYERS:
      return getLobbyPlayers(state, action);
    case GameActionTypes.UPDATE_IS_READY:
      return updateIsReady(state, action);
    case GameActionTypes.CHAT:
      return chat(state, action);
    default:
      return state;
  }
}
