import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TextInput, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Resumo() {
    const navigation = useNavigation();
    const [emailFromStorage, setEmailFromStorage] = useState('');
    const [resumos, setResumos] = useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
const [selectedResumo, setSelectedResumo] = React.useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getEmailFromStorage();
                await fetchResumos();
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        fetchData();
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

    const fetchResumos = async () => {
        try {
            const response = await fetch('https://studynest-api.onrender.com/resumos');
            if (response.ok) { 
                const data = await response.json();
                if (data && data.length > 0) {
                    setResumos(data);
                }
            } else {
                console.error('Erro na resposta da API:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar resumos:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => {
                setSelectedResumo(item.conteudo);
                setModalVisible(true);
            }}>
                <Text style={styles.itemTitle}>{item.codigo_disciplina} - {item.nome_disciplina}</Text>
                <Text style={styles.itemText}>{item.titulo}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Image source={require('../../assets/search.png')} style={styles.search} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar..."
                    placeholderTextColor="#888"
                />
                <Image source={require('../../assets/filter.png')} style={styles.filter} />
            </View>
            <View style={styles.SearchBorder} />
            <TouchableOpacity style={styles.addSummaryButton} onPress={() => navigation.navigate('CriarResumo')}>
                <Text style={styles.addSummaryButtonText}>Criar Resumo</Text>
            </TouchableOpacity> 
            <FlatList
                style={styles.flatList}
                data={resumos}
                renderItem={renderItem}
                keyExtractor={item => item}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{selectedResumo}</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F7F7',
    },
    searchContainer:{
        position: 'absolute',
        top: 30,
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    SearchBorder:{
        position: 'absolute',
        top: 60,
        width: '65%',
        height: 2,
        backgroundColor: '#112D4E',
    },
    addSummaryButton: {
        position: 'absolute',
        top: 100,
        paddingVertical:10,
        width: '80%',
        alignItems: 'center',
        borderColor: '#000',
        borderRadius: 25,
        backgroundColor: '#112D4E',
    },
    addSummaryButtonText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    menu: {
        width: 50,
        height: 50,
    },
    profile: {
        width: 50,
        height: 50,
    },
    search: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    filter: {
        width: 30,
        height: 30,
        marginLeft: 'auto',
    },
    flatList: {
        marginTop: 180,
        width: '80%',
    },
    itemContainer: {
        backgroundColor: '#112D4E',
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
    },
    itemText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
        marginBottom: 15,
    }
});