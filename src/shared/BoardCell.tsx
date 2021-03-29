import React, { useCallback } from 'react';
import { Box, useTheme } from '@material-ui/core';

export interface IBoardCellProps {
  id?: string;
  lastRow?: boolean;
  lastCol?: boolean;
  color?: string | null;
  onClick?: (id: string) => void;
}

export const BoardCell: React.FC<IBoardCellProps> = ({
  id,
  lastRow,
  lastCol,
  color,
  onClick,
}) => {
  const theme = useTheme();
  const border = theme.custom.boardCellBorder;
  const handleClick = useCallback(() => {
    if (!!onClick && !!id) {
      onClick(id);
    }
  }, [id, onClick]);
  return (
    <Box
      borderTop={border}
      borderRight={lastCol ? border : 'transparent'}
      borderBottom={lastRow ? border : 'transparent'}
      borderLeft={border}
      bgcolor={color || theme.custom.boardCellEmptyBgColor}
      onClick={handleClick}
    />
  );
};
