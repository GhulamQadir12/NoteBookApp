import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {TextAreaInput} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {onLogin, postAdvance} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {addAdvanceFormValidation, signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { pickDocument } from 'utils';
const AdvanceRequest = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');

  const initialValues = {
    request_date: '',
    advanceAmount: '',
    reason: '',
    // document: '',
  };

  const handleFormSubmit = async (values,{resetForm}) => {
    try {
      const formatedData = {
        "EmployeeId": "EMP-BGM-0001",
        "DateofAdvance":  `${values.request_date}T00:00:00.000Z`,
        "AmountOfAdvance": values.advanceAmount,
        "ReasonOfAdvance": values.reason,
        "CompanyId": "8",
        "GroupId": "1",
        "HRapproval": "Pending",
        "Status": "Draft",
        "Statusof": false
    };
      console.log('formatted values', formatedData);
      const res = await postAdvance(formatedData);
      Alert.alert(
        'Data submitted successfully',
      );
      resetForm();
      // navigate('Drawer');
      // setLoading(true)
    } catch (error) {
      console.log('error=>', error);
    } finally {
      // setLoading(false);
    }
  };


  const uploadDocument = async setFieldValue => {
    try {
      console.log("ruuning")
      const pickedDocument = await pickDocument();
      if (pickedDocument) {
        setFieldValue('document', pickedDocument);
      }
    } catch (error) {
      console.log('Document Picker Error:', error);
    }
  };
  
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  console.log('startOfMonth', startOfMonth);
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  console.log('endOfMonth', endOfMonth);

  const getCurrentDateInCustomFormat = () => {
    return moment().format('MMMM,YYYY');
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={'Request For Advance'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          validationSchema={addAdvanceFormValidation}
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
                containerStyle={{marginTop: mvs(15)}}
                error={touched?.request_date ? t(errors.request_date) : ''}
                placeholder={'Request Date'}
                onChangeText={handleChange('request_date')}
                onBlur={handleBlur('request_date')}
                value={values.request_date}
                isCalendar
                editable={false}
                minimumDate={startOfMonth}
                maximumDate={endOfMonth}
              />
              <PrimaryInput
                error={touched?.advanceAmount ? t(errors.advanceAmount) : ''}
                placeholder={'Amount of Advance'}
                onChangeText={handleChange('advanceAmount')}
                onBlur={handleBlur('advanceAmount')}
                value={values.advanceAmount}
              />

              <TextAreaInput
                error={
                  touched?.reason ? t(errors.reason) : ''
                }
                placeholder={'Reason'}
                onChangeText={handleChange('reason')}
                onBlur={handleBlur('reason')}
                value={values.reason}
              />
          {/*    <Medium
                color={colors.primary}
                fontSize={mvs(16)}
                label={'Document:'}
              />
               <Row
                style={{
                  justifyContent: 'flex-start',
                  gap: mvs(20),
                  alignItems: 'center',
                  marginTop: mvs(10),
                }}>
                <TouchableOpacity style={styles.uploadBtn}
                onPress={() => uploadDocument(setFieldValue)}
                >
                  <Row style={{gap: mvs(10)}}>
                    <AntDesign color={colors.primary} name="upload" size={15} />
                    <Regular label={'Upload'} />
                  </Row>
                </TouchableOpacity>
                {values.document ? (
                    <View style={{width: '60%'}}>
                      <Medium
                        numberOfLines={3}
                        color={colors.primary}
                        fontSize={mvs(14)}
                        label={values.document[0].name}
                      />
                    </View>
                  ) : (
                    <Regular
                      style={{marginTop: mvs(10)}}
                      color="gray"
                      fontSize={mvs(12)}
                      label="No yet selected."
                    />
                  )}

                {touched.document && errors.document && (
                  <Regular
                    color="red"
                    label={errors.document}
                    fontSize={mvs(10)}
                  />
                )}
              </Row> */}
              <PrimaryButton
                containerStyle={{
                  borderRadius: mvs(10),
                  marginTop: mvs(60),
                }}
                loading={loading}
                onPress={handleSubmit}
                title={'Raise Request'}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default AdvanceRequest;
