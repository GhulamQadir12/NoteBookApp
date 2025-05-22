import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0CFCD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: colors.white,
  },
  skipbutton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: mvs(20),
  },
});
export default styles;
