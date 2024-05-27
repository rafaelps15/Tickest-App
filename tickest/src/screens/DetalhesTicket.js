import React from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ExibirTicket({ route, navigation }) {
    const { titulo, area, descricao } = route.params;

    const anexos = [
        { nome: "Anexo.zip", url: "https://example.com/anexo1.pdf" },
        { nome: "Anexo.docx", url: "https://example.com/anexo2.pdf" }
    ];

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
                    <Text style={styles.subtitulo}>Criado por: <Text style={styles.autor}>Josiney Cléverson</Text></Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.descricao}>Descrição</Text>
                </View>
                <View style={styles.descricaoContainer}>
                    <ScrollView contentContainerStyle={styles.descricaoScrollContent}>
                        <Text style={styles.descricaoTexto}>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
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
            </ScrollView>

            
            <View style={styles.chatBalloonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                    <Ionicons name="chatbubble-ellipses-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
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
    modos: {
        marginLeft: 10,
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
    chatBalloonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#696CFF',
        borderRadius: 50,
        padding: 10,
    },
});
