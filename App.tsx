/* eslint-disable @typescript-eslint/no-misused-promises */
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import Home from './src/pages/home'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black
} from '@expo-google-fonts/poppins'
import React, { useCallback, useEffect } from 'react'

export default function App(): React.JSX.Element {
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black
  })

  // Prevent splash screen from autohiding
  useEffect(() => {
    async function prepare(): Promise<void> {
      await SplashScreen.preventAutoHideAsync()
    }
    void prepare()
  }, [])

  // Hide splash screen after fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  // Verifica se as fontes foram carregadas
  if (!fontsLoaded) {
    // Se não carregou, retorna null
    return <></>
  } else {
    // Se carregou, exibe a aplicação
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <PaperProvider>
            <StatusBar style="light" backgroundColor="#110982" />
            <SafeAreaView onLayout={onLayoutRootView}>
              <Home />
            </SafeAreaView>
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    )
  }
}
