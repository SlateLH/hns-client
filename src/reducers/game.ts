import { IGameAction, GameActionTypes } from '../actions/game';
import IGameState from '../models/game/IGameState';
import IGameLobbyPlayer from '../models/game/lobby/IGameLobbyPlayer';

function joinServer(state: IGameState, { payload }: IGameAction): IGameState {
  const [uuid, name, isLeader]: [string, string, boolean] = payload;

  return {
    ...state,
    lobbyState: {
      ...state.lobbyState,
      localPlayer: {
        uuid,
        name,
        isReady: false,
        isLeader,
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

  const players: IGameLobbyPlayer[] = payload[0].map(function ([
    uuid,
    name,
    isReady,
    isLeader,
  ]: [string, string, boolean, boolean]) {
    return {
      uuid,
      name,
      isReady,
      isLeader,
    };
  });

  const localPlayer = players.find(function ({ uuid }) {
    return uuid === localPlayerUUID;
  });

  const remotePlayers = players.filter(function ({ uuid }) {
    return uuid !== localPlayerUUID;
  });

  return {
    ...state,
    lobbyState: {
      ...state.lobbyState,
      localPlayer,
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

  const player =
    state.lobbyState?.localPlayer?.name === sender
      ? state.lobbyState?.localPlayer
      : state.lobbyState?.remotePlayers?.find(function (player) {
          return player?.name === sender;
        });

  const updatedChatMessages = chatMessages && [
    { sender, message, time, isLeader: player?.isLeader || false },
    ...chatMessages,
  ];

  return {
    ...state,
    chatMessages: updatedChatMessages,
  };
}

function initStartGame(state: IGameState, action: IGameAction): IGameState {
  return {
    ...state,
    lobbyState: {
      ...state.lobbyState,
      starting: true,
    },
  };
}

function cancelStartGame(state: IGameState, action: IGameAction): IGameState {
  return {
    ...state,
    lobbyState: {
      ...state.lobbyState,
      starting: false,
    },
  };
}

function startGame(state: IGameState, action: IGameAction): IGameState {
  return {
    ...state,
    started: true,
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
    case GameActionTypes.INIT_START_GAME:
      return initStartGame(state, action);
    case GameActionTypes.CANCEL_START_GAME:
      return cancelStartGame(state, action);
    case GameActionTypes.START_GAME:
      return startGame(state, action);
    default:
      return state;
  }
}
