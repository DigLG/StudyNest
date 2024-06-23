import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function RecuperarSenha() {
    const navigation = useNavigation();

    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const route = useRoute();
    const email = route.params?.userEmail || 'Email temporário não encontrado';

    const NewPassword = async () => {
        try {
            var responseClone;
            const url = `https://studynest-api.onrender.com/newpassword?email=${email}&senha=${password}&confirma_senha=${confirmPassword}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: password,
                    confirma_senha: confirmPassword,
                }),
            });
            
            responseClone = response.clone();
            const statusCode = response.status;
            const data = await response.json();
            console.log('Response Data:', data);
            console.log(`Status code: ${statusCode}`);
    
            if (statusCode === 202) {
                navigation.navigate('Login')
            } else{
                Alert.alert(
                    "Erro",
                    data.detail,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false},
                );
            }
            
        } catch (error) {
            console.error('Error parsing JSON from response:', error, responseClone);
            responseClone.text()
            .then(function (bodyText) {
                console.log('Received the following instead of valid JSON:', bodyText);
            });
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image
                    source={require('../../assets/back_button.png')} 
                    style={styles.backButtonIcon}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/StudyNest-logo.png')}
                    style={{ width: '90%' }}
                    resizeMode='contain'
                />
            </View>

            <Text style={styles.textInfo2}>REDEFINIR SENHA</Text>


            <View style={styles.inputContainer}>
                <Image source={require('../../assets/senha.png')} style={styles.icon} />
                <TextInput 
                    style={styles.input}
                    placeholderTextColor="#666"
                    placeholder="SENHA"
                    autoCorrect={false}
                    secureTextEntry={hidePassword}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={{ marginRight: 15 }}>
                    <Image 
                        source={hidePassword ? require('../../assets/eye.png') : require('../../assets/closedEye.png')} 
                        style={styles.icon} 
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Image source={require('../../assets/senha.png')} style={styles.icon} />
                <TextInput 
                    style={styles.input}
                    placeholderTextColor="#666"
                    placeholder="CONFIRMAR SENHA"
                    autoCorrect={false}
                    secureTextEntry={hideConfirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)} style={{ marginRight: 15 }}>
                    <Image 
                        source={hideConfirmPassword ? require('../../assets/eye.png') : require('../../assets/closedEye.png')} 
                        style={styles.icon} 
                    />
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.button} onPress={NewPassword}>
                <Text style={styles.textButton}>CONFIRMAR</Text>
            </TouchableOpacity>

        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#112D4E',
        
       
    },
    containerLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: -10,
        marginTop: '5%',
        
    },
    textInfo2: {
        color: '#F9F7F7',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '3%',
    },
    instructions: {
        color: '#F9F7F7',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        textAlign: 'center',
        marginVertical: 20,
    },
    inputContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000',
        borderRadius: 25,
        backgroundColor: '#F9F7F7',
        marginVertical: 20,
    },
    icon: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    input: {
        width: '100%',
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        padding: '3%',
        flex: 1,
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#112D4E',
    },
    button: {
        backgroundColor: '#F9F7F7',
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginVertical: 20,
        marginTop: '10%',
    },
    backButton: {
        position: 'absolute',
        top: 70,
        left: 10,
        zIndex: 1,
    },
    backButtonIcon: {
        width: 60,
        height: 60,
        tintColor: '#F9F7F7',
    },
    text:{
        color: '#F9F7F7',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20, 
        paddingRight: 5,
        marginLeft: 20,
        textAlign: 'center' ,

    },
});