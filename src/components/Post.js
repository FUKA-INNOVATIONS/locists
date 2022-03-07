import { View, Image, Text } from 'react-native'
import { uploadsUrl } from '../../config'
import theme from '../theme'
import Like from './Like'
import DeleteMedia from './DeleteMedia'
import UserInfo from './UserInfo'
import CommentsCounter from './CommentsCounter'
import PropTypes from 'prop-types'

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


      <View style={ [ theme.generalListPost, theme.post ] }>
        {
          postMedia.description.hasImage && <Image
            source={ { uri: uploadsUrl + postMedia.thumbnails.w320 } }
            style={ theme.postImage }
          />
        }
        <View style={ theme.postInfo }>
          <View style={ theme.postText }>
            <Text>{ postMedia.description.description }</Text>
          </View>

          <View style={ theme.postExtra }>
            <Like displayIcon={ true } file_id={ postMedia.file_id }
            />
            <CommentsCounter fileId={ postMedia.file_id } />
            { postMedia.description.isOwner &&
            <DeleteMedia file_id={ postMedia.file_id } /> }
          </View>
        </View>
      </View>
    </>
  )
}

Post.propTypes = {
  postMedia: PropTypes.object,
  ownProfile: PropTypes.bool,
}

export default Post




