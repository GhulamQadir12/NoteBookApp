import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import ComplainRequestCard from 'components/molecules/complain-request-card';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect, useState} from 'react';
import {ScrollViewBase, TouchableOpacity, View} from 'react-native';
import Bold from 'typography/bold-text';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import ReimbursementRequestCard from 'components/molecules/Reimbursement-request-card';
import {Row} from 'components/atoms/row';
import {
  getReimbursementDetails,
  getReimbursementList,
  getTaskManagementById,
  TaskManagementUpdateRemarks,
  TaskManagementUpdateStatus,
} from 'services/api/auth-api-actions';
import {Button, Text} from 'react-native';
import DatePickered from 'components/atoms/date-picker/currentmonth';
import styles from './style';
import ReimbursementDetailsCard from 'components/molecules/Reimbursement-details-card';
import ReimbursementDetailCard from 'components/molecules/Reimbursement-details-card';
import Regular from 'typography/regular-text';
import {ScrollView} from 'react-native';
import {IconButton, PrimaryButton} from 'components/atoms/buttons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Checkbox} from 'components/atoms/checkbox';
import {TextAreaInput} from 'components/atoms/inputs';
import moment from 'moment';

const AssignedTaskDetails = props => {
  const {itemDetail} = props?.route?.params;
  const {itemId} = props?.route?.params;
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [data, setdata] = useState([]); // Data for the list
  const [allData, setallData] = useState(null); // Data for the list
  const [selected, setSelected] = React.useState('');
  const [remarks, setRemarks] = React.useState('');
  const [toggle, setToggle] = useState(false); // Data for the list
  console.log('in detail screen props', itemId);

  // const values = {
  //   groupId: 1,
  //   companyId: 8,
  //   itemDetail: itemDetail.id,
  // };
  const fetchTaskManagementDetails = async () => {
    try {
      setLoading(true);

      const response = await getTaskManagementById(itemId);
      // console.log('response in detail', response);
      setdata(response);
      setSelected(response?.TaskStatus);
      //   setallData(response);
      // console.log('all data  ', data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskManagementDetails(); // Fetch data on component mount
  }, []);

  // Ref to skip the first render
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // skip first render
    }

    // call the function only when 'selected' changes after first render
    taskManagementUpdateStatus();
  }, [selected]);

  const taskManagementUpdateStatus = async () => {
    try {
      setLoading(true);

      const response = await TaskManagementUpdateStatus(itemId, selected);
      console.log('response of status update', response);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };
  const taskManagementUpdateRemarks = async () => {
    try {
      setLoading(true);

      const response = await TaskManagementUpdateRemarks(itemId, remarks);
      console.log('response of status update', response);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  // React.useEffect(() => {
  //   if (selected) {
  //     TaskManagementUpdateStatus(); // Call the update function on state change
  //   }
  // }, [selected]);

  //   const handlePress = id => {
  //     // Toggle expansion for the selected card
  //     setExpandedCard(prevState => (prevState === id ? null : id));
  //   };

  const renderItem = ({item}) => (
    <ReimbursementDetailCard
      item={item}
      //   onPress={() => handlePress(item.id)} // Toggle expansion on press
    />
  );

  const RemarkSubmit = async => {
    try {
    } catch (error) {
      console.log('error=>', error);
    } finally {
    }
  };

  const originalDate = data?.Date;
  const formattedDate = moment(originalDate).format('YYYY-MM-DD');

  console.log(formattedDate); // Output: "2024-12-27"

  // Output: 2024-12-21

  //   const countReimbursements = dataArray => {
  // Filter the array for objects matching the desired ReimbursementStatus
  //     return dataArray.filter(
  //       obj =>
  //         obj.ReimbursementStatus === 'PartiallyApproved' ||
  //         obj.ReimbursementStatus === 'Approved',
  //     ).length;
  //   };
  //   const count = countReimbursements(data);
  // console.log("Count",count);
  return (
    <View style={styles.container}>
      <Header1x2x
        back={true}
        title={'Detail'}
        // style={{height: mvs(100)}}
      />
      <ScrollView>
        <Row style={{marginVertical: mvs(20), marginHorizontal: mvs(20)}}>
          <PrimaryButton
            onPress={() => {
              setSelected('todo');
            }}
            title="To-do"
            textStyle={{
              color: selected == 'todo' ? colors.primary : colors.halfWhite,
            }}
            containerStyle={{
              width: '30%',
              height: mvs(40),
              borderRadius: mvs(5),
              padding: mvs(5),
              backgroundColor:
                selected === 'todo' ? colors.yellow : colors.white,
            }}
          />
          <PrimaryButton
            onPress={() => {
              setSelected('inprogress');
            }}
            textStyle={{
              color:
                selected == 'inprogress' ? colors.primary : colors.halfWhite,
            }}
            title="In Progress"
            containerStyle={{
              width: '30%',
              height: mvs(40),
              borderRadius: mvs(5),
              padding: mvs(5),
              backgroundColor:
                selected === 'inprogress' ? colors.yellow : colors.white,
            }}
          />
          <PrimaryButton
            onPress={() => {
              setSelected('done');
            }}
            textStyle={{
              color: selected === 'done' ? colors.primary : colors.halfWhite,
            }}
            title="Completed"
            containerStyle={{
              width: '30%',
              borderRadius: mvs(5),
              padding: mvs(5),
              height: mvs(40),
              backgroundColor:
                selected === 'done' ? colors.yellow : colors.white,
            }}
          />
        </Row>
        <View style={styles.itemContainer}>
          <Row style={{justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold
                label={'Task Name :'}
                color={colors.black}
                numberOfLines={5}
              />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={' ' + data?.TaskName}
                numberOfLines={15}
              />
            </View>
          </Row>
          <Row style={{justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold
                label={'Task Date :'}
                color={colors.black}
                numberOfLines={5}
              />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={formattedDate}
                numberOfLines={5}
              />
            </View>
          </Row>
          <Row style={{justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold
                label={'Task Time :'}
                color={colors.black}
                numberOfLines={5}
              />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={data?.Time}
                numberOfLines={5}
              />
            </View>
          </Row>
          {/* <Row style={{justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold
                label={'Assigned By :'}
                color={colors.black}
                numberOfLines={5}
              />
            </View>
            <View>
              {data?.assignedBy.map((assignedBy, index) => (
                <View key={index} style={styles.assinedByContainer}>
                  <Regular
                    style={styles.issueText}
                    label={assignedBy}
                    color={colors.black}
                  />
                </View>
              ))}
            </View>
          </Row> */}
          {/* <Row style={{justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold
                label={'Assined To :'}
                color={colors.black}
                numberOfLines={5}
              />
            </View>
            <View>
              {itemDetail?.TaskFor.map((assignedBy, index) => (
                <View key={index} style={styles.assinedByContainer}>
                  <Regular
                    style={styles.issueText}
                    label={assignedBy}
                    color={colors.black}
                  />
                </View>
              ))}
            </View>
          </Row> */}
          <IconButton
            title={'Attchment'}
            Icon={<AntDesign name="download" size={20} color="white" />}
            containerStyle={styles.containerStyle2}
            textStyle={{fontSize: mvs(16)}}
          />
        </View>
        <View style={{paddingHorizontal: mvs(20)}}>
          {toggle && (
            <TextAreaInput
              placeholder="Remarks"
              value={remarks}
              onChangeText={text => setRemarks(text)}
            />
          )}
          <PrimaryButton
            title={!toggle ? 'Add Remarks' : 'Submit'}
            containerStyle={styles.containerStyle}
            loading={loading}
            onPress={() => {
              if (toggle) {
                taskManagementUpdateRemarks(); // Call your async function here
              } else {
                setToggle(true); // Toggle the text area
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AssignedTaskDetails;
