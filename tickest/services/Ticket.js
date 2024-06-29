import axios from "axios";
import { API_BASE_URL } from '../env';
export async function getTicket(ticket_id) {
   
    try {
      const response = await axios.get(`${API_BASE_URL}/API/app/ticket/${ticket_id}`);
      console.log(response.data);
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

export async function getTicketMessages(ticket_id) {
   
    try {
      const response = await axios.get(`${API_BASE_URL}/API/app/ticket/messages/${ticket_id}`);
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