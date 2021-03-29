import React, {useMemo} from 'react';
import {ERetryOptions, IGameResult} from "./types";
import {Box, Button, Typography} from "@material-ui/core";

export interface IWinnerScreenProps {
  result: IGameResult;
  onRetry: (retry: ERetryOptions) => void;
}

export const WinnerScreen: React.FC<IWinnerScreenProps> = ({ result, onRetry }) => {
  const playersSortedByScore = useMemo(() => [...result.players.ids].sort((a, b) => result.score[b] - result.score[a]), [result]);
  const winners = useMemo(() => {
    const highest = result.score[playersSortedByScore[0]];
    const nextScoreStart = playersSortedByScore.findIndex(id => result.score[id] < highest);
    return playersSortedByScore.slice(0, nextScoreStart >= 0 ? nextScoreStart : playersSortedByScore.length);
  }, [result, playersSortedByScore]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow={1}>
      <Typography variant="h1">Congratulations!</Typography>
      <Box
        display="grid"
        gridTemplateColumns="auto 1fr auto"
        gridColumnGap={16}
        gridRowGap={16}
        width={600}
        p={4}
        mt={4}
        borderRadius={8}
        border="1px solid black"
      >
        {playersSortedByScore.map(id => (
          <React.Fragment key={id}>
            <Box bgcolor={result.players.colors[id]} width={50} height={50} mr={2} />
            <Box alignSelf="center">
              <Typography>{`${result.players.names[id]} ${winners.includes(id) ? '(WIN)' : ''}`}</Typography>
            </Box>
            <Box alignSelf="center">
              <Typography>{result.score[id]}</Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={16} width={600} mt={4}>
        <Button color="primary" variant="outlined" onClick={() => onRetry(ERetryOptions.WIZARD)}>NEW GAME</Button>
        <Button color="primary" variant="contained" onClick={() => onRetry(ERetryOptions.ARENA)}>PLAY AGAIN</Button>
      </Box>
    </Box>
  );
};
