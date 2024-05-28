import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../pages/Login'
import Falta from '../pages/Falta'
import Resumo from '../pages/Resumo'
import Perfil from '../pages/Perfil'
import EditarPerfil from '../pages/EditarPerfil'

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component= {Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Falta"
                component= {Falta}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Resumo"
                component= {Resumo}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Perfil"
                component = {Perfil}
                options = {{headerShown: false}}
            />
            <Stack.Screen
                name="EditarPerfil"
                component = {EditarPerfil}
                options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}