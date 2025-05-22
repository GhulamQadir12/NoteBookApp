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
import {
  getAdvanceList,
  getEventCalenderList,
  getEventCalenderListByDate,
} from 'services/api/auth-api-actions';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Calendar} from 'react-native-big-calendar';
import {PlusButton} from 'components/atoms/buttons';
import CalendarEvent from 'components/atoms/calender';
import Medium from 'typography/medium-text';
import {useIsFocused} from '@react-navigation/native';

const EventCalender = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [advanceList, setAdvanceList] = useState([]); // Track the expanded card by its ID
  const [calenderFilter, setCalenderFilter] = useState(false); // Track the expanded card by its ID
  const [selected, setSelected] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [eventsList, setEventsList] = useState([]); // Track the expanded card by its ID
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString('default', {month: 'long', year: 'numeric'}),
  );
  const isFocused = useIsFocused();

  const data = [
    {id: 1, status: 'Approved'},
    {id: 2, status: 'Pending'},
    {id: 3, status: 'Approved'},
  ];

  const fetchEventCalenderListByDate = async () => {
    try {
      setLoading(true);
      console.log('coming');
      const response = await getEventCalenderListByDate('29126', selected);
      const events = convertApiEventsToCalendarEvents(response || []);
      setEventsList(events);
      console.log('filtered event List in index', eventsList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventCalenderList = async () => {
    try {
      setLoading(true);
      const response = await getEventCalenderList('29126');
      const events = convertApiEventsToCalendarEvents(response || []);
      setEventsList(events || []);
      console.log('event List in index', eventsList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchEventCalenderList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const convertApiEventsToCalendarEvents = apiEvents => {
    return apiEvents.map(event => {
      return {
        title: event.Title,
        start: new Date(event.StartTime), // Use StartTime if it includes date+time
        end: new Date(event.EndTime),
        // Optional fields:
        description: event.Description,
        color: '#82DE1B', // Add custom color if needed
      };
    });
  };

  const events = [
    {
      title: "Today's Task - Project Meeting",
      start: new Date(2025, 3, 29, 10, 0), // April = month 3 (0-indexed)
      end: new Date(2025, 3, 29, 11, 0),
    },
    {
      title: 'Another Task',
      start: new Date(2025, 3, 29, 14, 0),
      end: new Date(2025, 3, 29, 15, 0),
    },
  ];

  console.log('events', events);
  const handleVisibleRangeChange = (start, end) => {
    // Update the current month name based on the new visible range
    const month = start.toLocaleString('default', {month: 'long'});
    const year = start.getFullYear();
    setCurrentMonth(`${month} ${year}`);
  };
  const selectedDate = date => {
    console.log('Newly selected date:', date);
    setSelected(date);
    setCalenderFilter(false); // This will trigger the useEffect above
    fetchEventCalenderListByDate(); // Fetch events for the selected date
  };

  console.log('in parent screen selected date', 'selected', selected);
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
          <CalendarEvent selectedValue={selectedDate} />
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
          events={eventsList}
          height={mvs(600)}
          mode="day"
          date={selected} // Pass the selected date here
          onPressEvent={event => console.log('Event clicked:', event)}
          onChangeRange={handleVisibleRangeChange}
          headerContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: colors.white,
            paddingTop: mvs(-5),
            height: mvs(60),
          }}
          headerContentStyle={{
            alignSelf: 'flex-start',
            fontWeight: 'bold',
            fontSize: mvs(16),
            color: 'green',
          }}
        />

        <PlusButton
          onPress={() => {
            navigate('AddEvent');
          }}
        />
      </View>
    </View>
  );
};

export default EventCalender;
