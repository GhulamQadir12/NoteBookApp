import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  contentContainerStyle: {
    // flexGrow: 1,
    // paddingTop: '50%',
    height: height - 220,
    paddingHorizontal: mvs(20),
    // marginTop: mvs(30),
    marginVertical: mvs(50),
  },
  txt: {marginBottom: mvs(10), fontSize: mvs(20)},
  button: {
    width: '100%',
    paddingHorizontal: mvs(20),
    position: 'absolute',
    bottom: 0,
    paddingBottom: mvs(Platform?.OS === 'android' ? 20 : 40),
  },
  contentContainerStyleNew: {
    // flexGrow: 1,

    paddingHorizontal: mvs(20),
    marginVertical: mvs(30),
    paddingVertical: mvs(20),
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
  googlebutton: {
    backgroundColor: colors.white,
    marginHorizontal: mvs(10),
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(10),
    opacity: 0.8,
    alignSelf: 'center',
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
  logobackground: {
    height: mvs(110),

    width: width,
    position: 'absolute',
  },
});
export default styles;
