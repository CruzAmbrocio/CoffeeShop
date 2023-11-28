import {StyleSheet} from 'react-native';
import React from 'react';
import Navigator from './src/navigators/navigator';
import { Provider } from 'react-redux';
import { store } from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
