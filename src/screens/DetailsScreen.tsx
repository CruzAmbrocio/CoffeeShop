import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoffeeTypes, selectCoffeeBeans, removeFromFavorite } from '../store/CoffeeSlice';
import { addToFavorite } from '../store/CoffeeSlice';
import { addToCart } from '../store/CartSlice';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  const coffeeBeans = useSelector(selectCoffeeBeans);
  const coffeeTypes = useSelector(selectCoffeeTypes);
  const itemOfIndex = route.params.type == 'Coffee' ? coffeeTypes[route.params.index] : coffeeBeans[route.params.index];

  const [fullDescription, setFullDescription] = useState(false);
  const [price, setPrice] = useState(itemOfIndex.prices[0]);

  const backHandler = () => {
    navigation.pop();
  }
  const toggleFavorite = (favorite: boolean, type: string, id: string) => {
    const details = { favorite: favorite, type: type, id: id };
    favorite ? dispatch(removeFromFavorite(details)) : dispatch(addToFavorite(details));
  }
  const addToCartHandler = ({ id, index, name, roasted, imagelink_square, special_ingredient, type, price }: any) => {
    dispatch(addToCart({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices: [{ ...price }] }))
  }
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <ImageBackgroundInfo
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
        <View style={styles.footerInfoArea}>
          <Text style={styles.infoTitle}>Description</Text>
          {fullDescription ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDescription(prev => !prev);
              }}
            >
              <Text style={styles.descriptionText}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback >
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDescription(prev => !prev);
              }}
            >
              <Text numberOfLines={3} style={styles.descriptionText}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback >
          )}
          <Text style={styles.infoTitle}>Size</Text>
          <View style={styles.sizeOuterContainer}>
            {
              itemOfIndex.prices.map((data: any) => (
                <TouchableOpacity
                  key={data.size}
                  onPress={() => {
                    setPrice(data);
                  }}
                  style={[
                    styles.sizeBox,
                    {
                      borderColor:
                        data.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryDarkGreyHex
                    }
                  ]}>
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        fontSize:
                          itemOfIndex.type == 'bean'
                            ? FONTSIZE.size_14
                            : FONTSIZE.size_16,
                        color:
                          data.size == price.size
                            ? COLORS.primaryOrangeHex
                            : COLORS.secondaryLightGreyHex
                      }
                    ]}
                  >{data.size}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonPressHandler={() => {
            addToCartHandler({
              id: itemOfIndex.id,
              index: itemOfIndex.index,
              name: itemOfIndex.name,
              roasted: itemOfIndex.roasted,
              imagelink_square: itemOfIndex.imagelink_square,
              special_ingredient: itemOfIndex.special_ingredient,
              type: itemOfIndex.type,
              price: price,
            })
          }}
          buttonTitle='Add to cart' />
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
    justifyContent: 'space-between'
  },
  footerInfoArea: {
    padding: SPACING.space_20
  },
  infoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10
  },
  descriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30
  },
  sizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20
  },
  sizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium
  }
});

export default DetailsScreen;
