import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil() {
    const navigation = useNavigation();

    const Logout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.navigate('Login');
      };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.returnContainer} onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/back_button.png')} style={styles.back_button} />
            </TouchableOpacity>
            <View style={styles.profileContainer}>
                <Image source={require('../../assets/profile.png')} style={styles.profilePic}/>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>Nome</Text>
            </View>
            <View style={styles.usernameContainer}>
                <Text style={styles.username}>@user_name</Text>
            </View>
            <TouchableOpacity style={styles.editProfileContainer} onPress={() => navigation.navigate('EditarPerfil')}>
                <Text style={styles.editProfile}>Editar Perfil</Text>
            </TouchableOpacity>
            <View style={styles.logoutContainer}>
                <Image source={require('../../assets/logout.png')} style={styles.logoutImage}/>
                <Text style={styles.logoutText} onPress={Logout}>Sair da conta</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    returnContainer: {
        flex: 1,
        marginTop: '15%',
        marginRight: '75%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    profileContainer:{
        position: 'absolute',
        alignItems:'center',
        top: 170,
    },
    nameContainer:{
        position: 'absolute',
        alignItems: 'center',
        top: 370,
    },
    usernameContainer:{
        position: 'absolute',
        alignItems: 'center',
        top: 405,
    },
    editProfileContainer: {
        position: 'absolute',
        top: 470,
        width: '80%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'transparent',
        borderRadius: 26,
        backgroundColor: '#112D4E',
    },
    logoutContainer: {
        position: 'absolute',
        bottom: 70,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    back_button: {
        width: 70,
        height: 70,
    },
    profilePic: {
        width: 200,
        height: 200,
        opacity: 0.5,
    },
    username:{
        color: '#818182',
        fontSize: 25,
        fontWeight: 'bold',
    },
    name:{
        color: '#112D4E',
        fontSize: 26,
        fontWeight: 'bold',
    },
    editProfile:{
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
    },
    logoutImage:{
        width: 50,
        height: 50,
        marginRight: '2%'
    },
    shareText:{
        color: '#112D4E',
        fontSize: 25,
        fontWeight: 'bold',
    },
});