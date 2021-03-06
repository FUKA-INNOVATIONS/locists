import { View, Text, TouchableOpacity } from 'react-native'
import Dialog, { DialogContent } from 'react-native-popup-dialog'
import theme from '../theme'
import React, { useEffect, useState } from 'react'
import InfoButton from '../../assets/icons/InfoButton.svg'
import PropTypes from 'prop-types'
import LottieView from 'lottie-react-native'

const Create = ( { navigation } ) => {
  const [ visible, setVisible ] = useState( false )
  const [ type, setType ] = useState( '' )

  const animation = React.createRef()
  useEffect( () => {
    animation.current?.play()
  }, [] )

  const eventInfo = 'Use this if your planning to host an event' +
    ' and want to spread the word!'

  const postInfo = 'Post your activities for other people in the' +
    ' city to view!'

  /*
   * Open Create new event modal
   * */
  const createEventHandler = () => {
    navigation.navigate( 'CreateEvent' )
  }

  /*
   * Open Create new post modal
   * */
  const createPostHandler = () => {
    navigation.navigate( 'CreatePost' )
  }

  /*
   * Opens Info box for user
   * */
  const infoBtnHandler = ( type ) => {
    setVisible( true )
    setType( type )
  }

  return (
    <>
      <View style={ {alignSelf: 'center' } }>
        <LottieView
          ref={ animation }
          source={ require( '../../assets/animations/infinite-trail.json' ) }
          style={ { width: 200, height: 200, marginVertical: 25, right: 11 } }
          loop={ true }
        />
      </View>
      <View style={ theme.createPage }>

        <View>
          <TouchableOpacity style={ [ theme.generalBtn, theme.createBtn ] }
                            onPress={ createEventHandler }>
            <Text style={ theme.loginButtonText }>Create new Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ [ theme.generalBtn, theme.createBtn ] }
                            onPress={ createPostHandler }>
            <Text style={ theme.loginButtonText }>Publish a Post</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={ () => infoBtnHandler( 'event' ) }>
            <InfoButton width={ 30 } height={ 30 } marginVertical={ 36 } />
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => infoBtnHandler( 'post' ) }>
            <InfoButton width={ 30 } height={ 30 } marginVertical={ 39 } />
          </TouchableOpacity>
        </View>
        <View>
          <Dialog

            backgroundStyle={ 'white' }
            visible={ visible }
            onTouchOutside={ () => {
              setVisible( false )
            } }
          >
            <DialogContent style={ theme.infoBox }>
              <Text style={ theme.infoText }>
                { type === 'event' ? eventInfo : postInfo }
              </Text>
            </DialogContent>
          </Dialog>
        </View>
      </View>
    </>
  )
}

Create.propTypes = {
  navigation: PropTypes.object,
}

export default Create