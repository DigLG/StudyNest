import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";

export default function Foto(){
    return(
        <View Style={StyleSheet.container}>
        </View>
    );
}

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F9F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold'
    }
});