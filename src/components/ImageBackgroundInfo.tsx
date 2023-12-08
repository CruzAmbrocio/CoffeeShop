import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GradientBGIcon from './GradientBGIcon';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

interface ImageBackgroundInfoProps {
    enableBackHeader: boolean;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favorite: boolean;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    backHandler?: any;
    toggleFavorite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    enableBackHeader,
    imagelink_portrait,
    type,
    id,
    favorite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    backHandler,
    toggleFavorite,
}) => {

  return (
    <View>
      <ImageBackground source={imagelink_portrait} style={styles.itemBackgroundImage}>
        {enableBackHeader ? (
          <View style={styles.imageHeaderBarContainerWithBack}>
            <TouchableOpacity
              onPress={()=>{
                backHandler();
              }}>
              <GradientBGIcon name='left' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>{
                toggleFavorite(favorite, type, id);
              }}>
              <GradientBGIcon name='like' color={ favorite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
            </TouchableOpacity>
          </View>
        ) : (
        <View style={styles.imageHeaderBarContainerWithoutBack}>
        <TouchableOpacity
          onPress={()=>{
            toggleFavorite(favorite, type, id);
          }}>
          <GradientBGIcon name='like' color={ favorite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
        </TouchableOpacity>
        </View>
        )}
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  itemBackgroundImage:{
    width:'100%',
    aspectRatio: 20/25,
    justifyContent: 'space-between'
  },
  imageHeaderBarContainerWithBack:{
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageHeaderBarContainerWithoutBack:{
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

export default ImageBackgroundInfo;
