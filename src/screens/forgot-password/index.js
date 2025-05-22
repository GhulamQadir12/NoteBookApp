import {forgotbackgroundimg} from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import showToast from 'components/atoms/show-toast';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {goBack, navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Image, View, ImageBackground, TouchableOpacity} from 'react-native';
import {onForgot} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import {forgotPasswordValidation} from 'validations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {UTILS} from 'utils';
const ForgotPasswordScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    email: '',
  };
  const handleFormSubmit = async values => {
    try {
      // setLoading(true);
      // const res = await onForgot(values);
      // setLoading(false);
      // console.log('res===>>>>> forgot', res);
      // if (res == null) {
      //   showToast({
      //     type: 'error',
      //     text1: 'Error',
      //     text2: 'Email is not register with us',
      //   });
      // } else {
      navigate('ResetPasswordScreen');
      // navigate('ResetPasswordScreen',
      //  {
      //   ...values,
      // });
      // }
      // setOtpModalVisible(true);
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Forgot password Failed',
        text2: UTILS.returnError(error),
      });
      console.log('error=>', error);
      setLoading(false);
    }
  };
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={forgotbackgroundimg}
        style={styles.backgroundImage}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons
            style={{marginTop: mvs(20), paddingHorizontal: mvs(20)}}
            name="chevron-back"
            size={25}
            color={colors.white}
          />
        </TouchableOpacity>
      </ImageBackground>
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Bold
          label={'Forgot Password'}
          color={colors.primary}
          fontSize={mvs(20)}
          style={styles.welcomeText}
        />

        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordValidation}
          onSubmit={handleFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            touched,
            values,
            errors,
          }) => (
            <>
              {console.log('errror2', errors)}

              <PrimaryInput
                containerStyle={{marginTop: mvs(25)}}
                keyboardType={'email-address'}
                error={touched?.email ? t(errors.email) : ''}
                placeholder={t('email')}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                isEmail
              />

              <PrimaryButton
                containerStyle={{
                  borderRadius: mvs(10),
                  marginTop: mvs(60),
                }}
                loading={loading}
                onPress={handleSubmit}
                title={'Continue'}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default ForgotPasswordScreen;
