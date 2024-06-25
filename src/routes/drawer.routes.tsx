import { createDrawerNavigator } from "@react-navigation/drawer";
import {Image, TouchableOpacity } from 'react-native';

import Foto from "../pages/Foto";
import Falta from '../pages/Falta'
import Resumo from '../pages/Resumo'
import Configuracao from '../pages/Configuracao'

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen
                name = "Foto"
                component={Foto}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                            <Image
                                source={require('../assets/profile.png')}
                                style={{ width: 40, height: 40, marginRight: 15 }}
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Drawer.Screen
                name="Falta"
                component= {Falta}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                            <Image
                                source={require('../assets/profile.png')}
                                style={{ width: 40, height: 40, marginRight: 15 }}
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Drawer.Screen
                name="Resumo"
                component= {Resumo}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                            <Image
                                source={require('../assets/profile.png')}
                                style={{ width: 40, height: 40, marginRight: 15 }}
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Drawer.Screen
                name="Configuração"
                component = {Configuracao}
                options = {{headerShown: false}}
            />
        </Drawer.Navigator>
    )
}