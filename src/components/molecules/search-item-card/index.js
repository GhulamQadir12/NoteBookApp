import React from 'react';
import FastImage from 'react-native-fast-image';

import { mvs, width } from 'config/metrices';
import { StyleSheet, Image, View } from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import { colors } from 'config/colors';
import Light from 'typography/light-text';
import { t } from 'i18next';
import { Row } from 'components/atoms/row';
import { eye, profile_pic } from 'assets/images';

const SearchItemCard = ({ item }) => {
  return (
    <>
      <Row style={[styles.profileContainer,]}>
        <Regular label={item?.title} fontSize={mvs(15)} color={colors.black} />


        <Image source={item?.icon} style={styles.left} />
      </Row>
    </>
  );
};

export default SearchItemCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: mvs(30),
  },
  profileContainer: {
    paddingHorizontal: mvs(23),
    paddingTop: mvs(8),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    height: mvs(12),
    width: mvs(6.4)
  }
});
