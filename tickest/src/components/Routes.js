import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Menu from "../screens/Menu";
import DetalhesTicket from "../screens/DetalhesTicket";
import Chat from "../screens/Chat";
import { AuthContext } from "../../services/AuthContext";
import { useContext } from "react";

const Tab = createNativeStackNavigator();

export default function Routes(){
    const { user } = useContext(AuthContext);
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={user ? "Tabs" : "Login"}>
                <Tab.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Tab.Screen name="Tabs" component={Menu} options={{headerShown: false}}/>
                <Tab.Screen name="DetalhesTicket" component={DetalhesTicket} options={{headerShown: false}}/>
                <Tab.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}