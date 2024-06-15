import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, TouchableWithoutFeedback } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Foto() {
    const navigation = useNavigation();
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const [disciplinaNome, setDisciplinaNome] = useState('');
    const [turma, setTurma] = useState('');
    const [filteredDisciplinas, setFilteredDisciplinas] = useState([]);
    const [showTurmas, setShowTurmas] = useState(false);
    const [disciplinas, setDisciplinas] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [emailFromStorage, setEmailFromStorage] = useState('');

    useEffect(() => {
        getEmailFromStorage();
        fetchDisciplinas();
    }, []);

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

    const fetchDisciplinas = async () => {
        try {
            const response = await fetch('https://studynest-api.onrender.com/disciplinas');
            if (!response.ok) {
                throw new Error('Erro ao buscar disciplinas');
            }
            const data = await response.json();
            setDisciplinas(data);
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error);
        }
    };

    const fetchTurmas = async (codigoDisciplina) => {
        try {
            const response = await fetch(`https://studynest-api.onrender.com/turmas/${codigoDisciplina}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar turmas');
            }
            const data = await response.json();
            setTurmas(data);
        } catch (error) {
            console.error('Erro ao buscar turmas:', error);
        }
    };

    const handleButtonPress = () => {
        setModalVisible(true);
    };

    const handleConfirmarPress = async () => {
        try {
            const url = `https://studynest-api.onrender.com/add_grade?email_usuario=${encodeURIComponent(emailFromStorage)}&codigo_disciplina=${encodeURIComponent(disciplinaNome)}&turma_disciplina=${encodeURIComponent(turma)}`;
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Erro ao cadastrar disciplina');
            }
    
            const data = await response.json();
            console.log('Dados cadastrados com sucesso:', data.message);
            setModalVisible(false);
    
        } catch (error) {
            console.error('Erro ao cadastrar disciplina:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar a disciplina. Por favor, tente novamente.');
        }
    };

    const handleCancelarPress = () => {
        setModalVisible(false);
    };

    const filterDisciplinas = (text) => {
        setDisciplinaNome(text);
        setFilteredDisciplinas(
            disciplinas.filter(d => d.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const handleDisciplinaSelect = (disciplina) => {
        setDisciplinaNome(disciplina);
        setFilteredDisciplinas([]);
        fetchTurmas(disciplina);
    };

    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => handleDisciplinaSelect(item)}>
            <View style={styles.item}>
                <Text style={styles.itemText}>{item}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar Disciplina</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalView}
                    >
                        <Text style={[styles.modalText, styles.leftAlign]}>Nome/Código da Disciplina:</Text>
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            onChangeText={filterDisciplinas}
                            value={disciplinaNome}
                        />
                        {filteredDisciplinas.length > 0 && (
                            <FlatList
                                data={filteredDisciplinas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item}
                                style={styles.suggestions}
                            />
                        )}
                        <Text style={[styles.modalText, styles.leftAlign]}>Turma:</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowTurmas(!showTurmas)}
                        >
                            <Text style={styles.inputText}>{turma || "Selecione a Turma"}</Text>
                        </TouchableOpacity>
                        {showTurmas && (
                            <FlatList
                                data={turmas}
                                renderItem={({ item }) => (
                                    <TouchableWithoutFeedback onPress={() => {
                                        setTurma(item);
                                        setShowTurmas(false);
                                    }}>
                                        <View style={styles.item}>
                                            <Text style={styles.itemText}>{item}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )}
                                keyExtractor={(item) => item}
                                style={styles.suggestions}
                            />
                        )}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleConfirmarPress}
                            >
                                <Text style={styles.textStyle}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleCancelarPress}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#112D4E',
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        backgroundColor: "#D9D9D9",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    modalText: {
        marginBottom: 10,
        color: '#112D4E',
        textAlign: "left",
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 20,
        marginBottom: 20,
        width: '100%',
        justifyContent: 'center'
    },
    inputText: {
        color: 'black',
        fontWeight: 'bold',
    },
    leftAlign: {
        textAlign: 'left',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        backgroundColor: "#112D4E",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    suggestions: {
        maxHeight: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 20,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        color: 'black',
    },
});
