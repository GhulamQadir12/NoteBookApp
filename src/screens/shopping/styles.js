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
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(20),
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
  contentContainerStyleNew: {
    // flexGrow: 1,
    paddingHorizontal: mvs(10),
    marginVertical: mvs(10),
    paddingVertical: mvs(10),
    backgroundColor: colors.white,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(6),
  },
});
export default styles;
