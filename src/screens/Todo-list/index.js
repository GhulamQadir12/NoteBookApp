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
import {
  getLeaveList,
  gettodoList,
  gettodoListByDate,
  gettodoListByStatus,
} from 'services/api/auth-api-actions';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {PrimaryButton} from 'components/atoms/buttons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DatePickered from 'components/atoms/date-picker/currentmonth';
import ToDoCard from 'components/molecules/to-do-card';
import Primaryinput from 'components/atoms/inputs/index';
import {countMatching} from 'utils';

const TodoList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('All');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [leaveList, setLeaveList] = useState([]); // Track the expanded card by its ID
  const [todoList, setTodoList] = useState([]); // Track the expanded card by its ID
  const [filteredTodoList, setFilteredTodoList] = useState([]); // Track the expanded card by its ID
  const [filteredTodoListByDate, setFilteredTodoListByDate] = useState([]); // Track the expanded card by its ID
  const [dateValue, setDateValue] = useState(''); // Track the expanded card by its ID
  const isFocused = useIsFocused();

  const fetchTodoList = async () => {
    try {
      setLoading(true);
      const response = await gettodoList('29126');
      console.log('response index screen :', response);
      setTodoList(response);
      //   setallData(response);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchTodoList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const fetchTodoListByStatus = async (userId, status) => {
    try {
      setLoading(true);
      const response = await gettodoListByStatus(userId, status);
      console.log('response index screen :', response);
      setFilteredTodoList(response);
      //   setallData(response);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };
  const fetchTodoListByDate = async (userId, status, date) => {
    try {
      setLoading(true);
      const response = await gettodoListByDate(userId, status, date);
      console.log('response index screen :', response);
      setFilteredTodoListByDate(response);
      //   setallData(response);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };


  // console.log("Zero index",leaveList[0]);
  // console.log("Zero index",leaveList[0].fl.dep.LeaveStatus);
  // console.log("Zero index",leaveList[0]);

  const handlePress = id => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === id ? null : id));
  };

  const renderItem = ({item}) => (
    <ToDoCard
      isExpanded={expandedCard === item?.Id} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item?.Id)} // Toggle expansion on press
      onStatusChange={
        dateValue ? () => fetchTodoListByDate('29126',select,dateValue) :
        select === 'All'
          ? () => fetchTodoList()
          : () => fetchTodoListByStatus('29126', select)
      }

    />
  );

  // const countPending = leaveList?.filter(
  //   item => item?.fl?.dep?.LeaveStatus === 'Pending',
  // )?.length;
  // const countApprove = leaveList?.filter(
  //   item =>
  //     item?.fl?.dep?.LeaveStatus === 'Approved' ||
  //     item?.fl?.dep?.LeaveStatus === 'Paid' ||
  //     item?.fl?.dep?.LeaveStatus === 'UnPaid',
  // )?.length;
  // const countRejected = leaveList?.filter(
  //   item => item?.fl?.dep?.LeaveStatus === 'Rejected',
  // )?.length;

  const countCompleted = countMatching(todoList, 'Status', 'Completed');
  const countPending =
    countMatching(todoList, 'Status', 'Pending') +
    countMatching(todoList, 'Status', 'Progress');
  const countDeleted = countMatching(todoList, 'Status', 'Cancel');

  console.log('countPending', countPending);
  // console.log('countApprove', countApprove);

  return (
    <View style={styles.container}>
      <FormHeader
        back={true}
        title={'Todos'}
        countTitle={todoList?.length}
        countTitleOne={countPending}
        countTitleTwo={countCompleted}
        countTitleThree={countDeleted}
        titleOne={'Total'}
        titleTwo={'Pending'}
        titleThree={'Completed'}
        titleFour={'Cancelled'}
      />
      <Row style={styles.filterContainer}>
        <Primaryinput
          value={dateValue}
          onChangeText={x => setDateValue(x)}
          placeholder="From Date"
          isCalendar
          editable={false}
          mainContainer={{width: '74%'}}
        />

        <PrimaryButton
          containerStyle={styles.searchButton}
          title="Filter"
          onPress={() => {
            if (!dateValue) {
              // If dateValue is empty, show an alert or handle accordingly
              alert('Please select a date first.');
              return;
            }
            // If dateValue is not empty, proceed
            setSelect('');
            fetchTodoListByDate('29126', 'All', dateValue);
          }}
        />
      </Row>
      {/* <Row style={{alignItems: 'center', marginTop: mvs(60),paddingHorizontal:mvs(20)}}>
        <Primaryinput
          value={dateValue}
          onChangeText={x => setDateValue(x)}
          placeholder="From Date"
          isCalendar
          editable={false}
          mainContainer={{width: '47%'}}
        />
        <Primaryinput
          value={dateValue}
          onChangeText={x => setDateValue(x)}
          placeholder="To Date"
          isCalendar
          editable={false}
          mainContainer={{width: '47%'}}
        />
      </Row>
      <PrimaryButton containerStyle={styles.searchButton} title="Filter" /> */}
      <View style={{flex: 1}}>
        <Row style={{paddingHorizontal: mvs(40)}}>
          <TouchableOpacity
            onPress={() => {setSelect('All');
              dateValue ? fetchTodoListByDate('29126', 'All', dateValue) : 
              fetchTodoListByStatus('29126', 'All');}
            }
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'All' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'All'}
              color={select === 'All' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelect('Pending');
              dateValue ? fetchTodoListByDate('29126', 'Pending', dateValue) : 
              fetchTodoListByStatus('29126', 'Pending');
            }}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'Pending' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Pending'}
              color={select === 'Pending' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelect('Completed');
              dateValue ? fetchTodoListByDate('29126', 'Completed', dateValue) :
              fetchTodoListByStatus('29126', 'Completed');
            }}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'Completed ' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Completed'}
              color={
                select === 'Completed ' ? colors.primary : colors.halfWhite
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelect('Cancel');
              dateValue ? fetchTodoListByDate('29126', 'Cancel', dateValue) :
              fetchTodoListByStatus('29126', 'Cancel');
            }}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'Cancel' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Cancelled'}
              color={select === 'Cancel' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
        </Row>

        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={
    dateValue
      ? filteredTodoListByDate
      : select === 'All'
      ? todoList
      : filteredTodoList
  }
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(80),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigate('AddTodo')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoList;
