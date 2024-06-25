import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, TouchableWithoutFeedback, BackHandler } from "react-native";
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
    const [cadastradas, setCadastradas] = useState([]);

    useEffect(() => {
        getEmailFromStorage();
        fetchDisciplinas();
    }, []);

    useEffect(() => {
        if (emailFromStorage) {
            fetchDisciplinasCadastradas(emailFromStorage);
        }
    }, [emailFromStorage]);


    useEffect(() => {
        const backAction = () => {
            Alert.alert("Calma ai!", "Você tem realmente deseja sair do aplicativo?", [
                {
                    text: "Cancelar",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Confirmar", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const onScreenFocus = () => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
        };

        const onScreenBlur = () => {
            BackHandler.removeEventListener("hardwareBackPress", backAction);
        };

        navigation.addListener('focus', onScreenFocus);
        navigation.addListener('blur', onScreenBlur);

        return () => {
            navigation.removeListener('focus', onScreenFocus);
            navigation.removeListener('blur', onScreenBlur);
        };
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

    const fetchDisciplinasCadastradas = async (email) => {
        try {
            const response = await fetch(`https://studynest-api.onrender.com/disciplinasCadastradas/${email}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar disciplinas cadastradas');
            }
            const data = await response.json();
            setCadastradas(data);
        } catch (error) {
            console.error('Erro ao buscar disciplinas cadastradas:', error);
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
    
            fetchDisciplinasCadastradas(emailFromStorage);
    
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

    const renderFolder = ({ item }) => (
        <TouchableOpacity
            style={styles.folder}
            onPress={() => {
                console.log('Pasta clicada:', item); 
                navigation.navigate('Pasta', { pasta: item });
            }}
        >
            <View style={styles.folder}>
                <Text style={styles.folderText}>{item}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                <FlatList
                    data={cadastradas}
                    renderItem={renderFolder}
                    keyExtractor={(item) => item}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                        <Text style={styles.buttonText}>Cadastrar Disciplina</Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CameraPage')}>
                        <Text style={styles.buttonText}>CAMERA</Text>
                    </TouchableOpacity>
                </View>
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
        top: 20,
    },
    row: {
        justifyContent: 'space-between',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#112D4E',
        borderRadius: 25,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
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
    folder: {
        backgroundColor: '#112D4E',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: 150,
        alignItems: 'center',
    },
    folderText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
