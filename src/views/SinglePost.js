import useMedia from '../hooks/useMedia'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import Comments from '../components/Comments'
import SinglePostHeader from '../components/SinglePostHeader'
import PropTypes from 'prop-types'

const SinglePost = ( { navigation, route } ) => {
  const { postId } = route.params
  const [ loading, setLoading ] = useState()
  const { getMediaById, singleMedia } = useMedia()
  const [ isHeaderVisible, setIsHeaderVisible ] = useState( true )

  useEffect( async () => {
    setLoading( true )
    await getMediaById( postId ).then( async () => {
    } ).finally( () => setLoading( false ) )
  }, [ postId ] )

  const displayHeaderHandler = () => { // Helper (workaround) to fix comment and keyboard  issue, ILE i fixed it this way =D
    setIsHeaderVisible(!isHeaderVisible)
  }

  if ( loading ) return <Loading text={'Loading post details'} />

  return (
    <>
      {isHeaderVisible && <SinglePostHeader postDetails={singleMedia}/> }
      <Comments fileId={ postId } displayHeader={displayHeaderHandler} />
    </>
  )
}

SinglePost.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
}

export default SinglePost