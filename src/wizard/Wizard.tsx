import {Box, Step, StepLabel, Stepper, Typography} from "@material-ui/core";
import {ChooseBoardSizeStep} from "./steps/ChooseBoardSizeStep";
import {AddPlayersStep} from "./steps/AddPlayersStep";
import {PickTurnsStep} from "./steps/PickTurnsStep";
import React, {useEffect} from "react";
import {useWizard} from "./WizardContext";
import {IGame} from "../types";

export interface IWizardProps {
  onSubmit?: (data: IGame) => void;
}

export const Wizard: React.FC<IWizardProps> = ({ onSubmit }) => {
  const [state] = useWizard();
  const { step, submitted } = state;

  useEffect(() => {
    if (submitted) {
      if (!!onSubmit) {
        onSubmit({
          dim: state.dim,
          players: state.players,
          turns: state.turns,
        });
      }
    }
  }, [submitted, onSubmit]);

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Typography variant="h1" align="center">Welcome to Squares!</Typography>
      <Stepper activeStep={step}>
        <Step>
          <StepLabel>Choose board size</StepLabel>
        </Step>
        <Step>
          <StepLabel>Add players</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pick turns</StepLabel>
        </Step>
      </Stepper>
      <Box display="flex" flexGrow={1}>
        {step === 0 && <ChooseBoardSizeStep />}
        {step === 1 && <AddPlayersStep />}
        {step === 2 && <PickTurnsStep />}
      </Box>
    </Box>
  );
}