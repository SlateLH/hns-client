import { useContext } from 'react';

import WebSocketContext from '../contexts/WebSocketContext';

function useWebSocket(): WebSocket | null {
  const webSocket = useContext(WebSocketContext);

  return webSocket;
}

export default useWebSocket;
