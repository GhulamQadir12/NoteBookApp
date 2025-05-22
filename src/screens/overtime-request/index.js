import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIconEmployeeSelection,
  InputWithIconLeavesTypeSelection,
  InputWithIconTypeSelection,
  InputWithIconWFHSelection,
  TextAreaInput,
} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {
  getLeaveTypes,
  getWorkFromHomeCategory,
  onLogin,
} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {
  addLeaveFormValidation,
  addWFHFormValidation,
  signinFormValidation,
} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {pickDocument} from 'utils';
const OverTimeRequest = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');
  const [leaveType, setleaveTypeList] = React.useState([]);
  const [categoryType, setCategoryType] = React.useState([]); // Track the expanded card by its ID

  const fetchWorkFromHomeCategory = async () => {
    try {
      setLoading(true);
      const response = await getWorkFromHomeCategory();
      setCategoryType(response || []);
      console.log('WFH category', categoryType);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkFromHomeCategory(); // Fetch data on component mount
  }, []);

  const initialValues = {
    request_date: '',
    time_from: '',
    time_to: '',
    nohours: '',
    reason: '',
  };

  const handleFormSubmit = async values => {
    try {
      // console.log('values', values.document[0].name);
      console.log('values', values);
      // navigate('Drawer');
      // setLoading(true)
    } catch (error) {
      console.log('error=>', error);
    } finally {
      // setLoading(false);
    }
  };

  const calculateHoursBetween = (timeFrom, timeTo) => {
    if (!timeFrom || !timeTo) return 0; // Return 0 if either time is not set
  
    const start = moment(timeFrom, 'HH:mm'); // Parse in 24-hour format
    const end = moment(timeTo, 'HH:mm');
  
    const duration = moment.duration(end.diff(start));
    const hours = duration.asHours(); // Get the difference in hours
    return hours > 0 ? hours : 0; // Ensure no negative values
  };
  

  const currentDate = new Date();
  const startOfToday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  // Format the date for display
  const getCurrentDateInCustomFormat = () => {
    return moment().format('MMMM, YYYY');
  };

  const onPress = (setFieldValue, type) => {
    if (type === 'annual') {
      setSelected('annual');
      setFieldValue('leaveType', 'annual');
    } else if (type === 'casual') {
      setSelected('casual');
      setFieldValue('leaveType', 'casual');
    } else if (type === 'sick') {
      setSelected('sick');
      setFieldValue('leaveType', 'sick');
    }
    console.log('selected ', selected);
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={'Overtime Request'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          validationSchema={addWFHFormValidation}
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
              <PrimaryInput
                error={touched?.request_date ? t(errors.request_date) : ''}
                placeholder={'Request Date'}
                onChangeText={handleChange('request_date')}
                onBlur={handleBlur('request_date')}
                value={values.request_date}
                isCalendar
                editable={false}
              />
              <PrimaryInput
                mode="time"
                error={touched?.time_from ? t(errors.time_from) : ''}
                placeholder={'Time From'}
                onChangeText={value => {
                  handleChange('time_from')(value);
                  const hours = calculateHoursBetween(value, values.time_to);
                  setFieldValue('nohours', hours); // Update nohours dynamically
                }}
                onBlur={handleBlur('time_from')}
                value={values.time_from}
                isClock
                editable={false}
              />
              <PrimaryInput
                mode="time"
                error={touched?.time_to ? t(errors.time_to) : ''}
                placeholder={'Time To'}
                onChangeText={value => {
                  handleChange('time_to')(value);
                  const hours = calculateHoursBetween(values.time_from, value);
                  setFieldValue('nohours', hours); // Update nohours dynamically
                }}
                onBlur={handleBlur('time_to')}
                value={values.time_to}
                isClock
                editable={false}
              />
              <PrimaryInput
                error={touched?.nohours ? t(errors.nohours) : ''}
                placeholder={'No of Hours'}
                onChangeText={handleChange('nohours')}
                onBlur={handleBlur('nohours')}
                value={values.nohours ? values.nohours.toString() : ''} // Display the number of hours
                editable={false}
              />
              <TextAreaInput
                placeholder={'Reason'}
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
export default OverTimeRequest;
