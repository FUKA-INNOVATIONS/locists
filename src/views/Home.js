import React from 'react';
import { View } from "react-native";
import HomeList from "../components/HomeList";

const Home = () => {
    return (
        <View style={{marginTop: 50, marginHorizontal: 10}}>
            <HomeList />
        </View>
    );
};

export default Home;
