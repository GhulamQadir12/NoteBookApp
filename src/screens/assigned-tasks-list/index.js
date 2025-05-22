import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import LeaveRequestCard from 'components/molecules/leave-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import {getTaskManagementList} from 'services/api/auth-api-actions';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {PrimaryButton} from 'components/atoms/buttons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DatePickered from 'components/atoms/date-picker/currentmonth';
import ToDoCard from 'components/molecules/to-do-card';
import Primaryinput from 'components/atoms/inputs/index';
import AssignedTasksCard from 'components/molecules/assigned-tasks-card';
import {countMatching} from 'utils';

const AssignedTaskList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [taskManagementList, setTaskManagementList] = useState([]); // Track the expanded card by its ID
  const [dateValue, setDateValue] = useState(''); // Track the expanded card by its ID
  const isFocused = useIsFocused();

  // const [tasks, setTasks] = useState({
  //   toDos: [
  //     {
  //       id: '1',
  //       taskName: 'Complete Project Proposal',
  //       assignedBy: ['Manager'],
  //       assignedTo: ['John'],
  //       time: '10:00 AM',
  //       date: '2024-12-20',
  //       pdfPath: '/path/to/proposal.pdf',
  //       status: 'toDo',
  //     },
  //     {
  //       id: '2',
  //       taskName: 'Prepare Presentation',
  //       assignedBy: ['Team Lead'],
  //       assignedTo: ['Alice'],
  //       time: '02:00 PM',
  //       date: '2024-12-22',
  //       pdfPath: '/path/to/presentation.pdf',
  //       status: 'toDo',
  //     },
  //   ],
  //   inProgress: [
  //     {
  //       id: '3',
  //       taskName: 'Bug Fixing',
  //       assignedBy: ['QA','Cadmore'],
  //       assignedTo: ['Tom','Cadmore'],
  //       time: '03:00 PM',
  //       date: '2024-12-18',
  //       pdfPath: '/path/to/bugs.pdf',
  //       status: 'inProgress',
  //     },
  //   ],
  //   completed: [
  //     {
  //       id: '4',
  //       taskName: 'Documentation',
  //       assignedBy: ['Paa ccc ddd fff kkkk Client','Cadmore'],
  //       assignedTo: ['Emma','Cadmore'],
  //       time: '11:00 AM',
  //       date: '2024-12-15',
  //       pdfPath: '/path/to/documentation.pdf',
  //       status: 'completed',
  //     },
  //     {
  //       id: '5',
  //       taskName: 'Documentation 2',
  //       assignedBy: ['Client 2','Cadmore'],
  //       assignedTo: ['Emma watso','Cadmore'],
  //       time: '12:00 AM',
  //       date: '2024-12-18',
  //       pdfPath: '/path/to/documentation.pdf',
  //       status: 'completed',
  //     },
  //   ],
  // });

  const GetTaskManagementList = async passedDate => {
    try {
      setLoading(true);
      const response = await getTaskManagementList(passedDate, 'EMP-BGM-0001');

      // Extract only the required fields
      const filteredResponse = {
        todo: response.todo || [],
        inprogress: response.inprogress || [],
        done: response.senddonetask || [], // assuming 'senddonetask' is done
      };
      setTaskManagementList(filteredResponse);
      console.log('Filtered Task List:', filteredResponse);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      const rawDate = '1/1/0001 12:00:00 AM';
      const encodedDate = encodeURIComponent(rawDate);
      GetTaskManagementList(encodedDate);
    }
  }, [isFocused]);

  const handlePress = id => {
    setExpandedCard(prevState => (prevState === id ? null : id));
  };

  const renderItem = ({item}) => (
    <AssignedTasksCard
      isExpanded={expandedCard === item?.TaskId} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item?.TaskId)} // Toggle expansion on press
      onPressNavigate={() => {
        navigate('AssignedTaskDetails', {itemId: item?.TaskId});
      }}
    />
  );

  const moveTask = (task, currentCategory, newCategory) => {
    setTasks(prevTasks => {
      const updatedCurrentCategory = prevTasks[currentCategory].filter(
        t => t.id !== task.id,
      );
      const updatedNewCategory = [...prevTasks[newCategory], task];
      return {
        ...prevTasks,
        [currentCategory]: updatedCurrentCategory,
        [newCategory]: updatedNewCategory,
      };
    });
  };

  const getTaskData = () => {
    console.log('select', select);

    switch (select) {
      case 'todo':
        return taskManagementList?.todo || [];
      case 'inprogress':
        return taskManagementList?.inprogress || [];
      case 'all':
        return taskManagementList || {};
      default:
        return taskManagementList || {}; // passing the whole object if needed taskManagementList?.todo
    }
  };
  const renderTask =
    category =>
    ({item}) =>
      (
        <View style={styles.taskItem}>
          <Text style={styles.taskName}>{item.taskName}</Text>
          <Text style={styles.taskDetails}>
            Assigned By: {item.assignedBy.join(', ')}
          </Text>
          <Text style={styles.taskDetails}>
            Assigned To: {item.assignedTo.join(', ')}
          </Text>
          <Text style={styles.taskDetails}>Time: {item.time}</Text>
          <Text style={styles.taskDetails}>Date: {item.date}</Text>
          <Text style={styles.taskDetails}>PDF: {item.pdfPath}</Text>
          <View style={styles.buttonContainer}>
            {category !== 'toDos' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => moveTask(item, category, 'toDos')}>
                <Text style={styles.buttonText}>Move to To-Do</Text>
              </TouchableOpacity>
            )}
            {category !== 'inProgress' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => moveTask(item, category, 'inProgress')}>
                <Text style={styles.buttonText}>Move to In-Progress</Text>
              </TouchableOpacity>
            )}
            {category !== 'completed' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => moveTask(item, category, 'completed')}>
                <Text style={styles.buttonText}>Move to Completed</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );

  const countTodo = countMatching(
    taskManagementList.todo,
    'TaskStatus',
    'todo',
  );
  const countInprogress = countMatching(
    taskManagementList.inprogress,
    'TaskStatus',
    'inprogress',
  );
  const countDone = countMatching(
    taskManagementList.senddonetask,
    'TaskStatus',
    'done',
  );
  console.log('taskManagementList', countTodo);

  return (
    <View style={styles.container}>
      <FormHeader
        back={true}
        title={'Assigned Tasks'}
        countTitle={countTodo + countInprogress || 0}
        countTitleOne={countTodo || 0}
        countTitleTwo={countInprogress || 0}
        countTitleThree={0}
        titleOne={'Total'}
        titleTwo={'To-Dos'}
        titleThree={'Progress'}
        titleFour={'Completed'}
      />
      <Row style={styles.filterContainer}>
        <Primaryinput
          value={dateValue}
          onChangeText={x => setDateValue(x)}
          placeholder="Date"
          isCalendar
          editable={false}
          mainContainer={{width: '74%'}}
        />

        <PrimaryButton
          containerStyle={styles.searchButton}
          title="Filter"
          onPress={() => {
            if (dateValue) {
              console.log('dateValue', dateValue);
              GetTaskManagementList(dateValue);
            } else {
              alert('Please select a date first.');
            }
          }}
        />
      </Row>

      <View style={{flex: 1}}>
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
            onPress={() => setSelect('todo')}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'todo' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Pending'}
              color={select === 'todo' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelect('inprogress')}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'inprogress' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'In Progress'}
              color={
                select === 'inprogress' ? colors.primary : colors.halfWhite
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelect('done')}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'done' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Completed'}
              color={select === 'done' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
        </Row>
        <ScrollView>
          {/* <CustomFlatList
              showsVerticalScrollIndicator={false}
              data={getTaskData()}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingBottom: mvs(20),
                paddingHorizontal: mvs(20),
              }}
            /> */}

          {loading ? (
            <Loader />
          ) : (
            <>
              {select === 'all' || select === 'todo' ? (
                <CustomFlatList
                  showsVerticalScrollIndicator={false}
                  data={taskManagementList?.todo}
                  renderItem={renderItem}
                  contentContainerStyle={{
                    paddingBottom: mvs(0),
                    marginBottom: mvs(0),
                    paddingHorizontal: mvs(20),
                  }}
                  show = {taskManagementList.length > 0 ? false : true}
                />
              ) : null}

              {select === 'all' || select === 'inprogress' ? (
                <CustomFlatList
                  showsVerticalScrollIndicator={false}
                  data={taskManagementList?.inprogress}
                  renderItem={renderItem}
                  contentContainerStyle={{
                    paddingBottom: mvs(0),
                    marginBottom: mvs(0),
                    paddingHorizontal: mvs(20),
                  }}
                  show={false}
                />
              ) : null}

              {select === 'all' || select === 'done' ? (
                <CustomFlatList
                  showsVerticalScrollIndicator={false}
                  data={taskManagementList?.done}
                  renderItem={renderItem}
                  contentContainerStyle={{
                    paddingBottom: mvs(20),
                    marginBottom: mvs(20),
                    paddingHorizontal: mvs(20),
                  }}
                  show={false}
                />
              ) : null}
            </>
          )}

          {/* )} */}
        </ScrollView>
        {/* <TouchableOpacity
          onPress={() => navigate('AddTodo')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default AssignedTaskList;
