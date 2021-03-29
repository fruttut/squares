import { IWizardState } from './state';
import { EWizardActionTypes, WizardAction } from './actions';
import {
  excludeItemFromArray,
  excludePropertyFromObject,
} from '../utils/exclude';
import { shiftDown, shiftUp } from '../utils/shiftUpDown';

export const wizardReducer = (state: IWizardState, action: WizardAction) => {
  switch (action.type) {
    case EWizardActionTypes.GO_TO_NEXT_STEP:
      return {
        ...state,
        step: state.step + 1,
      };
    case EWizardActionTypes.GO_TO_PREVIOUS_STEP:
      return {
        ...state,
        step: state.step - 1,
      };
    case EWizardActionTypes.SET_BOARD_DIMENSION:
      return {
        ...state,
        dim: action.dim,
      };
    case EWizardActionTypes.ADD_PLAYER: {
      const newIds = [...state.players.ids, action.player.id];
      return {
        ...state,
        players: {
          ...state.players,
          ids: [...newIds],
          names: {
            ...state.players.names,
            [action.player.id]: action.player.name,
          },
          colors: {
            ...state.players.colors,
            [action.player.id]: action.player.color,
          },
        },
        turns: [...newIds],
      };
    }
    case EWizardActionTypes.REMOVE_PLAYER: {
      const newIds = excludeItemFromArray(state.players.ids, action.id);
      return {
        ...state,
        players: {
          ...state.players,
          ids: [...newIds],
          names: excludePropertyFromObject(state.players.names, action.id),
          colors: excludePropertyFromObject(state.players.colors, action.id),
        },
        turns: [...newIds],
      };
    }
    case EWizardActionTypes.SET_PLAYER_NAME:
      return {
        ...state,
        players: {
          ...state.players,
          names: {
            ...state.players.names,
            [action.id]: action.name,
          },
        },
      };
    case EWizardActionTypes.SET_PLAYER_COLOR:
      return {
        ...state,
        players: {
          ...state.players,
          colors: {
            ...state.players.colors,
            [action.id]: action.color,
          },
        },
      };
    case EWizardActionTypes.RAISE_TURN:
      return {
        ...state,
        turns: shiftUp(state.turns, state.turns.indexOf(action.id)),
      };
    case EWizardActionTypes.SINK_TURN:
      return {
        ...state,
        turns: shiftDown(state.turns, state.turns.indexOf(action.id)),
      };
    case EWizardActionTypes.SET_TURNS:
      return {
        ...state,
        turns: [...action.turns],
      };
    case EWizardActionTypes.SUBMIT:
      return {
        ...state,
        submitted: true,
      };
    default:
      return state;
  }
};
