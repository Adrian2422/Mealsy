import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
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
    action: {
      hover: 'rgba(0, 0, 0, 0.54)',
      hoverOpacity: 0.08,
      selected: 'rgba(0, 0, 0, 0.54)',
      selectedOpacity: 0.08,
    },
    textColor: {
      contrast: '#000',
    }
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    // primary: {
    //   //blueish colors
    //   light: '#6F6F7E',
    //   main: '#35364A',
    //   dark: '#181930',
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   // orangeish colors
    //   light: '#FF8460',
    //   main: '#FF5320',
    //   dark: '#FF3A00',
    //   contrastText: '#000',
    // },
    // action: {
    //   hover: 'rgba(0, 0, 0, 0.54)',
    //   hoverOpacity: 0.08,
    //   selected: 'rgba(0, 0, 0, 0.54)',
    //   selectedOpacity: 0.08,
    // },
    textColor: {
      contrast: '#fafafa',
    }
  },
});