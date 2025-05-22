import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: mvs(0),
    paddingBottom: mvs(150),
  },
  backgroundContainer: {
    width: '100%',
    height: mvs(250),
    backgroundColor: colors.primary,
  },
  inputContainer: {
    marginTop: mvs(140),
    backgroundColor: colors.white,
    borderRadius: mvs(15),
    height: mvs(570),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: mvs(20),
  },
  loginTexhzologyContainer: {
    marginTop: mvs(110),
    alignSelf: 'center',
    fontSize: mvs(15),
    marginBottom: mvs(20),
  },
  mainInnerContainer: {
    width: '100%',
    position: 'absolute',
    paddingHorizontal: mvs(20),
  },
});
export default styles;
