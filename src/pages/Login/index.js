import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(){
    const navigation = useNavigation();

    const [hidePassword, setHidePassword] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    useEffect(() => {
        const checkLogin = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
                const { email, password } = JSON.parse(user);
                setEmail(email);
                setPassword(password);
                setRememberMe(true);
                authenticateUser();
            }
        };

        checkLogin();
    }, []);

    const authenticateUser = async () => {
        try {
            var responseClone;
            const response = await fetch(`https://studynest-api.onrender.com/users/${email}/${password}`);
            responseClone = response.clone();
            const statusCode = response.status;
            const data = await response.json();

            console.log(`Status code: ${statusCode}`);

            if (statusCode === 202 || statusCode === 405) {
                if (rememberMe) {
                    await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
                    navigation.navigate('MainDrawer', {
                        screen: 'Foto'
                      });
                }
                navigation.navigate('MainDrawer', {
                    screen: 'Foto'
                  });
            } else{
                if (statusCode === 422){
                    Alert.alert(
                        "Erro de autenticação",
                        data.detail,
                        [
                        {text: 'OK', onPress: () => navigation.navigate('CodigoValidacao', {userEmail: email, userTypeOfMessage: 'activate_account'})},
                        ],
                        {cancelable: false},
                    );
                } else{
                    Alert.alert(
                        "Erro de autenticação",
                        data.detail,
                        [
                        {text: 'OK'},
                        ],
                        {cancelable: false},
                    );
                }
            }
        } catch (error) {
            console.error('Error parsing JSON from response:', error, responseClone);
            responseClone.text()
            .then(function (bodyText) {
                console.log('Received the following instead of valid JSON:', bodyText);
            });
        }
    };


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
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image source={require('../../assets/senha.png')} style={styles.icon} />
                <TextInput 
                    style={styles.input}
                    placeholder="SENHA"
                    autoCorrect={false}
                    secureTextEntry={hidePassword}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={{ marginRight: 15 }}>
                    <Image 
                        source={hidePassword ? require('../../assets/eye.png') : require('../../assets/closedEye.png')} 
                        style={styles.icon} 
                        />
                </TouchableOpacity>
            </View>

            <View style={styles.checkboxContainer}>
                <Checkbox
                    style={{marginRight: '2%'}}
                    disabled={false}
                    value={rememberMe}
                    onValueChange={(newValue) => setRememberMe(newValue)}
                />
                <Text style={styles.text}>MANTER-SE CONECTADO</Text>
            </View>

            <Text style={[styles.textLink, {marginTop: '5%'}]} onPress={() => navigation.navigate('RecuperarSenha', {userTypeOfMessage: 'recover_password'})}>ESQUECI MINHA SENHA</Text>


            <TouchableOpacity style={styles.button} onPress={authenticateUser}>
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
    checkboxContainer: {
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        fontWeight: 'bold',
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
        marginBottom: '15%',
    },
    buttonLink:{
        width: '100',
        height: '5%',
    },
});