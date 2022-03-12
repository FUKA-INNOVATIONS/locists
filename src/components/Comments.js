import theme from '../theme'
import NoComments from './NoComments'
import Comment from './Comment'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import useComment from '../hooks/useComment'
import Loading from './Loading'
import React, { useEffect, useState } from 'react'
import PostComment from './PostComment'
import AddComment from '../../assets/icons/AddComment.svg'
import { sortLatest } from '../utils/sortFilterHelpers'
import PropTypes from 'prop-types'
import useAuthStorage from '../hooks/useAuthStorage'
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view'

const Comments = ( { fileId, displayHeader } ) => {
  const { user } = useAuthStorage()
  const [ loading, setLoading ] = useState()
  const { getMediaComments } = useComment()
  const [ mediaComments, setMediaComments ] = useState( [] )
  const [ updateView, setUpdateView ] = useState( false ) // Helper state to control re-rendering
  const [ isWriteComment, setIsWriteComment ] = useState( false ) // Controlling new comment view visibility

  const onWriteCommentHandler = () => {
    const isLogged = user.isLogged
    if ( !isLogged ) {
      Alert.alert( 'Login to comment!' )
    } else {
      setIsWriteComment( !isWriteComment )
      displayHeader()
    }
  }

  useEffect( async () => {
    setLoading( true )
    await getMediaComments( fileId ).
      then( comments => setMediaComments( comments ) ).
      finally( () => {
        setUpdateView( false )
        setLoading( false )
      } )
    setUpdateView( false )
  }, [ fileId, updateView ] )

  const updateComments = () => setUpdateView( true )

  if ( loading ) return <Loading />

  sortLatest( mediaComments )  // Sort comments, Newest > Oldest

  const CommentsHeader = () => <Text style={ {  // Display comments counter in List header
    color: '#8d8082',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    bottom: -30,
  } }>Comments ({ mediaComments.length })</Text>

  return (
    <View>
      <KeyboardAwareScrollView>
        <TouchableOpacity
          style={ { justifyContent: 'center', flexDirection: 'row' } }
          onPress={ onWriteCommentHandler }>

          <AddComment width={ 32 } height={ 32 } />
        </TouchableOpacity>


        { isWriteComment &&
        <View style={ { alignItems: 'center', minHeight: 250 } }>
          <PostComment file_id={ fileId } display={ setIsWriteComment }
                       updateComments={ updateComments } displayHeader={displayHeader}
          />
        </View> }

      </KeyboardAwareScrollView>
      <KeyboardAwareFlatList
        ListHeaderComponent={ <CommentsHeader /> }
        horizontal={ false }
        style={ [ theme.singleMediaComments ] }
        data={ mediaComments }
        ListEmptyComponent={ <NoComments
          openCommentBox={ onWriteCommentHandler } isWriteComment /> }
        keyExtractor={ ( item ) => item.comment_id }
        renderItem={ ( { item } ) => <Comment commentObj={ item }
                                              updateComments={ updateComments } /> }
      />
    </View>
  )
}

Comments.propTypes = {
  fileId: PropTypes.number,
  displayHeader: PropTypes.func,
}

export default Comments