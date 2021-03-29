import { createMuiTheme, fade } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        minWidth: '56px',
      },
    },
  },
  custom: {
    boardCellBorder: '1px solid black',
    boardCellEmptyBgColor: 'white',
    boardCardSelectedBgColor: fade('#A5ADB8', 0.1),
  },
});
