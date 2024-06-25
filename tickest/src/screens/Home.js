import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Resumo from './Resumo'
import { Ticket } from '../components/ticket'
import { StatusBar } from 'expo-status-bar'

const Home = () => {
    const { top } = useSafeAreaInsets()
    const paddingTop = top > 0 ? top + 10 : 30
    const [search, setSearch] = useState('')
    const searchInputRef = useRef(null)

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#696CFF" />
            <View style={styles.header}>
                <Text style={styles.title}>Bem-vindo(a), Ana Letícia</Text>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color={"#696CFF"} />
                        <TextInput
                            placeholder="Pesquisar..."
                            style={[styles.searchInput, { fontWeight: 'bold' }]}
                            value={search}
                            ref={searchInputRef}
                            onChangeText={value => setSearch(value)}
                        />
                        {search && (
                            <Pressable style={styles.closeIcon} onPress={() => setSearch('')}>
                                <Ionicons name="close" size={20} color={"white"} />
                            </Pressable> 
                        )}
                    </View>
                    <Pressable onPress={() => console.log('Filtro')} style={styles.modos}>
                        <Ionicons name="options" size={24} color="#696CFF" />
                    </Pressable>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ gap: 15 }}>
                <View style={styles.resumo}>
                    <Resumo />
                </View>
                <View style={styles.tickets}>
                    <Ticket titulo="Atualização de sistema" area="RH" etapa="Em análise" borderRightColor="#999999" />
                    <Ticket titulo="Integração de dados" area="Financeiro" etapa="Em desenvolvimento" borderRightColor="#e6b13e" />
                    <Ticket titulo="Otimização de site" area="Marketing" etapa="Concluído" borderRightColor="#6aa84f" />
                    <Ticket titulo="Permissões de segurança" area="Jurídico" etapa="Cancelado" borderRightColor="#f44336" />
                    <Ticket titulo="Migração de dados" area="Compras" etapa="Em análise" borderRightColor="#999999" />
                    <Ticket titulo="Configuração de software" area="Produção" etapa="Cancelado" borderRightColor="#f44336" />
                    <Ticket titulo="Backup de dados" area="Desenvolvimento de Produto" etapa="Concluído" borderRightColor="#6aa84f" />
                </View>
            </ScrollView>
        </View>
    )
}

export default Home

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
        height: 160,
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginBottom: 7,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
        paddingLeft: 15
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 15,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10
    },
    searchInput: {
        flex: 1,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 8,
        fontSize: 13,
    },
    closeIcon: {
        padding: 3,
        backgroundColor: '#696CFF',
        borderRadius: 8,
    },
    modos: {
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 10,
        marginTop: 10
    },
    tickets: {
        marginBottom: 90
    }
});
