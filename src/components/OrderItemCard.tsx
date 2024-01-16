import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {LinearGradient} from "expo-linear-gradient";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

interface OrderItemCardProps {
  type:string
  name:string
  imagelink_square:ImageProps
  special_ingredient:string
  prices:any
  ItemPrice:string
}

const OrderItemCard:React.FC<OrderItemCardProps> = ({
  type,
  name,
  imagelink_square,
  special_ingredient,
  prices,
  ItemPrice,
}) => {
  return (
    <LinearGradient
      start={{x:0, y:0}}
      end={{x:1, y:1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.cardLinearGradient}>
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardImageInfoContainer}>
          <Image source={imagelink_square} style={styles.image}/>
          <View>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardSubtitle}>{special_ingredient}</Text>
          </View>
        </View>
        <View>
            <Text style={styles.cardCurrency}>
              $<Text style={styles.cardPrice}>{ItemPrice}</Text></Text>
          </View>
      </View>
      {prices.map((data:any,  index:any)=>(
        <View key={index.toString()} style={styles.cardTableRow}>
          <View style={styles.cardTableRow}>
            <View style={styles.sizeBoxLeft}>
              <Text style={[styles.sizeText, {fontSize: type=='Bean' ? FONTSIZE.size_12:FONTSIZE.size_16}]}>{data.size}</Text>
            </View>
            <View style={styles.priceBoxRight}>
              <Text style={styles.priceCurrency}>
                {data.currency}
                <Text style={styles.price}>{data.price}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.cardTableRow}>
            <Text>
              X <Text style={styles.price}>{data.quantity}</Text>
            </Text>
            <Text style={styles.cardQuantityPriceText}>
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  cardLinearGradient:{
    gap:SPACING.space_20,
    padding:SPACING.space_20,
    borderRadius:BORDERRADIUS.radius_25
  },
  cardInfoContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  cardImageInfoContainer:{
    flexDirection:'row',
    gap:SPACING.space_20,
    alignItems:'center'
  },
  image:{
    height:90,
    width:90,
    borderRadius:BORDERRADIUS.radius_15
  },
  cardTitle:{
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_18,
    color:COLORS.primaryWhiteHex
  },
  cardSubtitle:{
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_12,
    color:COLORS.primaryOrangeHex
  },
  cardCurrency:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_20,
    color:COLORS.primaryOrangeHex
  },
  cardPrice:{
    color:COLORS.primaryWhiteHex
  },
  cardTableRow:{
    flex:1,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  sizeBoxLeft:{
    backgroundColor:COLORS.primaryBlackHex,
    height:45,
    flex:1,
    borderTopLeftRadius:BORDERRADIUS.radius_10,
    borderBottomLeftRadius:BORDERRADIUS.radius_10,
    justifyContent:'center',
    alignItems:'center',
    borderRightWidth:1,
    borderRightColor:COLORS.primaryGreyHex
  },
  sizeText:{
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.secondaryLightGreyHex
  },
  priceBoxRight:{
    backgroundColor:COLORS.primaryBlackHex,
    height:45,
    flex:1,
    borderTopRightRadius:BORDERRADIUS.radius_10,
    borderBottomRightRadius:BORDERRADIUS.radius_10,
    justifyContent:'center',
    alignItems:'center',
    borderLeftWidth:1,
    borderLeftColor:COLORS.primaryGreyHex
  },
  priceCurrency:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_18,
    color:COLORS.primaryOrangeHex
  },
  price:{
    color:COLORS.primaryWhiteHex
  },
  cardQuantityPriceText:{
    flex:1,
    textAlign:'center',
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_18,
    color:COLORS.primaryOrangeHex
  },
});

export default OrderItemCard;
