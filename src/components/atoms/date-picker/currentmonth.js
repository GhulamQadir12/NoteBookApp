import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePickered = ({style}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    hideDatePicker();
  };

  // Calculate the start and end dates of the current month
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  return (
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={showDatePicker}
    style={style}>
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode={"date"}
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      minimumDate={startOfMonth}
      maximumDate={endOfMonth}
    />
  </TouchableOpacity>
  );
};

export default DatePickered;
