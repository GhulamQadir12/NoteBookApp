import {Row} from 'components/atoms/row';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';
import moment from 'moment';
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
const OrderDetailsCard = ({
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
  console.log('first', item);
  return (
    <View onPress={onPress} style={styles.contentContainerStyleNew}>
      {/* <Row
        style={{
          padding: mvs(10),
          borderBottomWidth: mvs(1),
          borderBottomColor: colors.white,
        }}>
        <Medium
          label={`${t('Odrer')}: #${item?.Order_no} `}
          fontSize={mvs(16)}
          color={colors.white}
        />
        <Medium label={item?.date} fontSize={mvs(16)} color={colors.white} />
      </Row> */}
      <LabelValue
        containerStyle={{
          paddingVertical: mvs(8),
          borderBottomWidth: mvs(1),
          borderBottomColor: colors.white,
        }}
        label={`${t('Odrer Id')}:  #${item?.id ? item?.id : 'N/A'} `}
        value={
          item?.created_at
            ? moment(item?.created_at).format('YYYY-MM-DD')
            : 'N/A'
        }
      />
      {/* <View
        style={{
          flex: 1,
          paddingVertical: mvs(5),
        }}> */}
      <LabelValue
        containerStyle={{
          // paddingHorizontal: mvs(10),
          paddingVertical: mvs(8),
        }}
        label={t('Name')}
        value={item?.name}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          // paddingHorizontal: mvs(10),
          paddingVertical: mvs(8),
        }}
        label={t('Delivery Pickup Time')}
        value={
          item?.pickup_date
            ? moment(item?.pickup_date).format('hh:mm:ss')
            : 'N/A'
        }
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          // paddingHorizontal: mvs(10),
          paddingVertical: mvs(8),
        }}
        label={t('pickup_location')}
        value={item?.pickup_address}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          // paddingHorizontal: mvs(10),
          paddingVertical: mvs(8),
        }}
        label={t('Dropoff Location')}
        value={item?.dropoff_address}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          // paddingHorizontal: mvs(10),
          paddingVertical: mvs(8),
        }}
        label={t('service_type')}
        value={item?.service?.title}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      {item?.price_type != 'hour_price' && (
        <LabelValue
          containerStyle={{
            // paddingHorizontal: mvs(10),
            paddingVertical: mvs(8),
          }}
          label={'Price Paid:'}
          value={(item?.price - item?.driver_price).toFixed(1) || 'N/A'}
          labelStyle={{flex: 1}}
          valueStyle={{flex: 1}}
        />
      )}
      {item?.price_type != 'hour_price' && (
        <LabelValue
          containerStyle={{
            // paddingHorizontal: mvs(10),
            paddingVertical: mvs(8),
          }}
          label={'Remaining Price:'}
          value={item?.driver_price || 'N/A'}
          labelStyle={{flex: 1}}
          valueStyle={{flex: 1}}
        />
      )}
    </View>
    // </View>
  );
};
export default React.memo(OrderDetailsCard);
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
    marginVertical: mvs(10),
    overflow: 'hidden',
    paddingVertical: mvs(8),
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
    borderBottomWidth: mvs(1),
    borderBottomColor: colors.white,
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
