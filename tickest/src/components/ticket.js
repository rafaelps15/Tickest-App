import React from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export function Ticket(props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DetalhesTicket', { TicketId: 10 })} activeOpacity={0.8}>
            <Card style={[styles.card, { borderRightColor: props.borderRightColor }]}>
                <Text style={styles.descricao}>{props.titulo}</Text>
                <Text style={styles.texto}>{props.area}</Text>
                <Text style={[styles.texto,{ color: props.borderRightColor }]}>{props.etapa}</Text>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 25,
        marginTop: 10,
        padding: 10,
        paddingRight: 20, 
        backgroundColor: 'white',
        borderRadius: 8,
        borderTopRightRadius: 20, 
        borderBottomRightRadius: 20,
        borderRightWidth: 10, 
    },
    descricao: {
        color: '#696CFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
        marginLeft: 5
    },
    texto: {
        marginBottom: 4,
        marginLeft: 5
    },
});
