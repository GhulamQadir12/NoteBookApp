import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React, { ReactNode, forwardRef, Ref } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import Swiper, { SwiperProps } from 'react-native-swiper';

interface CustomSwiperProps {
  ref: Ref<Swiper>;
  style?: SwiperProps;
  children: ReactNode;
  autoplay?: boolean;
  onIndexChanged?: (index: number) => void;
}

const CustomSwiper: React.FC<CustomSwiperProps> = forwardRef(
  ({ style, onIndexChanged = (i) => { }, children,autoplay }: CustomSwiperProps, ref: Ref<Swiper>) => {


    return (
      <Swiper
        ref={ref}
        onIndexChanged={onIndexChanged}
        autoplay = {autoplay}
        scrollEnabled={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        showsButtons={false}
        showsPagination={false}
        {...style}
      >
        {children}
      </Swiper>
    );
  }
);

const styles = StyleSheet.create({
  dotStyle: { marginBottom: -mvs(40) },
  activeDotStyle: { marginBottom: -mvs(40), backgroundColor: colors.primary },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#red',
  },
});

export default CustomSwiper;
