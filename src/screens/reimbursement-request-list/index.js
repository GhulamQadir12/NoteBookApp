import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import ComplainRequestCard from 'components/molecules/complain-request-card';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Bold from 'typography/bold-text';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import ReimbursementRequestCard from 'components/molecules/Reimbursement-request-card';
import {Row} from 'components/atoms/row';
import {getReimbursementList} from 'services/api/auth-api-actions';
import {Button, Text} from 'react-native';
import DatePickered from 'components/atoms/date-picker/currentmonth';
import { useFocusEffect } from '@react-navigation/native';
import { countMatching } from 'utils';

const ReimbursementRequestList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [data, setdata] = useState([]); // Data for the list


  const fetchReimbursementList = async () => {
    try {
      setLoading(true);
      const response = await getReimbursementList('EMP-BGM-0001');
      setdata(response || []);
      // console.log('Reimbursement List', data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

   useFocusEffect(
       useCallback(() => {
        fetchReimbursementList();
       }, [])
     );

  const handlePress = id => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === id ? null : id));
  };

  // const onPressNavigate = () => {
  //   navigate('ReimbursementDetails', {ReimbursementId : item.ReimbursementId});
  // };
  
  const renderItem = ({item}) => (
    <ReimbursementRequestCard
      isExpanded={expandedCard === item?.ReimbursementId} // Check if this card is expanded
      item={item}
      onPress={() => {handlePress(item?.ReimbursementId)}} // Toggle expansion on press
      onPressNavigate={ () => {
        navigate('ReimbursementDetails', {ReimbursementId : item?.ReimbursementId});}}
    />
  );

  const countReimbursements = dataArray => {
    // Filter the array for objects matching the desired ReimbursementStatus
    return dataArray.filter(
      obj =>
        obj?.ReimbursementStatus === 'PartiallyApproved' ||
        obj?.ReimbursementStatus === 'Approved',
    ).length;
  };
  const count = countReimbursements(data);
  // console.log("Count",count);

    const countRemaining = countMatching(data, 'ReimbursementStatus', 'Pending');
  
  return (
    <View style={styles.container}>
      <Header1x2x
        back={true}
        title={'Reimbursement'}
        style={{height: mvs(100)}}
      />
      <Row
        style={{
          width: '90%',
          backgroundColor: colors.yellow,
          alignSelf: 'center',
          padding: mvs(15),
          position: 'absolute',
          top: mvs(65),
          borderRadius: mvs(10),
          justifyContent:'space-around'
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Bold label={countRemaining} fontSize={mvs(14)} />
          <Bold label={'Remaining'} fontSize={mvs(14)} />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Bold label={count} fontSize={mvs(14)} />
          <Bold label={'Taken'} fontSize={mvs(14)} />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Bold label={data?.length} fontSize={mvs(14)} />
          <Bold label={'Total'} fontSize={mvs(14)} />
        </View>
      </Row>
      <View style={{flex: 1, marginTop: mvs(30)}}>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(20),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigate('ReinbursmentRequest')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
        {/* <Text style={styles.title}>Select a Date</Text>
        <DatePickered style={styles.datePicker} /> */}
      </View>
  );
};

export default ReimbursementRequestList;
