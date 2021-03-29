import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import React, {useCallback, useRef} from "react";
import {AVAILABLE_PLAYER_COLORS, PLAYERS_MAX_NUMBER, PLAYERS_MIN_NUMBER} from "../../constants";
import {Add, Remove} from "@material-ui/icons";
import {useWizard} from "../WizardContext";
import {EWizardActionTypes} from "../actions";
import {createPlayer} from "../state";

const renderMenuItemColorValue: (color: unknown) => JSX.Element = (color) => {
  const colorStr = color as string;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" flexGrow={1}>
      <Typography>{colorStr}</Typography>
      <Box bgcolor={colorStr} width={20} height={20} />
    </Box>
  );
};

export const AddPlayersStep: React.FC = () => {
  const [{ players }, dispatch] = useWizard();
  const nextPlayerId = useRef(PLAYERS_MIN_NUMBER + 1);

  const canAddPlayer = players.ids.length < PLAYERS_MAX_NUMBER;
  const canRemovePlayer = players.ids.length > PLAYERS_MIN_NUMBER;

  const isColorTaken = (color: string) => {
    return players.ids.some(id => players.colors[id] === color);
  };

  const isColorDisabledForPlayer = (id: string, color: string) => {
    return players.colors[id] !== color && isColorTaken(color);
  };

  const areAllPlayerNamesFilled = players.ids.every(id => players.names[id].trim().length > 0);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    event.persist();
    const name = event.target.value;
    dispatch({
      type: EWizardActionTypes.SET_PLAYER_NAME,
      id,
      name,
    });
  };

  const handleColorChange = (color: string, id: string) => {
    dispatch({
      type: EWizardActionTypes.SET_PLAYER_COLOR,
      id,
      color,
    });
  };

  const handleAddPlayer = () => {
    const firstFreeColor = AVAILABLE_PLAYER_COLORS.find(color => !isColorTaken(color));
    const player = createPlayer(nextPlayerId.current++, firstFreeColor!);
    dispatch({
      type: EWizardActionTypes.ADD_PLAYER,
      player,
    });
  };

  const handleRemovePlayer = useCallback((id: string) => {
    dispatch({
      type: EWizardActionTypes.REMOVE_PLAYER,
      id,
    });
  }, []);

  const handleBack = useCallback(() => {
    dispatch({
      type: EWizardActionTypes.GO_TO_PREVIOUS_STEP,
    });
  }, []);

  const handleNext = useCallback(() => {
    dispatch({
      type: EWizardActionTypes.GO_TO_NEXT_STEP,
    });
  }, []);

  return (
    <Box display="flex" flexGrow={1} justifyContent="center" alignItems="center">
      <Box
        width={500}
        display="grid"
        gridTemplateColumns="auto auto 56px"
        gridTemplateRows={`repeat(${players.ids.length}, 56px) ${canAddPlayer ? 'auto' : ''} auto`}
        gridColumnGap={16}
        gridRowGap={16}
      >
        {players.ids.map(id => (
          <React.Fragment key={id}>
            <TextField color="primary" variant="outlined" label="Name" value={players.names[id]} onChange={(event) => handleNameChange(event, id)} />
            <FormControl>
              <InputLabel id={`color-select-${id}`} variant="outlined">Color</InputLabel>
              <Select
                color="primary"
                variant="outlined"
                labelId={`color-select-${id}`}
                label="Color"
                value={players.colors[id]}
                renderValue={renderMenuItemColorValue}
                onChange={(event) => handleColorChange(event.target.value as string, id)}
              >
                {AVAILABLE_PLAYER_COLORS.map(color => (
                  <MenuItem key={color} value={color} disabled={isColorDisabledForPlayer(id, color)}>
                    {renderMenuItemColorValue(color)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {canRemovePlayer ? (
              <Button color="primary" variant="outlined" onClick={() => handleRemovePlayer(id)}>
                <Remove />
              </Button>
            ) : <Box />}
          </React.Fragment>
        ))}
        {canAddPlayer && (
          <Box gridColumn={`1 / ${canRemovePlayer ? 4 : 3}`}>
            <Button color="primary" variant="outlined" fullWidth onClick={handleAddPlayer}>
              <Add />
            </Button>
          </Box>
        )}
        <Box gridColumn={`1 / ${canRemovePlayer ? 4 : 3}`} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10}>
          <Button color="primary" variant="outlined" onClick={handleBack}>BACK</Button>
          <Button color="primary" variant="contained" disabled={!areAllPlayerNamesFilled} onClick={handleNext}>NEXT</Button>
        </Box>
      </Box>
    </Box>
  );
}