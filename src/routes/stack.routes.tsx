import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../pages/Login'
import Falta from '../pages/Falta'
import Resumo from '../pages/Resumo'
import Perfil from '../pages/Perfil'
import EditarPerfil from '../pages/EditarPerfil'
import Cadastro from '../pages/Cadastro'
import RecuperarSenha from '../pages/RecuperarSenha'
import CodigoValidacao from '../pages/CodigoValidacao'
import NovaSenha from '../pages/NovaSenha'
import CameraPage from '../pages/CameraPage'
import Pasta from "../pages/Pasta";

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
                name="MainDrawer"
                component= {DrawerRoutes}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="Falta"
                component= {Falta}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Cadastro"
                component= {Cadastro}
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
            <Stack.Screen
                name="RecuperarSenha"
                component = {RecuperarSenha}
                options = {{headerShown: false}}
            />
            <Stack.Screen
                name="CodigoValidacao"
                component= {CodigoValidacao}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NovaSenha"
                component= {NovaSenha}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CameraPage"
                component= {CameraPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Pasta"
                component= {Pasta}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
        )
}