import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { cyan } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: { main: cyan[500] },
  },
});
