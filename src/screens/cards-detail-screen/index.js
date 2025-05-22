import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { mvs } from 'config/metrices';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';



const CardsDetailScreen = ({ route }) => {
  const item = route.params.item;
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1 ,backgroundColor: '#fff'}}>
    <View style={styles.container}>
      {/* Header */}
      <View
               style={{
                 paddingTop: 0,
                 paddingBottom: mvs(10),
                 backgroundColor: '#175884',
                 paddingHorizontal: mvs(20),
                 flexDirection: 'row',
                 alignItems: 'center',
                 gap: mvs(80),
               }}>
               <TouchableOpacity onPress={() => navigation?.goBack()} style={{marginTop: mvs(15)}}>
                 <Icon name="arrow-back" size={mvs(24)} color="#fff" />
               </TouchableOpacity>
               <Text
                 style={{
                   color: '#FFFFFF',
                   fontSize: mvs(25),
                   marginTop: mvs(15),
                   
                 }}>
                 Record Detail
               </Text>
             </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Feather name="user" size={mvs(20)} color="#175884" />
          <Text style={styles.label}>Name:</Text>
        </View>
        <Text style={styles.value}>{item.name}</Text>

        <View style={styles.row}>
          <Feather name="truck" size={mvs(20)} color="#175884" />
          <Text style={styles.label}>Car Number:</Text>
        </View>
        <Text style={styles.value}>{item.carNumber}</Text>

        <View style={styles.row}>
          <Feather name="file-text" size={mvs(20)} color="#175884" />
          <Text style={styles.label}>Details:</Text>
        </View>
        <Text style={[styles.value,{lineHeight:mvs(30)}]}>{item.detail}</Text>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#175884',
    padding: mvs(16),
    borderBottomEndRadius: mvs(15),
    borderBottomStartRadius: mvs(15),
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: mvs(24),
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    margin: mvs(20),
    padding: mvs(10),
    borderRadius: mvs(10),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: mvs(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mvs(12),
  },
  label: {
    fontSize: mvs(18),
    fontWeight: '600',
    marginLeft: mvs(8),
    color: '#175884',
  },
  value: {
    fontSize: mvs(16),
    color: '#555',
    marginLeft: mvs(28),
    marginTop: mvs(4),
  },
});

export default CardsDetailScreen;
