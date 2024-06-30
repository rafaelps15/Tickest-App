import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { AuthContext } from "../../services/AuthContext";
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Perfil() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const { user, signOut } = useContext(AuthContext);
    const navigation = useNavigation();
    const buttonLogout = () => {
        signOut();
        navigation.navigate("Login");
    };

    const items = [
        { title: 'Cargo', details: 'Detalhes específicos sobre o cargo.' },
        { title: 'Setor', details: 'Detalhes específicos sobre o setor.' },
        { title: 'Área', details: 'Detalhes específicos sobre a área.' },
        { title: 'ID', details: 'Detalhes específicos sobre o ID.' },
    ];

    const toggleCollapse = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Sair?',
            'Deseja deslogar dessa conta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Sair',
                    onPress: () => {
                        buttonLogout();
                        console.log('Logout confirmed');
                    }
                }
            ],
            { cancelable: true }
        );
    };

    return (
      <GestureHandlerRootView>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Perfil</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Ionicons name="exit-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.profileBox}>
                    <Text style={styles.profileText}>Nome</Text>
                    <Text style={[styles.profileText, styles.emailText]}>Email</Text>
                </View>

                {items.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => toggleCollapse(index)} style={styles.collapseHeader}>
                            <Text style={[styles.collapseHeaderText, index === expandedIndex && styles.collapseHeaderTextActive]}>
                                {index === expandedIndex ? '' + item.title : '' + item.title}
                            </Text>
                        </TouchableOpacity>

                        {index === expandedIndex && (
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailsText}>{item.details}</Text>
                            </View>
                        )}
                    </View>
                ))}
                
export default function Perfil() {
    return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Perfil</Text>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <Text style={styles.infoText}>
                            <Text style={styles.label}>Nome: </Text>
                            <Text style={styles.info}>{user.nome}</Text>
                        </Text>
                        <View style={styles.line}></View>

                        <Text style={styles.infoText}>
                            <Text style={styles.label}>E-mail: </Text>
                            <Text style={styles.info}>{user.email}</Text>
                        </Text>
                        <View style={styles.line}></View>

                        <Text style={styles.infoText}>
                            <Text style={styles.label}>Cargo: </Text>
                            <Text style={styles.info}>{user.cargo}</Text>
                        </Text>
                        <View style={styles.line}></View>

                        <Text style={styles.infoText}>
                            <Text style={styles.label}>Área: </Text>
                            <Text style={styles.info}>{user.area}</Text>
                        </Text>
                        <View style={styles.line}></View>

                        <Text style={styles.infoText}>
                            <Text style={styles.label}>Departamento: </Text>
                            <Text style={styles.info}>{user.departamento}</Text>
                        </Text>
                        <View style={styles.line}></View>
                    </View>
                <TouchableOpacity onPress={buttonLogout}>
                    <Text>Sair</Text>
                </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
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
    logoutButton: {
        position: 'absolute',
        right: 40,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    profileBox: {
        width: 300,
        height: 150,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowRadius: 2,
    },
    profileText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emailText: {
        color: 'blue',
    },
    itemContainer: {
        width: 300,
        marginBottom: 10,
    },
    collapseHeader: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowRadius: 2,
    },
    collapseHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    collapseHeaderTextActive: {
        color: 'blue',
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        width: 300,
        marginTop: 10,
    },
    detailsText: {
        fontSize: 14,
        textAlign: 'center',
    },
});
