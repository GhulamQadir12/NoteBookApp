import React from 'react';
import FastImage from 'react-native-fast-image';

import {mvs, width} from 'config/metrices';
import {StyleSheet, View} from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {colors} from 'config/colors';
import Light from 'typography/light-text';
import {t} from 'i18next';

const OnboardingWalkThrough = ({item}) => {
  return (
    <View style={styles.container}>
      <FastImage resizeMode="contain" source={item.image} style={styles.img} />
      <View style={styles.txt_container}>
        <Regular
          label={t(item.title)}
          color={colors.white}
          fontSize={mvs(24)}
        />
        <Light
          numberOfLines={2}
          label={t(item.desc)}
          color={colors.white}
          fontSize={mvs(15)}
          style={{
            textAlign: 'center',
          }}
        />
      </View>
    </View>
  );
};

export default OnboardingWalkThrough;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: mvs(30),
  },
  img: {
    height: mvs(300),
    width: width / 2,
    overflow: 'hidden',
    marginTop: '35%',
  },
  txt_container: {
    alignItems: 'center',
    marginBottom: mvs(10),
    paddingHorizontal: mvs(50),
  },
});
