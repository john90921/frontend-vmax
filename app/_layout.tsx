import '../global.css';

// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, Tabs } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import {SafeAreaView as RNSSafeAreaView} from 'react-native-safe-area-context';
import { styled } from 'nativewind';
const SafeAreaView =styled(RNSSafeAreaView);
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    'sans-regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'sans-medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'sans-bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'sans-semibold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'sans-light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <KeyboardProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="expenses/AddExpence"
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack>
    </KeyboardProvider>
  );
}
