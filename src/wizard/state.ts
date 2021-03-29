import {AVAILABLE_PLAYER_COLORS, PLAYERS_MIN_NUMBER} from "../constants";
import {IPlayer, IPlayers} from "../types";

export const createPlayer = (num: number, color: string) => ({
  id: String(num),
  name: `Player ${num}`,
  color: color,
});

const initRequiredPlayers = () => {
  const players: IPlayers = {
    ids: [],
    names: {},
    colors: {},
  };
  for (let i = 0; i < PLAYERS_MIN_NUMBER; i++) {
    const player: IPlayer = createPlayer(i + 1, AVAILABLE_PLAYER_COLORS[i]);
    players.ids.push(player.id);
    players.names[player.id] = player.name;
    players.colors[player.id] = player.color;
  }
  return players;
};

export interface IWizardState {
  step: number;
  dim: number;
  players: IPlayers;
  turns: string[];
  submitted: boolean;
}

export const initWizardState = () => {
  const players = initRequiredPlayers();
  return {
    step: 0,
    dim: 0,
    players: initRequiredPlayers(),
    turns: [...players.ids],
    submitted: false,
  };
};