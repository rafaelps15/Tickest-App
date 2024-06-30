import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { AuthContext } from '../../services/AuthContext'

const Resumo = () => {
    const { user } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ gap: 15 }}>
                <View style={styles.resumoContainer}>
                    <View style={styles.resumo}>
                        <Text style={styles.texto}>Em Aberto</Text>
                        <View>
                            <Text style={styles.textoDestaque}>{user.ticketsEmAberto}</Text>
                        </View>
                    </View>
                    <View style={styles.resumo}>
                        <Text style={styles.texto}>Concluídos</Text>
                        <View>
                            <Text style={styles.textoDestaque}>{user.ticketsConcluidos}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.resumoContainer}>
                    <View style={styles.resumo}>
                        <Text style={styles.texto}>Em análise este mês</Text>
                        <View>
                            <Text style={styles.textoDestaque}>{user.ticketsAbertosMes}</Text>
                        </View>
                    </View>

                    <View style={styles.resumo}>
                        <Text style={styles.texto}>Concluídos este mês</Text>
                        <View>
                            <Text style={styles.textoDestaque}>{user.ticketsConcluidosMes}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Resumo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    resumoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        marginBottom: -1
    },
    resumo: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowRadius: 2,
    },
    texto: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    textoDestaque: {
        color: '#696CFF',
        fontWeight: '700',
        fontSize: 20
    },
});
