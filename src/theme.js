import { Platform } from 'react-native';
// Add Dimensions

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    lightGray: '#eaeaea',
    primary: '#0366d6',
    white: 'white',
    mainBackground: '#e1e4e8',
    error: '#d73a4a',
  },
  appBar: {
    backgroundColor: '#24292e',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select( {
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    } ),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;