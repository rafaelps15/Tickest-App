import React, { useContext, useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image, FlatList, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Resumo from './Resumo';
import { Ticket } from '../components/ticket';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../services/AuthContext'

const Home = () => {
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    const [search, setSearch] = useState('');
    const searchInputRef = useRef(null);
    const [selectedBall, setSelectedBall] = useState(null);
    const { user } = useContext(AuthContext);
    const ticketsRecebidos = user.ticketsRecebidos;
    const renderItem = ({ item }) => (
        <View style={styles.ticketContainer}>
            <Ticket titulo={item.título} area={item.area} etapa={item.etapa} ticket_id={item.id} borderRightColor={getBorderColor(item.etapa_id)}></Ticket>
        </View>
    );

    const ColorBall = ({ color, iconName, label, onPress, isSelected }) => {
        const scaleAnim = useRef(new Animated.Value(1)).current;

        const handlePressIn = () => {
            Animated.spring(scaleAnim, {
                toValue: 1.2,
                friction: 3,
                useNativeDriver: true,
            }).start();
        };

        const handlePressOut = () => {
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }).start();
            onPress();
        };

        return (
            <View style={styles.colorBallContainer}>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Pressable
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        style={[
                            styles.colorBall,
                            { backgroundColor: isSelected ? '#696CFF' : color },
                            isSelected && styles.selectedBallShadow,
                        ]}
                    >
                        <Ionicons name={iconName} size={30} color="white" />
                    </Pressable>
                </Animated.View>
                <Text style={[styles.colorBallLabel, { color: isSelected ? '#696CFF' : color }]}>{label}</Text>
            </View>
        );
    };

    const handleBallPress = (label) => {
        setSelectedBall(selectedBall === label ? null : label);
    };

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#696CFF" />
            <View style={styles.header}>
                <Text style={styles.title}>Bem-vindo(a), {user.nome}</Text>
                <Image source={require("../assets/logo/2.png")} style={styles.logo} />
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
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
                        <Ionicons name="search" size={24} color="#696CFF" />
                    </Pressable>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ gap: 15 }}>
                <View style={styles.resumo}>
                    <Resumo />
                </View>
                <View style={styles.colorBallsContainer}>
                    <ColorBall
                        color="#999999"
                        iconName="hourglass-outline"
                        label="Análise"
                        onPress={() => handleBallPress('Análise')}
                        isSelected={selectedBall === 'Análise'}
                    />
                    <ColorBall
                        color="#e6b13e"
                        iconName="build-outline"
                        label="Andamento"
                        onPress={() => handleBallPress('Andamento')}
                        isSelected={selectedBall === 'Andamento'}
                    />
                    <ColorBall
                        color="#6aa84f"
                        iconName="checkmark-outline"
                        label="Concluído"
                        onPress={() => handleBallPress('Concluído')}
                        isSelected={selectedBall === 'Concluído'}
                    />
                    <ColorBall
                        color="#f44336"
                        iconName="close-outline"
                        label="Cancelado"
                        onPress={() => handleBallPress('Cancelado')}
                        isSelected={selectedBall === 'Cancelado'}
                    />
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
            <LinearGradient
                colors={['transparent', 'rgba(255, 255, 255, 0.5)', 'rgba(211, 211, 211, 1)']}
                style={styles.gradient}
            />
        </View>
    );
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
        position: 'relative',
        marginBottom: 7,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
        paddingLeft: 15,
    },
    logo: {
        width: 95,
        height: 25,
        position: 'absolute',
        top: 35,
        right: 30,
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
        marginTop: 10,
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
        marginTop: 10,
    },
    resumo: {
        marginBottom: 8,
        marginTop: 8
    },
    colorBallsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 1,
        marginHorizontal: 15,
        marginBottom: 8
    },
    colorBallContainer: {
        alignItems: 'center',
    },
    colorBall: {
        width: 65,
        height: 65,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    selectedBallShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.9,
        shadowRadius: 4.65,
        elevation: 8,
    },
    colorBallLabel: {
        marginTop: 8,
        fontWeight: 'bold',
    },
    tickets: {
        marginBottom: 90,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 90,
    },
});

