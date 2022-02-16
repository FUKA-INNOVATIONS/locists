import React from 'react';
import {View, Text, StyleSheet, Image} from "react-native";
import {TextInput} from "react-native-web";
import Post from "../components/Post";
import HomeList from "../components/HomeList";

const Home = () => {
    return (
        <View style={{marginTop: 50, marginHorizontal: 10}}>
            <HomeList />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 100,
    },
} );