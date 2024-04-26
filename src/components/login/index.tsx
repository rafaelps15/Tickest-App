import { StatusBar } from "expo-status-bar";
import React, { useState } from "react"; 
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";

// export default function App() {
//   const [nome, setNome] = useState("");
//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");



export function Login() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastro = () => {
    // alert(nome);
    // alert(email);
    // alert(senha);
    // Fazer a chamada no back-end para cadastro
  };


  return (

    <View style={styles.login}>
      <StatusBar hidden />

      <Image
        style={{ width: 200, height: 70, marginTop: 20, marginBottom: 30 }}
        source={require("../../../assets/logo.png")}
      />

      <TextInput
        placeholder="Digite o Nome Completo"
        placeholderTextColor="white"
        style={styles.textInput}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        placeholder="Digite seu Email"
        placeholderTextColor="white"
        autoCorrect={false}
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Digite sua Senha"
        placeholderTextColor="white"
        autoCorrect={false}
        style={styles.textInput}
        onChangeText={(text) => setSenha(text)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirme sua Senha"
        placeholderTextColor="white"
        autoCorrect={false}
        style={styles.textInput}
        onChangeText={(text) => setSenha(text)}
      />

      {
        <TouchableOpacity style={styles.btnCadastro} onPress={cadastro}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            CADASTRAR
          </Text>
        </TouchableOpacity>
      }
    </View>

  )
}

