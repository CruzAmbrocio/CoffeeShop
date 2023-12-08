import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/theme';
import ImageBackground from '../components/ImageBackgroundInfo';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoffeeTypes, selectCoffeeBeans, removeFromFavorite } from '../store/CoffeeSlice';
import { addToFavorite } from '../store/CoffeeSlice';

const DetailsScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  console.log('routes=> ', route.params)

  const coffeeBeans = useSelector(selectCoffeeBeans);
  const coffeeTypes = useSelector(selectCoffeeTypes);
  const itemOfIndex = route.params.type == 'Coffee' ? coffeeTypes[route.params.index] : coffeeBeans[route.params.index];

  const backHandler = () => {
    navigation.pop();
  }
  const toggleFavorite = (favorite: boolean, type: string, id: string) => {
    const details = { favorite: favorite, type: type, id: id };
    favorite ? dispatch(removeFromFavorite(details)) : dispatch(addToFavorite(details));
  }
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <ImageBackground
          enableBackHeader={true}
          imagelink_portrait={itemOfIndex.imagelink_portrait}
          type={itemOfIndex.type}
          id={itemOfIndex.id}
          favorite={itemOfIndex.favorite}
          name={itemOfIndex.name}
          special_ingredient={itemOfIndex.special_ingredient}
          ingredients={itemOfIndex.ingredients}
          average_rating={itemOfIndex.average_rating}
          ratings_count={itemOfIndex.ratings_count}
          roasted={itemOfIndex.roasted}
          backHandler={backHandler}
          toggleFavorite={toggleFavorite}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  scrollViewFlex: {
    flexGrow: 1,

  }
});

export default DetailsScreen;
