import React, {useState, useEffect, useMemo} from 'react'
import {
    Text,
    View,
    Image,
    FlatList
} from 'react-native'
import useAuthStorage from '../hooks/useAuthStorage'
import theme from '../theme'
import useComment from '../hooks/useComment'
import useMedia from "../hooks/useMedia"
import Post from '../components/Post'
import Event from '../components/Event'
import PropTypes from 'prop-types'


const Account = ( { navigation } ) => {
  const { user } = useAuthStorage()
  const { getCurrentUserComments } = useComment()
  const [ comments, setComments ] = useState( [] )
  const { getUserMedia, userMedia } = useMedia()
  const [ loading, setLoading ] = useState( false )

  getCurrentUserComments().then( comments => setComments( comments ) )

    const getMediaForUser = useMemo( async () => {
        await getUserMedia( user.token )
    }, [] );

  /*  If user is logged in
   *   Hide Authentication view and move to Account view
   * */

  useEffect( async () => {
    setLoading( true )
    await getMediaForUser
    console.log( loading )
    setLoading( false )
  }, [] )

  const EmptyListMessage = () => <Text style={ { color: '#fff' } }>You Have not
    posted anything yet</Text>

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

        <Text style={ { color: '#fff' } }>User status: { user.isLogged && 'logged in' }</Text>
        <Text style={ { color: '#fff' } }>Comments posted: { comments.length > 0 ? comments.length : 0 }</Text>
        <FlatList
          data={ [] } // TODO empty list provided
          ListEmptyComponent={ EmptyListMessage }
          keyExtractor={ ( item ) => item.file_id }
          renderItem={ ( { item } ) => {
            return (
              item.description.mediaType === 'post' ?
                <Post postMedia={ item } ownProfile={true}/>
                :
                <Event eventDetails={ item } ownProfile={true}/>
            )
          }
        }
      />
    </View>
  )
}

Account.propTypes = {
  navigation: PropTypes.object,
}

export default Account
