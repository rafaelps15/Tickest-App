import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, Pressable } from "react-native";
import { Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { getLogin } from "../../services/GetUser";
import { AuthContext } from "../../services/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [lembrarSenha, setLembrarSenha] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const buttonLogin = async() => {
    try{
      const userData = await getLogin(email,password);
      if(!userData.message){
        console.log("Usuário encontrado:", userData);
        signIn(userData);
        navigation.navigate("Tabs");
      }else{
        console.log("Não Entrou!")
      }
    } catch(error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Usuário não existe ou senha está incorreta!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/logo/LogoVaziaBranca.png")} style={styles.logo} />
      </View>

      <View style={styles.login}>
        <Text style={styles.titulo}>Seja bem-vindo!</Text>

        <TextInput
          style={styles.entrada}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#A5A5A5"
        />

        <View style={styles.containerSenha}>
          <TextInput
            style={[styles.entrada, styles.entradaSenha]}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword} 
            secureTextEntry={!senhaVisivel}
            placeholderTextColor="#A5A5A5"
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.iconeOlho}>
            <Ionicons name={senhaVisivel ? "eye-off-outline" : "eye-outline"} size={24} color="#A5A5A5" />
          </TouchableOpacity>
        </View>

        <View style={styles.containerCheckbox}>
          <Checkbox
            status={lembrarSenha ? "checked" : "unchecked"}
            onPress={() => setLembrarSenha(!lembrarSenha)}
            color="#696CFF"
          />
          <Text style={styles.labelCheckbox}>Lembrar senha</Text>
        </View>

        <TouchableOpacity style={styles.botaoLogin} onPress={buttonLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoEsqueceuSenha}>
          <Text style={styles.textoEsqueceuSenha}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    backgroundColor: "white"
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  imagem: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginBottom: 9,
  },

  entrada: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  containerSenha: {
    flexDirection: "row",
    alignItems: "center",
  },

  entradaSenha: {
    flex: 1,
  },

  iconeOlho: {
    position: "absolute",
    right: 10,
    top: 15,
  },

  botaoLogin: {
    backgroundColor: "#696CFF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoEsqueceuSenha: {
    alignItems: "flex-end",
    marginBottom: 20,
  },

  textoEsqueceuSenha: {
    color: "#696CFF",
    fontSize: 14,
  },

  containerCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  labelCheckbox: {
    marginLeft: 2,
    fontSize: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#696CFF',
    paddingVertical: 15,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    height: 170,
  },

  logo: {
    width: 270,
    height: 75,
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },

  login: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingTop: getStatusBarHeight(),
    marginTop: 50
  }
});