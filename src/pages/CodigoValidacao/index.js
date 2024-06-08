import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function RecuperarSenha() {
    const navigation = useNavigation();
    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const inputs = Array(6).fill(0).map(() => React.createRef());
    const codeNumber = parseInt(codes.join(''), 10);
    const route = useRoute();
    const email = route.params?.userEmail || 'Email temporário não encontrado';
    const typeofmessage = route.params?.userTypeOfMessage || 'Tipo da mensagem não encontrado';

    const handleChangeText = (text, index) => {
        const newCodes = [...codes];
        newCodes[index] = text;
        setCodes(newCodes);
        if (text.length === 1 && index !== 5) {
            inputs[index + 1].current.focus();
        } else if (text.length === 0 && index !== 0) {
            inputs[index - 1].current.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && codes[index] === '' && index !== 0) {
            inputs[index - 1].current.focus();
        }
    };

    const VerifyCode = async () => {
        try {
            var responseClone;
            const response = await fetch(`https://studynest-api.onrender.com/code/${email}/${codeNumber}`);
            responseClone = response.clone();
            const statusCode = response.status;
            const data = await response.json();

            console.log(`Status code: ${statusCode}`);

            if (statusCode === 202 && typeofmessage === 'recover_password') {
                navigation.navigate('NovaSenha', {userEmail: email})
            } else if (statusCode === 202 && typeofmessage === 'activate_account') {
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
    const ResendCode = async () => {
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
                Alert.alert(
                    "Sucesso!",
                    data.detail,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false},
                );
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

            <Text style={styles.textInfo2}>INSIRA O CÓDIGO ENVIADO POR EMAIL</Text>

            <View style={styles.codeContainer}>
                {codes.map((code, index) => (
                    <TextInput
                        key={index}
                        ref={inputs[index]}
                        style={styles.codeInput}
                        value={code}
                        onChangeText={(text) => handleChangeText(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={VerifyCode}>
                <Text style={styles.textButton}>ENVIAR</Text>
            </TouchableOpacity>

            <Text style={styles.text}>
                Não recebeu o código? <Text style={styles.textLink} onPress={ResendCode}>Clique aqui para reenviar!</Text>
            </Text>              
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#112D4E',
    },
    containerLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: -15,
        marginTop: '5%',
    },
    textLink: {
        textDecorationLine: 'underline',
        color: '#DBE2EF',
        fontSize: 20,
        marginLeft: 21,
        
    },
    textInfo2: {
        color: '#F9F7F7',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 1,
        marginVertical: 20,
    },
    instructions: {
        color: '#F9F7F7',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        textAlign: 'center',
        marginVertical: 10,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 20,
    },
    codeInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#F9F7F7',
        borderRadius: 6,
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 20,
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
    text: {
        width: '80%',
        color: '#F9F7F7',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20, 
        paddingRight: 5,
        marginLeft: 20,
        textAlign: 'center',
    },
});