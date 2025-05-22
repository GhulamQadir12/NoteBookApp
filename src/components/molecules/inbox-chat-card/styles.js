import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    marginBottom: mvs(20),
  },
  innerContainer: {
    width: '80%',
    backgroundColor: colors.primary,
    borderTopLeftRadius: mvs(23),
    borderTopRightRadius: mvs(23),
    // padding: mvs(10),
    paddingVertical: mvs(10),
    paddingHorizontal: mvs(20),
  },
  timeText: {
    color: colors.white,
    fontSize: mvs(10),
    alignSelf: 'flex-end',
  },
});
export default styles;
