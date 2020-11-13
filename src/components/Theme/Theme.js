import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      //blueish colors
      light: '#8A9FFE',
      main: '#5B79FE',
      dark: '#4466FE',
      contrastText: '#fff',
    },
    secondary: {
      // orangeish colors
      light: '#FEAE53',
      main: '#FEA136',
      dark: '#FE9319',
      contrastText: '#000',
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      //blueish colors
      light: '#8A9FFE',
      main: '#5B79FE',
      dark: '#4466FE',
      contrastText: '#fff',
    },
    secondary: {
      // orangeish colors
      light: '#FEAE53',
      main: '#FEA136',
      dark: '#FE9319',
      contrastText: '#000',
    },
  },
});