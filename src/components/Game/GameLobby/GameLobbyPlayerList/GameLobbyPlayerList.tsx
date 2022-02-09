import React from 'react';

import IGameLobbyPlayer from '../../../../models/game/lobby/IGameLobbyPlayer';
import GameLobbyPlayerListItem from './GameLobbyPlayerListItem';

interface Props {
  localPlayer: IGameLobbyPlayer;
  remotePlayers: IGameLobbyPlayer[];
}

function GameLobbyPlayerList({ localPlayer, remotePlayers }: Props) {
  return (
    <ul className="mt-2">
      <div className="mb-4">
        <GameLobbyPlayerListItem index={0} player={localPlayer} />
      </div>
      {remotePlayers.map(function (player, index) {
        return (
          <GameLobbyPlayerListItem
            index={index}
            key={player.uuid}
            player={player}
          />
        );
      })}
    </ul>
  );
}

export default GameLobbyPlayerList;
