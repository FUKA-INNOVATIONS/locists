import { View } from 'react-native';
import ExploreList from "../components/ExploreList";

import useMedia from '../hooks/useMedia';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import SwitchSelector from "react-native-switch-selector";
import theme from "../theme";

const Explore = ( {navigation} ) => {
    const [ explore, setExplore ] = useState('events')
    const exploreOptions = [
        {
            label: 'Events',
            value: { explore: 'events' },
        },
        {
            label: 'Posts',
            value: { explore: 'posts' },
        },
    ];

    const setView = explore => {
        setExplore( explore );
    };

    return (
        <View>
            <SwitchSelector
                textColor={ theme.colors.textPrimary }
                buttonColor={ theme.colors.primary }
                options={ exploreOptions }
                initial={ 0 }
                onPress={ value => setView( value.explore ) }
            />
            <ExploreList explore={ explore }/>
        </View>
    );
};

export default Explore;