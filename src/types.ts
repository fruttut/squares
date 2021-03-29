export interface ICoords {
  row: number;
  col: number;
}

export interface IPlayer {
  id: string;
  name: string;
  color: string;
}

export interface IPlayers {
  ids: string[];
  names: Record<string, string>;
  colors: Record<string, string>;
}

export interface IGame {
  dim: number;
  players: IPlayers;
  turns: string[];
}

export interface IGameResult {
  players: IPlayers;
  score: Record<string, number>;
}

export enum ERetryOptions {
  WIZARD = 'WIZARD',
  ARENA = 'ARENA',
}
