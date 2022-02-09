import React from 'react';

import IGameState from '../../../models/game/IGameState';
import GameUIChatContainer from './GameUIChat/GameUIChatContainer';

interface Props {
  gameState: IGameState;
}

function GameUIContainer({ gameState }: Props) {
  const { chatMessages } = gameState;

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-cover bg-[url('https://hips.hearstapps.com/countryliving.cdnds.net/17/47/1511194376-cavachon-puppy-christmas.jpg')]">
      <GameUIChatContainer chatMessages={chatMessages || []} />
    </div>
  );
}

export default GameUIContainer;
