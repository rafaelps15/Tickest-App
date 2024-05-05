import { SafeAreaView, Text } from "react-native";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function Home() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
            <ScrollView style={{ flex: 1, padding: 16}}>
                <Text>Bem Vindo(a)</Text>

            </ScrollView>
        </SafeAreaView>

    )
}