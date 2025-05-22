// screens/HomeScreen.js
import {PlusButton, PrimaryButton} from 'components/atoms/buttons';
import {PrimaryInput, SearchInput} from 'components/atoms/inputs';
import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {navigate} from 'navigation/navigation-ref';

const CardsScreen = ({navigation}) => {
  const data = [
    {id: '1', name: 'John Doe', carNumber: 'ABC-123', detail: 'Details about John Doe and his car ABC-123 here.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled ittext ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
    {id: '2', name: 'Jane Smith', carNumber: 'XYZ-456', detail: 'Details about Jane Smith and her car XYZ-456 here.'},
    {id: '3', name: 'Mark Wilson', carNumber: 'LMN-789', detail: 'Details about Mark Wilson and his car LMN-789 here.'},
    {id: '4', name: 'John Doe', carNumber: 'ABC-123', detail: 'Details about John Doe and his car ABC-123 here.'},
    {id: '5', name: 'Jane Smith', carNumber: 'XYZ-456', detail: 'Details about Jane Smith and her car XYZ-456 here.'},
    {id: '6', name: 'Mark Wilson', carNumber: 'LMN-789', detail: 'Details about Mark Wilson and his car LMN-789 here.'},
    {id: '7', name: 'John Doe', carNumber: 'ABC-123', detail: 'Details about John Doe and his car ABC-123 here.'},
    {id: '8', name: 'Jane Smith', carNumber: 'XYZ-456', detail: 'Details about Jane Smith and her car XYZ-456 here.'},
    {id: '9', name: 'Mark Wilson', carNumber: 'LMN-789', detail: 'Details about Mark Wilson and his car LMN-789 here.'},
    {id: '10', name: 'John Doe', carNumber: 'ABC-123', detail: 'Details about John Doe and his car ABC-123 here.'},
  ];
  const [dateValue, setDateValue] = React.useState('');

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.card} onPress={() => navigate('CardsDetailScreen', {item})}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.carNumber}>
            Car Number: {'  '}
            {item.carNumber}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => console.log('Edit pressed', item.id)}>
            <Icon name="edit" size={mvs(27)} color="green" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Delete pressed', item.id)}>
            <AntDesign name="delete" size={mvs(27)} color="red" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          backgroundColor: '#175884',
          padding: mvs(4),
          borderBottomEndRadius: mvs(15),
          borderBottomStartRadius: mvs(15),
        }}>
        <Text
          style={{
            fontSize: mvs(24),
            fontWeight: 'bold',
            padding: mvs(16),
            color: '#fff',
            alignSelf: 'center',
          }}>
          Car Records
        </Text>
      </View>
      <SearchInput
        containerStyle={{
          marginTop: mvs(25),
          borderWidth: 1,
          marginHorizontal: mvs(20),
        }}
      />
      <Row style={styles.filterContainer}>
        <PrimaryInput
          value={dateValue}
          onChangeText={x => setDateValue(x)}
          placeholder="From Date"
          isCalendar
          editable={false}
          mainContainer={{width: '74%'}}
        />

        <PrimaryButton containerStyle={styles.searchButton} title="Filter" />
      </Row>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: mvs(16)}}
      />
      <PlusButton onPress={()=>{navigate('LinePaper')}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: mvs(16),
    borderRadius: mvs(10),
    marginBottom: mvs(12),
  },
  name: {
    fontSize: mvs(18),
    fontWeight: 'bold',
    color: '#175884',
  },
  carNumber: {
    fontSize: mvs(16),
    color: '#333',
    marginTop: mvs(5),
    fontWeight: 'bold',
  },
  searchButton: {
    width: '20%',
    borderRadius: mvs(5),
    bottom: mvs(10),
    // marginHorizontal: mvs(20),
  },
  filterContainer: {
    alignItems: 'center',
    marginTop: mvs(20),
    marginHorizontal: mvs(20),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: mvs(-10),
  },
  icon: {
    marginLeft: mvs(12),
  },
});

export default CardsScreen;
