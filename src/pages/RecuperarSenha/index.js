import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function RecuperarSenha() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const route = useRoute();
    const typeofmessage = route.params?.userTypeOfMessage || 'Tipo da mensagem não encontrado';

    const RecoverPassword = async () => {
        try {
            var responseClone;
            const url = `https://studynest-api.onrender.com/sendemail?email=${email}&typeofmessage=${typeofmessage}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    typeofmessage: typeofmessage,
                }),
            });
            responseClone = response.clone();
            const statusCode = response.status;
            const data = await response.json();
            console.log('Response Data:', data);
            console.log(`Status code: ${statusCode}`);
    
            if (statusCode === 202) {
                navigation.navigate('CodigoValidacao', {userEmail: email, userTypeOfMessage: typeofmessage})
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

            <Text style={styles.instructions}>
                Insira o email cadastrado para envio do código de recuperação
            </Text>

            <View style={styles.inputContainer}>
                <Image source={require('../../assets/email.png')} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#666"
                    placeholder="EMAIL"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={RecoverPassword}>
                <Text style={styles.textButton}>ENVIAR</Text>
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
    },
    textInfo2: {
        color: '#F9F7F7',
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    instructions: {
        width: '80%',
        color: '#F9F7F7',
        fontSize: 18,
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
        fontSize: 18,
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
        marginTop: '12%',
    },
    backButton: {
        position: 'absolute',
        top: 70,
        left: 15,
        zIndex: 1,
    },
    backButtonIcon: {
        width: 50,
        height: 50,
        tintColor: '#F9F7F7',
    },
});