import {height, width} from 'config/metrices';
import React from 'react';
import {Animated} from 'react-native';

const FadeIn = ({children, currentIndex}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Change the duration as per your preference
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0],
            }),
          },
        ],
      }}>
      {children}
    </Animated.View>
  );
};

export default FadeIn;
