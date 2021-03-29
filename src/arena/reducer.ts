import { IArenaState } from './state';
import { ArenaAction, EArenaActionTypes } from './actions';
import { unique } from '../utils/unique';
import { populateObject } from '../utils/populateObject';
import {
  excludeAllFromArray,
  excludeAllFromObject,
  excludeItemFromArray,
} from '../utils/exclude';

const isCellPainted = (state: IArenaState, id: string) =>
  state.cells.groups[id] != null;

const isCellPaintedBy = (
  state: IArenaState,
  cellId: string,
  playerId: string
) => {
  const groupId = state.cells.groups[cellId];
  return !!groupId && state.groups.players[groupId] === playerId;
};

const getNeighbourCells = (state: IArenaState, id: string) => {
  const { dim } = state;
  const { row, col } = state.board.coords[id];
  const neighbours: string[] = [];
  if (row > 0) {
    neighbours.push(state.board.cells[row - 1][col]);
  }
  if (row < dim - 1) {
    neighbours.push(state.board.cells[row + 1][col]);
  }
  if (col > 0) {
    neighbours.push(state.board.cells[row][col - 1]);
  }
  if (col < dim - 1) {
    neighbours.push(state.board.cells[row][col + 1]);
  }
  return neighbours;
};

const addStandaloneCell = (
  state: IArenaState,
  cellId: string,
  playerId: string,
  groupId: string
) => ({
  ...state,
  cells: {
    ...state.cells,
    groups: {
      ...state.cells.groups,
      [cellId]: groupId,
    },
  },
  groups: {
    ...state.groups,
    ids: [...state.groups.ids, groupId],
    players: {
      ...state.groups.players,
      [groupId]: playerId,
    },
    cells: {
      ...state.groups.cells,
      [groupId]: [cellId],
    },
  },
  score: {
    ...state.score,
    [playerId]: Math.max(state.score[playerId], 1),
  },
});

const getPlayerNeighbourCells = (
  state: IArenaState,
  cellId: string,
  playerId: string
) => {
  return getNeighbourCells(state, cellId).filter((neighbourId) =>
    isCellPaintedBy(state, neighbourId, playerId)
  );
};

export const arenaReducer = (state: IArenaState, action: ArenaAction) => {
  switch (action.type) {
    case EArenaActionTypes.PAINT_CELL: {
      if (isCellPainted(state, action.cellId)) {
        return state;
      }
      const neighbourCellIds = getPlayerNeighbourCells(
        state,
        action.cellId,
        action.playerId
      );
      if (neighbourCellIds.length === 0) {
        return addStandaloneCell(
          state,
          action.cellId,
          action.playerId,
          action.groupId
        );
      }
      const [anyNeighbour, ...otherNeighbours] = neighbourCellIds;
      const targetGroupId = state.cells.groups[anyNeighbour]!;
      const targetGroupCount = state.groups.cells[targetGroupId].length;
      const otherGroupIds = unique(
        excludeItemFromArray(
          otherNeighbours.map((id) => state.cells.groups[id]!),
          targetGroupId
        )
      );
      const cellsToMove = otherGroupIds.flatMap((id) => state.groups.cells[id]);
      return {
        ...state,
        cells: {
          ...state.cells,
          groups: populateObject(
            state.cells.groups,
            [...cellsToMove, action.cellId],
            targetGroupId
          ),
        },
        groups: {
          ...state.groups,
          ids: excludeAllFromArray(state.groups.ids, otherGroupIds),
          players: excludeAllFromObject(state.groups.players, otherGroupIds),
          cells: {
            ...excludeAllFromObject(state.groups.cells, otherGroupIds),
            [targetGroupId]: [
              ...state.groups.cells[targetGroupId],
              ...cellsToMove,
              action.cellId,
            ],
          },
        },
        score: {
          ...state.score,
          [action.playerId]: Math.max(
            state.score[action.playerId],
            targetGroupCount + cellsToMove.length + 1
          ),
        },
      };
    }
    case EArenaActionTypes.PASS_MOVE:
      return {
        ...state,
        currentTurnIndex:
          state.currentTurnIndex === state.turns.length - 1
            ? 0
            : state.currentTurnIndex + 1,
        hasEnded: state.cells.ids.every((id) => state.cells.groups[id] != null),
      };
    default:
      return state;
  }
};
