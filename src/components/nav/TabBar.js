import {View, StyleSheet, Dimensions} from 'react-native';
import Tab from "./Tab";
import {useState} from "react";

const {width} = Dimensions.get('screen');

const TabBar = ({state, navigation}) => {
    const [selected, setSelected] = useState('Feed');
    const {routes} = state;

    // Active/inactive color of icons
    const renderColor = (currentTab) =>currentTab === selected ? 'white': 'grey'

    // Handles navigation on touch, ignores already selected
    const handlePress = (activeTab, index) => {
        setSelected(activeTab);
        if (state.index !== index){
            navigation.navigate(activeTab);
        }
    };

    return <View style={styles.wrapper}>
        <View style={styles.container}>
            {
                routes.map((route, index) => <Tab
                    tab={route}
                    icon={route.params.icon}
                    onPress={ () => handlePress(route.name, index) }
                    color={renderColor(route.name)}
                                         key={route.key} />)
            }
        </View>
    </View>
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#24292e',
        width,
        paddingHorizontal: 10,
    },
});

export default TabBar;