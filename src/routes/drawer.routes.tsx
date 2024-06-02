import { createDrawerNavigator } from "@react-navigation/drawer";

import Foto from "../pages/Foto";
import Falta from '../pages/Falta'
import Resumo from '../pages/Resumo'
import Perfil from '../pages/Perfil'
import FaltaRegistro from '../pages/FaltaRegistro';
import Configuracao from '../pages/Configuracao'

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen
                name = "Foto"
                component={Foto}
            />
            <Drawer.Screen
                name="Falta"
                component= {Falta}
                options={{headerShown: false}}
            />
            <Drawer.Screen
                name="Resumo"
                component= {Resumo}
                options={{headerShown: false}}
            />
            <Drawer.Screen
                name="Perfil"
                component = {Perfil}
                options = {{headerShown: false}}
            />
            <Drawer.Screen
                name="Configuração"
                component = {Configuracao}
                options = {{headerShown: false}}
            />
            <Drawer.Screen //ESTOU COLOCANDO AQUI TEMPORARIAMENTE PARA REALIZAR TESTES
                name="FaltaRegistro"
                component = {FaltaRegistro}
                options = {{headerShown: false}}
            />
        </Drawer.Navigator>
    )
}