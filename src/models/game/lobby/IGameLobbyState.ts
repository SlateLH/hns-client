import IGameLobbyPlayer from './IGameLobbyPlayer';

interface IGameLobbyState {
  localPlayer?: IGameLobbyPlayer;
  remotePlayers?: IGameLobbyPlayer[];
  canStart?: boolean;
}

export default IGameLobbyState;
