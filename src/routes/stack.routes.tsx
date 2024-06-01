import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../pages/Login'
import Cadastro from "../pages/Cadastro";
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
                name="Cadastro"
                component = {Cadastro}
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