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
});
export default styles;
