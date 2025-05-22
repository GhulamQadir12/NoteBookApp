import {CrossModal, OTPAnimation} from 'assets/icons';
import {Loader} from 'components/atoms/loader';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {OtpInput} from 'components/atoms/otp-input';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import {t} from 'i18next';
import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Medium from 'typography/medium-text';
const ForgotOtpModal = ({
  disabled,
  loading,
  style = {},
  email,
  visible = false,
  value,
  isSignup = true,
  setValue,
  onClose = item => {},
  onPress = () => {},
}) => {
  const dispatch = useAppDispatch();

  // const verifyOtp = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await onVerifyOtp(
  //       {email, otp: value},
  //       // (onClose = () => {
  //       //   setShowOtpModal(true);
  //       // }),
  //       // setLoading,
  //     );
  //   } catch (error) {
  //     Alert.alert('Error', UTILS.returnError(error));
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const [showOtpModal, setShowOtpModal] = React.useState(false);
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      {/* {!showOtpModal ? ( */}
      <View style={styles.container}>
        <View style={styles.header} />
        <TouchableOpacity onPress={() => onClose()} style={styles.cross}>
          <CrossModal height={mvs(25)} width={mvs(25)} />
        </TouchableOpacity>
        <LottieView
          source={OTPAnimation}
          autoPlay={true}
          loop={true}
          style={{
            width: mvs(150),
            height: mvs(150),
            alignSelf: 'center',
            marginBottom: mvs(10),
          }}
        />
        <Medium
          numberOfLines={2}
          label={t('verfication_OTP')}
          style={{
            fontSize: mvs(20),
            color: colors.bluecolor,
            width: mvs(120),
            alignSelf: 'center',
            textAlign: 'center',
          }}
        />
        <Medium
          numberOfLines={3}
          style={styles.msg}
          color={colors.black}
          label={`${t('verfication_desc')} ${email || '@email'}`}
        />
        <View style={styles.otp}>
          <OtpInput setValue={setValue} value={value} />
        </View>
        <TouchableOpacity
          disabled={value?.length !== 4}
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
        </TouchableOpacity>
      </View>
      {/* ) : ( */}
      {/* <View style={styles.container}>
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
            label={t('your_otp_have_been_setup')}
            style={styles.otpsetuptext}
          />
          <Medium
            numberOfLines={3}
            style={styles.msg}
            label={`${t('now_you_use_this_otp_to_login_to_this_application')} `}
          />

          <TouchableOpacity
            disabled={disabled}
            // onPress={onPress}
            onPress={() => navigate('Login')}
            style={styles.okbutton}>
            {loading ? (
              <Loader />
            ) : (
              <Medium label={t('ok')} fontSize={mvs(20)} color={colors.white} />
            )}
          </TouchableOpacity>
        </View> */}
      {/* )} */}
    </ModalWrapper>
  );
};
export default ForgotOtpModal;
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
    width: mvs(105),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  msg: {
    textAlign: 'center',
    alignSelf: 'center',
    width: mvs(250),
    fontSize: mvs(14),
    // color: colors.bluecolor,
  },
  button: {
    paddingHorizontal: mvs(30),
    marginBottom: mvs(20),
  },
  cross: {padding: mvs(18), alignSelf: 'flex-end', position: 'absolute'},
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
