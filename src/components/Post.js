import React from 'react'
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

  const hasThumbnails = ( postMedia.thumbnails !== undefined )

  return (
    <>
      {
        !ownProfile
        &&
        <View style={ { marginLeft: 15, marginVertical: 3 } }>
          <UserInfo username={ postMedia.description.owner }
                    timeAdded={postMedia.time_added}
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
              <CommentsCounter fileId={postMedia.file_id} />
              { postMedia.description.isOwner &&
              <DeleteMedia file_id={ postMedia.file_id } /> }
            </View>
          }
        </View>
        <View>
          {
            postMedia.description.hasImage ? <Image
                source={ {uri: hasThumbnails ? (uploadsUrl + postMedia.thumbnails.w320) : (uploadsUrl + postMedia.filename) } }
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

Post.propTypes = {
  postMedia: PropTypes.object,
  ownProfile: PropTypes.bool,
}

export default Post




