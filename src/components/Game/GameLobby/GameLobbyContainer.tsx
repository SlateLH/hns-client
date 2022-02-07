import React, { useState } from 'react';

import useWebSocket from '../../../hooks/useWebSocket';
import IGameChatMessage from '../../../models/game/IGameChatMessage';
import IGameLobbyState from '../../../models/game/lobby/IGameLobbyState';
import GameLobbyChatContainer from './GameLobbyChat/GameLobbyChatContainer';
import GameLobbyPlayerList from './GameLobbyPlayerList/GameLobbyPlayerList';

interface Props {
  chatMessages: IGameChatMessage[];
  lobbyState: IGameLobbyState;
}

function GameLobbyContainer({ chatMessages, lobbyState }: Props) {
  const { localPlayer, remotePlayers } = lobbyState;
  const webSocket = useWebSocket();

  function onReadyCheckboxToggle() {
    webSocket?.send(
      JSON.stringify({ req: [['update_is_ready', !localPlayer?.isReady]] })
    );
  }

  return localPlayer ? (
    <div className="grid grid-rows-1 grid-cols-2 gap-x-4">
      <div>
        <input
          className="mr-2 mt-2"
          type="checkbox"
          name="ready-checkbox"
          checked={localPlayer.isReady}
          onChange={onReadyCheckboxToggle}
        />
        <label className="text-white" htmlFor="ready-checkbox">
          Ready
        </label>
        <GameLobbyPlayerList
          localPlayer={localPlayer}
          remotePlayers={remotePlayers || []}
        />
      </div>
      <div>
        <GameLobbyChatContainer chatMessages={chatMessages} />
      </div>
    </div>
  ) : null;
}

export default GameLobbyContainer;
