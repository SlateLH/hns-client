import { useContext } from 'react';

import GameStateContext from '../contexts/GameStateContext';
import IGameState from '../models/game/IGameState';

function useGameState(): IGameState | null {
  const gameState = useContext(GameStateContext);

  return gameState;
}

export default useGameState;
