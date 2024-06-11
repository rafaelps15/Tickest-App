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
        const exampleMessage = { id: 0, text: 'Olá, tudo bem?', sender: 'other', senderName: 'Maria Alberto' };
        setMessages([exampleMessage]);
    }, []);

    const handleMessageSend = () => {
        if (message.trim() === '') return;
        const newMessage = { id: messages.length, text: message, sender: 'user' };
        setMessages([...messages, newMessage]);
        setMessage('');
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
                    <Message key={msg.id} text={msg.text} sender={msg.sender} senderName={msg.senderName} index={index} />
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

const Message = ({ text, sender, senderName, index }) => {
    const isUser = sender === 'user';
    const messageStyle = isUser ? styles.userMessage : styles.otherMessage;
    const messageTextColor = isUser ? 'white' : 'black';
    const showSenderName = !isUser && (index === 0 || messages[index - 1]?.sender !== 'other');

    return (
        <View>
            {showSenderName && <Text style={styles.senderName}>{senderName}</Text>}
            <View style={[styles.messageContainer, messageStyle]}>
                <Text style={[styles.messageText, { color: messageTextColor }]}>{text}</Text>
            </View>
        </View>
    );
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
});
