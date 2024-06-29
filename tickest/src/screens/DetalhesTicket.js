import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import {getTicket} from '../../services/Ticket';
import { API_BASE_URL } from '../../env';
import { AuthContext } from '../../services/AuthContext'
export default function ExibirTicket({ route, navigation }) {
    const { TicketId } = route.params;
    const [showChatBalloon, setShowChatBalloon] = useState(false);
    const [ticket, setTicket] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
      fetchTicket(TicketId); 



    }, []);



    async function fetchTicket(ticket_id){
        try{
            const data = await getTicket(ticket_id);
            setTicket(data.ticket);
            console.log(data.ticket.destinatarioId);
                   
        if(data.ticket.destinatarioId == user.id ){
            setShowChatBalloon(true);
        }
        }catch(error){
            console.log(error);
        }
    }

    


   

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
    if(!ticket.usuario) return null;
    if(!ticket.anexos) return null;
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#696CFF" />
            <View style={styles.header}>
                <Text style={styles.title}>Detalhes do ticket</Text>
            </View>

            <ScrollView contentContainerStyle={styles.ticketContainer}>
                <View style={styles.section}>
                    <Text style={styles.label}>{ticket.título}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitulo}>Criado em: <Text style={styles.data}>{ticket.data_Criação}</Text></Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitulo}>Criado por: <Text style={styles.autor}>{ticket.usuario.nome}</Text></Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitulo}>Status: <Text style={styles.data}>{ticket.status_nome}</Text></Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.descricao}>Descrição</Text>
                </View>
                <View style={styles.descricaoContainer}>
                    <ScrollView contentContainerStyle={styles.descricaoScrollContent}>
                        <Text style={styles.descricaoTexto}>
                        {ticket.descrição}
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.section}>
                    <Text style={styles.descricao}>Anexos</Text>
                    <View style={styles.anexosContainer}>
                        {ticket.anexos.map((anexo, index) => (
                            <TouchableOpacity key={index} onPress={() => console.log(`Download ${API_BASE_URL+"/"+anexo.endereco}`)}>
                                <Text style={styles.anexoText}>{anexo.endereco}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                {showChatBalloon && (
                    <View style={styles.section}>
                        <Text style={styles.subtitulo}>Assumido por: <Text style={styles.autor}>{user.nome}</Text></Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate('Chat', { ticket_id: TicketId })}>
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

