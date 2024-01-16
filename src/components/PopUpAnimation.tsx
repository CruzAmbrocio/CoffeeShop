import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import LottieView from 'lottie-react-native';

interface PopUpAnimationProps {
  style: any,
  source: any
}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({
  style,
  source
}) => {
  return (
    <View style={styles.lottieAnimationContainer}>
      <Text style={styles.lottieText}>{"LottieView animation fail 😒"}</Text>
      <Text style={styles.lottieText}>{""}</Text>
      <Text style={styles.lottieText}>{"PAID"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  lottieAnimationContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    backgroundColor: COLORS.secondaryBlackRGBA,
    justifyContent: 'center'
  },
  lottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center'
  }
});

export default PopUpAnimation;
