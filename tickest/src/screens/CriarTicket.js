import React, { useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

export default function CriarTicket() {
    const [selectedValue1, setSelectedValue1] = useState("");
    const [selectedValue2, setSelectedValue2] = useState("");

    return (
        <View style={[styles.container]}>
            <StatusBar translucent backgroundColor="#696CFF" />
            <View style={styles.header}>
                <Text style={styles.title}>Criar ticket</Text>
            </View>

            <ScrollView contentContainerStyle={styles.formContainer}>
                <Text style={styles.label}>Título</Text>
                <TextInput style={styles.entrada} placeholder="Digite o título do ticket" />

                <Text style={styles.label}>Área</Text>
                <View style={[styles.entrada, styles.dropdown]}>
                    <Picker
                        selectedValue={selectedValue1}
                        onValueChange={(itemValue) => setSelectedValue1(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione uma área" value="" style={styles.labelArea} />
                        <Picker.Item label="Área 1" value="categoria1" />
                        <Picker.Item label="Área 2" value="categoria2" />
                    </Picker>
                </View>

                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={[styles.entrada, styles.textArea]}
                    placeholder="Descrição do ticket"
                    multiline
                    numberOfLines={4}
                />
                <Text style={styles.label}>Arquivos</Text>
                <TouchableOpacity style={styles.anexarBotao}>
                    <Ionicons name="attach" size={20} color="#696CFF" />
                    <Text style={styles.anexarTexto}>Anexar arquivos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao}>
                    <Text style={styles.textoBotao}>Criar Ticket</Text>
                </TouchableOpacity>
            </ScrollView>
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

    formContainer: {
        paddingHorizontal: 25,
        paddingVertical: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    labelArea: {
        fontSize: 13,
        marginBottom: 1,
        marginHorizontal: 17,

    },

    entrada: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff"
    },

    dropdown: {
        justifyContent: 'center',
    },

    picker: {
        height: 30,
        width: '100%',
    },

    textArea: {
        height: 100,
    },

    anexarBotao: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff"
    },

    anexarTexto: {
        fontSize: 16,
        color: '#696CFF',
        marginLeft: 10,
    },

    botao: {
        backgroundColor: '#696CFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 15
    },

    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
