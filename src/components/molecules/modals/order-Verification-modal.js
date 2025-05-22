import {CheckmarkAnimation, CrossModal, OTPAnimation} from 'assets/icons';
import {Loader} from 'components/atoms/loader';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {colors} from 'config/colors';
import {t} from 'i18next';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Medium from 'typography/medium-text';
import {mvs} from 'config/metrices';
import {OtpInput} from 'components/atoms/otp-input';
import LottieView from 'lottie-react-native';
import {Row} from 'components/atoms/row';
import PrimaryInput, {
  InputWithIcon,
  PrimaryPhoneInput,
} from 'components/atoms/inputs';
import {PrimaryButton} from 'components/atoms/buttons';
const OrderVerficationModal = ({
  disabled,
  loading,
  style = {},
  email,
  setEmail,
  visible = false,
  value,
  setValue,
  onClose = item => {},
  onPress = () => {},
}) => {
  const [showOtpModal, setShowOtpModal] = React.useState(false);
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      {!showOtpModal ? (
        <View style={styles.container}>
          <View style={styles.header} />
          <TouchableOpacity onPress={() => onClose()} style={styles.cross}>
            <CrossModal height={mvs(30)} width={mvs(30)} />
          </TouchableOpacity>
          {/* <LottieView
            source={OTPAnimation}
            autoPlay={true}
            loop={true}
            style={{
              width: mvs(150),
              height: mvs(150),
              alignSelf: 'center',
              marginBottom: mvs(10),
            }}
          /> */}
          <View
            style={{
              width: mvs(280),
              marginRight: mvs(20),
              backgroundColor: colors.bluecolor,
              borderRadius: mvs(18),
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginTop: mvs(20),
            }}>
            <View style={{paddingVertical: mvs(10)}}>
              <Medium
                label={`${t('you_selected_date')} ${email || '2023-08-25'}`}
                fontSize={mvs(12)}
                color={colors.black}
              />
            </View>
          </View>

          <Medium
            numberOfLines={2}
            label={t('please_enter_your_email_to_place_your_order')}
            style={{
              fontSize: mvs(14),
              color: colors.primary,
              marginHorizontal: mvs(20),
              marginVertical: mvs(20),

              // alignSelf: 'center',
              // textAlign: 'center',
            }}
          />
          <Medium style={styles.msg} label={t('3000')} />
          <View style={styles.otp}>
            <PrimaryInput
              keyboardType={'email-address'}
              placeholder={t('email')}
              onChangeText={setEmail}
              value={setEmail}
            />
          </View>
          {/* <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={{
              backgroundColor: colors.blueHalf,
              alignSelf: 'center',
              height: mvs(60),
              width: mvs(60),
              borderRadius: mvs(30),
              marginTop: mvs(15),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loading ? (
              <Loader />
            ) : (
              <Icon color={colors.primary} size={25} name={'arrowright'} />
            )}
          </TouchableOpacity> */}
          <View style={{paddingHorizontal: mvs(20)}}>
            <PrimaryButton
              containerStyle={{
                borderRadius: mvs(10),
              }}
              loading={loading}
              onPress={onPress}
              title={t('next')}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header} />
          <TouchableOpacity onPress={() => onClose()} style={styles.cross}>
            <CrossModal height={mvs(25)} width={mvs(25)} />
          </TouchableOpacity>
          <LottieView
            source={CheckmarkAnimation}
            autoPlay={true}
            loop={true}
            style={styles.lottieview}
          />
          <Medium
            // numberOfLines={2}
            label={t('email_sent_successfylly')}
            style={styles.otpsetuptext}
          />

          <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={styles.okbutton}>
            {loading ? (
              <Loader />
            ) : (
              <Medium label={t('ok')} fontSize={mvs(20)} color={colors.white} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </ModalWrapper>
  );
};
export default OrderVerficationModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: mvs(20),
  },
  container: {
    // height: mvs(300),
    backgroundColor: colors.white,
    paddingVertical: mvs(15),
    borderRadius: mvs(20),
  },
  otp: {paddingHorizontal: mvs(20), marginTop: mvs(20)},
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  msg: {
    // textAlign: 'center',
    // alignSelf: 'center',

    marginHorizontal: mvs(20),
    // width: mvs(250),
    fontSize: mvs(14),
    color: colors.primary,
    // color: colors.bluecolor,
  },
  button: {
    paddingHorizontal: mvs(30),
    marginBottom: mvs(20),
  },
  cross: {padding: mvs(14), alignSelf: 'flex-end', position: 'absolute'},
  lottieview: {
    width: mvs(150),
    height: mvs(150),
    alignSelf: 'center',
    marginBottom: mvs(10),
  },
  otpsetuptext: {
    fontSize: mvs(18),
    color: colors.bluecolor,
    // width: mvs(120),
    alignSelf: 'center',
    textAlign: 'center',
  },
  okbutton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    height: mvs(60),
    width: mvs(60),
    borderRadius: mvs(30),
    marginTop: mvs(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
