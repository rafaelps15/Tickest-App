import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import {getTicketMessages} from '../../services/Ticket';
import { AuthContext } from '../../services/AuthContext'
import { API_BASE_URL } from '../../env';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

export default function Chat({ route }) {
    const [connection, setConnection] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { ticket_id } = route.params;
    const [group] = useState("Group-"+ticket_id); // Nome do grupo
    const { user } = useContext(AuthContext);
    const scrollViewRef = useRef();

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_BASE_URL}/chatHub`)
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('ReceiveGroupMessage', (message) => {
                        setMessages(prevMessages => [...prevMessages, {
                            id: prevMessages.length,
                            text: message.message,
                            sender: message.from_id === user.id ? 'user' : 'other',
                            senderName: message.from.toString(),
                            timestamp: new Date(message.dateTime)
                          }]);
                    });

                    connection.send('JoinGroup', group);
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    useEffect(() => {
        fetchMessages(ticket_id); 
      }, []);

      async function fetchMessages(ticket_id){
        try{
            const data = await getTicketMessages(ticket_id);
            const messages2 = data.messages;
            console.log(messages2);
            if (messages2 && messages2.length > 0) {
                setMessages(messages2.map((msg, index) => ({
                  id: index,
                  text: msg.msg_content,
                  sender: msg.user_id_from === user.id ? 'user' : 'other',
                  senderName: msg.user_id_from === user.id ? user.name : msg.user_from.nome,
                  timestamp: msg.dataHora
                })));
              } else {
                setMessages([]);
              }

        }catch(error){
            console.log(error);
        }
    }
  
    useEffect(() => {
        // Scroll para a última mensagem ao carregar
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [messages]);



    const handleMessageSend = async () => {
        if (message.trim() === '') return;
        try {
            const data = {
              from: user.id,
              ticket_id: ticket_id, 
              msg: message,
            };
      
            const response = await axios.post(`${API_BASE_URL}/enviarMobile`, data);
      
            setMessage('');

          } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
          }
    };
    if(!messages) return null;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Chat</Text>
            </View>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.messagesContainer}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {messages.map((msg, index) => (
                    <Message key={msg.id} text={msg.text} sender={msg.sender} senderName={msg.senderName} index={index} timestamp={msg.timestamp} />
                ))}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inputContainer}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    onSubmitEditing={handleMessageSend}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleMessageSend}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
    
}
const Message = ({ text, sender, senderName, index,timestamp }) => {
    const isUser = sender === 'user';
    const messageStyle = isUser ? styles.userMessage : styles.otherMessage;
    const messageTextColor = isUser ? 'white' : 'black';
    const showSenderName = !isUser;
    const formattedTime = timestamp ? formatTime(timestamp) : '';
    return (
        <View>
            {showSenderName && <Text style={styles.senderName}>{senderName}</Text>}
            <View style={[styles.messageContainer, messageStyle]}>
                <Text style={[styles.messageText, { color: messageTextColor }]}>{text}</Text>
                <Text style={[styles.timestamp, { color: messageTextColor }]}>{formattedTime}</Text>
            </View>
        </View>
    );
};

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        backgroundColor: '#696CFF',
        paddingVertical: 15,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        height: 80,
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginBottom: 20,
    },

    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: "center",
    },

    messagesContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    messageContainer: {
        maxWidth: '80%',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#696CFF',
        marginTop: 0, // Removendo espaço acima do balão do usuário
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ddd',
    },
    messageText: {
        fontSize: 16,
    },
    senderName: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
        marginLeft: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#696CFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    timestamp: {
        fontSize: 10,
        color: '#888',
        alignSelf: 'flex-end',
        marginTop: 3,
        marginLeft: 10,
      },
});