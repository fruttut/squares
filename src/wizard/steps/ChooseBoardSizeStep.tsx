import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { BoardCard } from './BoardCard';
import { AVAILABLE_BOARD_DIMENSIONS } from '../../constants';
import { useWizard } from '../WizardContext';
import { EWizardActionTypes } from '../actions';

export const ChooseBoardSizeStep: React.FC = () => {
  const [{ dim }, dispatch] = useWizard();

  const handleBoardCardClick = useCallback((dim: number) => {
    dispatch({
      type: EWizardActionTypes.SET_BOARD_DIMENSION,
      dim,
    });
    dispatch({
      type: EWizardActionTypes.GO_TO_NEXT_STEP,
    });
  }, []);

  return (
    <Box display="grid" flexGrow={1} gridTemplateColumns="repeat(3, 1fr)">
      {AVAILABLE_BOARD_DIMENSIONS.map((availableDim) => (
        <Box
          key={availableDim}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <BoardCard
            dim={availableDim}
            selected={dim === availableDim}
            onClick={handleBoardCardClick}
          />
        </Box>
      ))}
    </Box>
  );
};
