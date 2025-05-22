import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {mvs} from 'config/metrices';

const screenWidth = Dimensions.get('window').width;

const PieGraph = () => {
  const data = [
    {
      name: 'Present Count',
      population: 50,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Absent Count',
      population: 10,
      color: '#F44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Late Arrival',
      population: 5,
      color: '#FFC107',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Left Early',
      population: 8,
      color: '#03A9F4',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Leave Count',
      population: 12,
      color: '#9C27B0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View>
      <PieChart
        Graph
        data={data}
        width={screenWidth - 20}
        height={mvs(220)}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          decimalPlaces: 2,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="0"
        absolute
      />
    </View>
  );
};

export default PieGraph;
