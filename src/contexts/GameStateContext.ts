import { createContext } from 'react';

import IGameState from '../models/game/IGameState';

const GameStateContext = createContext<IGameState | null>(null);

export default GameStateContext;
