import {StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import Navigator from './src/navigators/Navigator';
import { Provider } from 'react-redux';
import { store } from './src/store';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  }, [])
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
