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
import {onLogin, postAttendanceCorrection} from 'services/api/auth-api-actions';
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
import moment from 'moment';
const AttendanceCorrectionRequest = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');

  const initialValues = {
    request_date: '',
    correction_date: '',
    chIn_time: '',
    chOut_time: '',
    reason: '',
    // document: '',
  };

const formattingTime = (time) => {
  const formatted = moment(time, "hh:mm A").format("HH:mm:ss");
  return formatted;
}

  const handleFormSubmit = async values => {
    try {
      // navigate('Drawer');
      setLoading(true)
      const formatedData = {
        "ReqDetails": `<p>${values.reason}</p>\n`,
    "Path": "",
    "DateTime": values.correction_date,
    "DepartmentId": "",
    "EmployeeID": "EMP-BGM-0001",
    "ApprovalStatus": "Pending",
    "DepartmentID": 2108,
    "ReqDate": values.request_date,
    "CorrChIn": formattingTime(values.chIn_time),
    "CorrChOut": formattingTime(values.chOut_time),
    "CompanyId": "8",
    "GroupId": "1"
      };
      console.log('values', formatedData);
      await postAttendanceCorrection(formatedData);
      Alert.alert('Request Submitted Successfully');
    } catch (error) {
      console.log('error=>', error);
    } finally {
      setLoading(false);
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
  
  const getCurrentDateInCustomFormat = () => {
    return moment().format('MMMM,YYYY');
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={'Request For Correction'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          // validationSchema={addAdvanceFormValidation}
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
              label={'Request Date'}
              isRequired={true}
                containerStyle={{marginTop: mvs(0)}}
                error={touched?.request_date ? t(errors.request_date) : ''}
                placeholder={'select Date'}
                onChangeText={handleChange('request_date')}
                onBlur={handleBlur('request_date')}
                value={values.request_date}
                isCalendar
                editable={false}
              />
              <PrimaryInput
              label={'Correction Date'}
              isRequired={true}
                containerStyle={{marginTop: mvs(0)}}
                error={touched?.correction_date ? t(errors.correction_date) : ''}
                placeholder={'select Date'}
                onChangeText={handleChange('correction_date')}
                onBlur={handleBlur('correction_date')}
                value={values.correction_date}
                isCalendar
                editable={false}
              />
              <PrimaryInput
              label={'Check In Time'}
              isRequired={true}
                containerStyle={{marginTop: mvs(0)}}
                error={touched?.chIn_time ? t(errors.chIn_time) : ''}
                placeholder={'select time '}
                onChangeText={handleChange('chIn_time')}
                onBlur={handleBlur('chIn_time')}
                value={values.chIn_time}
                isClock
                editable={false}
                mode={'time'}
              />
              <PrimaryInput
              label={'Check Out Time'}
              isRequired={true}
                containerStyle={{marginTop: mvs(0)}}
                error={touched?.chOut_time ? t(errors.chOut_time) : ''}
                placeholder={'select time'}
                onChangeText={handleChange('chOut_time')}
                onBlur={handleBlur('chOut_time')}
                value={values.chOut_time}
                isClock
                editable={false}
                mode={'time'}
              />
              <TextAreaInput
                error={
                  touched?.reason ? t(errors.reason) : ''
                }
                placeholder={'Request Body'}
                onChangeText={handleChange('reason')}
                onBlur={handleBlur('reason')}
                value={values.reason}
              />
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
export default AttendanceCorrectionRequest;
