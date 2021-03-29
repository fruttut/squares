export enum EArenaActionTypes {
  PAINT_CELL = 'PAINT_CELL',
  PASS_MOVE = 'PASS_MOVE',
}

export interface ArenaPaintCellAction {
  readonly type: EArenaActionTypes.PAINT_CELL;
  readonly cellId: string;
  readonly playerId: string;
  readonly groupId: string;
}

export interface ArenaPassMoveAction {
  readonly type: EArenaActionTypes.PASS_MOVE;
}

export type ArenaAction =
  ArenaPaintCellAction |
  ArenaPassMoveAction;
