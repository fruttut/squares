import React, { Dispatch, useContext } from 'react';
import { IArenaState } from './state';
import { ArenaAction } from './actions';
import { noop } from '../utils/noop';

export type IArenaContext = [
  state: IArenaState,
  dispatch: Dispatch<ArenaAction>
];

export const ArenaContext = React.createContext<IArenaContext>([
  {
    dim: 0,
    cells: {
      ids: [],
      groups: {},
    },
    board: {
      cells: [],
      coords: {},
    },
    groups: {
      ids: [],
      players: {},
      cells: {},
    },
    score: {},
    players: {
      ids: [],
      names: {},
      colors: {},
    },
    turns: [],
    currentTurnIndex: -1,
    hasEnded: false,
  },
  noop,
]);

export const useArena = () => useContext(ArenaContext);
