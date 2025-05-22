import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import LeaveRequestCard from 'components/molecules/leave-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import AdvanceRequestCard from 'components/molecules/advance-request-card';
import {getAdvanceList, getStrikeLetterList} from 'services/api/auth-api-actions';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Calendar} from 'react-native-big-calendar';
import {PlusButton} from 'components/atoms/buttons';
import CalendarEvent from 'components/atoms/calender';
import Medium from 'typography/medium-text';
import StrikeLetterCard from 'components/molecules/strike-letter-card';
import * as IMG from 'assets/images';
import ChatListCard from 'components/molecules/chat-list-card';

const ChatList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [letterList, setLetterList] = useState([]); // Track the expanded card by its ID
  const [calenderFilter, setCalenderFilter] = useState(false); // Track the expanded card by its ID
  const [selected, setSelected] = useState(''); // Track the expanded card by its ID
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString('default', {month: 'long', year: 'numeric'}),
  );

    // const fetchStrikeLetterList = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await getStrikeLetterList('EMP-BGM-0001');
    //     setLetterList(response || []);
    //     console.log('strike letter List', letterList);
    //   } catch (err) {
    //     console.error('Failed to fetch data', err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  
    // useEffect(() => {
    //   fetchStrikeLetterList(); // Fetch data on component mount
    // }, []);

  const renderItem = ({item}) => (
    <ChatListCard
      item={item}
      // onPress={() => {handlePress(item?.id)}} // Toggle expansion on press
      onPress={ () => {
        navigate('EmployeeChat', {EmployeeId : item?.id});}}
    />
  );


  const data = [
    {
      id: '0',
      img: IMG.userimg,
      time: '12:00 PM',
      title: 'Coach',
      des: 'Hi ther hope your doing well  iam there tver 2000 years old. '
    },
    {
      id: '1',
      img: IMG.userimg,
      time: '12:00 PM',
      title: 'Director',
      des: 'Hi ther hope your doing well  iam there to help you in any situation!'
    },
    {
      id: '2',
      img: IMG.userimg,
      time: '12:00 PM',
      title: 'Director',
      des: 'Hi ther hope your doing well  iam there to help you in any situation!'
    },
    {
      id: '3',
      img: IMG.userimg,
      time: '12:00 PM',
      title: 'Director',
      des: 'Hi ther hope your doing well  iam there to help you in any situation!'
    },
    {
      id: '4',
      img: IMG.userimg,
      time: '12:00 PM',
      title: 'Director',
      des: 'Hi ther hope your doing well  iam there to help you in any situation!'
    },
    {
      id: '5',
      img: IMG.userimg,
      time: '12:00 PM',
      title: 'Coach',
      des: 'Hi ther hope your doing well  iam there tver 2000 years old. '
    },
    {
      id: '6',
      img: IMG.userimg,
      time: '12:00 PM',
      title: 'Coach',
      des: 'Hi ther hope your doing well  iam there tver 2000 years old. '
    },
    {
      id: '7',
      img: IMG.userimg,
      time: '12:00 PM',
      title: 'Coach',
      des: 'Hi ther hope your doing well  iam there tver 2000 years old. '
    },
    {
      id: '8',
      img: IMG.userimg,
      time: '12:00 PM',
      title: 'Coach',
      des: 'Hi ther hope your doing well  iam there tver 2000 years old. '
    },

  ];

  return (
    <View style={styles.container}>
      <Header1x2x
        back={true}
        title={'Employees'}
        style={{height: mvs(130)}}
        isSearch={true}
        mtop={mvs(15)}
      />
           <View style={{flex: 1, marginTop: mvs(13),paddingHorizontal:mvs(15)}}>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={data}
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

export default ChatList;
