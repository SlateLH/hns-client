import React from 'react';

import IGameLobbyPlayer from '../../../models/game/lobby/IGameLobbyPlayer';

interface Props {
  index: number;
  player: IGameLobbyPlayer;
}

function GameLobbyPlayerListItem({ index, player }: Props) {
  const borderColor = player.isReady
    ? 'border-x-green-500'
    : 'border-x-red-500';

  return (
    <li
      className={`border-x-4 ${borderColor} px-10 py-2 w-full ${
        index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
      }`}
    >
      <h3 className="text-center">{player.name}</h3>
    </li>
  );
}

export default GameLobbyPlayerListItem;
