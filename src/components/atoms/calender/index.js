import {View} from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';

const CalendarEvent = ({selectedValue}) => {
  const [selected, setSelected] = useState('');

  return (
    <View>
      <Calendar
        style={{
          paddingHorizontal: mvs(10),
          paddingBottom: mvs(20),
          height: mvs(300),
          upperCaseHeader: true,
          // fontFamily:'Nunito-Black',
          // fontWeight:'700'
        }}
        theme={{
          selectedDayBackgroundColor: colors.darkblue,
          textSectionTitleColor: colors.black,
          selectedDayTextColor: colors.white,
          dayTextColor: 'black',
          upperCaseHeader: true,
          selectedDayBackgroundColor: colors.primary,
        }}
        onDayPress={day => {
          setSelected(day.dateString);
          selectedValue(day.dateString); // Call selectedValue directly with the new date
          console.log(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
        }}
      />
    </View>
  );
};

export default CalendarEvent;