import IGameChatMessage from './IGameChatMessage';
import IGameLobbyState from './lobby/IGameLobbyState';

interface IGameState {
  userName?: string;
  chatMessages?: IGameChatMessage[];
  lobbyState?: IGameLobbyState;
  started?: boolean;
}

export default IGameState;
