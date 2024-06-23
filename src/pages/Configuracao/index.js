import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput} from 'react-native';

export default function Configuracao() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.returnContainer} onPress={() => navigation.navigate('Foto')}>
                <Image source={require('../../assets/back_button.png')} style={styles.back_button} />
            </TouchableOpacity>
            <View style={styles.searchContainer}>
                <Image source={require('../../assets/search.png')} style={styles.search} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar..."
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.SearchBorder} />
            <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('Perfil')}>
                <Image source={require('../../assets/profile.png')} style={styles.configPics} />
                <Text style={styles.text}>PERFIL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.privacyContainer} onPress={console.log('Work in Progress!')}>
                <Image source={require('../../assets/lock.png')} style={styles.configPics} />
                <Text style={styles.text}>PRIVACIDADE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageContainer} onPress={console.log('Work in Progress!')}>
                <Image source={require('../../assets/chatBox.png')} style={styles.configPics} />
                <Text style={styles.text}>IDIOMA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationContainer} onPress={console.log('Work in Progress!')}>
                <Image source={require('../../assets/bell.png')} style={styles.configPics} />
                <Text style={styles.text}>NOTIFICAÇÕES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.permissionContainer} onPress={console.log('Work in Progress!')}>
                <Image source={require('../../assets/shield.png')} style={styles.configPics} />
                <Text style={styles.text}>PERMISSÕES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accessibilityContainer} onPress={console.log('Work in Progress!')}>
                <Image source={require('../../assets/human.png')} style={styles.configPics} />
                <Text style={styles.text}>ACESSIBILIDADE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.termsContainer} onPress={console.log('Work in Progress!')}>
                <Image source={require('../../assets/docs.png')} style={styles.configPics} />
                <Text style={styles.text}>TERMOS E POLITÍCA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportContainer} onPress={console.log('Work in Progress!')}>
                <Image source={require('../../assets/support.png')} style={styles.configPics} />
                <Text style={styles.text}>SUPORTE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoContainer} onPress={console.log('Work in Progress!')}>
                <Image source={require('../../assets/info.png')} style={styles.configPics} />
                <Text style={styles.text}>QUEM SOMOS</Text>
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
    searchContainer:{
        position: 'absolute',
        top: 60,
        paddingHorizontal: 70,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    SearchBorder:{
        position: 'absolute',
        top: 90,
        right: 50,
        width: '60%',
        height: 2,
        backgroundColor: '#112D4E',
    },
    profileContainer:{
        position: 'absolute',
        top: 115,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    privacyContainer:{
        position: 'absolute',
        top: 190,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    languageContainer:{
        position: 'absolute',
        top: 265,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    notificationContainer:{
        position: 'absolute',
        top: 340,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    permissionContainer:{
        position: 'absolute',
        top: 415,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    accessibilityContainer:{
        position: 'absolute',
        top: 490,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    termsContainer:{
        position: 'absolute',
        top: 565,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    supportContainer:{
        position: 'absolute',
        top: 640,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    infoContainer:{
        position: 'absolute',
        top: 715,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    search: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    configPics: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    text:{
        color: '#112D4E',
        fontSize: 20,
        fontWeight: 'bold',
    },
});