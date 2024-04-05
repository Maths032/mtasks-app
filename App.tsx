import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import Home from './src/pages/home';
 
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar style="auto" />
          <SafeAreaView>
            <Home />
          </SafeAreaView>
        </PaperProvider>
    </SafeAreaProvider>
  );
}
