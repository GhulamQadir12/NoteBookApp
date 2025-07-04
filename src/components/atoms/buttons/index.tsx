import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import Regular from '../../../typography/regular-text';
import {Loader} from '../loader';
import Icon from 'react-native-vector-icons/FontAwesome5';
type props = {
  onPress: () => void;
  title: string;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};
export const PlusButton = (props: props) => {
  const {onPress, title, containerStyle,textStyle} = props;
  return (
    <TouchableOpacity
      style={[styles.plusContainer, containerStyle]}
      onPress={onPress}>
      <Regular style={[styles.plusText,textStyle]} label={'+'} />
    </TouchableOpacity>
  );
};
export const PrimaryButton = (props: props) => {
  const {onPress, title, disabled, loading, textStyle, containerStyle} = props;
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[
        styles.primaryContainer,
        {backgroundColor: `${colors.primary}${disabled ? '50' : ''}`},
        containerStyle,
      ]}
      onPress={onPress}>
      {loading ? (
        <Loader color={colors.white} />
      ) : (
        <Regular style={[styles.primaryText, textStyle]} label={title} />
      )}
    </TouchableOpacity>
  );
};
export const IconButton = (props: props) => {
  const {onPress, title, disabled, loading, textStyle, Icon, containerStyle} =
    props;
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[
        styles.iconContainer,
        {backgroundColor: `${colors.primary}${disabled ? '50' : ''}`},
        containerStyle,
      ]}
      onPress={onPress}>
      {Icon}
      {
        loading ? (
          <Loader color={colors.white} />
        ) : (
          // <View style={{ flex: 1 }}>

          <Regular
            numberOfLines={1}
            style={[styles.iconText, textStyle]}
            label={title}
          />
        )

        // </View>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plusContainer: {
    position: 'absolute',
    bottom: mvs(40),
    ...colors.shadow,
    backgroundColor: colors.primary,
    right: mvs(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: mvs(50),
    height: mvs(50),
    borderRadius: mvs(50 / 2),
  },
  plusText: {
    color: colors.white,
    fontSize: mvs(35),
    alignSelf: 'center',
  },
  primaryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: '100%',
    height: mvs(45),
    borderRadius: mvs(25),
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    height: mvs(80),
    paddingHorizontal: mvs(15),
    width: '49%',
    borderRadius: mvs(10),
  },
  primaryText: {
    color: colors.white,
  },
  iconText: {
    color: colors.white,
    marginHorizontal: mvs(10),
    fontSize: mvs(18),
    lineHeight: mvs(22),
  },
});
