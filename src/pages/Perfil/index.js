import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

export default function Perfil() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.returnContainer} onPress={() => navigation.navigate('Login')}>
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
            <View style={styles.shareContainer}>
                <Image source={require('../../assets/share.png')} style={styles.shareImage}/>
                <Text style={styles.shareText}>Compartilhar</Text>
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
        position: 'absolute',
        bottom: 1,
        left: 0,
        flex: 1,
        width: '15%',
        height: 60,
        top: 45,
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
        top: 400,
    },
    editProfileContainer: {
        position: 'absolute',
        top: 450,
        width: '80%',
        alignItems: 'center',
        borderColor: 'transparent',
        borderRadius: 25,
        backgroundColor: '#112D4E',
    },
    shareContainer: {
        position: 'absolute',
        bottom: 30,
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    back_button: {
        width: 50,
        height: 50,
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
        fontSize: 25,
        fontWeight: 'bold',
    },
    editProfile:{
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },
    shareImage:{
        width: 30,
        height: 30,
        marginRight: 20,
    },
    shareText:{
        color: '#112D4E',
        fontSize: 25,
        fontWeight: 'bold',
    },
});