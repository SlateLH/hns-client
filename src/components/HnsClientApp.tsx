import React, { useReducer, useState } from 'react';

import gameReducer from '../reducers/game';
import loadUUID from '../utilities/loadUUID';
import IServer from '../models/IServer';
import WebSocketContext from '../contexts/WebSocketContext';
import GameStateContext from '../contexts/GameStateContext';
import GameContainer from './GameContainer';
import ServerBrowserContainer from './ServerBrowser/ServerBrowserContainer';

interface Props {}

function HnsClientApp(props: Props) {
  const uuid = loadUUID();

  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [gameState, gameDispatch] = useReducer(gameReducer, {});

  function onServerJoin({ host, port }: IServer) {
    const webSocket = new WebSocket(`ws://${host}:${port}`);

    webSocket.onopen = function () {
      setWebSocket(webSocket);

      webSocket.send(
        JSON.stringify({
          uuid,
        })
      );
    };

    webSocket.onmessage = function (message) {
      const { res } = JSON.parse(message.data);

      res.forEach(function (command: string[]) {
        const [type, ...payload] = command;

        gameDispatch({
          type,
          payload: payload.length ? payload : undefined,
        });
      });
    };

    webSocket.onclose = function () {
      setWebSocket(null);
    };

    webSocket.onerror = function () {
      setWebSocket(null);
    };

    window.addEventListener('unload', function () {
      if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.close();
      }
    });
  }

  return webSocket ? (
    <WebSocketContext.Provider value={webSocket}>
      <GameStateContext.Provider value={gameState}>
        <GameContainer />
      </GameStateContext.Provider>
    </WebSocketContext.Provider>
  ) : (
    <ServerBrowserContainer onServerJoin={onServerJoin} />
  );
}

export default HnsClientApp;
