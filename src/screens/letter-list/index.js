import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import LeaveRequestCard from 'components/molecules/leave-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, ScrollView, Text} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import AdvanceRequestCard from 'components/molecules/advance-request-card';
import {
  getAdvanceList,
  getEmployeesLetterList,
  getStrikeLetterList,
} from 'services/api/auth-api-actions';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Calendar} from 'react-native-big-calendar';
import {PlusButton} from 'components/atoms/buttons';
import CalendarEvent from 'components/atoms/calender';
import Medium from 'typography/medium-text';
import StrikeLetterCard from 'components/molecules/strike-letter-card';
import EmployeeLetterCard from 'components/molecules/letter-card';

const EmployeeLetters = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [letterList, setLetterList] = useState([]); // Track the expanded card by its ID
  const [calenderFilter, setCalenderFilter] = useState(false); // Track the expanded card by its ID
  const [selected, setSelected] = useState(''); // Track the expanded card by its ID
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString('default', {month: 'long', year: 'numeric'}),
  );

  const fetchEmployeeLetterList = async () => {
    try {
      setLoading(true);
      const response = await getEmployeesLetterList('EMP-BGM-0001');
      setLetterList(response?.result || []);
      console.log('Employee letter List index ', letterList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeLetterList(); // Fetch data on component mount
  }, []);

  const countSuccessfull = letterList?.filter(item => item?.LatterType === 2)?.length;
  const countWarning = letterList?.filter(item => item?.LatterType === 1 )?.length;
  const countFailure = letterList?.filter(item => item?.LatterType === 3)?.length;
console.log("countPending",countSuccessfull);
console.log("countApprove",countWarning);

  const renderItem = ({item}) => (
    <EmployeeLetterCard
      item={item}
      // onPress={() => {handlePress(item?.id)}} // Toggle expansion on press
      onPress={() => {
        navigate('EmployeeLetterDetails', {LatterId: item?.LatterId});
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x
             back={true}
             title={'Letters'}
             style={{height: mvs(60)}}
           />
           {/* <Text>{letterList[0].CompanyId}</Text> */}
      <View style={{flex: 1, marginTop: mvs(20), paddingHorizontal: mvs(15)}}>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={letterList}
            renderItem={renderItem}
            contentContainerStyle={{
              // paddingBottom: mvs(20),
              padding: mvs(5),
            }}
          />
        )}
      </View>
    </View>
  );
};

export default EmployeeLetters;
