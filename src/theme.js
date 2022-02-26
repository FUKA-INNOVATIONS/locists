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
    marginBottom: 10,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    borderTopLeftRadius: 0,
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
    marginBottom: 10,
    marginHorizontal: 10,
    flex: 1,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 11,
    backgroundColor: '#E9D6DB',
  },
  postImage: {
    width: width-20,
    height: undefined,
    aspectRatio: 1.4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  postInfo: {
    paddingLeft: 5,
    flex: 1,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  postText: {
    marginVertical: 5,
    width: '80%',
  },
  postExtra: {
    paddingTop: 5,
    paddingRight: 5,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  // Single Event Styles
  singleEventInfo: {
    marginHorizontal: 0,
    backgroundColor: '#E9D6DB',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    marginTop: 0,
    padding: 5,
  },
  singlePostComments: {
     marginTop: 5,
    borderWidth: 2,
    alignSelf: 'center',
    minHeight: 260,
    paddingVertical: 5,
    width: width * 0.95,
    position: 'relative',
  },
  postComment: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 5,
    width: width * 0.9,
    minHeight: 60,
    borderWidth: 1,
  },
  commentAvatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },

  // Single Post Styles
  singlePost: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  singlePostOwner: {
    alignSelf: 'flex-start'
  },
  imageAndLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  singlePostImage: {
    alignSelf: 'flex-start',
    width: width * 0.8,
    height: undefined,
    aspectRatio: 1.4,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  singlePostLikes: {
    alignSelf: 'center',
    fontSize: 20,
  },
  singlePostText: {
    width: width * 0.94,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
    backgroundColor: '#E9D6DB',
  },

  addComment: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },

}

export default theme
