import React from 'react';

import IGameLobbyPlayer from '../../../models/game/lobby/IGameLobbyPlayer';
import GameLobbyPlayerListItem from './GameLobbyPlayerListItem';

interface Props {
  localPlayer: IGameLobbyPlayer;
  remotePlayers: IGameLobbyPlayer[];
}

function GameLobbyPlayerList({ localPlayer, remotePlayers }: Props) {
  const players = [localPlayer, ...remotePlayers];

  return (
    <ul className="border border-gray-500 mt-5">
      {players.map(function (player, index) {
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
