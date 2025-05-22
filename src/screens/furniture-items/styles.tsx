import { StyleSheet } from 'react-native';
import { mvs, width } from 'config/metrices';
import { colors } from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primary,
  },
  contentContainerStyle: {
    // flexGrow: 1,
    flex: 1,
    // backgroundColor: 'red',

    // paddingVertical: mvs(30),
    // paddingHorizontal: mvs(20),
    // paddingBottom: mvs(30),
    // backgroundColor: colors.primary,
    // borderTopRightRadius: mvs(10),
    // borderTopLeftRadius: mvs(10),
  },
  contentContainerStyleFlatlist: {
    // paddingVertical: mvs(5),
    // paddingHorizontal: mvs(20),
    // paddingBottom: mvs(100),
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  rendercontainer: {
    padding: mvs(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderRadius: mvs(10),
  },
  notificationicon: {
    width: mvs(35),
    height: mvs(35),
    resizeMode: 'contain',
  },
  titleandtextview: {
    flex: 1,
    paddingHorizontal: mvs(5),
  },
  acceptbutton: {
    backgroundColor: colors.primary,
    // marginTop: mvs(5),
    borderRadius: mvs(10),
    // width: '45%',
  },
  rejectbutton: {
    backgroundColor: colors.bluecolor,
    // marginTop: mvs(20),
    borderRadius: mvs(10),
  },
  logobackground: {
    height: mvs(110),
    width: width,
    // position: 'absolute',
  },

  contentContainerStyleNew: {
    // paddingHorizontal: mvs(20),
    marginVertical: mvs(10),
    paddingVertical: mvs(20),
    marginHorizontal: mvs(20),
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
  keyboardcontentcontainer: {
    paddingHorizontal: mvs(0),
    // paddingBottom: mvs(100),
  },
});
export default styles;
