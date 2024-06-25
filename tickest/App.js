import { StatusBar } from 'expo-status-bar';
import Routes from './src/components/Routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './services/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor= {'#696CFF'}  />
          <Routes />
        </SafeAreaView>
      </PaperProvider>
    </AuthProvider>
  );
}