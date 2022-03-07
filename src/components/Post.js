import { View, Image, Text } from 'react-native'
import { uploadsUrl } from '../../config'
import theme from '../theme'
import Like from './Like'
import DeleteMedia from './DeleteMedia'
import UserInfo from './UserInfo'
import CommentsCounter from './CommentsCounter'


const Post = ( { postMedia, ownProfile } ) => {
  // console.log('Post.js', postMedia)

  return (
    <>
      {
        !ownProfile
        &&
        <View style={ { marginLeft: 15, marginVertical: 3 } }>
          <UserInfo username={ postMedia.description.owner }
                    avatar={ postMedia.description.ownerAvatar } />
        </View>
      }
      <View style={ [ theme.generalListPost2] }>
        <View style={ [ theme.postLeft, !postMedia.description.hasImage && {width: '75%'}] }>
          <Text numberOfLines={ 5 }>{ postMedia.description.description }</Text>
          {
            postMedia.description.hasImage &&
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Like displayIcon={ true } file_id={ postMedia.file_id } />
               <AddComment width={ 30 } height={ 30 }
                          style={ { marginRight: 8 } } />
               { postMedia.description.isOwner &&
              <DeleteMedia file_id={ postMedia.file_id } /> }
            </View>
          }
        </View>
        <View>
          {
            postMedia.description.hasImage ? <Image
                  source={ { uri: uploadsUrl + postMedia.thumbnails.w320 } }
                  style={ theme.postImage }
              />
            :
              <View style={ theme.postRight }>
              <Like single={false} displayIcon={ true } file_id={ postMedia.file_id } />
              <CommentsCounter fileId={postMedia.file_id} />
              { postMedia.description.isOwner &&
              <DeleteMedia file_id={ postMedia.file_id } /> }
            </View>
          }
        </View>
      </View>
    </>
  )
}

export default Post




