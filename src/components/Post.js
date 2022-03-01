import { View, Image, Text } from 'react-native';
import { uploadsUrl } from '../../config';
import theme from '../theme';
import { AntDesign } from '@expo/vector-icons';
import Like from './Like';
import DeleteMedia from './DeleteMedia';
import UserInfo from './UserInfo';

const Post = ( { postMedia, ownProfile } ) => {

  return (
      <>
          {
              !ownProfile
              &&
              <View style={ { marginLeft: 15, marginVertical: 10 } }>
                  <UserInfo username={ postMedia.description.owner }
                            avatar={ postMedia.description.ownerAvatar }/>

              </View>
          }


        <View style={ [ theme.generalListPost, theme.post ] }>
          {
            // TODO check if post has image, display post without image if not present
          }
          { postMedia.filename &&
          <Image
              source={ { uri: uploadsUrl + postMedia.filename } }
              style={ theme.postImage }
          />
          }

          <View style={ theme.postInfo }>
            <View style={ theme.postText }>
              <Text>{ postMedia.description.description }</Text>
            </View>

            <View style={ theme.postExtra }>
              <Text style={ { marginBottom: 10 } }>
                0
                <AntDesign name="like2" size={ 24 } color="black"/>
                <Like displayIcon={ false } file_id={ postMedia.file_id }/>
              </Text>

              <Text>
                0
                <AntDesign name="message1" size={ 24 } color="black"/>
              </Text>
              { postMedia.description.isOwner &&
              <DeleteMedia file_id={ postMedia.file_id }/> }
            </View>
          </View>
        </View>
      </>
      /* <View style={styles.info}>
       <View style={styles.allText}>
       <View style={styles.rates}>
       <Text>likes: {postMedia.likes}</Text>
       <Text>comments: {postMedia.comments}</Text>
       </View>
       </View>
       </View> */
  );
};

export default Post;




