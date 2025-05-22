import React from 'react';

import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';

import AntDesign from 'react-native-vector-icons/AntDesign';

const SelfPortalCard = ({
  br = 0,
  title,
  title1,
  containerStyle,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <Row>
        <Row style={{gap: mvs(10)}}>
          <Bold fontSize={mvs(15)} label={title} />
          <Bold fontSize={mvs(15)} label={title1} />
        </Row>
        <AntDesign name="right" size={25} color={colors.primary} />
      </Row>
    </TouchableOpacity>
  );
};

export default SelfPortalCard;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: mvs(20),
    padding: mvs(15),
    borderRadius: mvs(10),
  },
});
