import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import ComplainRequestCard from 'components/molecules/complain-request-card';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollViewBase, TouchableOpacity, View} from 'react-native';
import Bold from 'typography/bold-text';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import ReimbursementRequestCard from 'components/molecules/Reimbursement-request-card';
import {Row} from 'components/atoms/row';
import {
  getEmployeesLetterDetail,
  getLetterTypes,
  getReimbursementDetails,
  getReimbursementList,
  getStrikeLetterDetail,
} from 'services/api/auth-api-actions';
import {Button, Text} from 'react-native';
import DatePickered from 'components/atoms/date-picker/currentmonth';
import styles from './style';
import ReimbursementDetailsCard from 'components/molecules/Reimbursement-details-card';
import ReimbursementDetailCard from 'components/molecules/Reimbursement-details-card';
import Regular from 'typography/regular-text';
import {ScrollView} from 'react-native';
import {Checkbox} from 'components/atoms/checkbox';
import {Formik} from 'formik';
import {PrimaryInput, TextAreaInput} from 'components/atoms/inputs';
import {PlusButton, PrimaryButton} from 'components/atoms/buttons';
import Medium from 'typography/medium-text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import { values } from 'lodash';

const EmployeeLetterDetails = props => {
  const {LatterId} = props?.route?.params;
  const [letterTypes, setLetterTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [data, setdata] = useState([]); // Data for the list
  const [allData, setallData] = useState(null); // Data for the list
  const [toggle, setToggle] = useState(false); // Data for the list
  console.log('in strike detail screen props', LatterId);

  const fetchLetterDetails = async () => {
    try {
      setLoading(true);

      const response = await getEmployeesLetterDetail(LatterId);
      // console.log('response ', response);
      setdata(response);
      //   setallData(response);
      console.log('res of emp letter detail in index ', data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLetterDetails(); // Fetch data on component mount
  }, []);

  const fetchLetterTypes = async () => {
    try {
      const response = await getLetterTypes();
      setLetterTypes(response || []);
      console.log('letter Types index ', letterTypes);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
    }
  };

  useEffect(() => {
    fetchLetterTypes(); // Fetch data on component mount
  }, []);

  const filterLetterTypeName = letterTypeID => {
    const result = letterTypes.filter(
      item => item.LetterTypeID === letterTypeID,
    );
    return result.length > 0 ? result[0].LetterTypeName : null;
  };

  // Example usage
  const letterTypeName = filterLetterTypeName(data?.result?.LatterType);
  console.log(letterTypeName); // Output: "Successfull"
  const handleFormSubmit = async values => {
    try {
      // navigate('Drawer');
      // navigate.goBack();
      // setLoading(true)
      console.log('values are', values);
    } catch (error) {
      console.log('error=>', error);
    } finally {
      // setLoading(false);
    }
  };

  const sanitizedLatterBody = data?.result?.LatterBody?.replace(
    /[\u0000-\u001F\u007F-\u009F]/g,
    '',
  );

  // Safely decode the string
  const decodedLatterBody = JSON.parse(`"${sanitizedLatterBody}"`);
  // const decodedDescription = JSON.parse(`"${data?.result?.LatterBody}"`);
  // console.log("decode description",decodedDescription);
  const {width} = Dimensions.get('window');

  const RemarkSubmit = async => {
    try {
    } catch (error) {
      console.log('error=>', error);
    } finally {
    }
  }

  return (
    <View style={styles.container}>
      <Header1x2x
        back={true}
        title={'Letter Detail'}
        // style={{height: mvs(100)}}
      />
      {/* <Text>
        {data.result?.EmployeeName}
      </Text> */}

      <ScrollView
        style={styles.lettercontainer}
        showsVerticalScrollIndicator={false}>
        {/* <Text style={styles.header}>Strike Letter</Text> */}
        {/* <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}>
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
              {console.log('errror2', errors)} */}

        <Regular
          style={styles.subHeader}
          label={moment(data?.result?.LatterDate).format('MMMM Do, YYYY')}
        />

        <PrimaryInput
          value={letterTypeName}
          editable={false}
          label={'Letter Type'}
          isRequired={true}
        />
        <PrimaryInput
          value={data?.result?.LatterSubject}
          editable={false}
          label={'Letter Subject'}
          isRequired={true}
        />

        <PrimaryInput
          value={data.empname}
          editable={false}
          label={'Receiver Name'}
          isRequired={true}
        />

        <View style={styles.desContainer}>
          <RenderHTML contentWidth={width} source={{html: decodedLatterBody}} />
        </View>
        {/* <View sty> */}

{
          toggle && (
        <TextAreaInput
          placeholder={'Remarks'}
          // onChangeText={handleChange('reason')}
          // value={values.reason}
        />
          )}
        <PrimaryButton
          title= {!toggle ? "Add Remarks" : 'Submit'}
          containerStyle={styles.containerStyle}
          onPress={toggle ? RemarkSubmit() : () => setToggle(true)}
        />
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default EmployeeLetterDetails;
