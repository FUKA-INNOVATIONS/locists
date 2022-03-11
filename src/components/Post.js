import React from 'react'
import { View, Image, Text } from 'react-native'
import { uploadsUrl } from '../../config'
import theme from '../theme'
import Like from './Like'
import DeleteMedia from './DeleteMedia'
import UserInfo from './UserInfo'
import CommentsCounter from './CommentsCounter'
import PropTypes from 'prop-types'

const Post = ( { postMedia, ownProfile } ) => { // Displays event card on HomeList, PostsList, Account List
  // console.log( 'Post.js', ownProfile )

  const hasThumbnails = ( postMedia.thumbnails !== undefined )

  return (
    <>
        <View
          style={ {
            marginLeft: 10,
            marginVertical: 3,
            flexDirection: 'row',
            position: 'relative',
          } }>
          <UserInfo username={ postMedia.description.owner }
                    timeAdded={ postMedia.time_added }
                    avatar={ postMedia.description.ownerAvatar } />

          <View style={ { right: 0, position: 'absolute', alignSelf: 'center', opacity: 0.5 } }>
            { ( postMedia.description.isOwner || ownProfile ) &&
            <DeleteMedia file_id={ postMedia.file_id } /> }
          </View>

        </View>
      <View style={ [ theme.generalListPost2] }>
        <View style={ [ theme.postLeft, !postMedia.description.hasImage && {width: '75%'}] }>
          <Text numberOfLines={ 5 }>{ postMedia.description.description }</Text>
          {
            postMedia.description.hasImage &&
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Like displayIcon={ true } file_id={ postMedia.file_id } />
              <CommentsCounter fileId={postMedia.file_id} />
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




