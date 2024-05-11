import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Login(){
    const navigation = useNavigation();

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

            <View style={styles.containerForm}>
                <TextInput
                    style={styles.input}
                    placeholder="EMAIL"
                    autoCorrect={false}
                    onChangeText={()=>{}}
                />

                <TextInput
                    style={styles.input}
                    placeholder="SENHA"
                    autoCorrect={false}
                    onChangeText={()=>{}}
                />

            </View>

            <Text style={styles.textLinkPassword} onPress={() => ('./recoverPassword.js')}>ESQUECI MINHA SENHA</Text>

            <TouchableOpacity style={styles.button} onPress={() => ('./verifyLogin.js')}>
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
    containerForm:{
        justifyContent: 'top',
        alignItems: 'left',
        width: '100%',
        paddingHorizontal: '10%',
        paddingBottom: '5%',
    },
    input:{
        backgroundColor: '#F9F7F7',
        width: '100%',
        marginBottom: '5%',
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 25,
        padding: '3%',
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