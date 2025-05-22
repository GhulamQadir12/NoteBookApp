import { colors } from 'config/colors'
import React from 'react'
import { ColorValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Medium from 'typography/medium-text'
type Props = {
  style?: StyleProp<ViewStyle>;
  label?: string;
  color?: ColorValue;
  children?: JSX.Element | JSX.Element[];
  show?: boolean;
};

export const EmptyList = (props: Props) => {
  const { children, style, label = 'No Result Found', color = colors.primary, show = true } = props;

  if (!show) return null;

  return (
    <View style={[styles.contentContainerStyle, style]}>
      {children}
      <Medium label={label} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})