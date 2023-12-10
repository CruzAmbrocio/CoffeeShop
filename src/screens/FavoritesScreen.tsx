import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addToFavorite, removeFromFavorite, selectFavoriteList } from '../store/CoffeeSlice';
import { COLORS, SPACING } from '../theme/theme';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import FavoriteItemCard from '../components/FavoriteItemCard';

const FavoritesScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const favoriteList = useSelector(selectFavoriteList);
  const tabBarHeight = useBottomTabBarHeight();

  const toggleFavorite = (favorite: boolean, type: string, id: string) => {
    const details = { favorite: favorite, type: type, id: id };
    favorite ? dispatch(removeFromFavorite(details)) : dispatch(addToFavorite(details));
  }
  return (
    <View style={styles.screenContainer}>
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View style={[styles.scrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.itemContainer}>
            <HeaderBar title='Favorites' />
            {favoriteList.length == 0 ? (
              <EmptyListAnimation title={'No Favorites'} />
            ) : (
              <View style={styles.listItemContainer}>
                {favoriteList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type
                      });
                    }}
                    key={data.id}>
                    <FavoriteItemCard
                      id={data.id}
                      imagelink_portrait={data.imagelink_portrait}
                      name={data.name}
                      special_ingredient={data.special_ingredient}
                      type={data.type}
                      ingredients={data.ingredients}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favorite={data.favorite}
                      toggleFavorite={toggleFavorite} />
                  </TouchableOpacity>
                ))
                }
              </View>
            )}
          </View>
        </View>
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
    flexGrow: 1
  },
  scrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between'
  },
  itemContainer: {
    flex: 1
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20
  }
});

export default FavoritesScreen;
