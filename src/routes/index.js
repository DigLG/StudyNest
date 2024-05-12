import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../pages/Login'
import Foto from '../pages/Foto'

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
                name="Foto"
                component= {Foto}
                options={{ headerShown: true}}
            />
        </Stack.Navigator>
    )
}