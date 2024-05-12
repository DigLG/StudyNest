import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../pages/Login'
import Falta from '../pages/Falta'
import Resumo from '../pages/Resumo'

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
        </Stack.Navigator>
    )
}