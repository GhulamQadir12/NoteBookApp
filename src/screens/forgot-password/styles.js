import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboradscrollcontent: {
    marginTop: mvs(20),
  },

  backgroundImage: {
    width: '100%',
    height: mvs(475),
  },
  welcomeText: {
    alignSelf: 'center',
  },
  loginText: {
    color: colors.secondary,
    alignSelf: 'center',
    marginTop: mvs(6),
  },
  checkView: {
    width: mvs(20),
    height: mvs(20),
    borderRadius: mvs(10),
    borderColor: colors.secondary,
    borderWidth: mvs(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
