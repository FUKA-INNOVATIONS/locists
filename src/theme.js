import { Platform, Dimensions, StatusBar } from 'react-native'

const { width } = Dimensions.get( 'screen' )
const { height } = Dimensions.get( 'screen' )

const general = {
  colors: {
    btn: '#7b08a3',
    btnFill: '#ffffff',
    background: '#24292e',
    txtLight: '#ffffff',
    txtDark: '#000000',
    txtError: '#c53e3e',
    postBackground: '#E9D6DB',
  },
}

const theme = {
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: '#24292e',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  colors: {
    bgYellow: '#E9D6DB',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    lightGray: '#eaeaea',
    primary: 'purple',
    white: 'white',
    mainBackground: '#e1e4e8',
    error: '#d73a4a',
  },

  authTitle: {
    color: '#E9D6DB',
    fontSize: 20,
   // marginBottom: 10
  },
  inputTitle: {
    color: '#E9D6DB',
    fontSize: 17,
    marginBottom: 10
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
    // width: width * 0.8,
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
  commentContainer: {
    // margin: 20,
    width: '100%'
  },
  commentInput: {
    // width: 400,
    minHeight: 100,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 20,
    padding: 20,
  },
  inputErrorText: {
    color: general.colors.txtError,
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 5
  },

  mediaTitle: {
    // padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },

  // General Component Styles
  appName: {
    position: 'absolute',
    left: 15,
    zIndex: 5,
  },
  generalBtn: {
    alignItems: 'center',
    borderColor: general.colors.btn,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    backgroundColor: '#fff',
  },
  singleMediaAvatar: {
    marginLeft: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  singleMediaComments: {
    /* marginTop: 5,
    borderWidth: 3,
    alignSelf: 'center',
    minHeight: 250,
    paddingVertical: 5,
    width: width * 0.95,
    position: 'relative', */
  },
  comment: {
    backgroundColor: general.colors.postBackground,
    // margin: 10,
    minHeight: 75,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentInfo: {
    flexDirection: 'row',
  },
  attend: {
    alignItems: 'center',
    marginLeft: 5,
  },
  dropdown: {
    borderColor: general.colors.btn,
    borderWidth: 2,
  },
  dropdownMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  dropdownExplore: {
    borderColor: general.colors.btn,
    width: width * 0.45,
    marginHorizontal: 5,
  },
  addCommentButtons: {
    marginTop: 10,
    width: width * 0.85,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  commentUser: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  changePicture: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 20,
  },
  dropDownPicker: {
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 2,
    // borderColor: '#7b08a3',
    width: '45%',
  },

  // In List Post Styles
  post: {
    alignSelf: 'center',
    borderRadius: 11,
  },
  generalListPost: {
    marginBottom: 10,
    marginHorizontal: 10,
    flex: 1,
    borderWidth: 1,
    backgroundColor: general.colors.postBackground,
  },
  generalListPost2: {
    height: 120,
    borderRadius: 11,
    marginBottom: 10,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: general.colors.postBackground,
  },
  postLeft: {
    padding: 5,
    paddingTop: 10,
    paddingLeft: 10,
    height: 120,
    width: '64%',
    justifyContent: 'space-between',
  },
  postRight: {
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  postImage: {
    width: undefined,
    height: 120,
    aspectRatio: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    width: width / 3,
  },
  eventImage: {
    width: 135,
    height: 135,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  generalListEvent: {
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    flex: 1,
    borderWidth: 1,
    backgroundColor: general.colors.postBackground,
  },
  eventListTitle: {
    padding: 10,
    position: 'absolute',
    alignItems: 'center',
    // maxWidth: '85%',
    borderBottomRightRadius: 10,
    // padding: 10,
    // paddingHorizontal: 15,
    zIndex: 1,
    backgroundColor: general.colors.btn
  },
  eventImage2: {
    // width: width * 0.94,
    // height: undefined,
    aspectRatio: 1.4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    position: 'relative',
  },
  eventExtra: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  eventSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Single Event Styles
  singleEventInfo: {
    backgroundColor: general.colors.postBackground,
    // paddingHorizontal: 5,
    // marginHorizontal: 5,
    // marginTop: 5,
    // margin: 10,
    top: -10,
    borderRadius: 10,
    padding: 10
  },
  infoTop: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoBottom: {
    width: width * 0.85,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  attendBtn: {
    width: 120,
    padding: 5,
  },

  // Single Post Styles
  singlePost: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  singlePostOwner: {
    alignSelf: 'flex-start',
    color: general.colors.txtLight,
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
    height: 90,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
    backgroundColor: '#E9D6DB',
  },
  noMedia: {
    width: width * 0.94,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 10,
    paddingBottom: 10,
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
    marginTop: 20,
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
    // marginTop: 70,
    // paddingBottom: 180,
  },

  // Create Media Styles
  addImage: {
    alignSelf: 'center',
    marginTop: 10,
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
    borderColor: 'white',
  },
  profileInfoCard: {
    width: width * 0.55,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#E9D6DB',
    justifyContent: 'space-between',
  },

  // Settings Page Styles
  settingsPage: {
    height: height * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  settingsBtn: {
    marginVertical: 20,
    width: width * 0.6,
  },
  logoutBtn: {
    position: 'absolute',
    bottom: 0,
  },
}

export default theme
