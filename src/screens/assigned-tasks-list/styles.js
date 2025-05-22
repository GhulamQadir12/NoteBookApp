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
  innerContainer: {
    width: '90%',
    // height: mvs(65),
    backgroundColor: colors.yellow,
    marginTop: mvs(45),
    borderRadius: mvs(10),
    marginHorizontal: mvs(20),
    alignSelf: 'center',
    padding: mvs(5),
  },
  textContainer: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    width: '20%',
    borderRadius: mvs(5),
    bottom: mvs(10),
    // marginHorizontal: mvs(20),
  },
  filterContainer: {
    alignItems: 'center',
    marginTop: mvs(60),
    marginHorizontal: mvs(20),
  },

    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 20,
      color: '#333',
    },
    taskItem: {
      backgroundColor: '#FFF',
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    taskName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    taskDetails: {
      fontSize: 14,
      color: '#555',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    button: {
      backgroundColor: '#82DE1B',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
  
});
export default styles;
