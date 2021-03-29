import React, {useReducer} from "react";
import {initWizardState} from "./state";
import {wizardReducer} from "./reducer";
import {WizardContext} from "./WizardContext";

export const WizardContextProvider: React.FC = ({ children }) => {
  const stateAndDispatch = useReducer(wizardReducer, undefined, initWizardState);
  return (
    <WizardContext.Provider value={stateAndDispatch}>
      {children}
    </WizardContext.Provider>
  )
};
