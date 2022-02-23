import { Platform, Dimensions } from 'react-native';

const window = Dimensions.get( 'window' );
const screen = Dimensions.get( 'screen' );

const iphone = Platform.OS === 'ios';
const android = Platform.OS === 'android';

const isSmallScreen = screen.width <= 320;

// console.log(Platform.OS, screen)
// console.log('small screen', Platform.OS, isSmallScreen)

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    lightGray: '#eaeaea',
    mainBackground: '#236D84',
    secondaryBackground: '#E9D6DB',
    navColor: '#152732',
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
  input: {
    width: 300,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  inputContainer: {
    borderColor: 'eee',
    borderWidth: 1,
    // height: 70,
  },
  home: {
    padding: isSmallScreen ? 30 : 15,
  },
  mainPadding: {
    // padding: isSmallScreen ? 20 : 15
    padding: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row'
  },
  userQuickInfo: {
    flexDirection: 'row',
    marginBottom: 5,
    borderRadius: 25
  },
  avatar: {
    width: 50,
    height: 50,
  },
  cardImage: {
    width: '100%',
    height: isSmallScreen ? 200 : 250,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  }
};

export default theme;
