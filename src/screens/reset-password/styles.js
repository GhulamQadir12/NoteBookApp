import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundImage: {
    width: '100%',
    height: mvs(475),
  },
  welcomeText: {
    alignSelf: 'center',
  },
});
export default styles;
