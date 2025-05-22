import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import WorkFromHomeRequestCard from 'components/molecules/WFH-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import {  getWorkFromHomeList } from 'services/api/auth-api-actions';
import { useFocusEffect } from '@react-navigation/native';
import { countMatching } from 'utils';

const WorkFromHomeRequestList = props => {
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [wfhList, setWfhList] = useState([]); // Track the expanded card by its ID

  const fetchWorkFromHomeList = async () => {
    try {
      setLoading(true);
      const response = await getWorkFromHomeList('EMP-BGM-0001');
      setWfhList(response || []);
      // console.log('Reimbursement List', data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

   useFocusEffect(
     useCallback(() => {
      fetchWorkFromHomeList();
     }, [])
   );

 
  
  const handlePress = WFHReqId => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === WFHReqId ? null : WFHReqId));
  };

  const renderItem = ({item}) => (
    <WorkFromHomeRequestCard
      isExpanded={expandedCard === item?.wfh?.WFHReqId} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item?.wfh?.WFHReqId)} // Toggle expansion on press
    />
  );

  const countPending = countMatching(wfhList, 'wfh.Status', 'Pending') || 0;
  const countApprove = countMatching(wfhList, 'wfh.Status', 'Approved') || 0;
  const countRejected = countMatching(wfhList, 'wfh.Status', 'Rejected')  || 0;

  return (
    <View style={styles.container}>
      <FormHeader
        back={true}
        title={'Work From Home Request'}
        countTitle={wfhList?.length}
        countTitleOne={countApprove}
        countTitleTwo={countPending}
        countTitleThree={countRejected}
        titleOne={'Total'}
        titleTwo={'Approved'}
        titleThree={'Pending'}
        titleFour={'Rejected'}
      />
      <View style={styles.flatlistView}>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={wfhList}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(20),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigate('WorkFromHomeRequest')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkFromHomeRequestList;
