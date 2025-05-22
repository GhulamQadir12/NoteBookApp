import messaging from '@react-native-firebase/messaging';
import { IconButton, PlusButton, PrimaryButton } from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIconTypeSelection,
  TextAreaInput,
} from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview/index';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { Formik } from 'formik';
import { useAppDispatch } from 'hooks/use-store';
import { navigate } from 'navigation/navigation-ref';
import React, { useEffect, useState } from 'react'; // Import useState
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { requestNotifications } from 'react-native-permissions';
import {
  getFinancialYear,
  getReinbursementType,
  getRequestId,
  onLogin,
  postReimbursement,
} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {
  addReimbursementFormValidation,
  signinFormValidation,
} from 'validations';
import styles from './styles';
import { checkimg, forgotbackgroundimg, loginbackgroundimg } from 'assets/images';
import Regular from 'typography/regular-text';
import { Row } from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import { pickDocument } from 'utils';
import { values } from 'lodash';
import AddReimbursementCard from 'components/molecules/add-reimbursement-card';
import moment from 'moment';

const ReinbursmentRequest = props => {
  const { t } = i18n;
  const [rember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('annual');
  const [fYear, setFYear] = useState('');
  const [fMonth, setFMonth] = useState('');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [requestId, setRequestId] = useState(0);
  const [reimbursementType, setReimbursementType] = useState([]);

  // State to hold the data of the item being edited
  const [editingReimbursement, setEditingReimbursement] = useState(null);
  const [currentReimbursementDate, setCurrentReimbursementDate] = useState(moment().format('YYYY-MM-DD'));

  const initialValues = {
    date: moment().format('YYYY-MM-DD'), // Initialize Request Date
    reimbursementDate: currentReimbursementDate, // Initialize Reimbursement Date from state
    reimbursementType: '',
    amount: '',
    totalAmount: '',
    advancedPaid: '',
    document: '',
    reason: '',
  };

  // Update initialValues based on editingReimbursement
  const currentInitialValues = editingReimbursement
    ? {
      date: editingReimbursement.date || moment().format('YYYY-MM-DD'), // Load date from editing item
      reimbursementDate: editingReimbursement.ReimbursementDate,
      reimbursementType: editingReimbursement.reimbursementType, // Load the ID
      amount: editingReimbursement.Amount.toString(),
      totalAmount: '', // Calculated field
      advancedPaid: editingReimbursement.AdvancePaid.toString(),
      document: editingReimbursement.document || '',
      reason: editingReimbursement.Reason,
    }
    : initialValues;

  const fetchReimbursementType = async () => {
    try {
      const response = await getReinbursementType();
      setReimbursementType(response || []);
    } catch (err) {
      console.error('fetchReimbursementType Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReimbursementType();
  }, []);

  const fetchFinancialYear = async () => {
    try {
      const currentDate = moment().format('YYYY-MM-DD');
      const response = await getFinancialYear(8,currentDate);
      const formattedDate = getCurrentDateInCustomFormat();

      console.log("formattedDate", currentDate);
      const values = {
        month: formattedDate,
        year: response[0].FinancialYear,
      };
      setFYear(response[0].FinancialYear);
      setFMonth(formattedDate);
      console.log("fYear", fYear);
      const anotherResponse = await getRequestId(values);
      setRequestId(anotherResponse[2]);
    } catch (err) {
      console.error('Failed to fetch data', err);
      Alert.alert(
        'Error',
        'Failed to fetch financial year. Please try again later.',
      );  
    }
  };

  useEffect(() => {
    fetchFinancialYear();
  }, []);

  const handleFormSubmit = async values => {
    setLoading(true); // Set loading state when submission starts
    if (values.amount && values.advancedPaid) {
      const newReimbursement = {
        date: values.date,
        Amount: parseFloat(values.amount) || 0,
        AdvancePaid: parseFloat(values.advancedPaid) || 0,
        Reason: values.reason,
        document: values.document ? values.document : '',
        reimbursementType: values.reimbursementType,
        ReimbursementDate: values.reimbursementDate, // Include ReimbursementDate
      };
      setData([...data, newReimbursement]);
      console.log('Data after adding new item:', [...data, newReimbursement]);

      const transformed = [...data, newReimbursement].map(item => { // Transform the updated data
        const amount = item.Amount;
        const advance = item.AdvancePaid;
        const totalCalculated = amount - advance;

        return {
          GroupId: "1",
          CompanyId: "8",
          ReimbursementDetailId: 0,
          ReimbursementTypeId: item.reimbursementType,
          RequestDate: item.date, // static
          Description: item.Reason,
          Amount: amount.toString(),
          Advance: advance.toString(),
          Total: totalCalculated,
        };
      });

      console.log("transformed", transformed);
      const finalized_data = {
        "ReimbursementDetails": transformed,
        "Status": "Draft",
        "DepartmentId": 2104,
        "EmployeeId": "EMP-BGM-0001",
        "FinancialYear": fYear,
        "FY_Month": fMonth,
        "ReimbursementId": requestId,
        "Total": total,
        "CompanyId": "8",
        "GroupId": "1",
        "Remarks": "<p>this is remarks for Reimbursment Request</p>",
        "ReimbursementDate": values.reimbursementDate ? moment(values.reimbursementDate).format('MM/DD/YYYY') : '04/01/2025', // Use the form value
        "user_id": "29127"
      };
      console.log("finalized_data", finalized_data);

      try {
        const response = await postReimbursement(finalized_data);
        console.log("API Response:", response);
        // Handle success (e.g., show a success message, navigate)
      } catch (error) {
        console.error("API Error:", error);
        // Handle error (e.g., show an error message)
      } finally {
        setLoading(false); // Set loading state back to false
        // Optionally reset the form or data
      }

    } else {
      console.log('Current data:', data);
      setLoading(false); // Ensure loading is false even if the initial condition isn't met
    }
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

  const onPressAdd = (resetForm, values, errors, setFieldValue) => {
    const retainedRequestDate = values.date;
    resetForm({
      values: {
        ...initialValues,
        date: retainedRequestDate,
        reimbursementDate: currentReimbursementDate, // Use the component state
      },
    });
    const amount = parseFloat(values.amount) || 0;
    const advancedPaid = parseFloat(values.advancedPaid) || 0;

    const reimbursement = {
      date: values.date,
      ReimbursementDate: values.reimbursementDate,
      Amount: amount,
      AdvancePaid: advancedPaid,
      Reason: values.reason,
      document: values.document
        ? values.document[0]?.uri || values.document
        : '',
      reimbursementType: values.reimbursementType,
    };

    let updatedData = [...data];

    if (editingReimbursement) {
      updatedData = data.map(item =>
        item === editingReimbursement ? reimbursement : item,
      );
      setEditingReimbursement(null);
    } else {
      updatedData.push(reimbursement);
    }
    setData(updatedData);
    calculateTotal(updatedData);
  };

  const calculateTotal = (reimbursementData) => {
    let newTotal = 0;
    reimbursementData.forEach(item => {
      newTotal += (parseFloat(item.Amount) || 0) - (parseFloat(item.AdvancePaid) || 0);
    });
    setTotal(newTotal);
  };

  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  const getCurrentDateInCustomFormat = () => {
    return moment().format('MMMM,YYYY');
  };

  const handleDelete = index => {
    const itemToDelete = data[index];
    const updatedTotal =
      total - (itemToDelete.Amount - itemToDelete.AdvancePaid);
    setTotal(updatedTotal);

    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleEdit = reimbursement => {
    setEditingReimbursement(reimbursement);
    setCurrentReimbursementDate(reimbursement.ReimbursementDate); // Set state on edit
    // The form will automatically populate due to 'currentInitialValues' and 'enableReinitialize'
  };

  const handleReimbursementDateChange = (date) => {
    setCurrentReimbursementDate(date);
    // Update Formik value directly
    setFieldValue('reimbursementDate', date);
  };

  useEffect(() => {
    calculateTotal(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <Header1x2x title={'Add New Request'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Bold
          style={{ alignSelf: 'center' }}
          label={requestId}
          fontSize={mvs(18)}
          color={colors.primary}
        />

        <Formik
          initialValues={currentInitialValues}
          // validationSchema={addReimbursementFormValidation}
          onSubmit={handleFormSubmit}
          enableReinitialize // Add this prop
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            touched,
            values,
            errors,
            resetForm,
          }) => (
            <>
              {console.log('errors', errors)}

              <View style={{ marginTop: mvs(20) }}></View>
              <PrimaryInput
                error={
                  touched?.reimbursementDate ? t(errors.reimbursementDate) : ''
                }
                placeholder={'Reimbursement Date'}
                onChangeText={(date) => {
                  handleChange('reimbursementDate')(date);
                  setCurrentReimbursementDate(date); // Update state on change
                }}
                onBlur={handleBlur('reimbursementDate')}
                value={values.reimbursementDate} // Use Formik's value
                isCalendar
                minimumDate={startOfMonth}
                maximumDate={endOfMonth}
              />
              <PrimaryInput
                error={touched?.date ? t(errors.date) : ''}
                placeholder={'Request Date'}
                onChangeText={handleChange('date')}
                onBlur={handleBlur('date')}
                value={values.date} // Use Formik's value
                isCalendar
                editable={false}
                minimumDate={startOfMonth}
                maximumDate={endOfMonth}
              />
              <InputWithIconTypeSelection
                containerStyle={{
                  backgroundColor: colors.white,
                  borderColor: colors.border,
                }}
                placeholder="Select Reimbursement Type"
                items={reimbursementType}
                id={values.reimbursementType}
                value={
                  reimbursementType.find(
                    item => item?.Id === values.reimbursementType,
                  )?.Name || ''
                }
                onChangeText={selectedId =>
                  setFieldValue('reimbursementType', selectedId)
                }
                error={
                  touched?.reimbursementType ? t(errors.reimbursementType) : ''
                }
              />
              <PrimaryInput
                error={touched?.amount ? t(errors.amount) : ''}
                placeholder={'Amount'}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount}
              />

              <PrimaryInput
                error={touched?.advancedPaid ? t(errors.advancedPaid) : ''}
                placeholder={'Advance Paid'}
                onChangeText={handleChange('advancedPaid')}
                onBlur={handleBlur('advancedPaid')}
                value={values.advancedPaid}
              />

              <PrimaryInput
                placeholder={'Total Amount'}
                onChangeText={handleChange('totalAmount')}
                onBlur={handleBlur('totalAmount')}
                value={
                  values.amount && values.advancedPaid
                    ? (values.amount - values.advancedPaid).toString()
                    : ''
                }
                editable={false}
              />

              <TextAreaInput
                error={touched?.reason ? errors.reason : ''}
                placeholder={'Reason'}
                onChangeText={handleChange('reason')}
                onBlur={handleBlur('reason')}
                value={values.reason}
              />

              <PlusButton
                containerStyle={styles.containerStyle}
                textStyle={styles.textStyle}
                onPress={() =>
                  onPressAdd(resetForm, values, errors, setFieldValue)
                }
                label={editingReimbursement ? 'Update Item' : 'Add Item'}
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
                  <Row style={{ gap: mvs(10) }}>
                    <AntDesign
                      color={colors.green}
                      name="upload"
                      size={mvs(18)}
                    />
                    <Regular label={'Upload'} />
                  </Row>
                </TouchableOpacity>

                {values.document ? (
                  <Medium
                    color={colors.primary}
                    fontSize={mvs(14)}
                    label={'Selected Document'}
                  />
                ) : (
                  <Regular
                    style={{ marginTop: mvs(10) }}
                    color="gray"
                    fontSize={mvs(12)}
                    label="No document selected."
                  />
                )}
              </Row>
              {touched.document && errors.document && (
                <Regular
                  color="red"
                  label={errors.document}
                  fontSize={mvs(10)}
                />
              )}
              <Row
                style={{
                  marginTop: mvs(20),
                  alignSelf: 'flex-end',
                  borderBottomWidth: mvs(2),
                }}>
                <Bold label={'Net Total = '} />
                <Regular label={total.toFixed(2)} />
              </Row>

              <View
                style={{
                  marginVertical: mvs(40),
                }}>
                <PrimaryButton
                  loading={loading}
                  onPress={handleSubmit}
                  title={'Raise Request'}
                />
              </View>
            </>
          )}
        </Formik>

        {data.map((item, index) => (
          <AddReimbursementCard
            key={index}
            reimbursement={item}
            onDelete={() => handleDelete(index)}
            onEdit={handleEdit}
          />
        ))}
      </KeyboardAvoidScrollview>
      <View style={{marginTop: mvs(20)}}></View>
    </View>
  );
};
export default ReinbursmentRequest;