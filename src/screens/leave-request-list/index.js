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
import {getLeaveByCategories, getLeaveList} from 'services/api/auth-api-actions';
import {useIsFocused} from '@react-navigation/native';
import { countMatching } from 'utils';

const LeaveRequestList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [leaveList, setLeaveList] = useState([]); // Track the expanded card by its ID
  const [leaveTypeList, setLeaveTypeList] = useState([]); // Track the expanded card by its ID
  const isFocused = useIsFocused();

  const fetchLeaveList = async () => {
    try {
      setLoading(true);
      const response = await getLeaveList('EMP-BGM-0001');
      console.log('response in leave list screen :', response);
      setLeaveList(response);
      console.log('Leave List ', leaveList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchLeaveList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const fetchLeaveListByCategory = async (username,category) => {
    try {
      setLoading(true);
      const response = await getLeaveByCategories(username,category);
      setLeaveTypeList(response);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = id => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === id ? null : id));
  };

  const renderItem = ({item}) => (
    <LeaveRequestCard
      isExpanded={expandedCard === item?.fl?.Leave_Id} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item?.fl?.Leave_Id)} // Toggle expansion on press
    />
  );

const countRejected = countMatching(leaveList, 'fl.dep.LeaveStatus', 'Rejected');
const countAnnual = countMatching(leaveList, 'fl.dep.Leave_Category_Id', 2);
const countCasual = countMatching(leaveList, 'fl.dep.Leave_Category_Id', 4);
const countSick = countMatching(leaveList, 'fl.dep.Leave_Category_Id', 6);
const countPending = countMatching(leaveList, 'fl.dep.LeaveStatus', 'Pending');
const countApprove = countMatching(
  leaveList,
  'fl.dep.LeaveStatus',
  ['Approved', 'Paid', 'UnPaid']
);

const leaveTypes = [
  { type: 'Annual', count: countAnnual },
  { type: 'Casual', count: countCasual },
  { type: 'Sick', count: countSick }
];

  return (
    <View style={styles.container}>
      <FormHeader
        back={true}
        title={'Leave Request'}
        countTitle={leaveList?.length}
        countTitleOne={countApprove}
        countTitleTwo={countPending}
        countTitleThree={countRejected}
        titleOne={'Total'}
        titleTwo={'Approved'}
        titleThree={'Pending'}
        titleFour={'Rejected'}
      />

<Row style={styles.innerContainer}>
  {leaveTypes.map((leaveType, index) => (
    <View key={index} style={styles.textContainer}>
      <Bold label={leaveType.count || 0} color={colors.primary} fontSize={mvs(18)} />
      <Regular
        label={leaveType.type || 'N/A'}
        color={colors.black}
        fontSize={mvs(14)}
      />
    </View>
  ))}
</Row>

      <View style={{marginTop: mvs(10), flex: 1}}>
        <Row style={{paddingHorizontal: mvs(40)}}>
          <TouchableOpacity
            onPress={() => setSelect('all')}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'all' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'All'}
              color={select === 'all' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {setSelect('annual');fetchLeaveListByCategory('EMP-BGM-0001',2)}}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'annual' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Annual'}
              color={select === 'annual' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {setSelect('casual ');fetchLeaveListByCategory('EMP-BGM-0001',4)}}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'casual ' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Casual '}
              color={select === 'casual ' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {setSelect('sick');fetchLeaveListByCategory('EMP-BGM-0001',6)}}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'sick' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Sick'}
              color={select === 'sick' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
        </Row>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={select == "all" ? leaveList : leaveTypeList}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(70),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigate('LeaveRequest')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeaveRequestList;
