import React, { useReducer } from 'react';
import { arenaReducer } from './reducer';
import { IGame } from '../types';
import { initArenaState } from './state';
import { ArenaContext } from './ArenaContext';

export interface IArenaContextProviderProps {
  game: IGame;
}

export const ArenaContextProvider: React.FC<IArenaContextProviderProps> = ({
  game,
  children,
}) => {
  const stateAndDispatch = useReducer(arenaReducer, game, initArenaState);
  return (
    <ArenaContext.Provider value={stateAndDispatch}>
      {children}
    </ArenaContext.Provider>
  );
};
