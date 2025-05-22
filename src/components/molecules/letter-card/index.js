import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { mvs } from 'config/metrices';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import { Row } from 'components/atoms/row';
import Medium from 'typography/medium-text';
import { colors } from 'config/colors';
import { getLetterTypes } from 'services/api/auth-api-actions';

const EmployeeLetterCard = ({ item, onPress }) => {
    const [letterTypes, setLetterTypes] = useState([]);
  const fetchLetterTypes = async () => {
    try {
      const response = await getLetterTypes();
      setLetterTypes(response || []);
      console.log('letter Types index ', letterTypes);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
    }
  };

  useEffect(() => {
    fetchLetterTypes(); // Fetch data on component mount
  }, []);
  
  const filterLetterTypeName = (letterTypeID) => {
    const result = letterTypes.filter(item => item.LetterTypeID === letterTypeID);
    return result.length > 0 ? result[0].LetterTypeName : null;
  };
  
  // Example usage
  const letterTypeName = filterLetterTypeName(item.LatterType);
  console.log(letterTypeName); // Output: "Successfull"
  

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Row style={styles.headerContainer}>
        <Bold style={styles.departmentText} label={item.LatterRecieverName}/>
        <Regular style={styles.dateText} label={moment(item.LatterDate).format('MMMM Do, YYYY')} />
      </Row>
      <View style={styles.bodyContainer}>
        <Regular style={styles.strikeIdText} label={`Letter Type : ${letterTypeName}`}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: mvs(12),
    padding: mvs(16),
    marginVertical: mvs(8),
    // marginHorizontal: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: mvs(8),
    elevation: 3,
    borderColor: colors.border,
    borderWidth: mvs(1),
  },
  headerContainer: {
    alignItems: 'center',
  },
  departmentText: {
    fontSize: mvs(15),
    fontWeight: 'bold',
    color: colors.black,
  },
  dateText: {
    fontSize: mvs(12),
    color: colors.black,
  },
  bodyContainer: {
    marginTop: mvs(5),
  },
  nameText: {
    fontSize: mvs(13),
    color: colors.black,
  },
  strikeIdText: {
    fontSize: mvs(12),
    color: colors.black,
  },
});

export default EmployeeLetterCard;
