import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Login(){
    const navigation = useNavigation();

    const [hidePassword, setHidePassword] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return(
        <View style={styles.container}>

            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/StudyNest-logo.png')}
                    style={{width: '100%'}}
                    resizeMode='contain'
                />
            </View>

            <View style={styles.inputContainer}>
                <Image source={require('../../assets/email.png')} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="EMAIL"
                    autoCorrect={false}
                    onChangeText={()=>{}}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image source={require('../../assets/senha.png')} style={styles.icon} />
                <TextInput 
                    style={styles.input}
                    placeholder="SENHA"
                    autoCorrect={false}
                    secureTextEntry={hidePassword}
                    onChangeText={()=>{}}
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={{ marginRight: 15 }}>
                    <Image 
                        source={hidePassword ? require('../../assets/eye.png') : require('../../assets/closedEye.png')} 
                        style={styles.icon} 
                />
        </TouchableOpacity>
            </View>

            <Text style={styles.textLinkPassword} onPress={() => navigation.navigate('RecuperarSenha')}>ESQUECI MINHA SENHA</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Foto')}>
                <Text style={styles.textButton}>LOGIN</Text>
            </TouchableOpacity>

            <Text style={styles.text}>NÃO POSSUI UMA CONTA? <Text style={styles.textLink} onPress={() => navigation.navigate('Cadastro')}>CLIQUE AQUI</Text></Text>              
            

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#112D4E',
    },
    containerLogo:{
        justifyContent: 'top',
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000',
        borderRadius: 25,
        backgroundColor: '#F9F7F7',
        marginBottom: '5%',
    },
    icon: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    input:{
        width: '100%',
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        padding: '3%',
        flex: 1,
    },
    text:{
        color: '#F9F7F7',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: '5%',
        paddingRight: '5%',
    },
    textLink:{
        textDecorationLine: 'underline',
        color: '#DBE2EF',
        fontSize: 16,
        marginLeft: '1%',
    },
    textLinkPassword:{
        color: '#DBE2EF',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: '10%',
    },
    textButton:{
        fontWeight: 'bold',
        fontSize: 18,
        color: '#112D4E',
    },
    button:{
        backgroundColor: '#F9F7F7',
        width: '80%',
        height: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: '5%',
    },
    buttonLink:{
        width: '100',
        height: '5%',
    },
});