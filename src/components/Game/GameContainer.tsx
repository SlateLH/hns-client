import React from 'react';

import useGameState from '../../hooks/useGameState';
import GameLobbyContainer from './GameLobby/GameLobbyContainer';

interface Props {}

function GameContainer(props: Props) {
  const gameState = useGameState();

  const chatMessages = gameState?.chatMessages || [];
  const lobbyState = gameState?.lobbyState;

  return lobbyState ? (
    <div className="flex flex-col items-center my-10 border border-gray-700 shadow-lg shadow-gray-600 bg-gray-600 w-fit rounded-xl mx-auto p-5">
      <h1 className="font-semibold text-xl text-white">Lobby</h1>
      <GameLobbyContainer lobbyState={lobbyState} chatMessages={chatMessages} />
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default GameContainer;
