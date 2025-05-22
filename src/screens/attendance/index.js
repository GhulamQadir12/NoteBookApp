import PieGraph from 'components/atoms/graph/piegraph';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {mvs} from 'config/metrices';
import React from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {Row} from 'components/atoms/row';
import Primaryinput from 'components/atoms/inputs/index';
import {PrimaryButton} from 'components/atoms/buttons';
const Attendance = props => {
  const [date, setDate] = React.useState('');
  const attendanceData = [
    {
      date: '2024-10-01',
      day: 'Monday',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
    },
    {
      date: '2024-10-02',
      day: 'Tuesday',
      checkIn: '09:15 AM',
      checkOut: '05:00 PM',
    },
    {
      date: '2024-10-03',
      day: 'Wednesday',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
    },
    {
      date: '2024-10-04',
      day: 'Thursday',
      checkIn: '09:05 AM',
      checkOut: '04:45 PM',
    },
    {
      date: '2024-10-05',
      day: 'Friday',
      checkIn: '09:00 AM',
      checkOut: '03:30 PM',
    },
    {
      date: '2024-10-04',
      day: 'Thursday',
      checkIn: '09:05 AM',
      checkOut: '04:45 PM',
    },
    {
      date: '2024-10-05',
      day: 'Friday',
      checkIn: '09:00 AM',
      checkOut: '03:30 PM',
    },
    {
      date: '2024-10-04',
      day: 'Thursday',
      checkIn: '09:05 AM',
      checkOut: '04:45 PM',
    },
    {
      date: '2024-10-05',
      day: 'Friday',
      checkIn: '09:00 AM',
      checkOut: '03:30 PM',
    },
    {
      date: '2024-10-04',
      day: 'Thursday',
      checkIn: '09:05 AM',
      checkOut: '04:45 PM',
    },
    {
      date: '2024-10-05',
      day: 'Friday',
      checkIn: '09:00 AM',
      checkOut: '03:30 PM',
    },

    // Add more entries as needed
  ];
  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Regular style={styles.column} label={item?.date} />
      <Regular style={styles.column} label={item?.day} />
      <Regular style={styles.column} label={item?.checkIn} />
      <Regular style={styles.column} label={item?.checkOut} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Attendance Summary'} />
      <View style={styles.bottomContainer}>
        <PieGraph />
        <Row style={{alignItems: 'center'}}>
          <Primaryinput
            value={date}
            onChangeText={x => setDate(x)}
            placeholder="From Date"
            isCalendar
            editable={false}
            mainContainer={{width: '47%'}}
          />
          <Primaryinput
            value={date}
            onChangeText={x => setDate(x)}
            placeholder="To Date"
            isCalendar
            editable={false}
            mainContainer={{width: '47%'}}
          />
        </Row>
        <PrimaryButton containerStyle={styles.searchButton} title="Filter" />

        <View style={styles.header}>
          <Bold style={styles.headerText} label={'Date'} />
          <Bold style={styles.headerText} label={'Day'} />
          <Bold style={styles.headerText} label={'Check In'} />
          <Bold style={styles.headerText} label={'Check Out'} />
        </View>
        
        <FlatList
          showsVerticalScrollIndicator={false}
          data={attendanceData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
export default Attendance;
