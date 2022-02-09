import IGameLobbyPlayer from './IGameLobbyPlayer';

interface IGameLobbyState {
  localPlayer?: IGameLobbyPlayer;
  remotePlayers?: IGameLobbyPlayer[];
  canStart?: boolean;
  starting?: boolean;
}

export default IGameLobbyState;
