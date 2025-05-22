import {PrimaryButton} from 'components/atoms/buttons';
import OnboardingWalkThrough from 'components/molecules/onboarding-walk-through';
import {colors} from 'config/colors';
import {ONBOARDING_LIST} from 'config/constants';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import React, {useRef} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';
import {navigate} from 'navigation/navigation-ref';

const Onboarding = props => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    if (currentIndex == 2) {
      navigate('Login');
    } else {
      swiperRef.current.scrollBy(1);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <Swiper
        ref={swiperRef}
        onIndexChanged={index => {
          setCurrentIndex(index);
        }}
        loop={false}
        scrollEnabled={true}
        dot={<View style={[styles.dot, {backgroundColor: colors.lightGray}]} />}
        activeDot={
          <View
            style={[
              styles.dot,
              {
                backgroundColor: colors.white,
              },
            ]}
          />
        }>
        {ONBOARDING_LIST.map((item, index) => (
          <OnboardingWalkThrough key={index} item={item} />
        ))}
      </Swiper>
      <View style={styles.bottom}>
        <PrimaryButton
          onPress={() => handleNext()}
          containerStyle={{
            backgroundColor: colors.white,
          }}
          title={currentIndex == 2 ? t('get_started') : t('next')}
          textStyle={{
            fontSize: mvs(16),
            color: colors.primary,
          }}
        />
      </View>
    </View>
  );
};

export default Onboarding;
