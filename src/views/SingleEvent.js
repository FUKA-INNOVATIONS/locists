import useMedia from '../hooks/useMedia'
import { useEffect, useState } from 'react'
import SingleEventHeader from '../components/SingleEventHeader'
import Loading from '../components/Loading'
import Comments from '../components/Comments'

const SingleEvent = ( { navigation, route } ) => {
  const { eventId } = route.params
  const [ loading, setLoading ] = useState()
  const { getMediaById, singleMedia } = useMedia()

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

export default SingleEvent
