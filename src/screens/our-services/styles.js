import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
  },
  lan: {
    height: mvs(120),
    marginTop: mvs(20),
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: mvs(24),
  },
  heading: {
    fontSize: mvs(20),
    color: colors.primary,
  },
  normaltext: {
    fontSize: mvs(14),
    paddingVertical: mvs(4),
  },

  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(20),
    // paddingBottom: mvs(100),
    // margi
  },
});
export default styles;
