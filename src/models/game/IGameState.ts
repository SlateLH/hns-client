import IGameLobbyState from './lobby/IGameLobbyState';

interface IGameState {
  userName?: string;
  lobbyState?: IGameLobbyState;
}

export default IGameState;
