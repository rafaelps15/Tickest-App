import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function Perfil() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Perfil</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.content}>
                    <Text style={styles.infoText}>
                        <Text style={styles.label}>E-mail: </Text>
                        <Text style={styles.info}>gerenciador@localhost.com</Text>
                    </Text>
                    <View style={styles.line}></View>

                    <Text style={styles.infoText}>
                        <Text style={styles.label}>Nome: </Text>
                        <Text style={styles.info}>Nome</Text>
                    </Text>
                    <View style={styles.line}></View>

                    <Text style={styles.infoText}>
                        <Text style={styles.label}>ID: </Text>
                        <Text style={styles.info}>#123456</Text>
                    </Text>
                    <View style={styles.line}></View>

                    <Text style={styles.infoText}>
                        <Text style={styles.label}>Cargo: </Text>
                        <Text style={styles.info}>Gerenciador</Text>
                    </Text>
                    <View style={styles.line}></View>

                    <Text style={styles.infoText}>
                        <Text style={styles.label}>Setor: </Text>
                        <Text style={styles.info}>TI</Text>
                    </Text>
                    <View style={styles.line}></View>

                    <Text style={styles.infoText}>
                        <Text style={styles.label}>Área: </Text>
                        <Text style={styles.info}>Sei lá kkkk</Text>
                    </Text>
                    <View style={styles.line}></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#696CFF',
        paddingVertical: 15,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        height: 80,
        paddingHorizontal: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: "center",
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    content: {
        width: '85%',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
    },
    label: {
        color: '#696CFF',
        fontWeight: 'bold',
    },
    info: {
        color: 'gray',
    },
    line: {
        height: 2,
        backgroundColor: '#696CFF',
        width: '100%',
        marginBottom: 10,
    },
});
