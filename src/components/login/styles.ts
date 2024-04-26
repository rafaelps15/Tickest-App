import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
        login: {
          flex: 1,
          backgroundColor: '#1A1A1A',
          alignItems: 'center',
          justifyContent:'center',
          padding: 20,
        },
       
        textInput: {
          width: '100%',
          height: 40,
          backgroundColor: '#999BFF',
          borderRadius:10,
          paddingLeft:20,
          marginBottom:15,
        },
        btnCadastro: {
          width: '100%',
          height: 40,
          backgroundColor: '#999BFF',
          borderRadius: 20,
          justifyContent: 'center'
        },

        
    
});

// return (
    
//     <View style={styles.container}>
//       <StatusBar hidden />

//       <Image
//         style={{ width: 200, height: 70, marginTop: 20, marginBottom: 30 }}
//         source={require("./assets/logo.png")}
//       />

//       <TextInput 
//         placeholder="Digite o Nome Completo"
//         placeholderTextColor="white"
//         style={styles.textInput}
//         onChangeText={(text) => setNome(text)}
//       />
//       <TextInput
//         placeholder="Digite seu Email"
//         placeholderTextColor="white"
//         autoCorrect={false}
//         style={styles.textInput}
//         onChangeText={(text) => setEmail(text)}
//       />
//       <TextInput
//         secureTextEntry={true}
//         placeholder="Digite sua Senha"
//         placeholderTextColor="white"
//         autoCorrect={false}
//         style={styles.textInput}
//         onChangeText={(text) => setSenha(text)}
//       />
//       <TextInput
//         secureTextEntry={true}
//         placeholder="Confirme sua Senha"
//         placeholderTextColor="white"
//         autoCorrect={false}
//         style={styles.textInput}
//         onChangeText={(text) => setSenha(text)}
//       />

//       {
//         <TouchableOpacity style={styles.btnCadastro} onPress={cadastro}>
//           <Text style={{ color: 'white', textAlign: 'center' }}>
//             CADASTRAR
//           </Text>
//         </TouchableOpacity>
//       }
//     </View>
 
// );
// }

  