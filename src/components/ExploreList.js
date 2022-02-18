import Post from './Post';
import Event from './Event';
import {View, Text, FlatList, Pressable} from 'react-native';

import useMedia from '../hooks/useMedia';
import React, { useEffect, useState } from 'react';
import {useIsFocused} from "@react-navigation/native";


const ExploreList = ( {navigation, explore} ) => {
    const { getEvents, events, loadingEvents } = useMedia();
    const { getPosts, posts, loadingPosts } = useMedia();
    const viewIsFocused = useIsFocused();

    console.log('explore', explore);
    console.log('POSTS: ', posts)
    console.log('EVENTS: ', events)

    useEffect( async () => {
        await getEvents();
        await getPosts();
        // setPostsAndEventsMix(previousState => [...previousState, posts, events])
    }, [ viewIsFocused ] );

    if ( loadingEvents || loadingPosts ) {
        return (
            <View>
                <Text>
                    Loading..
                </Text>
            </View>
        );
    }

    const eventPressHandler = ( eventId ) => {
        console.log( 'event pressed' );
        navigation.navigate( 'SingleEvent', { eventId: eventId } );
    };


    return (
        <FlatList
            data={ explore === 'events' ? events : posts}
            keyExtractor={ ( item ) => item.file_id }
            renderItem={ ( { item } ) => {
                return (
                    explore === 'posts' ?
                        <Post
                            postMedia={ item }/>
                        :
                        <Pressable onPress={ () => eventPressHandler( item.file_id ) }>
                            <Event eventDetails={ item }/>
                        </Pressable>
                )
            }}
        />
    );
};

export default ExploreList;