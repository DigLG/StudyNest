import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import StackRoutes from "./stack.routes";

export default function Routes() {
    useEffect(() => {
        setupNotificationChannel();
        requestPermissions();
    }, []);

    const setupNotificationChannel = async () => {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'Default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    };

    const requestPermissions = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            await Notifications.requestPermissionsAsync();
        }
    };
    return(
        <NavigationContainer>
            <StackRoutes/>
        </NavigationContainer>

    )
}