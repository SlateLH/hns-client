import React from 'react';

import IGameChatMessage from '../../../../models/game/IGameChatMessage';

interface Props {
  index: number;
  chatMessage: IGameChatMessage;
}

function GameLobbyChatListItem({ index, chatMessage }: Props) {
  const senderColor = chatMessage.sender.split(' ')[0].toLowerCase();

  return (
    <li className="p-2 mb-1 border rounded-lg bg-gray-100">
      <h5
        className={`font-semibold text-${
          senderColor === 'white' ? 'black' : senderColor
        }-500`}
      >
        {chatMessage.sender}
      </h5>
      <p>{chatMessage.message}</p>
      <h6 className="font-light text-xs text-gray-400 text-right">
        {chatMessage.time}
      </h6>
    </li>
  );
}

export default GameLobbyChatListItem;
