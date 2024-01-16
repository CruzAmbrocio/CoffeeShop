import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Navigator from './src/navigators/Navigator';
import { store } from './src/store';

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'Poppins-Black': require('./src/assets/fonts/Poppins-Black.ttf'),
          'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
          'Poppins-Extrabold': require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
          'Poppins-Extralight': require('./src/assets/fonts/Poppins-ExtraLight.ttf'),
          'Poppins-Light': require('./src/assets/fonts/Poppins-Light.ttf'),
          'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
          'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
          'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Thin': require('./src/assets/fonts/Poppins-Thin.ttf'),
          'icomoon': require('./src/assets/fonts/icomoon.ttf'),
        });

        setIsFontLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Handle font loading error if needed
      } finally {
        SplashScreen.hideAsync();
      }
    };

    loadFonts();
  }, []);

  if (!isFontLoaded) {
    // Render a loading screen or return null until fonts are loaded
    return null;
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}