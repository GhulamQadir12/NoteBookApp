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
import {getAdvanceList} from 'services/api/auth-api-actions';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Calendar} from 'react-native-big-calendar';
import {PlusButton} from 'components/atoms/buttons';
import CalendarEvent from 'components/atoms/calender';
import Medium from 'typography/medium-text';

const CompanyCalender = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [advanceList, setAdvanceList] = useState([]); // Track the expanded card by its ID
  const [calenderFilter, setCalenderFilter] = useState(false); // Track the expanded card by its ID
  const [selected, setSelected] = useState(''); // Track the expanded card by its ID
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString('default', {month: 'long', year: 'numeric'}),
  );

  const data = [
    {id: 1, status: 'Approved'},
    {id: 2, status: 'Pending'},
    {id: 3, status: 'Approved'},
  ];

  const events = [
    {
      title: 'Meeting with client',
      start: new Date(2024, 11, 5), // Month is 0-indexed
      end: new Date(2024, 11, 5),
    },
    {
      title: 'Another',
      start: new Date(2024, 11, 5, 12, 0), // Month is 0-indexed
      end: new Date(2024, 11, 5, 13, 15),
    },
    {
      title: 'Team stand-up',
      start: new Date(2024, 11, 6, 1, 30),
      end: new Date(2024, 11, 6, 2, 0),
    },
    {
      title: 'Team stand-up',
      start: new Date(2024, 11, 6, 2, 30),
      end: new Date(2024, 11, 6, 4, 0),
    },
  ];

  const handleVisibleRangeChange = (start, end) => {
    // Update the current month name based on the new visible range
    const month = start.toLocaleString('default', {month: 'long'});
    const year = start.getFullYear();
    setCurrentMonth(`${month} ${year}`);
  };
const selectedDate = (date)=>{
  setSelected(date)
  // const flag = !calenderFilter;
  // setCalenderFilter(flag);
}
console.log("in parent screen selected date","selected",selected);
  return (
    <View style={styles.container}>
      <Header1x2x
        back={true}
        title={'Event Calender'}
        style={{height: mvs(60)}}
        isDate={true}
        onPress={() => {
          const flag = !calenderFilter;
          setCalenderFilter(flag);
          console.log('calenderFilter', calenderFilter);
        }}
        // rowStyle={{justifyContent: 'space-between'}}
      />
      {calenderFilter && (
        <View style={styles.calendercontainer}>
          <CalendarEvent selectedValue={selectedDate}/>
        </View>
      )}
      {/* Month Display */}
      <View style={{alignItems: 'center', padding: mvs(10)}}>
        <Medium
          style={{fontSize: mvs(18), fontWeight: 'bold', color: '#333'}}
          label={currentMonth}
        />
      </View>
      <View style={{flex: 1}}>
        <Calendar
          events={events}
          height={mvs(600)}
          mode="day" // Set to "day" for daily view
          onPressEvent={event => console.log('Event clicked:', event)}
          onChangeRange={handleVisibleRangeChange}
          headerContainerStyle={{
            flexDirection: 'row', // Ensure the header elements are in a row
            justifyContent: 'flex-start', // Align items to the start
            alignItems: 'flex-start', // Center vertically
           // Add some spacing on the left
            backgroundColor: colors.white, // Optional: Set background color
            paddingTop:mvs(5),
            height:mvs(75)
          }}
          headerContentStyle={{
            alignSelf:'flex-start', // Ensure text aligns to the left
            fontWeight: 'bold', // Optional: Style for the day number
            fontSize: mvs(16), // Adjust size if needed
            color: 'green', // Optional: Set color for visibility
          }}
        />

     
      </View>
    </View>
  );
};

export default CompanyCalender;
