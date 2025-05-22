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
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {getLeaveTypes, onLogin, postLeave, postLeaveDoc} from 'services/api/auth-api-actions';
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
const LeaveRequest = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');
  const [leaveType, setleaveTypeList] = React.useState([]);

  const fetchLeaveTypeList = async () => {
    try {
      setLoading(true);
      const response = await getLeaveTypes('EMP-BGM-0001');
      console.log('response in leave type list screen :', response);
      setleaveTypeList(response);
      //   setallData(response);
      console.log('Leave type List ', leaveType);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveTypeList(); // Fetch data on component mount
  }, []);

  const initialValues = {
    leaveType: '',
    date_from: '',
    date_to: '',
    nodays: '',
    performing_person: '',
    document: '',
    reason: '',
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      console.log('values', values);
  
      const payload = {
        CompanyId: '8',
        GroupId: '1',
        EmployeeId: 'EMP-BGM-0001',
        ReasonOfLeave: values.reason,
        LeaveStatus: 0,
        DateFrom: values.date_from,
        DateTo: values.date_to,
        NoOfDays: values.nodays,
        Leave_Category_Id: values.leaveType,
        PerformingPerson: values.performing_person,
      };
  
      const document = values.document[0];
      const leaveId = await postLeave(payload);
      console.log('Leave submitted, ID:', leaveId);
      Alert.alert('Data submitted successfully');
  
      // Optionally upload document
      // const docUpload = await postLeaveDoc(document, leaveId);
  
      // ✅ Reset form to avoid duplicate submissions
      resetForm();
      setSelected('annual'); // if needed, reset other state like selected leave type
    } catch (error) {
      console.log('Error during leave submission:', error?.response?.data || error.message);
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
      <Header1x2x title={'Leave Request'} />
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
                {/* <Medium
                  color={colors.primary}
                  fontSize={mvs(15)}
                  label={'Leave Type: '}
                /> */}

                <InputWithIconLeavesTypeSelection
                  containerStyle={{
                    backgroundColor: colors.white,
                    borderColor: colors.border,
                    marginTop: mvs(10),
                  }}
                  placeholder="Select Leave Type"
                  items={leaveType}
                  id={values?.leaveType}
                  value={values?.leaveType?.LeaveName}
                  onChangeText={LeaveName =>
                    setFieldValue('leaveType', LeaveName)
                  }
                  error={
                    touched?.leaveType
                      ? t(errors.leaveType)
                      : ''
                  }
                />
                {/* <Row style={{marginTop: mvs(10), paddingHorizontal: mvs(20)}}>
                  <PrimaryButton
                    onPress={() => {
                      onPress(setFieldValue, (type = 'annual'));
                    }}
                    title="Annual"
                    textStyle={{
                      color:
                        selected === 'annual'
                          ? colors.primary
                          : colors.halfWhite,
                    }}
                    containerStyle={{
                      width: '25%',
                      height: mvs(30),
                      backgroundColor:
                        selected === 'annual' ? colors.yellow : colors.white,
                    }}
                  />
                  <PrimaryButton
                    onPress={() => {
                      onPress(setFieldValue, (type = 'casual'));
                    }}
                    textStyle={{
                      color:
                        selected == 'casual'
                          ? colors.primary
                          : colors.halfWhite,
                    }}
                    title="Casual "
                    containerStyle={{
                      width: '25%',
                      height: mvs(30),
                      backgroundColor:
                        selected === 'casual' ? colors.yellow : colors.white,
                    }}
                  />
                  <PrimaryButton
                    onPress={() => {
                      onPress(setFieldValue, (type = 'sick'));
                    }}
                    textStyle={{
                      color:
                        selected === 'sick' ? colors.primary : colors.halfWhite,
                    }}
                    title="Sick"
                    containerStyle={{
                      width: '25%',
                      height: mvs(30),
                      backgroundColor:
                        selected === 'sick' ? colors.yellow : colors.white,
                    }}
                  />
                </Row> */}

                <PrimaryInput
                  // containerStyle={{marginTop: mvs(20)}}
                  error={touched?.date_from ? t(errors.date_from) : ''}
                  placeholder={'Date From'}
                  onChangeText={handleChange('date_from')}
                  onBlur={handleBlur('date_from')}
                  value={values.date_from}
                  isCalendar
                  editable={false}
                  minimumDate={startOfToday}
                  // maximumDate={endOfMonth}
                />
                <PrimaryInput
                  error={touched?.date_to ? t(errors.date_to) : ''}
                  placeholder={'Date To'}
                  onChangeText={handleChange('date_to')}
                  onBlur={handleBlur('date_to')}
                  value={values.date_to}
                  isCalendar
                  editable={false}
                  minimumDate={
                    values.date_from ? new Date(values.date_from) : startOfToday
                  } // Minimum is "Date From" or today
                />
                <PrimaryInput
                  error={touched?.nodays ? t(errors.nodays) : ''}
                  placeholder={'No of Days'}
                  onChangeText={handleChange('nodays')}
                  onBlur={handleBlur('nodays')}
                  value={values.nodays ? values.nodays.toString() : ''} // Display the number of days
                  editable={false}
                />

                <PrimaryInput
                  placeholder={'Performing Person (if any)'}
                  onChangeText={handleChange('performing_person')}
                  onBlur={handleBlur('performing_person')}
                  value={values.performing_person}
                />

                <TextAreaInput
                  error={touched?.reason ? t(errors.reason) : ''}
                  placeholder={'Reason'}
                  onChangeText={handleChange('reason')}
                  onBlur={handleBlur('reason')}
                  value={values.reason}
                />
                <Medium
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
                  <TouchableOpacity
                    style={styles.uploadBtn}
                    onPress={() => uploadDocument(setFieldValue)}>
                    <Row style={{gap: mvs(10)}}>
                      <AntDesign
                        color={colors.primary}
                        name="upload"
                        size={15}
                      />
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

                  {/* <Medium label={'No archive found'} /> */}
                </Row>
                {/* {touched.document && errors.document && (
                  <Regular
                    color="red"
                    label={errors.document}
                    fontSize={mvs(10)}
                  />
                )} */}
                <PrimaryButton
                  containerStyle={{
                    borderRadius: mvs(10),
                    marginTop: mvs(60),
                  }}
                  // loading={loading}
                  onPress={handleSubmit}
                  title={'Raise Request'}
                />
              </>
            )
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default LeaveRequest;
