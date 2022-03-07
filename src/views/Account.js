import React, { useState, useEffect, useMemo } from 'react'
import {
  Text,
  View,
  Image,
  FlatList,
} from 'react-native'
import useAuthStorage from '../hooks/useAuthStorage'
import theme from '../theme'
import useComment from '../hooks/useComment'
import useMedia from '../hooks/useMedia'
import Post from '../components/Post'
import Event from '../components/Event'
import PropTypes from 'prop-types'
import Loading from '../components/Loading'

const Account = ( { navigation } ) => {
  const { user } = useAuthStorage()
  const authStorage = useAuthStorage()
  const { getCurrentUserComments } = useComment()
  const [ comments, setComments ] = useState( [] )
  const { getAllMedia, getPosts } = useMedia()
  const [ loading, setLoading ] = useState( false )
  const [ userMedia, setUserMedia ] = useState( false )

  //

  /* const getMediaForUser = useMemo( async () => {
   await getUserMedia( user.token )
   }, [] ) */

  /*  If user is logged in
   *   Hide Authentication view and move to Account view
   * */

  useEffect( async () => {

    return navigation.addListener( 'focus', async () => {
      console.log( 'focus' )
      setLoading( true )
      getCurrentUserComments().then( comments => setComments( comments ) )
      // const userMedia = await getAllMedia()
      // const filteredMedia = userMedia.filter( media => setUserMedia( userMedia ) )
      const posts = await getPosts()
      setUserMedia( posts )
      setLoading( false )
    } )
  }, [] )

  console.log( 'account', userMedia )

  // console.log( userMedia )

  const EmptyListMessage = () => <Text style={ { color: '#fff' } }>You Have not
    posted anything yet</Text>

  if ( loading ) return <Loading />

  return (
    <View style={ theme.profile }>
      <View style={ theme.profilePicAndInfo }>
        { user.avatar ?
          <Image
            source={ { uri: user.avatar } }
            style={ theme.profilePic }
          />
          :
          <Image
            source={ require( '../../assets/defaultPic.jpg' ) }
            style={ theme.profilePic }
          />
        }
        <View style={ theme.profileInfoCard }>
          <Text>User: { user.username }</Text>
          <Text>UserID: { user.user_id }</Text>
          <Text>{ user.email }</Text>
          <Text>{ user.full_name }</Text>
        </View>
      </View>

      <Text style={ { color: '#fff' } }>User status: { user.isLogged &&
      'logged in' }</Text>
      <Text style={ { color: '#fff' } }>Comments posted: { comments.length > 0
        ? comments.length
        : 0 }</Text>
      <View style={{width: '100%', marginTop: 15, paddingBottom: 400}}>
        <FlatList
          data={ userMedia && userMedia }
          ListEmptyComponent={ EmptyListMessage }
          keyExtractor={ ( item ) => item.file_id }
          renderItem={ ( { item } ) => {
            return (
              item.description.mediaType === 'post' ?
                <Post postMedia={ item } ownProfile={ true } />
                :
                <Event eventDetails={ item } ownProfile={ true } />
            )
          }
          }
        />
      </View>
    </View>
  )
}

Account.propTypes = {
  navigation: PropTypes.object,
}

export default Account
