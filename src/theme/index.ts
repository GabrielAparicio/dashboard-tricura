import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    critical: {
      main: '#FF0000',
      transparent: '#FF00001A',
    },
    high: {
      main: '#FF0000',
      transparent: '#FF00001A',
    },
    medium: {
      main: '#FFA500',
      transparent: '#FFA5001A',
    },
    low: {
      main: '#106810',
      transparent: '#00FF001A',
    },
    filter: {
      main: '#0a62e7',
      transparent: '#0a62e71A',
    },
    selected: '#e3f2fd',
    hovered: '#F5F7FA',
  },
});

export default theme;
