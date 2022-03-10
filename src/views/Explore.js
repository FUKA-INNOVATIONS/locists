import { View } from 'react-native'
import React, { useState } from 'react'
import SwitchSelector from 'react-native-switch-selector'
import theme from '../theme'
import PostsList from '../components/PostsList'
import EventsList from '../components/EventsList'
import PropTypes from 'prop-types'

const Explore = ( { navigation } ) => {
  // console.log( 'Explore.js' )
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

  return (
    <View>
      <View>
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
          onPress={ value => setExplore( value.explore ) }
        />
      </View>
      { explore === 'events' && <EventsList navigation={ navigation } /> }
      { explore === 'posts' && <PostsList navigation={ navigation } /> }
    </View>
  )
}

Explore.propTypes = {
  navigation: PropTypes.object,
}

export default Explore