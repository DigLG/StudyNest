import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, TextInput} from 'react-native';

export default function Falta() {
    const navigation = useNavigation();
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
    mainContainer: {
        position: 'absolute',
        top: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: '#DBE2EF',
    },
    searchContainer:{
        position: 'absolute',
        top: 120,
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    SearchBorder:{
        position: 'absolute',
        top: 150,
        width: '60%',
        height: 2,
        backgroundColor: '#112D4E',
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
});
