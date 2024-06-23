import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Cadastro(){
    const navigation = useNavigation();

    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const SignUp = async () => {
        try {
            var responseClone;
            const url = `https://studynest-api.onrender.com/users?nome=${name}&nome_usuario=${username}&email=${email}&senha=${password}&confirma_senha=${confirmPassword}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: name,
                    nome_usuario: username,
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
                Alert.alert(
                    "Sucesso!",
                    data.detail,
                    [
                        {text: 'OK', onPress: () => navigation.navigate('Login')},
                    ],
                    {cancelable: false},
                );
            } else{
                Alert.alert(
                    "Erro de cadastro",
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

    return(
        <View style={styles.container}>
            <Text style={styles.text}>JÁ POSSUI CONTA? <Text style={styles.textLink} onPress={() => navigation.navigate('Login')}>CLIQUE  AQUI</Text></Text>
    
            <Text style={styles.textInfo}>CADASTRE-SE</Text>
            <Text style={styles.textInfo2}>INSIRA SUAS INFORMAÇÕES</Text>

            <View style={styles.inputContainer}>
            <Image source={require('../../assets/user_icon.png')} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#666"
                    placeholder="NOME"
                    autoCorrect={false}
                    onChangeText={(text) => setName(text)}
                />
            </View>

            <View style={styles.inputContainer}>
            <Image source={require('../../assets/user_icon.png')} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#666"
                    placeholder="NOME DE USUARIO"
                    autoCorrect={false}
                    onChangeText={(text) => setUserName(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image source={require('../../assets/email.png')} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#666"
                    placeholder="EMAIL"
                    autoCorrect={false}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>

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

            <TouchableOpacity style={styles.button} onPress={SignUp}>
                <Text style={styles.textButton}>CONFIRMAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#112D4E',
        paddingHorizontal: 20,
        paddingTop: 50, // Adicionado para afastar o texto do topo
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000',
        borderRadius: 25,
        backgroundColor: '#F9F7F7',
        marginBottom: 15,
    },
    icon: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    input:{
        flex: 1,
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 10,
        padding: '3%',
    },
    text:{
        color: '#F9F7F7',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInfo: {
        color: '#F9F7F7',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInfo2: {
        color: '#F9F7F7',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 80,
    },
    textLink:{
        textDecorationLine: 'underline',
        color: '#DBE2EF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textButton:{
        fontWeight: 'bold',
        fontSize: 18,
        color: '#112D4E',
    },
    button:{
        backgroundColor: '#F9F7F7',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 15,
        marginTop: '20%',
    },
});