import React, { useEffect, useMemo } from 'react';
import { useArena } from './ArenaContext';
import { Box, Typography } from '@material-ui/core';
import { Board } from './Board';
import { IGameResult } from '../types';

export interface IArenaProps {
  onEnd?: (result: IGameResult) => void;
}

export const Arena: React.FC<IArenaProps> = ({ onEnd }) => {
  const [{ players, score, turns, currentTurnIndex, hasEnded }] = useArena();
  const currentPlayerId = turns[currentTurnIndex];
  const playerIdsSortedByScore = useMemo(() => {
    return [...players.ids].sort((a, b) => score[b] - score[a]);
  }, [players.ids, score]);

  useEffect(() => {
    if (hasEnded) {
      if (!!onEnd) {
        onEnd({
          players,
          score,
        });
      }
    }
  }, [hasEnded, onEnd]);

  return (
    <Box display="flex" flexGrow={1} justifyContent="center">
      <Box display="flex" flexDirection="column" pt={8} width={600}>
        <Box display="flex" height={600} minHeight={600}>
          <Board />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
          p={4}
        >
          {playerIdsSortedByScore.map((id, index) => (
            <Box
              key={id}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              p={1}
              mt={index === 0 ? 0 : 2}
              borderRadius={8}
              border={`1px solid ${
                currentPlayerId === id ? 'black' : 'transparent'
              }`}
            >
              <Box display="flex" flexDirection="row" alignItems="center">
                <Box
                  width={50}
                  height={50}
                  bgcolor={players.colors[id]}
                  mr={2}
                />
                <Typography>{players.names[id]}</Typography>
              </Box>
              <Typography>{score[id]}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
