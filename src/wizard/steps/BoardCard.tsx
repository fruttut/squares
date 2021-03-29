import React, { useCallback, useMemo } from 'react';
import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { BoardCell } from '../../shared/BoardCell';

export interface IBoardCardProps {
  dim: number;
  selected?: boolean;
  onClick?: (dim: number) => void;
}

const useStyles = makeStyles<Theme, { selected?: boolean }>((theme) => ({
  card: ({ selected }) => ({
    borderRadius: 16,
    backgroundColor: selected
      ? theme.custom.boardCardSelectedBgColor
      : undefined,
    '&:hover': {
      backgroundColor: theme.custom.boardCardSelectedBgColor,
      cursor: 'pointer',
    },
  }),
  board: {
    width: 200,
    height: 200,
  },
}));

export const BoardCard: React.FC<IBoardCardProps> = ({
  dim,
  selected,
  onClick,
}) => {
  const classes = useStyles({ selected });
  const handleClick = useCallback(() => {
    if (!!onClick) {
      onClick(dim);
    }
  }, [dim, onClick]);
  const cells = useMemo(() => {
    const acc: JSX.Element[] = [];
    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        acc.push(
          <BoardCell
            key={`${i}_${j}`}
            lastRow={i === dim - 1}
            lastCol={j === dim - 1}
          />
        );
      }
    }
    return acc;
  }, [dim]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={4}
      className={classes.card}
      onClick={handleClick}
    >
      <Typography align="center">
        {dim} x {dim}
      </Typography>
      <Box display="flex" className={classes.board}>
        <Box
          display="grid"
          flexGrow={1}
          gridTemplateRows={`repeat(${dim}, 1fr)`}
          gridTemplateColumns={`repeat(${dim}, 1fr)`}
        >
          {cells}
        </Box>
      </Box>
    </Box>
  );
};
