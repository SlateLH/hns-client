import React, { useEffect, useRef, useState } from 'react';
import useWebSocket from '../../../../hooks/useWebSocket';

import IGameChatMessage from '../../../../models/game/IGameChatMessage';
import GameUIChatList from './GameUIChatList';

interface Props {
  chatMessages: IGameChatMessage[];
  open?: boolean;
}

function GameUIChatContainer({ chatMessages }: Props) {
  const inputRef = useRef(null);
  const [hidden, setHidden] = useState(false);
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

  useEffect(function () {
    function handleKeydown({ code }: KeyboardEvent) {
      if (code === 'KeyT' && document.activeElement !== inputRef.current) {
        setHidden(!hidden);
        setChatMessage('');
      }
    }

    window.addEventListener('keydown', handleKeydown);

    return function () {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  return hidden ? null : (
    <div className="flex flex-col w-60 h-screen px-1 bg-black/75 backdrop-blur-sm">
      <GameUIChatList chatMessages={chatMessages} />
      <input
        className="w-full bg-white/75 p-2 my-2 mx-auto border rounded-lg"
        placeholder="Start typing to chat"
        value={chatMessage}
        onChange={onChatMessageChange}
        onKeyPress={onChatMessageSubmit}
        ref={inputRef}
      />
    </div>
  );
}

export default GameUIChatContainer;
