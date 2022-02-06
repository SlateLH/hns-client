import React from 'react';

import IGameLobbyState from '../../models/game/lobby/IGameLobbyState';
import GameLobbyPlayerList from './GameLobbyPlayerList/GameLobbyPlayerList';

interface Props {
  lobbyState: IGameLobbyState;
}

function GameLobbyContainer({ lobbyState }: Props) {
  const { localPlayer, remotePlayers } = lobbyState;

  return localPlayer ? (
    <GameLobbyPlayerList
      localPlayer={localPlayer}
      remotePlayers={remotePlayers || []}
    />
  ) : null;
}

export default GameLobbyContainer;
