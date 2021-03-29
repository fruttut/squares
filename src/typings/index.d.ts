import '@material-ui/core/styles/createMuiTheme';

interface ICustomOptions {
  boardCellBorder: string;
  boardCellEmptyBgColor: string;
  boardCardSelectedBgColor: string;
}

type IMuiCustomThemeOptions = Partial<ICustomOptions>;
type IMuiCustomTheme = ICustomOptions;

declare module '@material-ui/core/styles/createMuiTheme' {
  export interface Theme {
    custom: IMuiCustomTheme;
  }

  export interface ThemeOptions {
    custom?: IMuiCustomThemeOptions;
  }
}
