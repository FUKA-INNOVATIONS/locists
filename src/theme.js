import { Platform, Dimensions, StatusBar } from 'react-native'

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

const general = {
  colors: {
    btn: '#7b08a3',
    btnFill: '#ffffff',
    background: '#24292e',
    txtLight: '#ffffff',
    txtDark: '#000000',
    txtError: '#d52d2d',
    postBackground: '#E9D6DB'
  },
}

const theme = {
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: '#24292e',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    lightGray: '#eaeaea',
    primary: 'purple',
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
    borderRadius: 10,
    borderWidth: 1,
  },
  inputContainer: {
    borderRadius: 10,
    marginVertical: 10,
    borderColor: 'eee',
    // height: 70,
  },
  inputErrorText: {
    color: general.colors.txtError,
    fontSize: 14,
    alignSelf: 'center',
  },

  mediaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  // General Component Styles
  generalBtn: {
    alignItems: 'center',
    borderColor: general.colors.btn,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    backgroundColor: '#fff',
  },
  generalListPost: {
    marginBottom: 10,
    marginHorizontal: 10,
    flex: 1,
    borderWidth: 1,
    backgroundColor: general.colors.postBackground,
  },
  singleMediaComments: {
    marginTop: 5,
    borderWidth: 3,
    alignSelf: 'center',
    minHeight: 260,
    paddingVertical: 5,
    width: width * 0.95,
    position: 'relative',
  },
  comment: {
    backgroundColor: general.colors.postBackground,
    padding: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentInfo: {
    flexDirection: 'row',
  },
  commentExtra: {

  },
  commentUser: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },

  // In List Post Styles
  post: {
    alignSelf: 'center',
    borderRadius: 11,
  },
  postImage: {
    width: width * 0.94,
    height: undefined,
    aspectRatio: 1.4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  postInfo: {
    width: width * 0.94,
    paddingLeft: 5,
    flex: 1,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  postText: {
    marginVertical: 5,
    width: '75%',
  },
  postExtra: {
    paddingTop: 5,
    paddingRight: 5,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  postLikes: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  singlePostLikes: {
    marginLeft: 10,
    marginBottom: 5,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },

  // Event List Styles
  event: {
    flexDirection: 'row',
    borderRadius: 12,
    borderTopLeftRadius: 0,
  },
  eventInfo: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 5,
  },
  eventAttend: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 3,
    alignItems: 'center',
    width: width/3,
  },
  eventImage: {
    width: 135,
    height: 135,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  // Single Event Styles
  singleEventInfo: {
    backgroundColor: general.colors.postBackground,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  postComment: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#E9D6DB',
    paddingTop: 5,
    borderRadius: 5,
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
    alignSelf: 'flex-start',
    color: general.colors.txtLight
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

  // Authentication Screen Styles
  login: {
    height: height * 0.7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    backgroundColor: '#fff',
    borderColor: 'purple',
    borderWidth: 1,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
  },
  register: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    paddingBottom: 180,
  },

  // Create Media Styles
  addImage: {
    alignSelf: 'center',
    width: width * 0.8,
    aspectRatio: 1.4,
  },
  createMediaButton: {
    alignSelf: 'center',
    width: width * 0.8,
    marginTop: 5,
  },

  createMediaForm: {
    paddingBottom: 100,
    alignItems: 'center',
  },

  // Create Page Styles
  createPage: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtn: {
    marginVertical: 30,
    width: width * 0.5,
    marginRight: 10,
  },
  infoBox: {
    width: width * 0.7,
    alignItems: 'center',
    paddingTop: 20,
  },
  infoText: {
    fontSize: 16,
  },

  // Profile Styles
  profile: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 70,
  },
  profilePicAndInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    marginBottom: 20,
  },
  profilePic: {
    width: width * 0.3,
    aspectRatio: 0.8,
    borderWidth: 1,
    borderColor: 'white'
  },
  profileInfoCard: {
    width: width * 0.55,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#E9D6DB',
    justifyContent: 'space-between',
  },
}

export default theme;
