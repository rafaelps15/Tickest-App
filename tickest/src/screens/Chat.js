import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const scrollViewRef = useRef();

    useEffect(() => {
        // Scroll para a última mensagem ao carregar
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [messages]);

    useEffect(() => {
        // Adiciona mensagem de exemplo
        const exampleMessage = { 
            id: 0, 
            text: 'Olá, tudo bem?', 
            sender: 'other', 
            senderName: 'Maria Alberto',
            timestamp: new Date(),
            date: new Date().toLocaleDateString('pt-BR'),
        };
        setMessages([exampleMessage]);
    }, []);

    const handleMessageSend = () => {
        if (message.trim() === '') return;
        const newMessage = { 
            id: messages.length, 
            text: message, 
            sender: 'user',
            timestamp: new Date(),
            date: new Date().toLocaleDateString('pt-BR'),
        };
        setMessages([...messages, newMessage]);
        setMessage('');
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

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
                    <View key={msg.id}>
                        <Text style={styles.senderName}>{msg.senderName}</Text>
                        <View style={[styles.messageContainer, msg.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
                            <Text style={[styles.messageText, msg.sender === 'user' ? styles.userText : null]}>{msg.text}</Text>
                            <View style={styles.messageFooter}>
                                <Text style={[styles.timestamp, msg.sender === 'user' ? styles.userText : null]}>{formatTime(msg.timestamp)}</Text>
                                <Text style={[styles.dateTime, msg.sender === 'user' ? styles.userText : null]}>{`\u00A0\u00A0${msg.date}`}</Text>
                            </View>
                        </View>
                    </View>
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
        textAlign: 'center',
    },
    messagesContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
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
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ddd',
    },
    messageText: {
        fontSize: 16,
        color: 'black', // Cor da letra padrão para mensagens de outros usuários
    },
    userText: {
        color: 'white', // Cor da letra para mensagens do usuário
    },
    senderName: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
        marginLeft: 15,
    },
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
    },
    dateTime: {
        fontSize: 12,
        color: '#888', // Cor da data é a mesma do horário
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
});
