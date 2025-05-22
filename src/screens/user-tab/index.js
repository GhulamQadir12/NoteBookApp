import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import showToast from 'components/atoms/show-toast';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {updateProfile, uploadImage} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import {updateProfileFormValidation} from 'validations';
import styles from './styles';

const UserTab = props => {
  const [loading, setLoading] = React.useState(false);
  const [profileBtnLoading, setProfileBtnLoading] = React.useState(false);
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  console.log('user ifno===>', userInfo);
  const {countries} = user;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [firstname, setfirstname] = React.useState();
  const [password, setpassword] = React.useState();
  const [role, setRole] = React.useState(false);
  const [company, setCompany] = React.useState(false);

  const onSubmit = async values => {
    dispatch(
      updateProfile(
        {
          ...values,
          id: userInfo?.id,
          fcm_token: userInfo?.fcm_token,
          type: 'User',
          country_code: countries?.find(x => x?.selected)?.code || 'PK',
        },
        setProfileBtnLoading,
      ),
    );
  };

  const openGallery = async () => {
    try {
      const res = await UTILS._returnImageGallery(false, true);
      return;
      console.log('image path get', res);
      dispatch(
        uploadImage(
          {
            filename: 'crisp.jpg',
            avatar: res,
          },
          // () => {},
          setLoading,
        ),
      );
      showToast({
        type: 'success',
        text1: 'Upload Successful',
        text2: 'Your image has been uploaded!',
      });
    } catch (error) {
      console.log('upload image error', error);
      // Alert.alert('Error', UTILS?.returnError(error));
      showToast({
        type: 'error',
        text1: 'Upload Failed',
        text2: UTILS?.returnError(error),
      });
    }
  };

  // const onSubmit = async values => {
  //   dispatch(
  //     updateProfile(
  //       {
  //         ...values,
  //         id: userInfo?.id,
  //         fcm_token: userInfo?.fcm_token,
  //         type: 'User',
  //         country_code: countries?.find(x => x?.selected)?.code || 'PK',
  //       },
  //       setProfileBtnLoading,
  //     ),
  //   );
  // };

  // React.useEffect(() => {
  //   getCountryCodeDetails();
  // }, []);
  // const getCountryCodeDetails = async () => {
  //   try {
  //     dispatch(getCountryCode());
  //   } catch (error) {}
  // };
  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        {/* <ImageBackground source={IMG.userimg} style={styles.imgUpload}> */}
        {/* <TouchableOpacity
            style={styles.editbtn}
            // onPress={() => console.log("edit button")}>
            <FontAwesome name="edit" color={colors.primary} size={mvs(30)} />
          </TouchableOpacity> */}
        {/* <FontAwesome  onPress={() => console.log("edit button")}
            name="edit"
            color={colors.primary}
            size={mvs(30)}
            style={styles.editbtn}
          />
        </ImageBackground>

        <Medium color={colors.primary} label={'New User'} style={styles.name} /> */}
      </View>
      <View
        style={{
          width: '100%',
         // top: mvs(-60),
         marginTop: mvs(-60),
          height: mvs(150),
          //  backgroundColor:'red',
          // position: 'absolute',
          // bottom: mvs(20),
        }}>
        <ImageBackground source={IMG.userimg} style={styles.imgUpload}>
          {/* <TouchableOpacity
            style={styles.editbtn}
            // onPress={() => console.log("edit button")}>
            <FontAwesome name="edit" color={colors.primary} size={mvs(30)} />
          </TouchableOpacity> */}
          <FontAwesome
            onPress={() => {console.log('edit button')
              openGallery()}}
            name="edit"
            color={colors.primary}
            size={mvs(30)}
            style={styles.editbtn}
          />
        </ImageBackground>

        <Medium color={colors.primary} label={'New User'} style={styles.name} />
      </View>

      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboardcontentcontainer}>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            firstname: '',
            phone: '',
            email: '',
            password: '',
            role: '',
            company: '',
          }}
          validationSchema={updateProfileFormValidation}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setTouched,
            setFieldValue,
            values,
            touched,
            errors,
          }) => (
            <View style={styles.inputcontainer}>
              <PrimaryInput
                editIcons={true}
                placeholder={'User Name'}
                style={styles.textinput}
                placeholderTextColor={colors.secondary}
                onBlur={handleBlur('firstname')}
                error={touched.firstname && errors.firstname}
                onChangeText={handleChange('firstname')}
                value={values.firstname}
              />
              <PrimaryInput
                isEmail={true}
                placeholder={'Email'}
                style={styles.textinput}
                placeholderTextColor={colors.secondary}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                onChangeText={handleChange('email')}
                value={values.email}
              />
              <PrimaryInput
                isPassword={true}
                placeholder={'Password'}
                style={styles.textinput}
                placeholderTextColor={colors.secondary}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              <PrimaryInput
                placeholder={'Role'}
                style={styles.textinput}
                placeholderTextColor={colors.secondary}
              />
              <PrimaryInput
                placeholder={'Company'}
                style={styles.textinput}
                placeholderTextColor={colors.secondary}
              />
              <View style={{marginTop: mvs(50), gap: mvs(18)}}>
                <PrimaryButton
                  title="Save Task"
                  containerStyle={styles.containerStyle}
                  onPress={handleSubmit}
                />
                <PrimaryButton
                  title="Cancel"
                  containerStyle={styles.containerStyle2}
                  textStyle={styles.textStyle}
                />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
      </View>
  );
};
export default UserTab;
