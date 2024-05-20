import { createDrawerNavigator } from "@react-navigation/drawer";

import Foto from "../pages/Foto";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen
                name = "Foto"
                component={Foto}
            />
        </Drawer.Navigator>
    )
}