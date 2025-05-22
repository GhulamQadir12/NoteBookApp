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
  datePicker: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
export default styles;
