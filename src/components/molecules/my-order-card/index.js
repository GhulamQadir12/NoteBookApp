import {IconButton, PrimaryButton} from 'components/atoms/buttons';
import {Row} from 'components/atoms/row';
import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';
import {MessageTwo} from 'assets/icons';

const MyOrderCard = ({
  item,
  style,
  onPress = () => {},
  onMessagePress = () => {},
  onPressDetails = () => {},
  onPressTracking = () => {},

  chatLoading,
}) => {
  const hours = item?.total_hours;
  const duration = moment.duration(hours, 'hours');
  const formattedTime = moment
    .utc(duration.asMilliseconds())
    .format('HH:mm:ss');
  // console.log('formated time checkc===>', formattedTime);
  const {t} = i18n;
  return (
    <Row onPress={onPress} style={styles.contentContainerStyleNew}>
      <View style={{alignSelf: 'center', padding: mvs(10)}}>
        <Medium
          label={`${t('Order')} `}
          fontSize={mvs(16)}
          color={colors.white}
        />
        <Medium
          label={`#${item?.id} `}
          fontSize={mvs(16)}
          color={colors.white}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          paddingVertical: mvs(5),
        }}>
        <Row
          style={{
            borderBottomWidth: mvs(1),
            borderBottomColor: colors.border,
            paddingHorizontal: mvs(10),
            paddingBottom: mvs(5),
            alignItems: 'center',
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <Medium
              label={item?.service?.title ? item?.service?.title : 'N/A'}
              color={colors.bluecolor}
              fontSize={mvs(12)}
            />
          </View>

          {item?.driver_id ? (
            <IconButton
              loading={item.chatLoading}
              onPress={onMessagePress}
              containerStyle={styles.messageContainer}
              textStyle={styles.messageTextStyle}
              Icon={<MessageTwo />}
              title={t('Chat Now')}
            />
          ) : null}
        </Row>

        <Row
          style={{
            paddingHorizontal: mvs(10),
            paddingVertical: mvs(3),
            // justifyContent: 'flex-start',
          }}>
          <Medium
            label={t('Name')}
            fontSize={mvs(12)}
            color={colors.black}
            style={{width: mvs(110)}}
          />
          <Medium
            label={`${item?.name}`}
            fontSize={mvs(12)}
            color={colors.grey}
            style={{flex: 1}}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(10), paddingVertical: mvs(3)}}>
          <Medium
            style={{width: mvs(110)}}
            label={t('delivery_date')}
            fontSize={mvs(12)}
            color={colors.black}
          />
          <Medium
            label={
              item?.pickup_date
                ? moment(item?.pickup_date).format('YYYY-MM-DD')
                : 'N/A'
            }
            numberOfLines={1}
            fontSize={mvs(12)}
            color={colors.grey}
            style={{flex: 1}}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(10), paddingVertical: mvs(3)}}>
          <Medium
            label={t('pickup_location')}
            fontSize={mvs(12)}
            color={colors.black}
            style={{width: mvs(110)}}
          />
          <Medium
            label={`${item?.pickup_address}`}
            fontSize={mvs(12)}
            color={colors.grey}
            style={{flex: 1}}
          />
        </Row>
        <Row style={{paddingHorizontal: mvs(10), paddingVertical: mvs(3)}}>
          {item?.price_type === 'hour_price' ? (
            <Medium
              label={t('Hour Price')}
              fontSize={mvs(12)}
              color={colors.black}
              style={{width: mvs(110)}}
            />
          ) : (
            <Medium
              label={t('Price')}
              fontSize={mvs(12)}
              color={colors.black}
              style={{width: mvs(110)}}
            />
          )}

          {item?.price_type === 'hour_price' ? (
            <Medium
              label={item?.per_hour ? item?.per_hour : 'N/A'}
              fontSize={mvs(12)}
              color={colors.grey}
              style={{flex: 1}}
            />
          ) : (
            <Medium
              label={item?.price ? item?.price : 'N/A'}
              fontSize={mvs(12)}
              color={colors.grey}
              style={{flex: 1}}
            />
          )}
        </Row>
        <Row style={{paddingHorizontal: mvs(10), paddingVertical: mvs(3)}}>
          <Medium
            style={{width: mvs(110)}}
            label={t('Order Request')}
            fontSize={mvs(12)}
            color={colors.black}
          />
          <Medium
            label={
              item?.price_type == 'hour_price' ? 'Hourly Price ' : 'Fixed price'
            }
            numberOfLines={1}
            fontSize={mvs(12)}
            color={colors.grey}
            style={{flex: 1}}
          />
        </Row>
        {item?.total_hours > 0 && (
          <Row style={{paddingHorizontal: mvs(10), paddingVertical: mvs(3)}}>
            <Medium
              style={{width: mvs(110)}}
              label={t('Total Time')}
              fontSize={mvs(12)}
              color={colors.black}
            />
            <Medium
              label={formattedTime}
              numberOfLines={1}
              fontSize={mvs(12)}
              color={colors.grey}
              style={{flex: 1}}
            />
          </Row>
        )}

        <Row
          style={{
            paddingHorizontal: mvs(10),
            paddingVertical: mvs(8),
            justifyContent: item?.driver?.id ? 'space-between' : 'flex-end',
          }}>
          {/* <PrimaryButton
            title={t('accept')}
            containerStyle={{
              width: mvs(80),
              height: mvs(30),
              backgroundColor: colors.acceptcolor,
              borderColor: colors.lightGray,
            }}
            textStyle={{
              color: colors.white,
            }}
            onPress={onPressAccept}
          />
          <PrimaryButton
            title={t('rejected')}
            containerStyle={{
              width: mvs(80),
              height: mvs(30),
              backgroundColor: colors.primary,

              ...colors.shadow,
            }}
            textStyle={{
              color: colors.white,
            }}
            onPress={onPressReject}
          /> */}

          {/* <PrimaryButton
            title={t('Driver Review')}
            containerStyle={{
              height: mvs(30),
              width: '45%',
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.primary,
              ...colors.shadow,
            }}
            textStyle={{
              color: colors.primary,
            }}
            onPress={onPressDetails}
          /> */}

          {item?.driver?.id && (
            <PrimaryButton
              title={t('Tracking')}
              containerStyle={{
                width: '45%',
                height: mvs(30),
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.primary,
                ...colors.shadow,
              }}
              textStyle={{
                color: colors.primary,
              }}
              onPress={onPressTracking}
            />
          )}
          <PrimaryButton
            title={t('details')}
            containerStyle={{
              width: '45%',
              height: mvs(30),
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.primary,
              ...colors.shadow,
            }}
            textStyle={{
              color: colors.primary,
            }}
            onPress={onPressDetails}
          />
        </Row>
      </View>
    </Row>
  );
};
export default React.memo(MyOrderCard);
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
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(6),
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
  messageContainer: {
    height: null,
    marginLeft: mvs(10),
    padding: mvs(8),
    borderWidth: mvs(1),
    borderColor: colors.primary,
    // width: '40%',
  },
  messageTextStyle: {
    fontSize: mvs(12),
    lineHeight: mvs(16),
  },
});
