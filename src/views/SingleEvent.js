import useMedia from '../hooks/useMedia'
import React, { useEffect, useState } from 'react'
import SingleEventHeader from '../components/SingleEventHeader'
import Loading from '../components/Loading'
import Comments from '../components/Comments'
import PropTypes from 'prop-types'

const SingleEvent = ( { navigation, route } ) => {
  const { eventId } = route.params
  const [ loading, setLoading ] = useState()
  const { getMediaById, singleMedia } = useMedia()

  useEffect(() => {
    // navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" });
    return () => navigation.getParent()?.setOptions({ tabBarVisible:false });
  }, [navigation])

  useEffect( async () => {
    setLoading( true )
    await getMediaById( eventId ).then( async () => {
    } ).finally( () => setLoading( false ) )
  }, [ eventId ] )

  if ( loading ) return <Loading />

  return (
    <>
      <SingleEventHeader eventDetails={ singleMedia } />
      <Comments fileId={ eventId } />
    </>
  )
}

SingleEvent.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
}

export default SingleEvent
