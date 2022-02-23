import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const Tab = ({color, tab, onPress, icon}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            { tab.name === 'Create' ?
                (
                    // TODO create custom plus button component (with lottie animation?)
                    icon && <AntDesign name={icon} size={30} color={color} style={styles.create} />


                )
                :
                (
                    // TODO create custom svg icons for tabs
                    <>
                        {icon && <AntDesign name={icon} size={20} color={color} /> }
                        <Text style={[styles.iconText, {color}]}>{tab.name}</Text>
                    </>
                )
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    create: {
        position: 'absolute',
        top: -15
    },
    iconText: {
        fontWeight: 'bold',
    }
});

export default Tab;