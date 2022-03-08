import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Image,
  FlatList, Pressable,
} from 'react-native'
import useAuthStorage from '../hooks/useAuthStorage'
import useComment from '../hooks/useComment'
import useMedia from '../hooks/useMedia'
import Post from '../components/Post'
import Event from '../components/Event'
import PropTypes from 'prop-types'
import Loading from '../components/Loading'

const Account = ( { navigation } ) => {
  // console.log( 'Account.js' )

  const { user } = useAuthStorage()
  const { getCurrentUserComments } = useComment()
  const [ comments, setComments ] = useState( [] )
  const { getUserMedia, userMedia } = useMedia()
  const [ loading, setLoading ] = useState( false )

  useEffect( async () => {
    console.log( 'Account.js useEffect' )
    setLoading( true )
    getCurrentUserComments().then( comments => setComments( comments ) )
    await getUserMedia()
    setLoading( false )

    return navigation.addListener( 'focus', async () => {
      console.log( 'Account.js focus' )
      setLoading( true )
      getCurrentUserComments().then( comments => setComments( comments ) )
      await getUserMedia()
      setLoading( false )
    } )
  }, [] )

  // Move user to single event view when tapping event card
  const eventPressHandler = ( eventId ) => {
    navigation.navigate( 'SingleEventOwn', { eventId: eventId } )
  }

  // Move user to single post view when tapping a post
  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePostOwn', { postId: postId } )
  }

  const EmptyListMessage = () => <Text style={ { color: '#fff' } }>You Have not
    posted anything yet</Text>

  if ( loading ) return <Loading />

  return (
    <>
      <View style={ { alignItems: 'center', height: '60%' } }>

        <View style={ { marginBottom: 10, height: '40%' } }>
          { user.avatar ?
            <Image
              source={ { uri: user.avatar } }
              style={ { width: 150, height: 150, borderRadius: 75 } }
              // style={ theme.profilePic }
            />
            :
            <Image
              source={ require( '../../assets/defaultPic.jpg' ) }
              style={ { width: 150, height: 150, borderRadius: 75 } }
              // style={ theme.profilePic }
            />
          }
        </View>

        <View style={ { alignItems: 'center', marginBottom: 10 } }>
          <Text style={ {
            color: '#fff',
            marginVertical: 5,
          } }>Hello { user.username }, you are { user.isLogged &&
          'logged in' }</Text>
          <Text style={ { color: '#fff' } }>You have posted { comments.length >
          0
            ? comments.length
            : 0 } comments and { userMedia &&
          userMedia.length } events/posts</Text>
        </View>
        <View style={{ width: '100%' }}>
          <FlatList
            data={ userMedia }
            ListEmptyComponent={ EmptyListMessage }
            keyExtractor={ ( item ) => item.file_id }
            renderItem={ ( { item } ) => {
              return (
                item.description.mediaType === 'post' ?
                  <Pressable
                    onPress={ () => postPressHandler( item.file_id ) }>
                    <Post postMedia={ item } home={ true }
                    />
                  </Pressable>
                  :
                  <Pressable
                    onPress={ () => eventPressHandler( item.file_id ) }>
                    <Event eventDetails={ item } />
                  </Pressable>
              )
            }
            }
          />
        </View>
        </View>
    </>
  )
}

Account.propTypes = {
  navigation: PropTypes.object,
}

export default Account
