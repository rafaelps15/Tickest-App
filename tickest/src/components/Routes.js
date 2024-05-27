import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Menu from "../screens/Menu";
import DetalhesTicket from "../screens/DetalhesTicket";
import Chat from "../screens/Chat";

const Tab = createNativeStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Tab.Screen name="Tabs" component={Menu} options={{headerShown: false}}/>
                <Tab.Screen name="DetalhesTicket" component={DetalhesTicket} options={{headerShown: false}}/>
                <Tab.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}