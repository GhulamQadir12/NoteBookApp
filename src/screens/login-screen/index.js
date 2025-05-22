import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {onLogin, onLogin2} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const LoginScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);

  const initialValues = {
    email: '',
    password: '',
    // fcm_token: '123456',
    // type: 'User',
  };
  const [loading, setLoading] = React.useState(false);
  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
      return true;
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
      return true;
    } else {
      console.log('User has notification permissions disabled');
      return false;
    }
  }
  React.useEffect(() => {
    async function requestPermission() {
      const result = await requestNotifications(['alert', 'sound', 'badge']);
      if (result.status === 'granted') {
        // Notifications allowed
      } else {
        // Notifications not allowed
      }
    }

    requestPermission();
  }, []);
  const handleFormSubmit = async (value) => {
    try {
      // Indicate loading state
      const values = {
        username: value.email,
        password: value.password,
        grant_type: 'password',
        auth_type: 'webuser',
      };
      setLoading(true);
  
      console.log('Submitted values:', values);
  
      // Call the onLogin2 function with the provided values and loading handler
      const response = await dispatch(onLogin2(values, setLoading, true));
      
  
      console.log('Response in login screen =>', response);
  
      // Handle successful login (e.g., navigation or further actions)
      navigate('Drawer'); // Uncomment if navigation is ready
  
      // Additional operations like permission checks or token management
      // await checkApplicationPermission();
      // let fcmToken = '12345'; // Replace with actual token retrieval logic
      // try {
      //   fcmToken = await messaging().getToken();
      // } catch (error) {
      //   console.error('FCM token retrieval error:', error);
      // }
  
      // Dispatch login with extended data if necessary
      // dispatch(onLogin({ ...values, fcm_token: fcmToken }, setLoading, true));
  
    } catch (error) {
      console.error('Error during form submission:', error);
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
      <Image source={loginbackgroundimg} style={styles.backgroundImage} />
        <Bold
          label={'Welcome Back'}
          color={colors.primary}
          fontSize={mvs(20)}
          style={styles.welcomeText}
        />
        <Regular
          fontSize={mvs(10)}
          style={styles.loginText}
          label={'Login To Your Account'}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={signinFormValidation}
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
<View style={{paddingHorizontal: mvs(20)}}>
              <PrimaryInput
                containerStyle={{marginTop: mvs(25)}}
                keyboardType={'email-address'}
                error={touched?.email ? t(errors.email) : ''}
                placeholder={t('Email')}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                isEmail
              />
              <PrimaryInput
                isPassword
                error={touched?.password ? t(errors.password) : ''}
                placeholder={t('password')}
                // label={t('password')}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                containerStyle={{marginBottom: 0}}
                errorStyle={{marginBottom: 0}}
              />

              <Row style={{alignItems: 'center', paddingHorizontal: mvs(20)}}>
                <Row style={{gap: mvs(10), alignItems: 'center'}}>
                  <View
                    style={{
                      ...styles.checkView,
                      backgroundColor: rember ? colors.green : null,
                      borderWidth: rember ? mvs(0) : mvs(1),
                    }}>
                    <TouchableOpacity onPress={() => setRemember(!rember)}>
                      <MaterialIcons
                        size={15}
                        name={'done'}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                  <Regular color={colors.secondary} label={'Remember Me'} />
                </Row>

                <TouchableOpacity
                  onPress={() => navigate('ForgotPasswordScreen')}>
                  <Medium label={t('forgot_password?')} />
                </TouchableOpacity>
              </Row>
              <PrimaryButton
                containerStyle={{
                  borderRadius: mvs(10),
                  marginTop: mvs(60),
                }}
                loading={loading}
                onPress={handleSubmit}
                title={t('login')}
              />
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default LoginScreen;
