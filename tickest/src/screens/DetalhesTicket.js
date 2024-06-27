import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ExibirTicket({ route, navigation }) {
    const { titulo, area, descricao } = route.params;

    const anexos = [
        { nome: "Anexo.zip", url: "https://example.com/anexo1.pdf" },
        { nome: "Anexo.docx", url: "https://example.com/anexo2.pdf" }
    ];

    const [showChatBalloon, setShowChatBalloon] = useState(false);

    const handleAssumirTicket = () => {
        Alert.alert(
            'Deseja assumir este ticket?',
            'Você tem certeza que deseja assumir este ticket?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancelado'),
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => {
                        setShowChatBalloon(true);
                        Alert.alert('Ticket assumido!', 'Você assumiu o ticket com sucesso!');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#696CFF" />
            <View style={styles.header}>
                <Text style={styles.title}>Detalhes do ticket</Text>
            </View>

            <ScrollView contentContainerStyle={styles.ticketContainer}>
                <View style={styles.section}>
                    <Text style={styles.label}>Título</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitulo}>Criado em: <Text style={styles.data}>24/05/2024</Text></Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitulo}>Criado por: <Text style={styles.autor}>Maria Alberto</Text></Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitulo}>Status: <Text style={styles.data}>Em análise</Text></Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.descricao}>Descrição</Text>
                </View>
                <View style={styles.descricaoContainer}>
                    <ScrollView contentContainerStyle={styles.descricaoScrollContent}>
                        <Text style={styles.descricaoTexto}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.section}>
                    <Text style={styles.descricao}>Anexos</Text>
                    <View style={styles.anexosContainer}>
                        {anexos.map((anexo, index) => (
                            <TouchableOpacity key={index} onPress={() => console.log(`Download ${anexo.url}`)}>
                                <Text style={styles.anexoText}>{anexo.nome}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                {showChatBalloon && (
                    <View style={styles.section}>
                        <Text style={styles.subtitulo}>Assumido por: <Text style={styles.autor}>Ana Letícia</Text></Text>
                    </View>
                )}
            </ScrollView>

            {!showChatBalloon && (
                <View style={styles.chatBalloonLeftContainer}>
                    <TouchableOpacity onPress={handleAssumirTicket}>
                        <Ionicons name="enter-sharp" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}

            {showChatBalloon && (
                <View style={styles.chatBalloonRightContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                        <Ionicons name="chatbubble-ellipses-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
    },
    header: {
        backgroundColor: '#696CFF',
        paddingVertical: 15,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        height: 80,
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginBottom: 7,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: "center",
    },
    ticketContainer: {
        paddingHorizontal: 25,
        paddingVertical: 20,
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 1,
        color: '#696CFF',
    },
    subtitulo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#A5A5A5',
    },
    data: {
        color: '#696CFF',
    },
    autor: {
        color: '#696CFF',
    },
    descricao: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#A5A5A5',
    },
    descricaoContainer: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#A5A5A5',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10
    },
    descricaoScrollContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        backgroundColor: "white"
    },
    descricaoTexto: {
        fontSize: 14,
        padding: 10
    },
    anexosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 10
    },
    anexoText: {
        color: '#696CFF',
        textDecorationLine: 'underline',
        fontSize: 14,
    },
    chatBalloonLeftContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#696CFF',
        borderRadius: 50,
        padding: 10,
    },
    chatBalloonRightContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#696CFF',
        borderRadius: 50,
        padding: 10,
    },
});

