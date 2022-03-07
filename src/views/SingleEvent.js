import useMedia from '../hooks/useMedia'
import { useEffect, useState } from 'react'
import SingleEventHeader from '../components/SingleEventHeader'
import Loading from '../components/Loading'
import Comments from '../components/Comments'

const SingleEvent = ( { navigation, route } ) => {
  const { eventId } = route.params
  const [ loading, setLoading ] = useState()
  const { getMediaById, singleMedia } = useMedia()
  // const { getMediaComments } = useComment()
  // const [ mediaComments, setMediaComments ] = useState( [] )
  const [ updateView, setUpdateView ] = useState( false )

  useEffect( async () => {
    setLoading( true )
    await getMediaById( eventId ).then( async () => {
    } ).finally( () => setLoading( false ) )
    setUpdateView( false )
  }, [ eventId, updateView ] )

  if ( loading ) return <Loading />

  return (
    <>
      <SingleEventHeader eventDetails={ singleMedia } type={ 'event' } />
      <Comments fileId={ eventId } />
    </>
  )
}

export default SingleEvent
