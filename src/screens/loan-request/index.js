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
import {Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {onLogin, postLoan} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {addLoanFormValidation, signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
const LoanRequest = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');

  const initialValues = {
    // name: '',
    request_date: '',
    amount: '',
    installments: '',
    amount_installments: '',
    reason: '',
    deduction_month: '',};

  const handleFormSubmit = async (values,{resetForm}) => {
    try {
      // navigate('Drawer');
      setLoading(true);

      const formattedDate = moment(values.request_date).format('M/D/YYYY');

      const formattedValues = {
        "EmployeeId": "EMP-BGM-0001",
        "AmountOfLoan": values.amount,
        "TotalNoOfInstallment": values.installments,
        "AmountOfInstallment": values.amount_installments,
        "ReasonOfLoan": values.reason,
        "Category": "LAS",
        "CompanyId": "8",
        "GroupId": "1",
        "MonthOfDeduction": values.deduction_month,
        "LoanDeductionMonth": 4,
        "DateOfLoan": formattedDate,
        "HRapproval": "Pending",
        "Status": "Draft",
        "Statusof": false
    }
      const response = await postLoan(formattedValues);
      console.log('response', response);
      resetForm();
    } catch (error) {
      console.log('error=>', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={'Request For Loan'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          validationSchema={addLoanFormValidation}
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

              {/* <PrimaryInput
                containerStyle={{marginTop: mvs(25)}}
                error={touched?.name ? t(errors.name) : ''}
                placeholder={'Requested By'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              /> */}
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
                error={touched?.amount ? t(errors.amount) : ''}
                placeholder={'Amount of Loan'}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount}
              />
              <PrimaryInput
                error={touched?.installments ? t(errors.installments) : ''}
                placeholder={'Total No Of Installment'}
                onChangeText={handleChange('installments')}
                onBlur={handleBlur('installments')}
                value={values.installments}
              />
              <PrimaryInput
                error={touched?.amount_installments ? t(errors.amount_installments) : ''}
                placeholder={'Amount Of Installment'}
                onChangeText={handleChange('amount_installments')}
                onBlur={handleBlur('amount_installments')}
                value={
                  values.amount && values.installments
                    ? (values.amount / values.installments).toString()
                    : ''
                }
                editable={false}
              />
              <PrimaryInput
                error={touched?.deduction_month ? t(errors.deduction_month) : ''}
                placeholder={'Select Month Of Deduction'}
                onChangeText={handleChange('deduction_month')}
                onBlur={handleBlur('deduction_month')}
                value={values.deduction_month}
                isCalendar
                editable={false}
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
export default LoanRequest;
