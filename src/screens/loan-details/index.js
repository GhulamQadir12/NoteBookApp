import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import ComplainRequestCard from 'components/molecules/complain-request-card';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect, useState} from 'react';
import {ScrollViewBase, TouchableOpacity, View} from 'react-native';
import Bold from 'typography/bold-text';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import ReimbursementRequestCard from 'components/molecules/Reimbursement-request-card';
import {Row} from 'components/atoms/row';
import {
  getReimbursementDetails,
  getReimbursementList,
} from 'services/api/auth-api-actions';
import {Button, Text} from 'react-native';
import DatePickered from 'components/atoms/date-picker/currentmonth';
import styles from './style';
import ReimbursementDetailsCard from 'components/molecules/Reimbursement-details-card';
import ReimbursementDetailCard from 'components/molecules/Reimbursement-details-card';
import Regular from 'typography/regular-text';
import {ScrollView} from 'react-native';
import LoanDeductionDetailCard from 'components/molecules/loan-deduction-detail-card';
import moment from 'moment';
import LoanRemainingDetailCard from 'components/molecules/loan-remaining-detail-card';
import {FlatList} from 'react-native';

const LoanDetails = props => {
  const {Loan_Id} = props.route.params;
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [data, setdata] = useState([]); // Data for the list
  const [allData, setallData] = useState(null); // Data for the list
  console.log('in loan detail screen props', Loan_Id);
  const data1 = {
    // Loan_Id: 'EMP-BGM-0001',
    LoanAmount: 10000,
    noOfInstallments: 12,
    amountofinstallments: 10,
    dateofApproval: '2021-09-01',
    approvedBy: 'HR',
    DeductionHistory: [
      {
        id: 1,
        DeductionMonth: 'July',
        DeductionYear: '2024',
        DeductionAmount: 1000,
        RemainingAmount: 7000,
      },
      {
        id: 2,
        DeductionMonth: 'August',
        DeductionYear: '2024',
        DeductionAmount: 2000,
        RemainingAmount: 5000,
      },
      {
        id: 3,
        DeductionMonth: 'October',
        DeductionYear: '2024',
        DeductionAmount: 3000,
        RemainingAmount: 2000,
      },
    ],
    RemainingHistory: [
      {
        id: 1,
        RemainingMonth: 'June',
        RemainingYear: '2024',
        RemainingAmount: 6000,
        TotalRemainingAmount: 2000,
      },
      {
        id: 2,
        RemainingMonth: 'July',
        RemainingYear: '2024',
        RemainingAmount: 3000,
        TotalRemainingAmount: 2000,
      },
      {
        id: 3,
        RemainingMonth: 'October',
        RemainingYear: '2024',
        RemainingAmount: 3000,
        TotalRemainingAmount: 2000,
      },
      {
        id: 4,
        RemainingMonth: 'July',
        RemainingYear: '2024',
        RemainingAmount: 3000,
        TotalRemainingAmount: 2000,
      },
      {
        id: 5,
        RemainingMonth: 'October',
        RemainingYear: '2024',
        RemainingAmount: 3000,
        TotalRemainingAmount: 2000,
      },
    ],
  };
  // console.log("in detail screen props",props.route.params.reimbursementId);

  // const values = {
  //   groupId: 1,
  //   companyId: 8,
  //   reimbursementId: ReimbursementId,
  // };
  // const fetchReimbursementDetails = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await getReimbursementDetails(values);
  //     //   console.log('response ', response);
  //     setdata(response);
  //     //   setallData(response);
  //     console.log('all data  ', allData);
  //   } catch (err) {
  //     console.error('Failed to fetch data', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchReimbursementDetails(); // Fetch data on component mount
  // }, []);

  //   const handlePress = id => {
  //     // Toggle expansion for the selected card
  //     setExpandedCard(prevState => (prevState === id ? null : id));
  //   };

  // const renderItem = ({item}) => (
  //   <LoanDeductionDetailCard
  //     item={item}
  //     //   onPress={() => handlePress(item.id)} // Toggle expansion on press
  //   />
  // );
  const renderItem2 = ({item}) => (
    <LoanRemainingDetailCard
      item={item}
      //   onPress={() => handlePress(item.id)} // Toggle expansion on press
    />
  );

  //   const countReimbursements = dataArray => {
  // Filter the array for objects matching the desired ReimbursementStatus
  //     return dataArray.filter(
  //       obj =>
  //         obj.ReimbursementStatus === 'PartiallyApproved' ||
  //         obj.ReimbursementStatus === 'Approved',
  //     ).length;
  //   };
  //   const count = countReimbursements(data);
  // console.log("Count",count);
  const formattedDate = moment(data1?.dateofApproval).format('MMMM DD, YYYY');

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Regular style={styles.column} label={item?.DeductionMonth} />
      <Regular style={styles.column} label={item?.DeductionYear} />
      <Regular style={styles.column} label={item?.DeductionAmount} />
      <Regular style={styles.column} label={item?.RemainingAmount} />
    </View>
  );
  const remainingHistory = ({item}) => (
    <View style={styles.row}>
      <Regular style={styles.column} label={item?.RemainingMonth} />
      <Regular style={styles.column} label={item?.RemainingYear} />
      <Regular style={styles.column} label={item?.RemainingAmount} />
      <Regular style={styles.column} label={item?.TotalRemainingAmount} />
    </View>
  );
  return (
    <View style={styles.container}>
      <Header1x2x
        back={true}
        title={'Loan Details'}
        // style={{height: mvs(100)}}
      />
      <ScrollView contentContainerStyle={{paddingHorizontal: mvs(20)}}>
        <View style={styles.cardcontainer}>
          <Row style={{justifyContent: 'center', alignItems: 'center'}}>
            <Regular
              style={styles.text}
              label={'Loan Amount:'}
              numberOfLines={5}
            />
            <Regular
              style={styles.textdetail}
              label={data1.LoanAmount}
              numberOfLines={5}
            />
          </Row>
          <Row style={{justifyContent: 'center', alignItems: 'center'}}>
            <Regular
              style={styles.text}
              label={'Total No Installments:'}
              numberOfLines={5}
            />
            <Regular
              style={styles.textdetail}
              label={data1.noOfInstallments}
              numberOfLines={5}
            />
          </Row>
          <Row style={{justifyContent: 'center', alignItems: 'center'}}>
            <Regular
              style={styles.text}
              label={'Installment Amount:'}
              numberOfLines={5}
            />
            <Regular
              style={styles.textdetail}
              label={data1.amountofinstallments}
              numberOfLines={5}
            />
          </Row>
          <Row style={{justifyContent: 'center', alignItems: 'center'}}>
            <Regular
              style={styles.text}
              label={'Approval Date:'}
              numberOfLines={5}
            />
            <Regular
              style={styles.textdetail}
              label={formattedDate}
              numberOfLines={5}
            />
          </Row>
          <Row style={{justifyContent: 'center', alignItems: 'center'}}>
            <Regular
              style={styles.text}
              label={'Approved By:'}
              numberOfLines={5}
            />
            <Regular
              style={styles.textdetail}
              label={data1.approvedBy}
              numberOfLines={5}
            />
          </Row>
        </View>
        <Bold
          label={'Deduction History'}
          fontSize={mvs(18)}
          style={styles.title}
        />
        {/* <View style={{flex: 1}}>
          {loading ? (
            <Loader />
          ) : (
            <CustomFlatList
              showsVerticalScrollIndicator={false}
              data={data1.DeductionHistory}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingBottom: mvs(5),
                paddingHorizontal: mvs(2),
              }}
            />
          )}
        </View> */}
        <View style={styles.header}>
          <Bold style={styles.headerText} label={'Month'} />
          <Bold style={styles.headerText} label={'Year'} />
          <Bold
            style={styles.headerText}
            label={'Deducted Amount'}
            numberOfLines={2}
          />
          <Bold
            style={{...styles.headerText, flex: 1.2}}
            label={'Balance'}
            numberOfLines={2}
          />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={data1.DeductionHistory}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Bold
          label={'Remainig History'}
          fontSize={mvs(18)}
          style={styles.title}
        />
        <View style={styles.header}>
          <Bold style={styles.headerText} label={'Month'} />
          <Bold style={styles.headerText} label={'Year'} />
          <Bold
            style={styles.headerText}
            label={'Pending Amount'}
            numberOfLines={2}
          />
          <Bold
            style={{...styles.headerText, flex: 1.2}}
            label={'Balance'}
            numberOfLines={2}
          />
        </View>
          <View style={{marginBottom:mvs(20)}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data1.RemainingHistory}
          renderItem={remainingHistory}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
        {/* <View style={{flex: 1}}>
          {loading ? (
            <Loader />
          ) : (
            <CustomFlatList
              showsVerticalScrollIndicator={false}
              data={data1.DeductionHistory}
              renderItem={renderItem2}
              contentContainerStyle={{
                paddingBottom: mvs(20),
                paddingHorizontal: mvs(2),
              }}
            />
          )}
        </View> */}
        {/* <Text style={styles.title}>Select a Date</Text>
        <DatePickered style={styles.datePicker} /> */}
      </ScrollView>
    </View>
  );
};

export default LoanDetails;
