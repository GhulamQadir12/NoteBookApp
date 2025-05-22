import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {
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
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {getWorkFromHomeCategory, postWfh} from 'services/api/auth-api-actions';
import i18n from 'translation';
import { addWFHFormValidation} from 'validations';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import moment from 'moment';
import {pickDocument} from 'utils';
const WorkFromHomeRequest = props => {
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');
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
    categoryType: 0,
    date_from: '',
    date_to: '',
    nodays: '',
    reason: '',
  };

  const handleFormSubmit = async values => {
    setLoading(true)
    try {
      const formattedData = {
        "TransStatus": "Draft",
        "EmployeeId": "EMP-BGM-0001",
        "WFHCategory": values.categoryType,
        "NoOfDays": values.nodays,
        "CompanyId": "8",
        "GroupId": "1",
        "DateFrom": `${values.date_from}T00:00:00.000Z`,
        "DateTo": `${values.date_to}T00:00:00.000Z`,
        "Reason": `<p>${values.reason}</p>\n`,
        "user_id": "29127"
    }
    await postWfh(formattedData);
    Alert.alert('Success', 'Work From Home request submitted successfully!');
      console.log('values', formattedData);
      // navigate('Drawer');
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
      <Header1x2x title={'Work From Home Request'} />
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
            
                <InputWithIconWFHSelection
                  label={'Type'}
                  isRequired={true}
                  containerStyle={styles.inputContainer}
                  placeholder="Select Type "
                  items={categoryType}
                  id={values?.categoryType}
                  value={values?.categoryType?.elem}
                  onChangeText={elem => setFieldValue('categoryType', elem)}
                  error={touched?.categoryType ? t(errors.categoryType) : ''}
                />
                
                <PrimaryInput
                label={'Date From'}
                isRequired={true}
                  error={touched?.date_from ? t(errors.date_from) : ''}
                  placeholder={'select date'}
                  onChangeText={handleChange('date_from')}
                  onBlur={handleBlur('date_from')}
                  value={values.date_from}
                  isCalendar
                  editable={false}
                  minimumDate={startOfToday}
                  // maximumDate={endOfMonth}
                />
                <PrimaryInput
                label={'Date To'}
                isRequired={true}
                  error={touched?.date_to ? t(errors.date_to) : ''}
                  placeholder={'select date'}
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

                <TextAreaInput
                  error={touched?.reason ? t(errors.reason) : ''}
                  placeholder={'Reason'}
                  onChangeText={handleChange('reason')}
                  onBlur={handleBlur('reason')}
                  value={values.reason}
                />
              
                <PrimaryButton
                  containerStyle={{
                    borderRadius: mvs(10),
                    marginVertical: mvs(60),
                  }}
                  loading={loading}
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
export default WorkFromHomeRequest;
