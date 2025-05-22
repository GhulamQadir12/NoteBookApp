import { PrimaryButton } from 'components/atoms/buttons';
import { Row } from 'components/atoms/row';
import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
const LabelValue = ({label, value, containerStyle, labelStyle, valueStyle}) => (
  <Row style={containerStyle}>
    <Medium
      style={labelStyle}
      label={label}
      fontSize={mvs(12)}
      color={colors.white}
    />
    <Regular
      style={valueStyle}
      label={value}
      fontSize={mvs(12)}
      color={colors.white}
    />
  </Row>
);
const ItemDetailsCard = ({
  item,
  backgroundColor,
  index,
  style,
  onPress = () => {},
  onPressAccept = () => {},
  onPressReject = () => {},
  onPressDetails = () => {},
  onPressCart = () => {},
}) => {
  const {t} = i18n;
  return (
    <View onPress={onPress} style={styles.contentContainerStyleNew}>
      <Row
        style={{
          justifyContent: 'flex-start',
          marginHorizontal: mvs(5),
          alignItems: 'center',
        }}> 


        {/* <Regular
          // style={{width: width / 3}}
          style={{flex: 1}}
          label={`${item?.label} (${item?.name})`}
          fontSize={mvs(9)}
          color={colors.white}
        /> */}
              {/* <Text>Name: {item.name}</Text> */}
      {Array.isArray(item.value) ? (
        <Regular
          style={{flex: 1}}
          label={` ${item?.label}: ${item.value.join('\n ')}`}
          numberOfLines={41}
          fontSize={mvs(10)}
          color={colors.white}
        /> 
      ) : (
        <Regular
        style={{flex: 1}}
        label={`${item?.label}: ${item.value}`}
        numberOfLines={5}
        fontSize={mvs(10)}
        color={colors.white}
      /> 
      )}

       {item?.quantity && (
          <PrimaryButton
            disabled={true}
            title={item?.quantity || 0}
            containerStyle={{
              width: mvs(31),
              height: mvs(20),
              backgroundColor: colors.bluecolor,
              borderColor: colors.lightGray,
              marginLeft: mvs(5),
            }}
            textStyle={{
              color: colors.white,
              fontSize: mvs(10),
            }}
          />
        )}
      </Row>
    </View>
  );
};
export default React.memo(ItemDetailsCard);
const styles = StyleSheet.create({
  container: {
    height: mvs(327),
    width: mvs(147),
    borderRadius: mvs(15),
    marginBottom: mvs(20),
    borderWidth: 1,
    backgroundColor: colors.primary,
    // backgroundColor: index % 2 === 0 ? colors.homecard1 : colors.homecard2,

    // ...colors.shadow,
  },
  contentContainerStyleNew: {
    marginVertical: mvs(5),
    overflow: 'hidden',
    paddingVertical: mvs(8),
    flex: 1,
    // borderColor: colors.primary,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    // borderWidth: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
    // borderRadius: mvs(6),
  },
  row: {alignItems: 'flex-end'},
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  btn: {
    backgroundColor: colors.white,
    height: mvs(28),
    width: mvs(96),
    borderRadius: mvs(10),
    ...colors.shadow,
  },
  btnTxt: {color: colors.primary, fontSize: mvs(12), lineHeight: mvs(16)},
  imgStyle: {borderRadius: mvs(15)},

  grd: {
    height: '100%',
    padding: mvs(15),
    borderRadius: mvs(15),
  },
  heartContainer: {
    position: 'absolute',
    right: mvs(20),
    top: mvs(-13),
    justifyContent: 'center',
    alignItems: 'center',
    height: mvs(30),
    width: mvs(30),
    borderRadius: mvs(15),
    backgroundColor: colors.red,
  },
});
