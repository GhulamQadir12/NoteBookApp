import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import ComplainRequestCard from 'components/molecules/complain-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Bold from 'typography/bold-text';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { getComplainList } from 'services/api/auth-api-actions';
import { useFocusEffect } from '@react-navigation/native';
import { countMatching } from 'utils';

const ComplainRequestList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [complainList, setComplainList] = useState([]); // Track the expanded card by its ID

  const data = [
    {id: 1, status: 'Approved'},
    {id: 2, status: 'Pending'},
    {id: 3, status: 'Approved'},
  ];

  const fetchComplainList = async () => {
    try {
      setLoading(true);
      const response = await getComplainList('EMP-BGM-0001');
      setComplainList(response || []);
      // console.log('Reimbursement List', data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchComplainList();
    }, [])
  );

  const handlePress = id => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === id ? null : id));
  };

  const renderItem = ({item}) => (
    <ComplainRequestCard
      isExpanded={expandedCard === item.ComplaintID} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item.ComplaintID)} // Toggle expansion on press
    />
  );

  const countPending = countMatching(complainList, 'ComplaintStatus', "Pending");
  const countApprove = countMatching(complainList, 'ComplaintStatus', "Approved");
  const countRejected = countMatching(complainList, 'ComplaintStatus', "Rejected");


  return (
    <View style={styles.container}>
 <FormHeader
        back={true}
        title={'Complain Request'}
        countTitle={complainList?.length}
        countTitleOne={countApprove}
        countTitleTwo={countPending}
        countTitleThree={countRejected}
        titleOne={'Total'}
        titleTwo={'Resolved '}
        titleThree={'Partially Resolved'}
        titleFour={'Dismissed'}
        cardcontainer={{height: mvs(80)}}
      />
      <View style={{flex: 1,marginTop:mvs(50)}}>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={complainList}
            renderItem={renderItem}
            contentContainerStyle={{
            
              paddingBottom: mvs(70),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigate('ComplainRequest')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ComplainRequestList;
