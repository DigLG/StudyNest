import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../pages/Login'
import Foto from '../pages/Foto'
import Falta from '../pages/Falta'
import Resumo from '../pages/Resumo'
import Perfil from '../pages/Perfil'
import EditarPerfil from '../pages/EditarPerfil'
import DrawerRoutes from "./drawer.routes";

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component= {Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Foto"
                component= {DrawerRoutes}
                options={{ headerShown: false}}
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