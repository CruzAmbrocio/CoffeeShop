import { ImageProps, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartList, selectTotal } from '../store/CartSlice';
import HeaderBar from '../components/HeaderBar';
import { COLORS, SPACING } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

const CartScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const tabBarHeight = useBottomTabBarHeight();
  const cartList = useSelector(selectCartList);
  const total = useSelector(selectTotal);

  const buttonPressHandler = () => {
    navigation.push('Payment');
  }
  const incrementCartItemQuantityHandler = (
    id: string,
    index: string,
    name: string,
    roasted: string,
    imagelink_square: ImageProps,
    special_ingredient: string,
    type: string,
    price: any) => {
    dispatch(addToCart({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices: [{ ...price }] }))
  }
  const decrementCartItemQuantityHandler = (
    id: string,
    index: string,
    name: string,
    roasted: string,
    imagelink_square: ImageProps,
    special_ingredient: string,
    type: string,
    price: any) => {
    dispatch(removeFromCart({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices: [{ ...price }] }))
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View style={[styles.scrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.itemContainer}>
            <HeaderBar title='cart' />
            {cartList.length == 0 ? (
              <EmptyListAnimation title={'Cart is empty'} />
            ) : (
              <View style={styles.listItemContainer}>
                {cartList.map((data: any) => (
                  <TouchableOpacity onPress={() => {
                    navigation.push('Details', {
                      index: data.index,
                      id: data.id,
                      type: data.type
                    });
                  }} key={data.id}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      index={data.index}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))
                }
              </View>
            )}
          </View>
          {cartList.length != 0 ? (
            <PaymentFooter
              buttonTitle='Pay'
              price={{ price: String(total.toFixed(2)), currency: '$' }}
              buttonPressHandler={buttonPressHandler}
            />
          ) : (
            <></>
          )}
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

export default CartScreen;
