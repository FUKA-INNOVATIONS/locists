import { Image, Text, View, TouchableOpacity } from 'react-native'
import { uploadsUrl } from '../../config'
import { useState } from 'react'
import theme from '../theme'
import PostComment from './PostComment'
import Like from './Like'
import AddComment from '../../assets/icons/AddComment.svg'
import UserInfo from './UserInfo'
import Loading from './Loading'

const SinglePostHeader = ( { postDetails, setUpdateSinglePostView } ) => {
  console.log( 'singlePost' )
  if ( postDetails === undefined ) return <View><Text>Loading..</Text></View>
  const [ isWriteComment, setIsWriteComment ] = useState( false )

  if ( !postDetails ) return <Loading />

  const onWriteCommentHandler = () => {
    console.log( 'onWriteCommentHandler' )
    setIsWriteComment( !isWriteComment )
  }

  return (
    <View style={ theme.singlePost }>
      <View style={ theme.singleMediaAvatar }>
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
                <TouchableOpacity onPress={ onWriteCommentHandler }>
                  <AddComment width={ 32 } height={ 32 } />
                </TouchableOpacity>
              </View>
            </View>
            <View style={ { ...theme.singlePostText } }>
              <Text style={ { padding: 5 } }>{ postDetails.description.description }</Text>
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
              <TouchableOpacity onPress={ onWriteCommentHandler }>
                <AddComment width={ 32 } height={ 32 } />
              </TouchableOpacity>
            </View>
          </View>
      }
      <View style={ { alignItems: 'center' } }>
      { isWriteComment && <PostComment file_id={ postDetails.file_id }
                                       display={ setIsWriteComment } setUpdateSinglePostView={setUpdateSinglePostView} type={'post'}/> }
    </View>
    </View>
  )
}

export default SinglePostHeader
