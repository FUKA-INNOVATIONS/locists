import theme from '../theme'
import NoComments from './NoComments'
import Comment from './Comment'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import useComment from '../hooks/useComment'
import Loading from './Loading'
import React, { useEffect, useState } from 'react'
import PostComment from './PostComment'
import AddComment from '../../assets/icons/AddComment.svg'
import { sortLatest } from '../utils/sortFilterHelpers'
import PropTypes from 'prop-types'
import useAuthStorage from '../hooks/useAuthStorage'

const Comments = ( { fileId } ) => {
  const {user} = useAuthStorage()
  const [ loading, setLoading ] = useState()
  const { getMediaComments } = useComment()
  const [ mediaComments, setMediaComments ] = useState( [] )
  const [ updateView, setUpdateView ] = useState( false )
  const [ isWriteComment, setIsWriteComment ] = useState( false )

  const onWriteCommentHandler = () => {
    const isLogged = user.isLogged
    if (!isLogged) {
      Alert.alert('Login to comment!')
    } else {
      setIsWriteComment( !isWriteComment )
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

  sortLatest( mediaComments )

  return (
    <>

      <TouchableOpacity
        style={ { justifyContent: 'center', flexDirection: 'row' } }
        onPress={ onWriteCommentHandler }>
        <Text style={ {
          color: '#8d8082',
          fontSize: 15,
          textAlign: 'center',
          fontWeight: 'bold',
        } }>Comments ({ mediaComments.length })</Text>
        <AddComment width={ 32 } height={ 32 } />
      </TouchableOpacity>

      <View style={ { alignItems: 'center' } }>
        { isWriteComment &&
        <PostComment file_id={ fileId } display={ setIsWriteComment }
                     updateComments={ updateComments }
        /> }
      </View>
      <FlatList
        horizontal={false}
        style={ [ theme.singleMediaComments ] }
        data={ mediaComments }
        // ListFooterComponent={({ item }) => <NoComments />}
        ListEmptyComponent={ <NoComments
          openCommentBox={ onWriteCommentHandler } isWriteComment /> }
        keyExtractor={ ( item ) => item.comment_id }
        renderItem={ ( { item } ) => <Comment commentObj={ item }
                                              updateComments={ updateComments } /> }
      />
    </>
  )
}

Comments.propTypes = {
  fileId: PropTypes.number,
}

export default Comments