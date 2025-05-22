import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.halfwhiteone,
    width: '100%',
    padding: mvs(10),
    marginTop: mvs(20),
    borderRadius: mvs(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  statusContainer: {
    gap: mvs(10),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.white,
    marginTop: mvs(20),
  },
  detailbutton: {
    width: '25%',
    backgroundColor: colors.primary,
    height: mvs(35),
    borderRadius: mvs(5),
    marginBottom: mvs(10),
  },
});
export default styles;
