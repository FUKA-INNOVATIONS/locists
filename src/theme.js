import { Platform, Dimensions } from 'react-native'
// Add Dimensions
// Testing the pipeline

const {width} = Dimensions.get('screen');

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
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
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

  mediaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  // Event List Styles
  event: {
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#E9D6DB',
  },
  eventInfo: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 5,
  },
  eventAttend: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 0,
    width: width/3,
  },
  eventImage: {
    width: 135,
    height: 135,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  // Post List Styles
  post: {
    marginHorizontal: 10,
    flex: 1,
    alignSelf: 'center',
  },
  postImage: {
    width: width-20,
  }

}

export default theme
