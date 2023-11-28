import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCoffeeBeans } from '../store/BeansSlice';
import { selectCoffeeTypes } from '../store/CoffeeSlice';

const HomeScreen = () => {
  const coffeeBeans = useSelector(selectCoffeeBeans);
  const coffeeTypes = useSelector(selectCoffeeTypes);
  return (
    <View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
