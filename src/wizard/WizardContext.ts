import React, { Dispatch, useContext } from 'react';
import { IWizardState } from './state';
import { WizardAction } from './actions';
import { noop } from '../utils/noop';

export type IWizardContext = [
  state: IWizardState,
  dispatch: Dispatch<WizardAction>
];

export const WizardContext = React.createContext<IWizardContext>([
  {
    step: 0,
    dim: 0,
    players: {
      ids: [],
      names: {},
      colors: {},
    },
    turns: [],
    submitted: false,
  },
  noop,
]);

export const useWizard = () => useContext(WizardContext);
