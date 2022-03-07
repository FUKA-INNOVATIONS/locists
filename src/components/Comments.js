import theme from '../theme'
import NoComments from './NoComments'
import Comment from './Comment'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import useComment from '../hooks/useComment'
import Loading from './Loading'
import { useEffect, useState } from 'react'
import PostComment from './PostComment'
import AddComment from '../../assets/icons/AddComment.svg'
import { sortLatest } from '../utils/sortFilterHelpers'
import PropTypes from 'prop-types'

const Comments = ( { fileId } ) => {
  const [ loading, setLoading ] = useState()
  const { getMediaComments } = useComment()
  const [ mediaComments, setMediaComments ] = useState( [] )
  const [ updateView, setUpdateView ] = useState( false )
  const [ isWriteComment, setIsWriteComment ] = useState( false )

  const onWriteCommentHandler = () => {
    // console.log( 'onWriteCommentHandler' )
    setIsWriteComment( !isWriteComment )
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

      <TouchableOpacity style={ { alignItems: 'center' } }
                        onPress={ onWriteCommentHandler }>
        <AddComment width={ 32 } height={ 32 } />
      </TouchableOpacity>
      <View>
        <Text style={ {
          color: '#8d8082',
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold',
        } }>Comments ({ mediaComments.length })</Text>
      </View>
      <View style={ { alignItems: 'center' } }>
        { isWriteComment &&
        <PostComment file_id={ fileId } display={ setIsWriteComment }
                     updateComments={ updateComments }
        /> }
      </View>
      <FlatList
        style={ [ theme.singleMediaComments ] }
        data={ mediaComments }
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