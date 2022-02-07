import React from 'react';

import IGameChatMessage from '../../../../models/game/IGameChatMessage';
import GameLobbyChatListItem from './GameLobbyChatListItem';

interface Props {
  chatMessages: IGameChatMessage[];
}

function GameLobbyChatList({ chatMessages }: Props) {
  return (
    <ul className="flex flex-col-reverse overflow-y-scroll break-all w-60 h-96 px-1 bg-gray-300 border rounded-lg border-gray-500">
      {chatMessages.map(function (chatMessage, index) {
        return (
          <GameLobbyChatListItem
            key={`${chatMessage.sender}-${index}`}
            index={index}
            chatMessage={chatMessage}
          />
        );
      })}
    </ul>
  );
}

export default GameLobbyChatList;
