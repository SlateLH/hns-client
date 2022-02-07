import React, { useState } from 'react';

import useWebSocket from '../../../../hooks/useWebSocket';
import IGameChatMessage from '../../../../models/game/IGameChatMessage';
import GameLobbyChatList from './GameLobbyChatList';

interface Props {
  chatMessages: IGameChatMessage[];
}

function GameLobbyChatContainer({ chatMessages }: Props) {
  const [chatMessage, setChatMessage] = useState('');
  const webSocket = useWebSocket();

  function onChatMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChatMessage(e.target.value);
  }

  function onChatMessageSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (chatMessage.trim() !== '' && e.key === 'Enter') {
      e.preventDefault();

      webSocket?.send(JSON.stringify({ req: [['chat', chatMessage]] }));

      setChatMessage('');
    }
  }

  return (
    <div className="mt-2 p-2 border border-gray-500 rounded-lg">
      <GameLobbyChatList chatMessages={chatMessages} />
      <input
        className="w-full bg-white p-2 my-2 mx-auto border rounded-lg"
        placeholder="Start typing to chat"
        value={chatMessage}
        onChange={onChatMessageChange}
        onKeyPress={onChatMessageSubmit}
      />
    </div>
  );
}

export default GameLobbyChatContainer;
