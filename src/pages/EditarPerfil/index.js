import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput} from 'react-native';

export default function EditarPerfil() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.returnContainer} onPress={() => navigation.navigate('Perfil')}>
                <Image source={require('../../assets/back_button.png')} style={styles.back_button} />
            </TouchableOpacity>
            <View style={styles.profileContainer}>
                <Image source={require('../../assets/profile.png')} style={styles.profilePic}/>
            </View>
            <View style={styles.editPicContainer}>
                <Image source={require('../../assets/change_image.png')} style={styles.editProfilePic}/>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.info}>Informações</Text>
            </View>
            <View style={styles.editNameContainer}>
                <TextInput
                    style={styles.edit}
                    placeholder="Nome"
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.SearchBorder1} />
            <View style={styles.editUserNameContainer}>
                <TextInput
                    style={styles.edit}
                    placeholder="Usuário"
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.SearchBorder2} />
            <View style={styles.editEmailContainer}>
                <TextInput
                    style={styles.edit}
                    placeholder="E-mail"
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.SearchBorder3} />
            <View style={styles.editPasswordContainer}>
                <TextInput
                    style={styles.edit}
                    placeholder="Senha"
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.SearchBorder4} />
            <TouchableOpacity style={styles.confirmContainer} onPress={console.log('WORK IN PROGRESS')}>
                <Text style={styles.confirmar}>CONFIRMAR ALTERAÇÕES</Text>
            </TouchableOpacity>
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
        top: 100,
    },
    infoContainer:{
        position: 'absolute',
        alignItems: 'center',
        top: 300,
    },
    editNameContainer:{
        position: 'absolute',
        top: 380,
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
    },
    editUserNameContainer:{
        position: 'absolute',
        top: 450,
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
    },
    editEmailContainer:{
        position: 'absolute',
        top: 520,
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
    },
    editPasswordContainer:{
        position: 'absolute',
        top: 590,
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
    },
    confirmContainer: {
        position: 'absolute',
        bottom: 80,
        width: '60%',
        alignItems: 'center',
        borderColor: 'transparent',
        borderRadius: 25,
        backgroundColor: '#112D4E',
    },
    SearchBorder1:{
        position: 'absolute',
        top: 410,
        width: '70%',
        height: 2,
        backgroundColor: '#112D4E',
    },
    SearchBorder2:{
        position: 'absolute',
        top: 480,
        width: '70%',
        height: 2,
        backgroundColor: '#112D4E',
    },
    SearchBorder3:{
        position: 'absolute',
        top: 550,
        width: '70%',
        height: 2,
        backgroundColor: '#112D4E',
    },
    SearchBorder4:{
        position: 'absolute',
        top: 620,
        width: '70%',
        height: 2,
        backgroundColor: '#112D4E',
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
    editPicContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 165,
    },
    editProfilePic:{
        width: 70,
        height: 70,
    },
    edit:{
        width: '100%',
        fontSize: 20,
    },
    info:{
        color: '#112D4E',
        fontSize: 40,
        fontWeight: 'bold',
    },
    confirmar:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});