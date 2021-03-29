import {Box, Button, Typography} from "@material-ui/core";
import React, {useCallback} from "react";
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";
import {shuffle} from "../../utils/shuffle";
import {useWizard} from "../WizardContext";
import {EWizardActionTypes} from "../actions";

export const PickTurnsStep: React.FC = () => {
  const [{ players, turns }, dispatch] = useWizard();

  const handleRaiseTurn = (id: string) => {
    dispatch({
      type: EWizardActionTypes.RAISE_TURN,
      id,
    });
  };

  const handleSinkTurn = (id: string) => {
    dispatch({
      type: EWizardActionTypes.SINK_TURN,
      id,
    });
  };

  const handleRandomize = () => {
    dispatch({
      type: EWizardActionTypes.SET_TURNS,
      turns: shuffle(turns),
    });
  };

  const handleBack = useCallback(() => {
    dispatch({
      type: EWizardActionTypes.GO_TO_PREVIOUS_STEP,
    });
  }, []);

  const handlePlay = useCallback(() => {
    dispatch({
      type: EWizardActionTypes.SUBMIT,
    });
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
      <Box
        display="grid"
        gridTemplateColumns={`56px 200px ${turns.length > 1 ? 'auto' : ''} ${turns.length > 2 ? 'auto' : ''}`}
        gridTemplateRows={`repeat(${turns.length}, 56px) auto auto`}
        gridColumnGap={16}
        gridRowGap={16}
      >
        {turns.map((id, index) => (
          <React.Fragment key={id}>
            <Box bgcolor={players.colors[id]} height={56} alignSelf="center" />
            <Box alignSelf="center">
              <Typography>{players.names[id]}</Typography>
            </Box>
            {index > 0 && (
              <Button color="primary" variant="outlined" onClick={() => handleRaiseTurn(id)}>
                <ArrowUpward />
              </Button>
            )}
            {index < turns.length - 1 && (
              <Button color="primary" variant="outlined" onClick={() => handleSinkTurn(id)}>
                <ArrowDownward />
              </Button>
            )}
            {(turns.length > 2 && (index === 0 || index === turns.length - 1)) && <Box />}
          </React.Fragment>
        ))}
        <Box gridColumn={`1 / ${Math.min(turns.length + 2, 5)}`}>
          <Button color="secondary" variant="contained" fullWidth onClick={handleRandomize}>RANDOMIZE</Button>
        </Box>
        <Box gridColumn={`1 / ${Math.min(turns.length + 2, 5)}`} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10}>
          <Button color="primary" variant="outlined" onClick={handleBack}>BACK</Button>
          <Button color="primary" variant="contained" onClick={handlePlay}>PLAY!</Button>
        </Box>
      </Box>
    </Box>
  );
}