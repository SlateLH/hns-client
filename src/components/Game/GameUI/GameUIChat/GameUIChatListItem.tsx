import React from 'react';

import IGameChatMessage from '../../../../models/game/IGameChatMessage';

interface Props {
  chatMessage: IGameChatMessage;
}

function GameUIChatListItem({ chatMessage }: Props) {
  return (
    <li className="p-2 mb-1 border rounded-lg bg-white/75">
      <h5
        className={`font-semibold text-${chatMessage.sender
          .split(' ')[0]
          .toLowerCase()}-500`}
      >
        {`${chatMessage.isLeader ? '⭐ ' : ''}${chatMessage.sender}`}
      </h5>
      <p>{chatMessage.message}</p>
    </li>
  );
}

export default GameUIChatListItem;
