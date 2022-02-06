import React, { useState } from 'react';

import useWebSocket from '../../hooks/useWebSocket';
import IGameLobbyState from '../../models/game/lobby/IGameLobbyState';
import GameLobbyPlayerList from './GameLobbyPlayerList/GameLobbyPlayerList';

interface Props {
  lobbyState: IGameLobbyState;
}

function GameLobbyContainer({ lobbyState }: Props) {
  const { localPlayer, remotePlayers } = lobbyState;
  const webSocket = useWebSocket();

  function onReadyCheckboxToggle() {
    webSocket?.send(
      JSON.stringify({ req: [['update_is_ready', !localPlayer?.isReady]] })
    );
  }

  return localPlayer ? (
    <div>
      <GameLobbyPlayerList
        localPlayer={localPlayer}
        remotePlayers={remotePlayers || []}
      />
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
    </div>
  ) : null;
}

export default GameLobbyContainer;
