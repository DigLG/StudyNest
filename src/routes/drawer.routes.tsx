import { createDrawerNavigator } from "@react-navigation/drawer";

import Foto from "../pages/Foto";
import Falta from '../pages/Falta'
import Resumo from '../pages/Resumo'
import Perfil from '../pages/Perfil'

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
        </Drawer.Navigator>
    )
}