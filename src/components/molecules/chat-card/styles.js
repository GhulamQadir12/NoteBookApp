import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: mvs(60),

    marginTop: mvs(20),
  },
  backGroundImage: {
    width: mvs(55),
    height: mvs(55),
    borderWidth: 1,
    // marginTop: mvs(10),
  },
  // innerImage: {width: '100%', height: '100%', borderRadius: mvs(10)},
  imageContainer: {
    height: mvs(60),
    borderColor: colors.primary,
    borderWidth: 1,
    width: mvs(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mvs(10),
  },
  InnerContainer: {alignItems: 'center', justifyContent: 'flex-start'},
});
export default styles;
