import { View } from 'react-native'
import { useEffect, useState } from 'react'
import SwitchSelector from 'react-native-switch-selector'
import theme from '../theme'

import PostsList from '../components/PostsList'
import EventsList from '../components/EventsList'
import useMedia from '../hooks/useMedia'
import Loading from '../components/Loading'

const Explore = ( { navigation } ) => {
  console.log( 'Explore.js' )
  // const [ loading, setLoading ] = useState( false )
  const { getPostsWithThumbnails, getEventsWithThumbnails } = useMedia()
  const [ activeItems, setActiveItems ] = useState( [] )
  const [ explore, setExplore ] = useState( 'events' )
  const exploreOptions = [
    {
      label: 'Events',
      value: { explore: 'events' },
    },
    {
      label: 'Posts',
      value: { explore: 'posts' },
    },
  ]

  useEffect(async () => {
    // console.log('Explore.js useEffect')
    // const events = await getEventsWithThumbnails()  // eslint-disable-line
      // setActiveItems( events )
  }, [])

  const setView = async ( explore ) => {
    setExplore( explore )
    switch ( explore ) {
      case 'posts':
        // setLoading(true)
        const posts = await getPostsWithThumbnails()  // eslint-disable-line
        setActiveItems( posts )
        // setLoading(false)
        break
      case 'events':
        // const events = await getEventsWithThumbnails()  // eslint-disable-line
        // setActiveItems( events )
        break
      default:
        // const defaultItems = await getEventsWithThumbnails()  // eslint-disable-line
        // setActiveItems( defaultItems )
        // break
    }
  }

  // if ( loading ) return <Loading />

  return (
    <View style={ { paddingBottom: 90 } }>
      <SwitchSelector
        backgroundColor={ theme.colors.textPrimary }
        textColor={ theme.colors.white }
        selectedColor={ theme.colors.primary }
        buttonColor={ theme.colors.white }
        borderColor={ theme.colors.primary }
        valuePadding={ 3 }
        hasPadding={ true }
        bold={ true }
        options={ exploreOptions }
        initial={ 0 }
        onPress={ value => setView( value.explore ) }
      />
      { explore === 'events' &&
      <EventsList navigation={ navigation }
                  events={ activeItems }
                  fetchEvents={ getEventsWithThumbnails } /> }
      { explore === 'posts' &&
      <PostsList navigation={ navigation }
                 posts={ activeItems }
                 fetchPosts={ getPostsWithThumbnails } /> }
    </View>
  )
}

export default Explore