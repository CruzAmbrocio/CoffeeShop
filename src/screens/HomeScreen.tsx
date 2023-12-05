import { Dimensions, FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoffeeBeans, setCoffeeBeans } from '../store/BeansSlice';
import { selectCoffeeTypes, setCoffeeTypes } from '../store/CoffeeSlice';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';
import BeansData from '../data/BeansData';
import coffeeData from '../data/CoffeeData';

const HomeScreen = ({navigation}:any) => {
  const coffeeBeans = useSelector(selectCoffeeBeans);
  const coffeeTypes = useSelector(selectCoffeeTypes);
  const dispatch = useDispatch();

  dispatch(setCoffeeTypes(coffeeData));
  dispatch(setCoffeeBeans(BeansData));

  const getCategoriesFromData = (data: any) => {
    const categoriesSet = new Set();
    data.forEach((drink: any) => {
      categoriesSet.add(drink.name);
    });
    const categories = Array.from(categoriesSet);
    categories.unshift('All')
    return categories;
  };

  const getCoffeeList = (category: any, data: any) => {
    if (category == 'All') {
      return data;
    } else {
      let filteredCoffee = data.filter((item: any) => item.name == category)
      return filteredCoffee
    }
  };

  const [categories, setCategories] = useState(
    getCategoriesFromData(coffeeData)
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, coffeeData)
  );

  const listRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search: string) => {
    if (search != '') {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0
      });
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([
        ...coffeeData.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
      ]);
    }
  }

  const resetSearchCoffee = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0
    });
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...coffeeData]);
    setSearchText('');
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <HeaderBar />
        <Text style={styles.screenTitle}>Find the best{'\n'}coffee for you</Text>
        {/* Search input */}
        <View style={styles.inputContainerComponent}>
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
            <CustomIcon
              style={styles.inputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText?.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder='Find your coffee...'
            value={searchText}
            onChangeText={text => {
                setSearchText(text);
                searchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity onPress={() => resetSearchCoffee()}>
              <CustomIcon
                style={styles.inputIcon}
                name='close'
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )

          }
        </View>
        {/* Categories list */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollViewStyle}>
          {
            categories.map((data: any, index) => (
              <View
                key={index.toString()}
                style={styles.categoryScrollViewContainer}>
                <TouchableOpacity
                  style={styles.categoryScrollViewItem}
                  onPress={() => {
                    listRef?.current?.scrollToOffset({
                      animated: true,
                      offset: 0
                    })
                    setCategoryIndex({ index: index, category: categories[index] })
                    setSortedCoffee([
                      ...getCoffeeList(categories[index], coffeeData)
                    ])
                  }}>
                  <Text style={[
                    styles.categoryText,
                    categoryIndex.index == index ? { color: COLORS.primaryOrangeHex } : {}]}>{data}</Text>
                  {categoryIndex.index == index ? <View style={styles.activeCategory}></View> : <></>}
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>
        {/* Coffee list */}
        <FlatList
          ref={listRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.categoryText}>No coffee available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => { navigation.navigate("Details") }}>
                <CoffeeCard
                  name={item.name}
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => { }}
                />
              </TouchableOpacity>
            );
          }}
        />
        {/* List title */}
        <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
        {/* Beans lists */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeansData}
          contentContainerStyle={[styles.flatListContainer, { marginBottom: tabBarHeight }]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => { navigation.navigate("Details") }}>
                <CoffeeCard
                  name={item.name}
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => { }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30
  },
  inputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center'
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20
  },
  textInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  },
  categoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15
  },
  categoryScrollViewItem: {
    alignItems: 'center'
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30
  },
  emptyListContainer:{
    width:Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:SPACING.space_36 * 3.6
  },
  coffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex
  }
});

export default HomeScreen;
