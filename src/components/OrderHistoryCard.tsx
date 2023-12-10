import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import OrderItemCard from './OrderItemCard'

interface OrderHistoryCardProps {
  navigationHandler: any,
  OrderDate: any,
  CartList: any,
  CartListPrice: string,
}

const OrderHistoryCard:React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  CartList,
  CartListPrice,
  OrderDate,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.headerTitle}>Order Time</Text>
          <Text style={styles.headerSubTitle}>{OrderDate}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.headerTitle}>Total Amount</Text>
          <Text style={styles.headerPrice}>$ {CartListPrice}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {CartList.map((data:any, index:any)=>(
          <TouchableOpacity
            key={index.toString()+data.id}
            onPress={()=>{
              navigationHandler({
                index:data.index,
                id:data.id,
                type:data.type
              })
            }}>
            <OrderItemCard
              type={data.type}
              name={data.name}
              imagelink_square={data.imagelink_square}
              special_ingredient={data.special_ingredient}
              prices={data.prices}
              ItemPrice={data.ItemPrice}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer:{
    gap: SPACING.space_10
  },
  cardHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    gap:SPACING.space_20,
    alignItems:'center'
  },
  headerTitle:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryWhiteHex
  },
  headerSubTitle:{
    fontFamily:FONTFAMILY.poppins_light,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryWhiteHex
  },
  priceContainer:{
    alignItems:'flex-end'
  },
  headerPrice:{
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_18,
    color:COLORS.primaryOrangeHex
  },
  listContainer:{
    gap:SPACING.space_20
  }
})

export default OrderHistoryCard
