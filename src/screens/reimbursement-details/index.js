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

const ReimbursementDetails = props => {
  const {ReimbursementId} = props?.route?.params;
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [data, setdata] = useState([]); // Data for the list
  const [allData, setallData] = useState(null); // Data for the list
  console.log('in detail screen props', ReimbursementId);
  // console.log("in detail screen props",props.route.params.reimbursementId);

  const values = {
    groupId: 1,
    companyId: 8,
    reimbursementId: ReimbursementId,
  };
  const fetchReimbursementDetails = async () => {
    try {
      setLoading(true);

      const response = await getReimbursementDetails(values);
      //   console.log('response ', response);
      setdata(response);
      //   setallData(response);
      console.log('all data  ', allData);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReimbursementDetails(); // Fetch data on component mount
  }, []);

  //   const handlePress = id => {
  //     // Toggle expansion for the selected card
  //     setExpandedCard(prevState => (prevState === id ? null : id));
  //   };

  const renderItem = ({item}) => (
    <ReimbursementDetailCard
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
  return (
    <View style={styles.container}>
      <Header1x2x
        back={true}
        title={'Reimbursement'}
        // style={{height: mvs(100)}}
      />
      <ScrollView>
      <View style={{margin: mvs(20)}}>
        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Requested Total :'}
              color={colors.primary}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={data.ReimbursementId}
              numberOfLines={5}
            />
          </View>
        </Row>

        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Financial Year :'}
              color={colors.primary}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={data.FinancialYear}
              numberOfLines={5}
            />
          </View>
        </Row>

        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Financial Month :'}
              color={colors.primary}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={data.FY_Month}
              numberOfLines={5}
            />
          </View>
        </Row>

        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Reimbursement Date :'}
              color={colors.primary}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={data.ReimbursementDate}
              numberOfLines={5}
            />
          </View>
        </Row>

        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Created At :'}
              color={colors.primary}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={data.CreatedAt}
              numberOfLines={5}
            />
          </View>
        </Row>
        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Reimbursement Status :'}
              color={colors.primary}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={data.ReimbursementStatus}
              numberOfLines={5}
            />
          </View>
        </Row>
        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Total Approved :'}
              color={colors.primary}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={data.TotalApproved}
              numberOfLines={5}
            />
          </View>
        </Row>
        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Approved Date :'}
              color={colors.primary}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={data.ApprovedDate}
              numberOfLines={5}
            />
          </View>
        </Row>
      </View>
      <View style={{flex: 1, marginTop: mvs(30)}}>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={data?.ReimbursementDetails}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(20),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
      </View>
      {/* <Text style={styles.title}>Select a Date</Text>
        <DatePickered style={styles.datePicker} /> */}
        </ScrollView>
    </View>
  );
};

export default ReimbursementDetails;
