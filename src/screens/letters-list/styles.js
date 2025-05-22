import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  taskBtn: {
    width: mvs(60),
    height: mvs(60),
    borderRadius: mvs(30),
    backgroundColor: colors.yellow,
    position: 'absolute',
    bottom: mvs(20),
    right: mvs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendercontainer:{
    marginVertical:mvs(5),
},
  monthName: {
    fontSize: mvs(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: mvs(10),
    color: '#333',
  },
  eventContainer: {
    padding: mvs(5),
    borderRadius: mvs(5),
    backgroundColor: '#007AFF',
  },
  eventTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  eventDone: {
    backgroundColor: '#d3d3d3', // Change background color for done events
  },
  eventDoneText: {
    textDecorationLine: 'line-through', // Strike-through text for done events
  },
});
export default styles;
