import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Foto(){
    const navigation = useNavigation();
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const [disciplinaNome, setDisciplinaNome] = useState('');
    const [turma, setTurma] = useState('');

    const handleButtonPress = () => {
        setModalVisible(true);
    };

    const handleConfirmarPress = () => {
        console.log("Nome da disciplina:", disciplinaNome);
        console.log("Turma:", turma);
        setModalVisible(false);
    };

    const handleCancelarPress = () => {
        setModalVisible(false);
    };

    return(
        <View style={styles.container}>
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
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, styles.leftAlign]}>*Nome/Código da Disciplina:</Text>
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            onChangeText={text => setDisciplinaNome(text)}
                            value={disciplinaNome}
                        />
                        <Text style={[styles.modalText, styles.leftAlign]}>Turma:</Text>
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            onChangeText={text => setTurma(text)}
                            value={turma}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.openButton}
                                onPress={handleConfirmarPress}
                            >
                                <Text style={styles.textStyle}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.openButton}
                                onPress={handleCancelarPress}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
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
        marginTop: 22
    },
    modalView: {
        backgroundColor: "#D9D9D9",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
        width: '100%'
    },
    openButton: {
        backgroundColor: "#112D4E",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});
