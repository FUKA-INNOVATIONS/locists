import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { uploadsUrl } from '../../config'
import theme from '../theme'
import PostComment from './PostComment'
import Like from './Like'
import UserInfo from './UserInfo'
import Loading from './Loading'
import PropTypes from 'prop-types'

const SinglePostHeader = ( { postDetails } ) => {
  const [ isWriteComment, setIsWriteComment ] = useState( false )

  if ( !postDetails ) return <Loading />

  return (
    <View style={ theme.singlePost }>
      <View style={ { ...theme.singleMediaAvatar, marginBottom: 5 } }>
        <UserInfo username={ postDetails.description.owner }
                  avatar={ postDetails.description.ownerAvatar } />
      </View>
      {
        postDetails.description.hasImage ?
          <>
            <View style={ theme.imageAndLikes }>
              <Image
                source={ { uri: uploadsUrl + postDetails.thumbnails.w320 } }
                style={ theme.singlePostImage }
              />
              <View style={ { alignItems: 'flex-end' } }>
                <Like displayIcon file_id={ postDetails.file_id }
                      single={ true } />
              </View>
            </View>
            <View style={ { ...theme.singlePostText } }>
              <Text
                style={ { padding: 5 } }>{ postDetails.description.description }</Text>
            </View>
          </>
          :
          <View style={ theme.noMedia }>
            <View style={ [ theme.singlePostText, { width: '85%' } ] }>
              <Text
                style={ { padding: 5 } }>{ postDetails.description.description }</Text>
            </View>
            <View style={ { alignItems: 'flex-end' } }>
              <Like displayIcon file_id={ postDetails.file_id }
                    single={ true } />
            </View>
          </View>
      }
      <View style={ { alignItems: 'center' } }>
        { isWriteComment && <PostComment file_id={ postDetails.file_id }
                                         display={ setIsWriteComment }
        /> }
      </View>
    </View>
  )
}

SinglePostHeader.propTypes = {
  postDetails: PropTypes.object,
}

export default SinglePostHeader
