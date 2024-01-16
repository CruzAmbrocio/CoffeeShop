import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';

interface EmptyListAnimationProps {
  title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({ title }) => {
  return (
    <View style={styles.emptyCartContainer}>
      {/* <LottieView
        style={styles.lottieStyle}
        source={require('../lottie/coffeecup.json')}
        autoPlay
        loop
      /> */}
      <Text style={styles.lottieText}>{"LottieView animation fail 😒"}</Text>
      <Text style={styles.lottieText}>{""}</Text>
      <Text style={styles.lottieText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  lottieStyle: {
    height: 300
  },
  lottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center'
  }
});

export default EmptyListAnimation;
