import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Alert, BackHandler, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Foto(){
    const navigation = useNavigation();
    const route = useRoute();
    
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Calma ai!", "Você tem realmente deseja sair do aplicativo?", [
                {
                    text: "Cancelar",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Confirmar", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const onScreenFocus = () => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
        };

        const onScreenBlur = () => {
            BackHandler.removeEventListener("hardwareBackPress", backAction);
        };

        navigation.addListener('focus', onScreenFocus);
        navigation.addListener('blur', onScreenBlur);

        return () => {
            navigation.removeListener('focus', onScreenFocus);
            navigation.removeListener('blur', onScreenBlur);
        };
    }, []);

    return(

        
        <View Style={StyleSheet.container}>
            <TouchableOpacity Style={Styles.button} onPress={() => navigation.navigate('CameraPage')}>
                <Text style={Styles.textButton}>CAMERA</Text>
            </TouchableOpacity>
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
    },
    button:{
        backgroundColor: '#F9F7F7',
        width: '80%',
        height: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: '5%',
        marginTop: '15%',
    }
});