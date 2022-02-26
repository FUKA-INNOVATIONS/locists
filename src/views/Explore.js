import { View, ScrollView } from 'react-native';
import ExploreList from "../components/ExploreList";

import { useState } from 'react';
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
        <View style={{paddingBottom: 90}}>
            <SwitchSelector
                backgroundColor={ theme.colors.textPrimary}
                textColor={ theme.colors.white }
                selectedColor={theme.colors.primary}
                buttonColor={theme.colors.white}
                borderColor={theme.colors.primary}
                valuePadding={3}
                hasPadding={true}
                bold={true}
                options={ exploreOptions }
                initial={ 0 }
                onPress={ value => setView( value.explore ) }
            />
            <ExploreList navigation={navigation} explore={ explore }/>
        </View>
    );
};

export default Explore;