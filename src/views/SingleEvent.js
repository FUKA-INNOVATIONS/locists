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
  const [ isHeaderVisible, setIsHeaderVisible ] = useState( true )

  // console.log('singleMedia',singleMedia)

  const displayHeaderHandler = () => { // Helper (workaround) to fix comment and keyboard  issue
    setIsHeaderVisible(!isHeaderVisible)
  }

  useEffect( async () => {
    setLoading( true )
    await getMediaById( eventId ).then( async () => {
    } ).finally( () => setLoading( false ) )
  }, [ eventId ] )

  if ( loading ) return <Loading text={ 'Loading event details' } />

  return (
    <>
      {isHeaderVisible && <SingleEventHeader eventDetails={ singleMedia } /> }
      <Comments fileId={ eventId } displayHeader={displayHeaderHandler} />
    </>
  )
}

SingleEvent.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
}

export default SingleEvent
