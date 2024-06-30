import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert, Animated } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ExibirTicket({ route, navigation }) {
    const { titulo, area, descricao } = route.params;

    const anexos = [
        { nome: "Anexo.zip", url: "https://example.com/anexo1.pdf" },
        { nome: "Anexo.docx", url: "https://example.com/anexo2.pdf" }
    ];

    const [showChatBalloon, setShowChatBalloon] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const [popoverAnimation] = useState(new Animated.Value(0)); // Estado para controlar a animação do popover
    const [statusTicket, setStatusTicket] = useState('Em análise');
    const [showButtons, setShowButtons] = useState(true); // Estado para controlar a visibilidade dos botões do popover

    const handleAssumirTicket = () => {
        Alert.alert(
            'Assumir ticket?',
            'Você tem certeza que deseja assumir este ticket?',
            [
                {
                    text: 'Não',
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

    const handleAdditionalButtonPress = () => {
        if (showPopover) {
            hidePopover();
        } else {
            setShowPopover(true);
            // Animação para mostrar o popover
            Animated.timing(popoverAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleCheck = () => {
        // Exibir popup para concluir o ticket
        Alert.alert(
            'Concluir este ticket?',
            'Deseja concluir este ticket?',
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancelado'),
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => {
                        // Atualiza o status para "Concluído"
                        setStatusTicket('Concluído');
                        // Esconde os botões do popover
                        hidePopover();
                    }
                }
            ]
        );
    };

    const handleCancel = () => {
        // Exibir popup para cancelar o ticket
        Alert.alert(
            'Cancelar este ticket?',
            'Tem certeza que deseja cancelar este ticket?',
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancelado'),
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => {
                        // Lógica para cancelar o ticket
                        hidePopover();
                    }
                }
            ]
        );
    };

    const hidePopover = () => {
        // Animação para esconder o popover
        Animated.timing(popoverAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setShowPopover(false);
        });
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
                    <Text style={styles.subtitulo}>Status: <Text style={styles.data}>{statusTicket}</Text></Text>
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
                        <Ionicons name="enter-sharp" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}

            {showChatBalloon && (
                <View style={styles.chatBalloonRightContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}

            {showChatBalloon && (
                <View style={styles.additionalButtonContainer}>
                    <TouchableOpacity onPress={handleAdditionalButtonPress}>
                        <Ionicons name="newspaper-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}

            {showPopover && (
                <Animated.View
                    style={[
                        styles.popoverContainer,
                        {
                            transform: [
                                {
                                    translateX: popoverAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 1], // Ajuste conforme necessário para o efeito desejado
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    {showButtons && (
                        <>
                            <TouchableOpacity onPress={handleCheck} style={styles.popoverButton}>
                                <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCancel} style={styles.popoverButton}>
                                <Ionicons name="close-circle-outline" size={24} color="#fff" />
                            </TouchableOpacity>
                        </>
                    )}
                </Animated.View>
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
    additionalButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#696CFF',
        borderRadius: 50,
        padding: 10,
    },
    popoverContainer: {
        position: 'absolute',
        bottom: 26.9,
        left: 58,
        flexDirection: 'row',
        backgroundColor: '#696CFF',
        borderRadius: 0,
        borderTopRightRadius: 10, // Removendo o border radius do lado direito
        borderBottomRightRadius: 10, // Removendo o border radius do lado direito
        paddingLeft: 7,
        paddingTop: 3,
        height: 30,
        width: 100
    },
    popoverButton: {
        marginHorizontal: 9,
    },
});
