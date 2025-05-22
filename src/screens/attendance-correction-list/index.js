import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import LeaveRequestCard from 'components/molecules/leave-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import AdvanceRequestCard from 'components/molecules/advance-request-card';
import { getAdvanceList, getAtdCorrectionList } from 'services/api/auth-api-actions';
import AttendanceCorrectionRequestCard from 'components/molecules/attendance-correction-request-card';
import { useFocusEffect } from '@react-navigation/native';
import { countMatching } from 'utils';

const AttendanceCorrectionRequestList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [advanceList, setAdvanceList] = useState([]); // Track the expanded card by its ID

  const data = [
    {id: 1, status: 'Approved'},
    {id: 2, status: 'Pending'},
    {id: 3, status: 'Approved'},
  ];


  const fetchAtdCorrectionList = async () => {
    try {
      setLoading(true);
      const response = await getAtdCorrectionList('EMP-BGM-0001',6);
      setAdvanceList(response || []);
      console.log('Atd correction list', advanceList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

   useFocusEffect(
     useCallback(() => {
      fetchAtdCorrectionList();
     }, [])
   );

  const handlePress = Advance_Id => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === Advance_Id ? null : Advance_Id));
  };

  const renderItem = ({item}) => (
    <AttendanceCorrectionRequestCard
      isExpanded={expandedCard === item?.AtdReqId} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item.AtdReqId)} // Toggle expansion on press
    />
  );

    const countPending = countMatching(advanceList, 'ApprovalStatus', 'Pending');
    const countApprove = countMatching(advanceList, 'ApprovalStatus', 'Approved');
    const countRejected = countMatching(advanceList, 'ApprovalStatus', 'Rejected');
  
 
  return (
    <View style={styles.container}>
      <FormHeader
        back={true}
        title={'Attendance Correction'}
        countTitle={advanceList?.length}
        countTitleOne={countPending}
        countTitleTwo={countApprove}
        countTitleThree={countRejected}
        titleOne={'Total'}
        titleTwo={'Pending'}
        titleThree={'Approved'}
        titleFour={'Rejected'}
      />
      <View style={{marginTop: mvs(50), flex: 1}}>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={advanceList}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(70),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigate('AttendanceCorrectionRequest')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AttendanceCorrectionRequestList;
