import React from 'react';

import IGameLobbyPlayer from '../../../../models/game/lobby/IGameLobbyPlayer';

interface Props {
  index: number;
  player: IGameLobbyPlayer;
}

function GameLobbyPlayerListItem({ index, player }: Props) {
  const borderXColor = player.isReady
    ? 'border-x-green-500'
    : 'border-x-red-500';

  const bgColor = player.isLeader
    ? 'bg-yellow-200'
    : index % 2 === 0
    ? 'bg-gray-100'
    : 'bg-gray-200';

  return (
    <li className={`border-x-4 ${borderXColor} ${bgColor} px-10 py-2 w-full`}>
      <h3 className="text-center">{player.name}</h3>
    </li>
  );
}

export default GameLobbyPlayerListItem;
