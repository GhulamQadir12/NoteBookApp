// import React from 'react';
// import {View, Dimensions} from 'react-native';
// import {BarChart} from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;

// const BarGraph = () => {
//   return (
//     <BarChart
//       data={{
//         labels: ['1', '2', '3', '4', '5', '6', '7'],
//         datasets: [
//           {
//             data: [1.2, 1.8, 1.4, 1.6, 2.0, 1.6, 1.4], // Values from the graph
//             //   colors: [
//             //     // (opacity = 1) => `rgba(34, 85, 140, ${opacity})`, // First set color
//             //     // (opacity = 1) => `rgba(240, 190, 70, ${opacity})`, // Second set color
//             //   ],
//           },
//         ],
//       }}
//       width={screenWidth - 30} // Adjust the width to fit the screen
//       height={220}
//       yAxisLabel=""
//       yAxisSuffix=""
//       yAxisInterval={1} // Defines the step size between y-axis labels
//       chartConfig={{
//         backgroundColor: '#ffffff',
//         backgroundGradientFrom: '#ffffff',
//         backgroundGradientTo: '#ffffff',
//         decimalPlaces: 1, // Set decimal points if needed
//         barPercentage: 0.5, // Adjust the bar width
//         color: (opacity = 1, index) => {
//           // Alternate colors based on bar index
//           // return index % 2 === 0 ? 'blue' : 'yellow';
//         },
//         labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

//         style: {
//           borderRadius: 16,
//         },
//       }}
//       verticalLabelRotation={0} // No rotation for labels
//     />
//   );
// };

// export default BarGraph;


import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const BarGraph = () => {
  // const data = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       data: [100, 45, 28, 80, 99, 43],
  //     },
  //   ],
  // };
  data={
            labels: ['Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur', 'Sunday'],
            datasets: [
              {
                data: [1.8, 1.6, 2.0, 1.8, 2.2, 1.7, 2.0], // Values from the graph
              },
            ],
          }
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(23, 88, 132, ${opacity})`,
    // color: (opacity = 1) => `rgba(26, 188, 156, ${opacity})`,
    barPercentage: 0.5,
    fillShadowGradient: colors.primary, // Bar fill color   '#3498db'
    fillShadowGradientOpacity: 1,
  };

  return (
    <View style={styles.container}>
      <BarChart
        style={styles.chart}
        data={data}
        width={Dimensions.get('window').width - 10} // Adjust width
        height={mvs(210)}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={18}
        showValuesOnTopOfBars={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.white,
  },
  chart: {
    borderRadius: mvs(10),
    // marginRight: mvs(20),
    backgroundColor:colors.white,
    width:'100%',
  },
});

export default BarGraph;

