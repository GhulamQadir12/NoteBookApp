import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIconLeavesTypeSelection,
  InputWithIconTypeSelection,
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
import {getLeaveTypes, onLogin, postTodo} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {addLeaveFormValidation, signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {pickDocument} from 'utils';
import {Checkbox} from 'components/atoms/checkbox';
const AddTodo = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');
  const [leaveType, setleaveTypeList] = React.useState([]);
  const [check, setCheck] = React.useState(false);

  // const fetchLeaveTypeList = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getLeaveTypes('EMP-BGM-0001');
  //     console.log('response in leave type list screen :', response);
  //     setleaveTypeList(response);
  //     //   setallData(response);
  //     console.log('Leave type List ', leaveType);
  //   } catch (err) {
  //     console.error('Failed to fetch data', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchLeaveTypeList(); // Fetch data on component mount
  // }, []);

  const initialValues = {
    Date: '',
    Title: '',
    Description: '',
    EnableNotification: 0,
    Status: 'Cancel',
    EnableNotificationDateTime: null,
    user_id: 29126,
  };

  const handleFormSubmit = async values => {
    try {
      // console.log('values', values.document[0].name);
      console.log('values are', values);
      // navigate('Drawer');
      setLoading(true);
      const res = await postTodo(values);
      console.log('res', res);
    } catch (error) {
      console.log('error=>', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysBetween = (dateFrom, dateTo) => {
    if (!dateFrom || !dateTo) return 0; // Return 0 if either date is not set
    const start = new Date(dateFrom);
    const end = new Date(dateTo);

    // Set time to midnight to avoid timezone issues
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const differenceInMilliseconds = end - start;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24); // Convert to days
    return differenceInDays + 1; // Add 1 to include both the start and end day
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

  const uploadDocument = async setFieldValue => {
    try {
      const pickedDocument = await pickDocument();
      if (pickedDocument) {
        setFieldValue('document', pickedDocument);
      }
    } catch (error) {
      console.log('Document Picker Error:', error);
    }
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
      <Header1x2x title={'Add Todos'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          // validationSchema={addLeaveFormValidation}
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
            useEffect(() => {
              if (values.date_from && values.date_to) {
                const days = calculateDaysBetween(
                  values.date_from,
                  values.date_to,
                );
                setFieldValue('nodays', days); // Update nodays value in Formik
              }
            }, [values.date_from, values.date_to, setFieldValue]),
            (
              <>
                {console.log('errror2', errors)}

                <PrimaryInput
                  // containerStyle={{marginTop: mvs(20)}}
                  error={touched?.Date ? t(errors.Date) : ''}
                  placeholder={'Select Date'}
                  onChangeText={handleChange('Date')}
                  onBlur={handleBlur('Date')}
                  value={values.Date}
                  isCalendar
                  editable={false}
                  // minimumDate={startOfToday}
                  // maximumDate={endOfMonth}
                />

                <PrimaryInput
                  placeholder={'Todo Title'}
                  onChangeText={handleChange('Title')}
                  onBlur={handleBlur('Title')}
                  value={values.Title}
                />
                <PrimaryInput
                  placeholder={'Add Description'}
                  onChangeText={handleChange('Description')}
                  onBlur={handleBlur('Description')}
                  value={values.Description}
                />

                <Row
                  style={{
                    alignItems: 'center',
                    marginTop: mvs(20),
                    justifyContent: 'flex-start',
                    gap: mvs(20),
                  }}>
                  <Checkbox
                    onPress={() => {
                      const updatedCheck = !check; // Toggle the boolean
                      setCheck(updatedCheck); // Update React state
                      setFieldValue('EnableNotification', updatedCheck ? 1 : 0); // Set 1 or 0 into Formik field
                    }}
                    checked={check}
                  />
                  <Regular label={'Enable Notification'} />
                </Row>

                <PrimaryButton
                  containerStyle={{
                    borderRadius: mvs(10),
                    marginTop: mvs(60),
                  }}
                  // loading={loading}
                  onPress={handleSubmit}
                  title={'Add'}
                />
              </>
            )
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default AddTodo;
