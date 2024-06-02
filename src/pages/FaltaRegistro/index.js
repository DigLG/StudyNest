import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FaltaRegistro() {
    const navigation = useNavigation();
    const [faltas, setFaltas] = useState(0);
    useEffect(() => {
        const loadFaltas = async () => {
            try {
                const storedFaltas = await AsyncStorage.getItem('faltas');
                if (storedFaltas !== null) {
                    setFaltas(parseInt(storedFaltas, 10));
                }
            } catch (e) {
                console.error('Failed to load faltas from storage', e);
            }
        };

        loadFaltas();
    }, []);
    const increaseFaltas = () => setFaltas(faltas + 1);
    const decreaseFaltas = () => setFaltas(faltas > 0 ? faltas - 1 : 0);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.returnContainer} onPress={() => navigation.navigate('Falta')}>
                <Image source={require('../../assets/back_button.png')} style={styles.back_button} />
            </TouchableOpacity>
            <View style={styles.creditContainer}>
                <Text style={styles.white_text}>CRÉDITOS</Text>
                <Text style={styles.white_text}>X CRÉDITOS     </Text>
            </View>
            <View style={styles.totalClassContainer}>
                <Text style={styles.white_text}>AULAS TOTAIS</Text>
                <Text style={styles.white_text}>X AULAS           </Text>
            </View>
            <View style={styles.totalMissContainer}>
                <Text style={styles.white_text}>FALTAS TOTAIS</Text>
                <Text style={styles.white_text}>X FALTAS          </Text>
            </View>
            <View style={styles.currentMissContainer}>
                <Text style={styles.white_text}>FALTAS ATUAIS</Text>
                <View style={styles.rightContainer}>
                    <Text style={styles.white_text}>{faltas} FALTAS   </Text>
                    <Image source={require('../../assets/white_eye.png')} style={styles.eye} />
                </View>
            </View>
            <View style={styles.criteriaContainer}>
                <Text style={styles.white_text}>CRITÉRIO</Text>
                <Text style={styles.white_text}>X% PRESENÇA</Text>
            </View>
            <View style={styles.disciplineContainer}>
                <Text style={styles.discipline_text}>DISCIPLINA</Text>
            </View>
            <View style={styles.verticalLine}/>
            <View style={styles.registerContainer}>
                <Text style={styles.blue_text}>REGISTRAR FALTA</Text>
            </View>
            <View style={styles.containerPlusMinus}>
                <TouchableOpacity style={styles.plusMinus} onPress={decreaseFaltas}>
                    <Text style={styles.button_text}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.plusMinus} onPress={increaseFaltas}>
                    <Text style={styles.button_text}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    returnContainer: {
        position: 'absolute',
        bottom: 1,
        left: 0,
        flex: 1,
        width: '15%',
        height: 60,
        top: 45,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    creditContainer: {
        position: 'absolute',
        flexDirection: 'row',
        top: 150,
        height: 80,
        width: '80%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        backgroundColor: '#112D4E',
    },
    totalClassContainer:{
        position: 'absolute',
        flexDirection: 'row',
        top: 230,
        height: 80,
        width: '80%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#112D4E',
    },
    totalMissContainer:{
        position: 'absolute',
        flexDirection: 'row',
        top: 310,
        height: 80,
        width: '80%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#112D4E',
    },
    currentMissContainer:{
        position: 'absolute',
        flexDirection: 'row',
        top: 390,
        height: 80,
        width: '80%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#112D4E',
    },
    rightContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    criteriaContainer:{
        position: 'absolute',
        flexDirection: 'row',
        top: 470,
        height: 80,
        width: '80%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#112D4E',
    },
    disciplineContainer:{
        position: 'absolute',
        alignItems: 'center',
        top: 550,
        height: 100,
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#DBE2EF',
    },
    verticalLine: {
        width: 3,
        height: '45%',
        backgroundColor: '#fff',
        bottom: 55
    },
    registerContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 660,
    },
    containerPlusMinus:{
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        bottom: 10,
    },
    plusMinus:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        height: 80,
        borderRadius: 25,
        backgroundColor: '#DBE2EF',
    },
    white_text:{
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    blue_text:{
        color: '#112D4E',
        fontSize: 15,
        fontWeight: 'bold',
    },
    button_text:{
        color: '#112D4E',
        fontSize: 45,
        fontWeight: 'bold',
    },
    discipline_text:{
        color: '#112D4E',
        fontSize: 25,
        fontWeight: 'bold',
    },
    back_button: {
        width: 50,
        height: 50,
    },
    eye:{
        width: 20,
        height: 20,
        marginLeft: 5,
    }
});