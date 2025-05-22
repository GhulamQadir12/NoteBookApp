import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIconComplainTypeSelection,
  InputWithIconDepartmentSelection,
  InputWithIconEmployeeSelection,
  InputWithIconLeavesTypeSelection,
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
  onLogin,
  postComplaint,
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
import moment from 'moment';
const ComplainRequest = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [departList, setDepartList] = React.useState([]);
  const [empList, setEmpList] = React.useState([]);
  const complainType = [
    {id: 1, name: 'General'},
    {id: 2, name: 'Department'},
    {id: 3, name: 'Individuals'},
  ];

  const fetchDepartmentsList = async () => {
    try {
      // setLoading(true);
      const response = await getDepartmentList();
      console.log('department list :', response);
      setDepartList(response);
      // console.log('complain type List ', departList);
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
    fetchDepartmentsList(); // Fetch data on component mount
  }, []);
  const fetchEmployeessList = async () => {
    try {
      // setLoading(true);
      const response = await getEmployeesList();
      // console.log('response in complain list screen :', response);
      setEmpList(response);
      // console.log('complain type List ', empList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeessList(); // Fetch data on component mount
  }, []);

  const Complaintpost = async () => {
    try {
      setLoading(true);
      const response = await postComplaint();
      console.log('response of complain post :', response);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    complainType: '',
    departList: '',
    empList: '',
    reason: '',
    indentity: false,
  };

  const handleFormSubmit = async (values,{resetForm}) => {
    // if(values?.empList == '' && values?.departList == '') {
    //   console.log('error=>', 'error');
    //   return;
    // }
    try {
      setLoading(true)
      const selectedTypeId = values.complainType;

      const selectedTypeName =
        complainType.find(item => item.id === selectedTypeId)?.name || '';

      const formattedDate = moment().format('YYYY-MM-DD');

      console.log(formattedDate); // e.g., "2025-04-14"

      const formatedData = {
        HideMyIdentity: values?.indentity,
        Complainent: 'EMP-BGM-0001',
        EmployeeID: values?.empList,
        TimeOfComplaint: formattedDate,
        DepartmentId: values.departList,
        ComplainAgainst: selectedTypeName,
        ComplaintDescription: values.reason,
        CompanyId: '8',
        GroupId: '1',
        ComplaintStatus: 'Rejected',
      };
      console.log('running values', formatedData);
      await postComplaint(formatedData);
      resetForm();
      Alert.alert('Complain Request', 'Complain Request Successfully');
      // navigate('Drawer');
    } catch (error) {
      console.log('error=>', error);
    } finally {
      setLoading(false);
    }
  };
  var newCheck = false;
  return (
    <View style={styles.container}>
      <Header1x2x title={'Request For Complain'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          validationSchema={addCompliantFormValidation}
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

              <InputWithIconComplainTypeSelection
                label={'Complain Type'}
                isRequired={true}
                containerStyle={{
                  backgroundColor: colors.white,
                  borderColor: colors.border,
                  marginBottom: mvs(0),
                  // marginTop: mvs(10),
                }}
                placeholder="Select Complain Type"
                items={complainType}
                id={values?.complainType}
                value={values?.complainType?.name}
                onChangeText={complainType =>
                  setFieldValue('complainType', complainType)
                }
                error={touched?.complainType ? t(errors.complainType) : ''}
              />
              {console.log('values?.complainType?.id', values?.complainType)}
              {values?.complainType === 2 && (
                <InputWithIconDepartmentSelection
                  label={'Department'}
                  isRequired={true}
                  containerStyle={{
                    backgroundColor: colors.white,
                    borderColor: colors.border,
                    // marginTop: mvs(10),
                  }}
                  placeholder="Select Department Type"
                  items={departList}
                  id={values?.departList}
                  value={values?.departList?.DepartmentName}
                  onChangeText={departList =>
                    setFieldValue('departList', departList)
                  }
                  error={
                    values?.complainType === 2 &&
                    values?.departList == '' &&
                    touched?.complainType
                      ? 'depatment is required'
                      : ''
                  }
                />
              )}
              {values?.complainType === 3 && (
                <InputWithIconEmployeeSelection
                  label={'Employee'}
                  isRequired={true}
                  containerStyle={{
                    backgroundColor: colors.white,
                    borderColor: colors.border,
                    // marginTop: mvs(10),
                  }}
                  placeholder="Select Employee "
                  items={empList}
                  id={values?.empList}
                  value={values?.empList?.Name}
                  onChangeText={empList => setFieldValue('empList', empList)}
                  error={
                    values?.complainType === 3 &&
                    values?.empList == '' &&
                    touched?.empList
                      ? 'employee is required'
                      : ''
                  }
                />
              )}

              <TextAreaInput
                error={touched?.reason ? t(errors.reason) : ''}
                placeholder={'Complaint'}
                onChangeText={handleChange('reason')}
                onBlur={handleBlur('reason')}
                value={values.reason}
              />
              {/* <Row
                style={{
                  alignItems: 'center',
                  marginTop: mvs(20),
                  justifyContent: 'flex-start',
                  gap: mvs(20),
                }}>
                <Checkbox
                  onPress={() => {
                    newCheck = !newCheck;
                    setFieldValue('indentity', newCheck);
                  }}
                  checked={check}
                />
                <Regular label={'Hide My Identity'} />
              </Row> */}
              <Row
                style={{
                  alignItems: 'center',
                  marginTop: mvs(20),
                  justifyContent: 'flex-start',
                  gap: mvs(20),
                }}>
                <Checkbox
                  onPress={() => {
                    const updatedCheck = !check; // Toggle the state
                    setCheck(updatedCheck); // Update the React state
                    setFieldValue('indentity', updatedCheck); // Sync with Formik state
                  }}
                  checked={check} // Bind to the React state
                />
                <Regular label={'Hide My Identity'} />
              </Row>

              <PrimaryButton
                containerStyle={{
                  borderRadius: mvs(10),
                  marginTop: mvs(60),
                }}
                loading={loading}
                onPress={handleSubmit}
                title={'Save'}
              />
              <PrimaryButton
                containerStyle={{
                  borderRadius: mvs(10),
                  marginTop: mvs(20),
                }}
                onPress={() => goBack()}
                title={'Cancle'}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default ComplainRequest;
