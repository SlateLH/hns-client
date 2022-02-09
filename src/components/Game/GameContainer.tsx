import React, { useEffect, useState } from 'react';

import useGameState from '../../hooks/useGameState';
import useWebSocket from '../../hooks/useWebSocket';
import GameUIContainer from './GameUI/GameUIContainer';
import GameLobbyContainer from './GameLobby/GameLobbyContainer';

interface Props {}

function GameContainer(props: Props) {
  const [countdown, setCountdown] = useState(10);
  const gameState = useGameState();
  const webSocket = useWebSocket();

  const chatMessages = gameState?.chatMessages || [];
  const lobbyState = gameState?.lobbyState;

  const areAllPlayersReady =
    lobbyState?.localPlayer?.isReady &&
    lobbyState?.remotePlayers?.every(player => player.isReady);

  useEffect(
    function () {
      if (lobbyState?.starting) {
        const countdownInterval = setInterval(function () {
          if (countdown === 0) {
            clearInterval(countdownInterval);
            webSocket?.send(JSON.stringify({ req: [['start_game']] }));
          } else {
            setCountdown(countdown - 1);
          }
        }, 1000);

        return function () {
          clearInterval(countdownInterval);
        };
      } else {
        setCountdown(10);
      }
    },
    [lobbyState?.starting, countdown]
  );

  if (gameState && gameState.started) {
    return (
      <div>
        <GameUIContainer gameState={gameState} />
      </div>
    );
  } else {
    return lobbyState ? (
      <div className="flex flex-col items-center my-10 border border-gray-700 shadow-lg shadow-gray-600 bg-gray-600 w-fit rounded-xl mx-auto p-5">
        <h1 className="font-semibold text-xl text-white">Lobby</h1>
        <h3 className="text-md text-white">
          {areAllPlayersReady
            ? lobbyState.starting
              ? countdown > 0
                ? `Starting in ${countdown} second${countdown === 1 ? '' : 's'}`
                : 'The game will start now'
              : 'Waiting for the leader to start the game'
            : 'Waiting for all players to be ready'}
        </h3>
        <GameLobbyContainer
          lobbyState={lobbyState}
          chatMessages={chatMessages}
          areAllPlayersReady={areAllPlayersReady}
        />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default GameContainer;
