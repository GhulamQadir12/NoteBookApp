import {mvs, width} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topcontainer: {
    width: '100%',
    height: '19%',
    backgroundColor: colors.primary,
  },

  // img: {
  //   height: mvs(120),
  //   width: mvs(120),
  //   borderRadius: mvs(70),
  //   alignSelf: 'center',
  //   marginTop: mvs(25),
  //   backgroundColor: 'red',
  // },

  imgUpload: {
    height: mvs(120),
    width: mvs(120),
    borderRadius: mvs(50),
    alignSelf: 'center',
    // marginTop: '20%',
  },
  inputcontainer: {
    marginTop: mvs(20),
    // padding:mvs(20)

  },
  name: {
    alignSelf: 'center',
    fontSize: mvs(24),
    // marginTop: mvs(10),
    // position: 'absolute',
    // bottom: mvs(-95),
    alignItems: 'center',
    // color: colors.white,
  },
  textinput: {
    // widht:'90%',
    // alignSelf:'center',
    borderColor: colors.gray87,
  },
  containerStyle: {
    height: mvs(50),
  },
  containerStyle2: {
    height: mvs(50),
    backgroundColor: colors.white,
    borderColor: colors.yellow,
    borderWidth: mvs(2),
    borderRadius: mvs(27),
  },
  textStyle: {
    color: colors.primary,
    fontSize: mvs(16),
  },
  editbtn: {
    backgroundColor: colors.lightsilver,
    width: mvs(30),
    height: mvs(30),
    borderRadius: mvs(15),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: mvs(10),
    top: mvs(80),
  },
  keyboardcontentcontainer:{
    // backgroundColor:'gray',
    // top: mvs(-110),

  }
});
export default styles;
