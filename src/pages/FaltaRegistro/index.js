import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FaltaRegistro() {
    const navigation = useNavigation();
    const [faltas, setFaltas] = useState(0);

    useEffect(() => {
        requestPermissions();
        loadFaltas();
    }, []);

    useEffect(() => {
        if (faltas > 5) {
            scheduleFixedNotifications();
        } 
        else {
            cancelAllNotifications();
        }
    }, [faltas]);

    const requestPermissions = async () => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission not granted for notifications');
                console.warn('Notification permissions not granted');
            } else {
                console.log('Notification permissions granted');
            }
        } catch (error) {
            console.error('Error requesting notification permissions:', error);
        }
    };

    const loadFaltas = async () => {
        try {
            const savedFaltas = await AsyncStorage.getItem('faltas');
            if (savedFaltas !== null) {
                setFaltas(parseInt(savedFaltas, 10));
            }
        } catch (error) {
            console.error('Failed to load faltas:', error);
        }
    };

    const saveFaltas = async (newFaltas) => {
        try {
            await AsyncStorage.setItem('faltas', newFaltas.toString());
        } catch (error) {
            console.error('Failed to save faltas:', error);
        }
    };

    const createNotificationChannel = async () => {
        if (Platform.OS === 'android') {
            try {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'Default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
                console.log("Notification channel created");
            } catch (error) {
                console.error('Error creating notification channel:', error);
            }
        }
    };

    const cancelAllNotifications = async () => {
        try {
            await Notifications.cancelAllScheduledNotificationsAsync();
            console.log("All notifications cancelled");
        } catch (error) {
            console.error('Error cancelling notifications:', error);
        }
    };

    const scheduleFixedNotifications = () => {
        cancelAllNotifications();
        createNotificationChannel();

        const notificationTimes = [
            { day: 1, hour: 23, minute: 22 },
            { day: 1, hour: 23, minute: 23 },
        ];

        notificationTimes.forEach(({ day, hour, minute }) => {
            scheduleWeeklyNotification(day, hour, minute, faltas);
        });
    };

    const scheduleWeeklyNotification = async (day, hour, minute, faltas) => {
        const now = new Date();
        let nextNotificationDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + ((day + 7 - now.getDay()) % 7),
            hour,
            minute,
            0,
            0
        );
    
        if (nextNotificationDate <= now) {
            nextNotificationDate.setDate(nextNotificationDate.getDate() + 7);
        }
    
        const remainingFaltas = 8 - faltas;
    
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "AVISO: FALTAS",
                body: `Você pode faltar somente ${remainingFaltas}, preste atenção.`,
                data: { data: 'goes here' },
            },
            trigger: {
                date: nextNotificationDate,
                repeats: true,
            },
        });
    };

    const increaseFaltas = () => {
        const newFaltas = faltas + 1;
        setFaltas(newFaltas);
        saveFaltas(newFaltas);
    };

    const decreaseFaltas = () => {
        const newFaltas = Math.max(0, faltas - 1);
        setFaltas(newFaltas);
        saveFaltas(newFaltas);
    };
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
                <Text style={styles.white_text}>8 FALTAS          </Text>
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
        marginHorizontal: 10,
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