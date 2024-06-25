import axios from "axios";

export async function getLogin(email, password) {
    try {
      const response = await axios.post(`http://192.168.0.157:5000/API/App/Login`, {
        email: email,
        senha: password
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
          throw new Error(JSON.stringify(error.response.data));
      } else if (error.request) {
          throw new Error('Erro de rede: não foi possível conectar ao servidor');
      } else {
          throw new Error('Erro ao enviar solicitação');
      }
    }
}