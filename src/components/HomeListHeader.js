import { View } from 'react-native'
import theme from '../theme'
import DropDownPicker from 'react-native-dropdown-picker'
import { useState, useEffect } from 'react'
import { initCities } from '../utils/sortFilterHelpers'

const HomeListHeader = ( { media, filterCityHandler, navigation, loading } ) => {
  console.log('HomeListHeader.js')
  const [ cityFilterOpen, setCityFilterOpen ] = useState( false )
  const [ cityFilterValue, setCityFilterValue ] = useState( 'all' )
  const [ cityItems, setCityItems ] = useState( [] )


  // console.log('loading in home list header', loading)
  // console.log('media length in home list header', media.length)
  // console.log('loading in home list header', loading)

  useEffect( () => {
    initCities( media, setCityItems )
  }, [] )

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      initCities( media, setCityItems )
    } )
  }, [] )

  return (
    <View style={ {
      backgroundColor: theme.colors.backgroundColor,
      justifyContent: 'center',
      padding: 0,

    } }>
      {
        <DropDownPicker
          open={ cityFilterOpen }
          value={ cityFilterValue }
          items={ cityItems }
          setOpen={ setCityFilterOpen }
          setValue={ setCityFilterValue }
          setItems={ setCityItems }
          // onPress={ ( open ) => setSortOpen( false ) }
          onSelectItem={ ( item ) => filterCityHandler( item.value ) }
          listMode={ 'SCROLLVIEW' }
          theme={ 'LIGHT' }
          searchable={ true }
          // mode="BADGE"
          searchTextInputProps={ {
            maxLength: 25,
          } }
          addCustomItem={ true }
          searchPlaceholder='Search location'
          searchContainerStyle={ {
            borderBottomColor: '#dfdfdf',
          } }
          searchTextInputStyle={ {
            height: 35,
          } }
        />
      }
    </View>
  )
}

export default HomeListHeader