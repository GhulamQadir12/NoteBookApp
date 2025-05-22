import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type IProps = {
  label?: string | number;
  checked?: boolean;
  children?: JSX.Element | JSX.Element[];
  onPress: () => void;
};
export const Checkbox = (props: IProps) => {
  const {checked, onPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {checked && <Icon name={'check'} color={colors.primary} size={mvs(16)} />}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.bluecolor,
    borderRadius: mvs(5),
    height: mvs(20),
    width: mvs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
