import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIconComplainTypeSelection,
  InputWithIconDepartmentSelection,
  InputWithIconEmployeeSelection,
  InputWithIconLeavesTypeSelection,
  InputWithIconNotificationSelection,
  InputWithIconrepetationSelection,
  TextAreaInput,
} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {goBack, navigate} from 'navigation/navigation-ref';
import React, {useEffect} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {
  getDepartmentList,
  getEmployeesList,
  getEventCalenderNotificationTypeList,
  getEventCalenderRepeatationTypeList,
  onLogin,
  postEventsCalender,
} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {addCompliantFormValidation, signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Checkbox} from 'components/atoms/checkbox';
const AddEvent = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [departList, setDepartList] = React.useState([]);
  const [repetationTypes, setRepetationType] = React.useState([]);
  const [notificaionTypes, setNotificaionType] = React.useState([]);
  const [empList, setEmpList] = React.useState([]);
  const [selected, setSelected] = React.useState('task');

  const complainType = [
    {id: 1, name: 'General'},
    {id: 2, name: 'Department'},
    {id: 3, name: 'Individuals'},
  ];

  // const repetationType = [
  //   {index: 0, elem: 'Does not repeat'},
  //   {index: 1, elem: 'Every Daily'},
  //   {index: 2, elem: 'Every Weekly'},
  //   {index: 3, elem: 'Every Month'},
  //   {index: 4, elem: 'Every Year'},
  // ];
  // const notificationType = [
  //   {index: 0, elem: '5 minutes before'},
  //   {index: 1, elem: '10 minutes before'},
  //   {index: 2, elem: '15 minutes before'},
  //   {index: 3, elem: '30 minutes before'},
  //   {index: 4, elem: '1 hour before'},
  //   {index: 5, elem: '1 day before'},
  //   {index: 6, elem: 'custom'},
  // ];

  const fetchTypesList = async () => {
    try {
      setLoading(true);
      const response = await getEventCalenderRepeatationTypeList();
      const response2 = await getEventCalenderNotificationTypeList();
      // console.log('response in complain list screen :', response);
      setRepetationType(response);
      setNotificaionType(response2);
      console.log('repeta type List ', repetationTypes);
      console.log('noti type List ', notificaionTypes);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };
  // console.log("check",check)
  // setCheck(!check);
  console.log('!check', check);

  useEffect(() => {
    fetchTypesList(); // Fetch data on component mount
  }, []);

  const notificationType = notificaionTypes.map((item, index) => ({
    index,
    elem: item.Name,
  }));
  // const repetationType = repetationTypes.map((item, index) => ({
  //   index,
  //   elem: item.Name,
  // }));
  const formatFormDataForApi = values => {
    const formatDateTime = (date, time) => {
      const [timeString, period] = time.split(' ');
      let [hours, minutes] = timeString.split(':').map(Number);
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      return `${date}T${String(hours).padStart(2, '0')}:${String(
        minutes,
      ).padStart(2, '0')}:00`;
    };

    return {
      GroupId: values.GroupId,
      CompanyId: values.CompanyId,
      Title: values.Title,
      Description: values.Description,
      StartDate: values.StartDate,
      EndDate: values.EndDate,
      StartTime: formatDateTime(values.StartDate, values.StartTime),
      EndTime: formatDateTime(values.EndDate, values.EndTime),
      user_id: values.user_id,
      AddNotification: values.AddNotification ? 1 : 0,
      NotificationType:
        values.AddNotification == 1 ? values.notification.index : 0, // or .id if needed
      RepeationType: values.repetation,
    };
  };

  const initialValues = {
    GroupId: 1,
    CompanyId: 8,
    // EventId: 0,
    Title: '',
    Description: '',
    StartDate: '',
    EndDate: '',
    StartTime: '',
    EndTime: '',
    user_id: 29126,
    AddNotification: 0,
    notification: 0,
    RepeationType: 0,
  };

  const handleFormSubmit = async values => {
    // if (values?.empList == '' && values?.departList == '') {
    //   console.log('error=>', 'error');
    //   return;
    // }
    try {
      const apiPayload = formatFormDataForApi(values);
      console.log('API Payload:', apiPayload);
      const res = await postEventsCalender(apiPayload);
      console.log('res', res);
      Alert.alert('Event Added Successfully');
      // navigate('Drawer');
      // setLoading(true)
    } catch (error) {
      console.log('error=>', error);
    } finally {
      // setLoading(false);
    }
  };
  const onPress = (setFieldValue, type) => {
    if (type === 'task') {
      setSelected('task');
      setFieldValue('type', 'task');
    } else if (type === 'event') {
      setSelected('event');
      setFieldValue('type', 'event');
    }
    console.log('selected ', selected);
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={'Add Event'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          // validationSchema={addCompliantFormValidation}
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
              {/* <Row style={{paddingHorizontal: mvs(20)}}>
                <PrimaryButton
                  onPress={() => {
                    onPress(setFieldValue, (type = 'task'));
                  }}
                  title="Task"
                  textStyle={{
                    color:
                      selected === 'task' ? colors.primary : colors.halfWhite,
                  }}
                  containerStyle={{
                    // width: '25%',
                    flex: 1,
                    height: mvs(40),
                    backgroundColor:
                      selected === 'task' ? colors.yellow : colors.darkwhite,
                  }}
                />
                <PrimaryButton
                  onPress={() => {
                    onPress(setFieldValue, (type = 'event'));
                  }}
                  textStyle={{
                    color:
                      selected == 'event' ? colors.primary : colors.halfWhite,
                  }}
                  title="Event "
                  containerStyle={{
                    // width: '25%',
                    flex: 1,
                    height: mvs(40),
                    backgroundColor:
                      selected === 'event' ? colors.yellow : colors.darkwhite,
                  }}
                />
              </Row> */}

              <PrimaryInput
                containerStyle={{marginTop: mvs(20)}}
                placeholder="Add Title"
                onChangeText={handleChange('Title')}
                onBlur={handleBlur('Title')}
                value={values.Title}
              />
              <Row>
                <PrimaryInput
                  error={touched?.StartDate ? t(errors.StartDate) : ''}
                  placeholder={'Start Date'}
                  onChangeText={handleChange('StartDate')}
                  onBlur={handleBlur('StartDate')}
                  value={values.StartDate}
                  isCalendar
                  editable={false}
                  mainContainer={{width: '47%'}}
                />
                <PrimaryInput
                  error={touched?.StartTime ? t(errors.StartTime) : ''}
                  placeholder={'Start Time'}
                  onChangeText={handleChange('StartTime')}
                  onBlur={handleBlur('StartTime')}
                  value={values.StartTime}
                  isClock
                  editable={false}
                  mainContainer={{width: '47%'}}
                  mode="time"
                />
              </Row>
              <Row>
                <PrimaryInput
                  error={touched?.EndDate ? t(errors.EndDate) : ''}
                  placeholder={'End Date'}
                  onChangeText={handleChange('EndDate')}
                  onBlur={handleBlur('EndDate')}
                  value={values.EndDate}
                  isCalendar
                  editable={false}
                  mainContainer={{width: '47%'}}
                />
                <PrimaryInput
                  error={touched?.EndTime ? t(errors.EndTime) : ''}
                  placeholder={'End Time'}
                  onChangeText={handleChange('EndTime')}
                  onBlur={handleBlur('EndTime')}
                  value={values.EndTime}
                  isClock
                  editable={false}
                  mainContainer={{width: '47%'}}
                  mode="time"
                />
              </Row>
              <InputWithIconrepetationSelection
                label={'Repetation'}
                isRequired={true}
                containerStyle={{
                  backgroundColor: colors.white,
                  borderColor: colors.border,
                  marginBottom: mvs(0),
                  // marginTop: mvs(10),
                }}
                placeholder="Select Duration"
                items={repetationTypes}
                id={values?.repetation}
                value={values?.repetation?.name}
                onChangeText={repetation =>
                  setFieldValue('repetation', repetation)
                }
                error={touched?.repetation ? t(errors.repetation) : ''}
              />
            
              <TextAreaInput
                error={touched?.detail ? t(errors?.detail) : ''}
                placeholder={'Add details'}
                onChangeText={handleChange('Description')}
                onBlur={handleBlur('Description')}
                value={values.Description}
              />

              {check ? (
                <InputWithIconNotificationSelection
                  label={'Notification'}
                  isRequired={true}
                  containerStyle={{
                    backgroundColor: colors.white,
                    borderColor: colors.border,
                    marginBottom: mvs(0),
                  }}
                  placeholder="Select Time"
                  items={notificationType}
                  id={values?.notification?.index} // Pass index here
                  value={values?.notification?.name || 'Select Time'} // Show the name
                  onChangeText={notification => {
                    // Handle setting complainType properly
                    if (typeof notification === 'string') {
                      // Custom value handling
                      setFieldValue('notification', {
                        name: notification,
                        index: 6,
                      }); // Custom value with index 6
                      // setFieldValue('notification', {
                      //   name: notification,
                      //   index: 6,
                      // }); // Custom value with index 6
                    } else if (
                      typeof notification === 'object' &&
                      notification.index !== undefined
                    ) {
                      // Predefined value handling
                      setFieldValue('notification', {
                        index: notification.index,
                        name: notification.name,
                      });
                    }
                  }}
                  error={touched?.notification ? t(errors.notification) : ''}
                />
              ) : null}
              <Row
                style={{
                  alignItems: 'center',
                  marginTop: !check ? mvs(20) : 0,
                  justifyContent: 'flex-start',
                  gap: mvs(20),
                }}>
                <Checkbox
                  onPress={() => {
                    const updatedCheck = !check; // Toggle the state
                    setCheck(updatedCheck); // Update the React state
                    setFieldValue('AddNotification', updatedCheck); // Sync with Formik state
                  }}
                  checked={check} // Bind to the React state
                />
                <Regular label={'Add Notification'} />
              </Row>
              <PrimaryButton
                containerStyle={{
                  borderRadius: mvs(10),
                  marginTop: mvs(50),
                  marginBottom: mvs(40),
                }}
                loading={loading}
                onPress={handleSubmit}
                title={'Save'}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default AddEvent;
