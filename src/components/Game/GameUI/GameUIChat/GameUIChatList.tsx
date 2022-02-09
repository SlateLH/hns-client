import React from 'react';

import IGameChatMessage from '../../../../models/game/IGameChatMessage';
import GameUIChatListItem from './GameUIChatListItem';

interface Props {
  chatMessages: IGameChatMessage[];
}

function GameUIChatList({ chatMessages }: Props) {
  return (
    <ul className="grow flex flex-col-reverse overflow-y-auto break-words px-1">
      {chatMessages.map(function (chatMessage, index) {
        return (
          <GameUIChatListItem
            key={`${chatMessage.sender}-${index}`}
            chatMessage={chatMessage}
          />
        );
      })}
    </ul>
  );
}

export default GameUIChatList;
