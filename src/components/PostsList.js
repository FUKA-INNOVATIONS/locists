import useMedia from '../hooks/useMedia';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Post from './Post';

const PostsList = ( { navigation } ) => {
  const { getPostsWithThumbnails, posts, loading: loadingPosts } = useMedia();
  const [ loading, setLoading ] = useState( false );
  const viewIsFocused = useIsFocused();

  useEffect( async () => {
    setLoading( true );
    await getPostsWithThumbnails();
    setLoading( false );
  }, [  ] );

  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePost', { postId: postId } );
  };

  if ( loading ) {
    return (
        <View>
          <Text>
            Loading..
          </Text>
        </View>
    );
  }
  return (
      <FlatList
          data={ posts }
          keyExtractor={ ( item ) => item.file_id }
          renderItem={ ( { item } ) => {
            return (
                <Pressable
                    onPress={ () => postPressHandler( item.file_id ) }>
                  <Post postMedia={ item }/>
                </Pressable>

            );
          } }
      />
  );
};

export default PostsList;