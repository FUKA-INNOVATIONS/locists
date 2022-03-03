import { Button, FlatList, Pressable, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import Event from './Event'
import DropDownPicker from 'react-native-dropdown-picker'
import sortLatest from '../utils/sortLatest'
import sortSoonestEvents from '../utils/sortSoonestEvents'
import sortMostCommented from '../utils/sortMostCommented'
import sortMostLikesOrAttendees from '../utils/sortMostLikesOrAttendees'

const EventsList = ( { navigation, events, loading, fetchEvents } ) => {
  // console.log( 'EventsList rendered'); // TODO fix too many renders

  if ( loading || !events ) {
    return (
      <View>
        <Text>
          Loading..
        </Text>
      </View>
    )
  }

  const [activeList, setActiveList] = useState(events)

  const [ sortOpen, setSortOpen ] = useState( false )
  const [ sortValue, setSortValue ] = useState( 'latest' )
  const [ sortItems, setSortItems ] = useState( [
    { label: 'Latest', value: 'latest' },
    { label: 'Most commented', value: 'mostCommented' },
    { label: 'Most attendees', value: 'mostAttendees' },
    { label: 'Upcoming', value: 'soonest' },
  ] )

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'EventsList focus' )
      // await fetchEvents()
    } )
  }, [] )

  const eventPressHandler = ( eventId ) => {
    navigation.navigate( 'SingleEvent', { eventId: eventId } )
  }



  useEffect(() => {
    console.log(sortValue)
    sortHandler(sortValue)
  }, [sortValue])

  const sortHandler = (type) => {
    const latest = sortLatest(activeList)
    const soonest = sortSoonestEvents(activeList)
    const mostCommented = sortMostCommented(activeList)
    const mostAttendees = sortMostLikesOrAttendees(activeList)
    switch ( type ) {
      case 'latest':
        console.log('latest', latest)
        setActiveList(latest)
        break
      case 'soonest':
        // console.log('soonest', soonest)
        setActiveList(soonest)
        break
      case 'mostCommented':
        // console.log('most commented', mostCommented)
        setActiveList(mostCommented)
        break
      case 'mostAttendees':
        // console.log('most attendees', mostAttendees)
        setActiveList(mostAttendees)
        break
    }

  }

  const ListHeader = () => {
    return (
      <DropDownPicker
        open={ sortOpen }
        value={ sortValue }
        items={ sortItems }
        setOpen={ setSortOpen }
        setValue={ setSortValue }
        setItems={ setSortItems }
        // onPress={ ( open ) => console.log( 'Sort picker open?', open ) }
        onSelectItem={ ( item ) => sortHandler(item.value) }
        // onChangeValue={ ( value ) => setSortValue(value) }
      />
    )
  }

  return (
    <FlatList
      ListHeaderComponent={ <ListHeader /> }
      stickyHeaderIndices={ [ 0 ] }
      data={ activeList }
      keyExtractor={ ( item ) => item.file_id }
      renderItem={ ( { item } ) => {
        return (
          <Pressable
            onPress={ () => eventPressHandler( item.file_id ) }>
            <Event eventDetails={ item } />
          </Pressable>
        )
      } }
    />
  )
}

export default EventsList