import Post from './Post';
import Event from './Event';
import {View, Text, FlatList, Pressable} from 'react-native';

import useMedia from '../hooks/useMedia';
import { useEffect } from 'react';
import {useIsFocused} from "@react-navigation/native";


const ExploreList = ( {navigation, explore} ) => {
    const { getEvents, events, loadingEvents } = useMedia();
    const { getPosts, posts, loadingPosts } = useMedia();
    const viewIsFocused = useIsFocused();

    useEffect( async () => {
        await getEvents();
        await getPosts();
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
        navigation.navigate( 'SingleEvent', { eventId: eventId } );
    };

    const postPressHandler = ( postId ) => {
        navigation.navigate( 'SinglePost', { postId: postId } );
    };

    return (
        <FlatList
            data={ explore === 'events' ? events : posts}
            keyExtractor={ ( item ) => item.file_id }
            renderItem={ ( { item } ) => {
                return (
                    explore === 'posts' ?
                        <Pressable
                            onPress={ () => postPressHandler( item.file_id ) }>
                            <Post postMedia={ item }/>
                        </Pressable>
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