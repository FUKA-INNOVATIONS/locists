import React from "react";
import {FlatList, Text} from "react-native";
import Post from "./Post";


const HomeList = () => {

    const dummyData = [
        {
            photo: true,
            title: 'test',
            description: "this is a test of how the card will look",
            likes: 50,
            comments: 4,
        },
        {
            photo: false,
            title: 'test',
            description: "this is a test of how the card will look",
            likes: 33,
            comments: 7,
        }
    ]
    return (
        <FlatList
            data={dummyData}
            renderItem={({item}) => (
                <Post
                    postMedia={item}
                />
            )}
        />
    )
}

export default HomeList;