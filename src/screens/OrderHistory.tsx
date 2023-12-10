import {ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderHistory } from '../store/CartSlice';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistory = ({navigation}:any) => {
  const orderHistory = useSelector(selectOrderHistory);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  const navigationHandler = ({index, id, type}:any)=>{
    navigation.push('Details', {
      index, id, type
    })
  }

  const buttonPressHandler = ()=>{
    setShowAnimation(true);
    setTimeout(()=>{
      setShowAnimation(false);
    }, 2000)
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require('../lottie/download.json')} />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View style={[styles.scrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.itemContainer}>
            <HeaderBar title='Order History'/>
            {orderHistory.length == 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View style={styles.listItemContainer}>
                {orderHistory.map((data:any, index:any)=>(
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                    />
                ))}
              </View>
            )}
          </View>
          {orderHistory.length > 0 ? (
            <TouchableOpacity
              style={styles.DownloadButton}
              onPress={()=>{buttonPressHandler()}}>
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
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
  lottieAnimation: {
    height:250
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
    gap: SPACING.space_30
  },
  DownloadButton:{
    margin: SPACING.space_20,
    backgroundColor:COLORS.primaryOrangeHex,
    alignItems:'center',
    justifyContent:'center',
    height:SPACING.space_36*2,
    borderRadius:BORDERRADIUS.radius_20
  },
  buttonText:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_18,
    color:COLORS.primaryWhiteHex
  },
});

export default OrderHistory;
