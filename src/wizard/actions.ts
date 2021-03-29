import { IPlayer } from '../types';

export enum EWizardActionTypes {
  GO_TO_NEXT_STEP = 'GO_TO_NEXT_STEP',
  GO_TO_PREVIOUS_STEP = 'GO_TO_PREVIOUS_STEP',
  SET_BOARD_DIMENSION = 'SET_BOARD_DIMENSION',
  ADD_PLAYER = 'ADD_PLAYER',
  REMOVE_PLAYER = 'REMOVE_PLAYER',
  SET_PLAYER_NAME = 'SET_PLAYER_NAME',
  SET_PLAYER_COLOR = 'SET_PLAYER_COLOR',
  RAISE_TURN = 'RAISE_TURN',
  SINK_TURN = 'SINK_TURN',
  SET_TURNS = 'SET_TURNS',
  SUBMIT = 'SUBMIT',
}

export interface WizardGoToNextStepAction {
  readonly type: EWizardActionTypes.GO_TO_NEXT_STEP;
}

export interface WizardGoToPreviousStepAction {
  readonly type: EWizardActionTypes.GO_TO_PREVIOUS_STEP;
}

export interface WizardSetBoardDimensionAction {
  readonly type: EWizardActionTypes.SET_BOARD_DIMENSION;
  readonly dim: number;
}

export interface WizardAddPlayerAction {
  readonly type: EWizardActionTypes.ADD_PLAYER;
  readonly player: IPlayer;
}

export interface WizardRemovePlayerAction {
  readonly type: EWizardActionTypes.REMOVE_PLAYER;
  readonly id: string;
}

export interface WizardSetPlayerNameAction {
  readonly type: EWizardActionTypes.SET_PLAYER_NAME;
  readonly id: string;
  readonly name: string;
}

export interface WizardSetPlayerColorAction {
  readonly type: EWizardActionTypes.SET_PLAYER_COLOR;
  readonly id: string;
  readonly color: string;
}

export interface WizardRaiseTurnAction {
  readonly type: EWizardActionTypes.RAISE_TURN;
  readonly id: string;
}

export interface WizardSinkTurnAction {
  readonly type: EWizardActionTypes.SINK_TURN;
  readonly id: string;
}

export interface WizardSetTurnsAction {
  readonly type: EWizardActionTypes.SET_TURNS;
  readonly turns: string[];
}

export interface WizardSubmit {
  readonly type: EWizardActionTypes.SUBMIT;
}

export type WizardAction =
  | WizardGoToNextStepAction
  | WizardGoToPreviousStepAction
  | WizardSetBoardDimensionAction
  | WizardAddPlayerAction
  | WizardRemovePlayerAction
  | WizardSetPlayerNameAction
  | WizardSetPlayerColorAction
  | WizardRaiseTurnAction
  | WizardSinkTurnAction
  | WizardSetTurnsAction
  | WizardSubmit;
