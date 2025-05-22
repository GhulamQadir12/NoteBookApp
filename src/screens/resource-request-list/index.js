import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import LeaveRequestCard from 'components/molecules/leave-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import AdvanceRequestCard from 'components/molecules/advance-request-card';
import { getAdvanceList } from 'services/api/auth-api-actions';

const ResourceRequestList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [advanceList, setAdvanceList] = useState([]); // Track the expanded card by its ID

  const data = [
    {id: 1, status: 'Approved'},
    {id: 2, status: 'Pending'},
    {id: 3, status: 'Approved'},
  ];


  const fetchAdvanceList = async () => {
    try {
      setLoading(true);
      const response = await getAdvanceList('EMP-BGM-0001');
      setAdvanceList(response || []);
      console.log('advance List in index', advanceList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvanceList(); // Fetch data on component mount
  }, []);

  const handlePress = Advance_Id => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === Advance_Id ? null : Advance_Id));
  };

  const renderItem = ({item}) => (
    <AdvanceRequestCard
      isExpanded={expandedCard === item?.dep?.Advance_Id} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item.dep?.Advance_Id)} // Toggle expansion on press
    />
  );

  const countPending = advanceList?.filter(item => item?.dep?.HRapproval === "Pending")?.length;
  const countApprove = advanceList?.filter(item => item?.dep?.HRapproval === "Approved" || item?.fl?.dep?.LeaveStatus === "Paid" || item?.fl?.dep?.LeaveStatus === "UnPaid")?.length;
  const countRejected = advanceList?.filter(item => item?.dep?.HRapproval === "Rejected")?.length;

  return (
    <View style={styles.container}>
      <FormHeader
        back={true}
        title={'Resource Request'}
        countTitle={advanceList?.length}
        countTitleOne={countApprove}
        countTitleTwo={countPending}
        countTitleThree={countRejected}
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
            data={advanceList}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(20),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigate('ResourceRequest')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResourceRequestList;
