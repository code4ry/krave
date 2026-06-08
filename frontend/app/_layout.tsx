import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/utils/authContext';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
        name="(protected)"
        options={{
          headerShown: false,
          animation: "none",
        }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
