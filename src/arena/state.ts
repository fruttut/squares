import {ICoords, IGame, IPlayers} from "../types";
import {createMatrix} from "../utils/createMatrix";
import {populateObject} from "../utils/populateObject";

type CellId = string;
type GroupId = string;
type PlayerId = string;

/**
 * The arena state's data is intentionally excessive and bi-directional: we sacrifice in terms of memory,
 * but gain in terms of speed.
 */
export interface IArenaState {
  dim: number;
  cells: {
    ids: CellId[];
    groups: Record<CellId, GroupId | null>;
  };
  board: {
    cells: CellId[][];
    coords: Record<CellId, ICoords>;
  };
  groups: {
    ids: GroupId[];
    players: Record<GroupId, PlayerId>;
    cells: Record<GroupId, CellId[]>;
  };
  players: IPlayers;
  turns: PlayerId[];
  currentTurnIndex: number;
  score: Record<PlayerId, number>;
  hasEnded: boolean;
}

const initCellIds = (dim: number) => {
  const acc: string[] = [];
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      acc.push(`${i}_${j}`);
    }
  }
  return acc;
};

const initCoords = (dim: number) => {
  const acc: Record<CellId, ICoords> = {};
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      acc[`${i}_${j}`] = { row: i, col: j };
    }
  }
  return acc;
};

export const initArenaState = (game: IGame) => {
  const cellIds = initCellIds(game.dim);
  return {
    dim: game.dim,
    cells: {
      ids: cellIds,
      groups: populateObject({}, cellIds, null),
    },
    board: {
      cells: createMatrix<string>(game.dim, (row: number, col: number) => `${row}_${col}`),
      coords: initCoords(game.dim),
    },
    groups: {
      ids: [],
      players: {},
      cells: {},
    },
    players: game.players,
    turns: game.turns,
    currentTurnIndex: 0,
    score: populateObject({}, game.players.ids, 0),
    hasEnded: false,
  };
};
