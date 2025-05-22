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
import {Row} from 'components/atoms/row';

import {Button, Text} from 'react-native';
import DatePickered from 'components/atoms/date-picker/currentmonth';
import styles from './style';
import Regular from 'typography/regular-text';
import {ScrollView} from 'react-native';
import LoanDeductionDetailCard from 'components/molecules/loan-deduction-detail-card';
import moment from 'moment';
import LoanRemainingDetailCard from 'components/molecules/loan-remaining-detail-card';
import {FlatList} from 'react-native';

const AdvanceDetails = props => {
  const {Advance_Id} = props?.route?.params;
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [data, setdata] = useState([]); // Data for the list
  const [allData, setallData] = useState(null); // Data for the list
  const data1 = {
    // Loan_Id: 'EMP-BGM-0001',
    AdvanceAmount: 10000,
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
      {
        id: 6,
        RemainingMonth: 'November',
        RemainingYear: '2024',
        RemainingAmount: 3000,
        TotalRemainingAmount: 2000,
      },
    ],
  };

  const renderItem2 = ({item}) => (
    <LoanRemainingDetailCard
      item={item}
      //   onPress={() => handlePress(item.id)} // Toggle expansion on press
    />
  );

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
        title={'Advance Details'}
        // style={{height: mvs(100)}}
      />
      <ScrollView contentContainerStyle={{paddingHorizontal: mvs(20)}}>
        <View style={styles.cardcontainer}>
          <Row style={{justifyContent: 'center', alignItems: 'center'}}>
            <Regular
              style={styles.text}
              label={'Advance Amount:'}
              numberOfLines={5}
            />
            <Regular
              style={styles.textdetail}
              label={data1.AdvanceAmount}
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
        <View style={{marginBottom: mvs(20)}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data1.RemainingHistory}
            renderItem={remainingHistory}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AdvanceDetails;
