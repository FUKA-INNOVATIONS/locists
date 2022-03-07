import { Text, View } from 'react-native'
import AddComment from '../../assets/icons/AddComment.svg'
import useComment from '../hooks/useComment'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const CommentsCounter = ( { fileId } ) => {
  const { getMediaComments } = useComment()
  const [ commentsCount, setCommentsCount ] = useState( 0 )

  useEffect( async () => {
    await getMediaComments( fileId, true ).
      then( commentsCount => setCommentsCount( commentsCount ) )
  }, [] )

  return (
    <View style={ { flexDirection: 'row', alignItems: 'center' } }>
      <Text>{ commentsCount }</Text>
      <AddComment width={ 30 } height={ 30 }
                  style={ { marginRight: 8, marginLeft: 10 } } />
    </View>
  )
}

CommentsCounter.propTypes = {
  fileId: PropTypes.number
}

export default CommentsCounter