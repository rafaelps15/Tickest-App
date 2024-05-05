import { Button } from "react-native";
import { Text, View, StyleSheet } from "react-native";

export default function Login({ navigation }) {
    return <View style={styles.container}>
        <Text>Login</Text>
        <Button title="Entrar" onPress={()=>navigation.navigate("Tabs")}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });