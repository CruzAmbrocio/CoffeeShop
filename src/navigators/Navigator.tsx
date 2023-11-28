import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailsScreen from '../screens/DetailsScreen';
import TabsNavigator from './TabsNavigator';
import PaymentScreen from '../screens/PaymentScreen';

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tab" component={TabsNavigator} options={{animation: 'slide_from_bottom'}}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{animation: 'slide_from_bottom'}}/>
        <Stack.Screen name="Payment" component={PaymentScreen} options={{animation: 'slide_from_bottom'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
