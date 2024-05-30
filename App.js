import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import Routes from './src/routes';

export default function App() {
    return(
        <>
            <StatusBar backgroundColor="#F9F7F7" barStyle="light-content"/>
            <Routes/>
        </>
    );
}