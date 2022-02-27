import { StyleSheet, View, Image, Text } from 'react-native';
import { uploadsUrl } from '../../config';
import Like from './Like';
import useFavourite from '../hooks/useFavourite';
import { useEffect, useState } from 'react';

const Post = ( { postMedia } ) => {
  // console.log( 'postDetails in Post.js', postMedia );
  // console.log('Post.js file_id', postMedia.file_id)
  // TODO: fix rendering

  return (
      <View style={ styles.info }>

        { postMedia.filename &&
        <Image
            // TODO: use thumbnails when ever possible
            source={ { uri: uploadsUrl + postMedia.filename } }
            style={ { width: 100, height: 100 } }
        />
        }
        <View style={ styles.allText }>
          <View style={ styles.text }>
            <Text>POST</Text>
            <Text>{ postMedia.title }</Text>
            <Text>{ postMedia.description.mediaType }</Text>
          </View>
          <View style={ styles.rates }>
            <Text>likes: { postMedia.likes }</Text>
            <Text>comments: { postMedia.comments }</Text>
            <Like file_id={ postMedia.file_id }/>
          </View>
        </View>
      </View>
  );
};

export default Post;

const styles = StyleSheet.create( {
  info: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  allText: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    width: '70%',
  },
  rates: {},
} );