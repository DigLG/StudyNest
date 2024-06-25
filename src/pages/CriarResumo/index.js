import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TextInput, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Resumo() {
    const navigation = useNavigation();
    const [disciplina, setDisciplina] = useState('');
    const [filteredDisciplinas, setFilteredDisciplinas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [textoResumo, setTextoResumo] = useState('');
    const [emailFromStorage, setEmailFromStorage] = useState('');

    useEffect(() => {
        getEmailFromStorage();
        fetchDisciplinas();
    }, [])

    const getEmailFromStorage = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData !== null) {
                const { email } = JSON.parse(userData);
                setEmailFromStorage(email);
            }
        } catch (error) {
            console.error('Erro ao obter email do AsyncStorage:', error);
        }
    };

    const novoResumo = async () => {
        try {
            var responseClone;
            const url = `https://studynest-api.onrender.com/add_resumo?email_usuario=${emailFromStorage}&codigo_disciplina=${disciplina}&titulo=${titulo}&conteudo=${textoResumo}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_usuario: emailFromStorage,
                    codigo_disciplina: disciplina,
                    titulo: titulo,
                    conteudo: textoResumo,
                }),
            });
            
            responseClone = response.clone();
            const statusCode = response.status;
            const data = await response.json();
            console.log('Response Data:', data);
            console.log(`Status code: ${statusCode}`);
    
            if (statusCode === 201) {
                Alert.alert(
                    "Sucesso!",
                    data.detail,
                    [
                        {text: 'OK', onPress: () => navigation.goBack()},
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

    const fetchDisciplinas = async () => {
        try {
            const response = await fetch('https://studynest-api.onrender.com/disciplinas');
            const data = await response.json();
            setDisciplinas(data);
            // Mostrando apenas as primeiras 5 disciplinas inicialmente
            setFilteredDisciplinas(data.slice(0, 5));
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error);
        }
    };

    const filterDisciplinas = (text) => {
        setDisciplina(text);
        const filtered = disciplinas.filter(d => d.toLowerCase().includes(text.toLowerCase())).slice(0, 5);
        setFilteredDisciplinas(filtered);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleDisciplinaSelect(item)}>
            <View style={styles.item}>
                <Text style={styles.itemText}>{item}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleDisciplinaSelect = (disciplina) => {
        setDisciplina(disciplina);
        setFilteredDisciplinas([]);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableOpacity style={styles.returnContainer} onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/back_button.png')} style={styles.back_button} />
            </TouchableOpacity>

            <View style={styles.formContainer}>
                <TextInput
                    style={[styles.input, styles.inputText]}
                    onChangeText={filterDisciplinas}
                    value={disciplina}
                    placeholder="Nome da Disciplina"
                />
                {disciplina.trim().length > 0 && filteredDisciplinas.length > 0 && (
                    <FlatList
                        data={filteredDisciplinas}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        style={styles.suggestions}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Título do Resumo"
                    value={titulo}
                    onChangeText={setTitulo}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Texto do Resumo"
                    value={textoResumo}
                    onChangeText={setTextoResumo}
                    multiline={true}
                    numberOfLines={10}
                />
                <TouchableOpacity style={styles.addSummaryButton} onPress={novoResumo}>
                    <Text style={styles.addSummaryButtonText}>Criar Resumo</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F7F7',
    },
    returnContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    back_button: {
        width: 70,
        height: 70,
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: '25%',
    },
    input: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#112D4E',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top',
    },
    suggestions: {
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    itemText: {
        fontSize: 16,
    },
    addSummaryButton: {
        width: '80%',
        paddingVertical: 12,
        backgroundColor: '#112D4E',
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    addSummaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
