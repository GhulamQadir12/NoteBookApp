import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import { getOvertimeList, getWorkFromHomeCategory, getWorkFromHomeList } from 'services/api/auth-api-actions';
import OvertimeRequestCard from 'components/molecules/modals/Overtime-request-';

const OverTimeRequestList = props => {
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [overTimeList, setOverTimeList] = useState([]); // Track the expanded card by its ID

  const fetchOverTimeList = async () => {
    try {
      setLoading(true);
      const response = await getOvertimeList('EMP-BGM-0001');
      setOverTimeList(response || []);
      console.log('overtime List', getOvertimeList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverTimeList(); // Fetch data on component mount
  }, []);

 const data = [
  {
    id: 1,
    status:'Pending',
    date:'12/12/2021',
    time_from:'10:00 AM',
    time_to:'12:00 PM',
    no_of_hours:'2',

  },
  {
    id: 2,
    status:'Approved',
    date:'12/12/2021',
    time_from:'10:00 AM',
    time_to:'12:00 PM',
    no_of_hours:'2',

  },
  {
    id: 3,
    status:'Approved',
    date:'12/12/2021',
    time_from:'10:00 AM',
    time_to:'12:00 PM',
    no_of_hours:'2',

  },
  {
    id: 4,
    status:'Pending',
    date:'12/12/2021',
    time_from:'10:00 AM',
    time_to:'12:00 PM',
    no_of_hours:'2',

  },
 ]
  
  const handlePress = WFHReqId => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === WFHReqId ? null : WFHReqId));
  };

  const renderItem = ({item}) => (
    <OvertimeRequestCard
      isExpanded={expandedCard === item?.id} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item?.id)} // Toggle expansion on press
    />
  );

  // const countPending = getOvertimeList?.filter(item => item?.wfh?.Status === "Pending")?.length;
  // const countApprove = getOvertimeList?.filter(item => item?.wfh?.Status === "Approved")?.length;
  // const countRejected = getOvertimeList?.filter(item => item?.wfh?.Status === "Rejected")?.length;

  return (
    <View style={styles.container}>
      <FormHeader
        back={true}
        title={'Overtime Request'}
        countTitle={'10'}
        countTitleOne={'2'}
        countTitleTwo={'7'}
        countTitleThree={'1'}
        titleOne={'Total'}
        titleTwo={'Approved'}
        titleThree={'Pending'}
        titleFour={'Rejected'}
      />
      <View style={{marginTop: mvs(50), flex: 1}}>
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
          onPress={() => navigate('OverTimeRequest')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OverTimeRequestList;
