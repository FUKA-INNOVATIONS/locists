import useMedia from '../hooks/useMedia'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import Comments from '../components/Comments'
import SinglePostHeader from '../components/SinglePostHeader'
import PropTypes from 'prop-types'

const SinglePost = ( { navigation, route } ) => {
  const { postId } = route.params
  const [ loading, setLoading ] = useState()
  const { getMediaById, singleMedia } = useMedia()

  useEffect( async () => {
    setLoading( true )
    await getMediaById( postId ).then( async () => {
    } ).finally( () => setLoading( false ) )
  }, [ postId ] )

  if ( loading ) return <Loading />

  return (
    <>
      <SinglePostHeader postDetails={ singleMedia } />
      <Comments fileId={ postId } />
    </>
  )
}

SinglePost.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
}

export default SinglePost
