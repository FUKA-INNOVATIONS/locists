import useMedia from '../hooks/useMedia';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Post from './Post';

const PostsList = ( { navigation, pressHandler, posts, loading, refetchPosts } ) => {
  console.log( 'PostsList rendered');

  useEffect( () => {
    return navigation.addListener( 'focus', async () => {
      console.log( 'PostsList focus' );
      // await getPostsWithThumbnails();
      await refetchPosts();
    } );
  }, [  ] );

  const postPressHandler = ( postId ) => {
    navigation.navigate( 'SinglePost', { postId: postId } );
    // pressHandler( postId, 'post' );
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