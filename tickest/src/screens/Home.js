import { View, Text, StyleSheet, ScrollView, TextInput, Pressable,FlatList } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Resumo from './Resumo'
import { Ticket } from '../components/ticket'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../../services/AuthContext'

const Home = () => {
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    const [search, setSearch] = useState('');
    const searchInputRef = useRef(null);
    const { user } = useContext(AuthContext);
    const ticketsRecebidos = user.ticketsRecebidos;
    console.log(ticketsCriados);
    const renderItem = ({ item }) => (
        <View style={styles.ticketContainer}>
            <Ticket titulo={item.título} area={item.area} etapa={item.etapa} ticket_id={item.id} borderRightColor={getBorderColor(item.etapa_id)}></Ticket>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#696CFF" />
            <View style={styles.header}>
                <Text style={styles.title}>Bem-vindo(a), {user.nome}</Text>
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
                    <Pressable style={styles.modos}>
                        <Ionicons name="options" size={24} color="#696CFF" />
                    </Pressable>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ gap: 15 }}>
                <View style={styles.resumo}>
                    <Resumo />
                </View>
                <View style={styles.tickets}>
                    <FlatList
                    data={ticketsRecebidos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
const getBorderColor = (etapa) => {
    switch (etapa) {
        case 1:
            return '#999999';
        case 2:
            return '#e6b13e';
        case 3:
            return '#6aa84f';
        case 4:
            return '#6aa84f';
        default:
            return '#999999'; // Cor padrão se a etapa não corresponder a nenhuma das opções
    }
};
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
