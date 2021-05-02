import { createMuiTheme, colors } from '@material-ui/core';
import typography from './typography';

export interface ITheme {
  palette: {
    primary: {
      main: string
    }
  }
}

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#ffffff',
      paper: colors.common.white
    },
    primary: {
      main: '#3498DB',
      contrastText: '#fff'
    },
    secondary: {
      main: '#009844'
    },
    text: {
      primary: '#2b2b2b',
      secondary: '#5e5b5a'
    }
  },
  typography
});

export default theme;
