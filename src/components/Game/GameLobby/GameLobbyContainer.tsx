import React, { useEffect } from 'react';

import useWebSocket from '../../../hooks/useWebSocket';
import IGameChatMessage from '../../../models/game/IGameChatMessage';
import IGameLobbyState from '../../../models/game/lobby/IGameLobbyState';
import Button from '../../../ui/Button';
import GameLobbyChatContainer from './GameLobbyChat/GameLobbyChatContainer';
import GameLobbyPlayerList from './GameLobbyPlayerList/GameLobbyPlayerList';

interface Props {
  chatMessages: IGameChatMessage[];
  lobbyState: IGameLobbyState;
  areAllPlayersReady?: boolean;
}

function GameLobbyContainer({
  chatMessages,
  lobbyState,
  areAllPlayersReady,
}: Props) {
  const { localPlayer, remotePlayers } = lobbyState;
  const webSocket = useWebSocket();

  useEffect(
    function () {
      if (!areAllPlayersReady && lobbyState.starting) {
        webSocket?.send(JSON.stringify({ req: [['cancel_start_game']] }));
      }
    },
    [areAllPlayersReady]
  );

  function onReadyCheckboxToggle() {
    webSocket?.send(
      JSON.stringify({ req: [['update_is_ready', !localPlayer?.isReady]] })
    );
  }

  function onStartButtonClick() {
    if (lobbyState.starting) {
      webSocket?.send(JSON.stringify({ req: [['cancel_start_game']] }));
    } else {
      webSocket?.send(JSON.stringify({ req: [['init_start_game']] }));
    }
  }

  return localPlayer ? (
    <div className="grid grid-rows-1 grid-cols-2 gap-x-4">
      <div>
        <div className="grid grid-rows-1 grid-cols-2 gap-x-1 my-2">
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
          </div>
          {localPlayer?.isLeader && (
            <Button
              text={lobbyState.starting ? 'Cancel start' : 'Start game'}
              disabled={!areAllPlayersReady && !lobbyState.starting}
              onClick={onStartButtonClick}
            />
          )}
        </div>
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
