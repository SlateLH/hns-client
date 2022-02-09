export interface IGameAction {
  type: string;
  payload?: any;
}

export const GameActionTypes = {
  JOIN_SERVER: 'join_server',
  GET_LOBBY_PLAYERS: 'get_lobby_players',
  UPDATE_IS_READY: 'update_is_ready',
  CHAT: 'chat',
  INIT_START_GAME: 'init_start_game',
  CANCEL_START_GAME: 'cancel_start_game',
  START_GAME: 'start_game',
};
